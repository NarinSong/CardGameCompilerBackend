// The Client is one distinct actual connection
// The Client vs Player distinction is important
//      A "Player" is in a Game
//      A Client may have an associated player (or not)
//      A Player may be a robot / AI and have no associated client
// Clients have a method of sending information to the user (sockets for prototype, whatever Unity uses for that)

import Game from "../Game/Game";
import Player from "../Game/Player";
import GameManager from "../GameManager";
import Room from "../Room";
import GameDefinition from "../Rules/GameDefinition";
import ClientView from "./ClientView";
import { buildGameFromJSON } from "./GameBuilder";
import { sendClientGamestate } from "..";

export default class Client {
    static #nextId : number = 1000;
    identifier: number;
    room: Room | null = null;

    constructor()  {
        this.identifier = Client.nextId;
    }

    submitRulesFromEditor(rules: unknown) {
        try {
            const game: GameDefinition | null = buildGameFromJSON(rules);
            if (game == null) return;

            // TODO: use the game definition somewhere
        } catch (error) {
            console.debug(error);
        }
    }

    static clientFromId(clientId: number) {
        const client = GameManager.clients[clientId];
        if (!client) return null;
        return client;
    }

    // TODO: I expect a reference to "Player" or at least "PlayerID" will be stored in the client class eventually
    updateGamestate(game: Game, player: Player) {
        sendClientGamestate(this.identifier, ClientView.fromGamestate(game, player));
    }

    static get nextId() {
        return Client.#nextId++;
    }
}