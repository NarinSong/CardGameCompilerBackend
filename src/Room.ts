// This file is where the "Room" object will be stored.
// There will be many of these, and each one will have a dedicated worker thread
// Each room can hold one game

import Client from "./Client/Client";
import Game from "./Game/Game";
import { PlayerType } from "./schemas/types";

export default class Room {
    game: Game;
    clients: number[];
    name: string;

    constructor(game: Game, clientId: number, name: string) {
        this.game = game;
        this.clients = [clientId];
        this.name = name;

        this.game.handlePlayerJoin(PlayerType.HUMAN);
        this.game.startGame();
    }

    handlePlayerClick(label: string) {
        let actionTaken = this.game.clickAction(label); // TODO: player number?

        if (actionTaken) {
            // Update clients with new gamestate
            for (let c of this.clients) {
                if (!this.game.players[0]) continue;
                
                const client = Client.clientFromId(c);
                if (!client) continue;

                client.updateGamestate(this.game, this.game.players[0]); // TODO: switch to player number instead of always 0
            }
        }
    }
}