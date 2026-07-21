// This file is where the "Room" object will be stored.
// There will be many of these, and each one will have a dedicated worker thread
// Each room can hold one game

import { Worker } from "node:worker_threads";


import GameManager from "../GameManager.js";
import { ClientID, LobbyID, PlayerID, PlayerType, RoomID, GameID } from "../schemas/types.js";
import { sendClientGamestate, sendReaction } from "../index.js";
import ClientView from "../Client/ClientView.js";




/** 
 * Each room has its own dedicated worker thread (RoomWorker.ts) that owns the game instance.
 * This file acts as the parent thread. it receives socket events and forwards them to the 
 * worker via postMessage(). The worker processes game logic and sends results back,
 * which the parent thread then uses to update clients.
 */





/**
 * Defines the properties for a room.
 * 
 * A Room consists of the gameId, the list of clients, and the name of the room.
 */
export default class Room {
    worker: Worker;
    gameId: GameID;
    clients: Record<ClientID, PlayerID>;
    name: RoomID;
    lobby: LobbyID;
    started: boolean;
    private timeouts: Map<string, NodeJS.Timeout>;

    /**
     * Creates a room.
     * @param gameId - The gameId.
     * @param name - Name of the room.
     * @param lobby - join code of the lobby.
     */
    constructor(gameId: GameID, name: string, lobby: string) {
        this.gameId = gameId;
        this.clients = {};
        this.name = name;
        this.lobby = lobby;
        this.started = false;
        this.timeouts = new Map();
        this.resetInactivityTimeout();


        this.worker = new Worker(new URL("./RoomWorker.js", import.meta.url), {
            workerData: {gameDefinitionJson: GameManager.getRegisteredGameDefinitionJson(gameId)}
        });

        this.worker.on("message", (msg) => {
            switch (msg.type){
                case "GAME_STATE":
                    this.emitGameState(msg.views);
                    break;
        
            }
        });

        this.worker.on("error", (err) => {
            console.error(`Room ${this.name} worker error:`, err);
        });
    }

    /**
     * Resets the inactivity timeout for the room.
     * If the room is inactive for 30 minutes, it will be destroyed.
     */
    resetInactivityTimeout(): void {
        const existing = this.timeouts.get("inactivity");
        if (existing) clearTimeout(existing);
        
        this.timeouts.set("inactivity", setTimeout(() => {
            console.log(`Room ${this.name} timed out due to inactivity`);
            //TODO: notify clients that the room has timed out
            this.destroy();
        }, 30 * 60 * 1000)); 
    }

    /**
     * Sends the updated game state to all clients in the room.
     * @param views - Array of player id and view pairs to send to each client.
     */
    emitGameState(views: {playerId: number, view: ClientView}[]): void {
        
        for(const clientId in this.clients)
        {
            const playerId = this.clients[clientId];
            const client = GameManager.clientFromId(+clientId);
            if(!client) continue;

            const playerView = views.find(v=> v.playerId===playerId);
            if (!playerView) continue;

            sendClientGamestate(client.identifier,  playerView.view );
        }


    }

    /**
     * Handles the action whenever a player clicks an object (Pile, Card, etc.).
     * @param label - The object that the user clicked.
     * @todo use cardId and player number to build action context
     */
    handlePlayerClick(label: string, cardId: number): void {
        if (!this.started) return;
        this.resetInactivityTimeout();
        this.worker.postMessage({type: "PLAYER_CLICK", label})

    }

    /**
     * Broadcasts an emote reaction from a client to all other clients in the room.
     * @param clientId - The id of the client sending the emote.
     * @param username - The username of the client sending the emote.
     * @param emote - The emote string to broadcast.
     */
    handleEmote(clientId: ClientID, username: string, emote: string): void {
        for (const client in this.clients) {
            if (+client == clientId) continue;

            sendReaction(+client, username, emote);
        }
    }

    /**
     * Handles a client joining the room before the game starts.
     * Should only be called by the parent lobby during room creation.
     * @param clientId - The id of the client joining the room.
     * @returns Promise resolving to true if the player successfully joined, else false.
     */
    handleJoinRoom(clientId: ClientID): false | Promise<boolean> {
        if (this.started) return false;
        const client = GameManager.clientFromId(clientId);
        if (!client) return false;
        this.resetInactivityTimeout();


         
        /**       
         * Returns a Promise that resolves to true if the player successfully joined, false otherwise.
         * A one-time listener is set up on the worker before sending the "JOIN_ROOM" message,
         * so the response is captured when the worker sends back "PLAYER_JOINED".
         * If successful, the client is mapped to their player ID and marked as in-game.
         */
        return new Promise((resolve) => {
            const listener = (msg: any) => {
                if (msg.type !== "PLAYER_JOINED") return;
                this.worker.off("message", listener);
                if (msg.playerId == null) return resolve(false);

                this.clients[client.identifier] = msg.playerId;
                client.inGame = true;
                client.roomId = this.name;
                client.player = msg.playerId;
                resolve(true)
            };
            this.worker.on("message", listener);
            this.worker.postMessage({ type: "JOIN_ROOM", playerType: PlayerType.HUMAN });
        });
       
    }

    /**
     * Starts the game in the worker thread.
     * @returns True if the game was started successfully, false if the game has already started.
     */
    startGame(): boolean {
        if (this.started) return false;
        this.started = true;
        this.resetInactivityTimeout();
        this.worker.postMessage({type: "START_GAME"});
        return true;
    }   

    /**
     * Clears all active timeouts for the room.
     */
    clearTimeouts(): void {
        for (const t of this.timeouts.values()){
            clearTimeout(t);
        }
        this.timeouts.clear();
    }

    /**
     * Clears a specific timeout by name.
     * @param name - The name of the timeout to clear.
     */
    clearTimeoutByName(name: string): void {
        const exists = this.timeouts.get(name);
        if (exists){
            clearTimeout(exists);
            this.timeouts.delete(name);
        }
    }

    /**
     * Destroys the room by clearing all timeouts and terminating the worker thread.
     */
    destroy(): void {
        this.clearTimeouts();
        this.worker.terminate();
    }
}