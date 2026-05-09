// Lobby holds players who aren't yet in a game, but might be soon

import Client from "../Client/Client";

export default class Lobby {
    #host: string;
    #players: Client[];
    #game: string | null;
    #maxPlayers: number = 32;
    #joinCode: string;
    #id: number;

    constructor(host: Client, joinCode: string, id: number) {
        if (!host.isAuthenticated || !host.username) throw new Error("Unauthenticated host created lobby");

        this.#host = host.username;
        this.#players = [host];
        this.#game = null;
        this.#joinCode = joinCode;
        this.#id = id;
    }

    joinGame(client: Client) {
        if (this.#players.length >= this.#maxPlayers) return false;

        this.#players.push(client);

        // todo: set client.lobby to this lobby's id
        return true;
    }

    startGame() {
        if (!this.#game) return false;
        // Create the room if at least minPlayers (available, e.g. not in game) are in the lobby
        // Add available players until maxPlayers is reached
        // Mark those players as "in game"
        // Send "game started" signals to those players
    }

    get joinCode() {
        return this.#joinCode;
    }

    get availablePlayers() {
        let s=0;
        for (let p in this.#players) {
            //if (!this.#players[p].inGame) s++; // todo add "inGame" flag
        }
        return s;
    }
}