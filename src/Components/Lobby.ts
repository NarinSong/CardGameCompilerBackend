// Lobby holds players who aren't yet in a game, but might be soon

import Client from "../Client/Client";

export default class Lobby {
    #host: string;
    #players: Client[];
    #game: string | null;
    #maxPlayers: number = 32;

    constructor(host: Client) {
        if (!host.isAuthenticated || !host.username) throw new Error("Unauthenticated host created lobby");

        this.#host = host.username;
        this.#players = [host];
        this.#game = null;
    }
}