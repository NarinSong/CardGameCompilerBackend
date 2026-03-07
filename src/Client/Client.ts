// The Client is one distinct actual connection
// The Client vs Player distinction is important
//      A "Player" is in a Game
//      A Client may have an associated player (or not)
//      A Player may be a robot / AI and have no associated client
// Clients have a method of sending information to the user (sockets for prototype, whatever Unity uses for that)

import Game from "../Game/Game";
import Player from "../Game/Player";
import GameDefinition from "../Rules/GameDefinition";
import ClientView from "./ClientView";
import { buildGameFromJSON } from "./GameBuilder";

export default class Client {
    identifier: string;
    connection: any;

    constructor(id: string, connection: any)  {
        this.identifier = id;
        this.connection = connection; // For prototype, this will be a Socket. For Unity, we will find out when we get there :)
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

    // TODO: I expect a reference to "Player" or at least "PlayerID" will be stored in the client class eventually
    updateGamestate(game: Game, player: Player) {
        // Prototype client
        this.connection.emit('gamestate', ClientView.fromGamestate(game, player));
        
    }
}