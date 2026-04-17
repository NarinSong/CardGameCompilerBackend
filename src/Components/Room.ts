// This file is where the "Room" object will be stored.
// There will be many of these, and each one will have a dedicated worker thread
// Each room can hold one game

import Game from "../Game/Game.js";
import GameManager from "../GameManager.js";
import { PlayerType } from "../schemas/types.js";

/**
 * Defines the properties for a room.
 * 
 * A Room consists of the running game instance, the list of clients, and the name of the room.
 */
export default class Room {
    game: Game;
    clients: number[];
    name: string;   

    /**
     * Creates a room.
     * @param game - The running game instance.
     * @param clientId - id of the first client joining the room.
     * @param name - Name of the room.
     */
    constructor(game: Game, clientId: number, name: string) {
        this.game = game;
        this.clients = [clientId];
        this.name = name;

        this.game.handlePlayerJoin(PlayerType.HUMAN);
        this.game.startGame();
    }

    /**
     *  
     * Send the updated game state to all clients.
     * 
     * @todo switch to player number instead of always 0
     */
    emitGameState() {
        for (let c of this.clients) {
            if (!this.game.players[0]) continue;
            
            const client = GameManager.clientFromId(c);
            if (!client) continue;

            client.updateGamestate(this.game, this.game.players[0]); // TODO: switch to player number instead of always 0
        }
    }

    /**
     * Handles the action whenever a player clicks an object (Pile, Card, etc.).
     * @param label - The object that the user clicked.
     */
    handlePlayerClick(label: string) {
        let actionTaken = this.game.clickAction(label); // TODO: player number?

        if (actionTaken) {
            // Update clients with new gamestate
            this.emitGameState();
        }
    }
}