// This file is where the "Room" object will be stored.
// There will be many of these, and each one will have a dedicated worker thread
// Each room can hold one game

import { Worker } from "node:worker_threads";

import Client from "../Client/Client.js";
import Game from "../Game/Game.js";
import Player from "../Game/Player.js";
import GameManager from "../GameManager.js";
import { PlayerType } from "../schemas/types.js";
import GameDefinition from "../Rules/GameDefinition.js";

/**
 * Defines the properties for a room.
 * 
 * A Room consists of the running game instance, the list of clients, and the name of the room.
 */
export default class Room {
    worker: Worker;
    game: Game;
    clients: Record<number, number>; // ClientId: playerId
    name: string;
    lobby: string;
    started: boolean;

    /**
     * Creates a room.
     * @param game - The running game instance.
     * @param name - Name of the room.
     * @param lobby - join code of the lobby.
     */
    constructor(game: Game, name: string, lobby: string) {
        this.game = game;
        this.clients = {};
        this.name = name;
        this.lobby = lobby;
        this.started = false;


        this.worker = new Worker(new URL("./RoomWorker.js", import.meta.url), {
            workerData: {gameDefinition: game.definition}
        });

        this.worker.on("message", (msg) => {
            switch (msg.type){
                case "GAME_STATE":
                    this.emitGameState(msg.state);
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
    emitGameState(state: unknown) {
        for (let c in this.clients) {
            if (!this.game.players[0]) continue;
            
            const client = GameManager.clientFromId(+c);
            if (!client) continue;

            client.updateGamestate(state);
        }
    }

    /**
     * Handles the action whenever a player clicks an object (Pile, Card, etc.).
     * @param label - The object that the user clicked.
     */
    handlePlayerClick(label: string) {
        if (!this.started) return;
        this.worker.postMessage({type: "PLAYER_CLICK", label})
        // let actionTaken = this.game.clickAction(label); // TODO: player number?

        // if (actionTaken) {
        //     // Update clients with new gamestate
        //     this.emitGameState();
        // }
    }

    // This function should *only* be called by the parent lobby, and *only* during room creation, before the game begins
    handleJoinRoom(client: Client) {
        if (this.started) return false;

        const player = this.game.handlePlayerJoin(PlayerType.HUMAN);
        if (!player) return false;

        const pn = player.id;
        this.clients[client.identifier] = pn;

        client.inGame = true;
        client.room = this;
        client.player = player;

        return true;
    }

    startGame() {
        if (this.started) return false;
        this.started = true;
        this.worker.postMessage({type: "START_GAME"});
        return true;
    }


    //Terminate the thread after the room is done
    destroy(){
        this.worker.terminate();
    }
}