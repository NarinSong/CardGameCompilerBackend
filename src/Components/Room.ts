// This file is where the "Room" object will be stored.
// There will be many of these, and each one will have a dedicated worker thread
// Each room can hold one game

import { Worker } from "node:worker_threads";


import GameManager from "../GameManager.js";
import { ClientID, LobbyID, PlayerID, PlayerType, RoomID, GameID } from "../schemas/types.js";
import { sendClientGamestate } from "../index.js";
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
     *  
     * Send the updated game state to all clients.
     * 
     */
    emitGameState(views: {playerId: number, view: ClientView}[]) {
        
        for(const clientId in this.clients)
        {
            const playerId = this.clients[clientId];
            const client = GameManager.clientFromId(+clientId);
            if(!client) continue;

            const playerView = views.find(v=> v.playerId===playerId);
            if (!playerView) continue;

            sendClientGamestate(client.identifier,  playerView.view );
        }

        // for (let c in this.clients) {
        //     if (!this.game.players[0]) continue;
            
        //     const client = GameManager.clientFromId(+c);
        //     if (!client) continue;

        //     client.updateGamestate(state);
        // }
    }

    /**
     * Handles the action whenever a player clicks an object (Pile, Card, etc.).
     * @param label - The object that the user clicked.
     * @todo use cardId and player number to build action context
     * @todo use cardId and player number to build action context
     */
    handlePlayerClick(label: string, cardId: number) {
        if (!this.started) return;
        this.worker.postMessage({type: "PLAYER_CLICK", label})
        // let actionTaken = this.game.clickAction(label); // TODO: player number?

        // if (actionTaken) {
        //     // Update clients with new gamestate
        //     this.emitGameState();
        // }
    }

    // This function should *only* be called by the parent lobby, and *only* during room creation, before the game begins
    handleJoinRoom(clientId: ClientID) {
    handleJoinRoom(clientId: ClientID) {
        if (this.started) return false;

        const client = GameManager.clientFromId(clientId);
        if (!client) return false;


         
        /**       
         * Returns a Promise that resolves to true if the player successfully joined, false otherwise.
         * A one-time listener is set up on the worker before sending the "JOIN_ROOM" message,
         * so the response is captured when the worker sends back "PLAYER_JOINED".
         * If successful, the client is mapped to their player ID and marked as in-game.
         */
        return new Promise((resolve) => {
            this.worker.once("message", (msg) => {
                if(msg.type !== "PLAYER_JOINED" || !msg.playerId) return resolve(false);
                
                this.clients[client.identifier] = msg.playerId;

                client.inGame = true;
                client.roomId = this.name;
                client.player = msg.playerId;
                resolve(true)
            })
            this.worker.postMessage({ type: "JOIN_ROOM", playerType: PlayerType.HUMAN });
        });
       
    }

    startGame() {
        if (this.started) return false;
        this.started = true;
        this.worker.postMessage({type: "START_GAME"});
        return true;
    }

    clearTimeouts() {
        // TODO: As timeouts are added, remove them here.
        
    }

    //Terminate the thread after the room is done
    destroy(){
        this.worker.terminate();
    }
}