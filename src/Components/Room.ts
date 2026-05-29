// This file is where the "Room" object will be stored.
// There will be many of these, and each one will have a dedicated worker thread
// Each room can hold one game

import Client from "../Client/Client.js";
import Game from "../Game/Game.js";
import Player from "../Game/Player.js";
import GameManager from "../GameManager.js";
import { PlayerType } from "../schemas/types.js";

/**
 * Defines the properties for a room.
 * 
 * A Room consists of the running game instance, the list of clients, and the name of the room.
 */
export default class Room {
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
    }

    /**
     *  
     * Send the updated game state to all clients.
     * 
     */
    emitGameState() {
        for (let c in this.clients) {
            if (!this.game.players[0]) continue;
            
            const client = GameManager.clientFromId(+c);
            if (!client) continue;

            client.updateGamestate(this.game);
        }
    }

    /**
     * Handles the action whenever a player clicks an object (Pile, Card, etc.).
     * @param label - The object that the user clicked.
     * @todo use cardId and player number to build action context
     */
    handlePlayerClick(label: string, cardId: number) {
        if (!this.started) return;
        
        let actionTaken = this.game.clickAction(label); // TODO: player number?

        if (actionTaken) {
            // Update clients with new gamestate
            this.emitGameState();
        }
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

        this.game.startGame();
        this.started = true;

        this.emitGameState();

        return true;
    }
}