// This file is where the "Room" object will be stored.
// There will be many of these, and each one will have a dedicated worker thread
// Each room can hold one game

import Client from "./Client/Client";
import Game from "./Game/Game";
import { PlayerType } from "./types";

export default class Room {
    game: Game;
    clients: Client[];
    name: string;

    constructor(game: Game, client: Client, name: string) {
        this.game = game;
        this.clients = [client];
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
                c.updateGamestate(this.game, this.game.players[0]); // TODO: switch to player number instead of always 0
            }
        }
    }
}