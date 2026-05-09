// Lobby holds players who aren't yet in a game, but might be soon

import Client from "../Client/Client";
import GameManager from "../GameManager";

const A = "A".charCodeAt(0);

export default class Lobby {
    #host: string;
    #players: Client[];
    #game: string | null;
    #maxPlayers: number = 32;
    #joinCode: string;

    constructor(host: Client, joinCode: string) {
        if (!host.isAuthenticated || !host.username) throw new Error("Unauthenticated host created lobby");

        host.inLobby = true;
        host.lobby = joinCode;

        this.#host = host.username;
        this.#players = [host];
        this.#game = null;
        this.#joinCode = joinCode;
    }

    joinGame(client: Client) {
        if (this.#players.length >= this.#maxPlayers) return false;

        this.#players.push(client);

        client.inLobby = true;
        client.lobby = this.#joinCode;

        return true;
    }

    startGame() {
        if (!this.#game) return false;
        // Create the room if at least minPlayers (available, e.g. not in game) are in the lobby
        // Add available players until maxPlayers is reached
        // Mark those players as "in game"
        // Send "game started" signals to those players
    }

    isHost(username: string) {
        return this.#host == username;
    }

    assignNewHost() {
        if (this.#players.length == 0) {
            GameManager.deleteLobby(this.#joinCode);
            return;
        }

        const host = this.#players[0];
        if (!host || !host.username)  {
            GameManager.deleteLobby(this.#joinCode);
            return;
        }

        this.#host = host.username;
        //TODO let new host know
    }

    removeFromLobby(username: string) {
        for (let p in this.#players) {
            const client = this.#players[p];
            if (!client) continue;
            if (client.username == username) {
                client.inLobby = false;
                client.lobby = undefined;
                delete this.#players[p];
            }
        }

        if (this.#players.length == 0) {
            GameManager.deleteLobby(this.#joinCode);
            return;
        }

        if (this.isHost(username))
            this.assignNewHost();
    }

    static randomAlphaNumeric() {
        const number = Math.random() * 36;
        
        if (number < 10) return ''+number; //0-9

        return String.fromCharCode( number - 10 + A ); //A-Z
    }

    static createRandomJoinCode() {
        const LENGTH = 6;
        let code = '';
        for (let i=0; i<LENGTH; i++) {
            code += Lobby.randomAlphaNumeric();
        }
        return code;
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