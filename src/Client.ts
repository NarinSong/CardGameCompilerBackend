// The Client is one distinct actual connection
// The Client vs Player distinction is important
//      A "Player" is in a Game
//      A Client may have an associated player (or not)
//      A Player may be a robot / AI and have no associated client
// Clients have a method of sending information to the user (sockets for prototype, whatever Unity uses for that)

import GameState from "./Game/GameState";

export default class Client {
    identifier: string;
    connection: any;

    constructor(id: string, connection: any)  {
        this.identifier = id;
        this.connection = connection; // For prototype, this will be a Socket. For Unity, we will find out when we get there :)
    }

    updateGamestate(gamestate: GameState) {
        // Prototype client
        this.connection.emit('gamestate', gamestate);
    }
}