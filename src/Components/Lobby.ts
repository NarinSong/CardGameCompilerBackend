// Lobby holds players and child rooms

import Client from "../Client/Client.js";
import GameManager from "../GameManager.js";
import { sendLobbyClosed, sendLobbyStatus } from "../index.js";
import Room from "./Room.js";
import GameDefinition from "../Rules/GameDefinition.js";

const A = "A".charCodeAt(0);

export class LobbyView {
    readonly host: {
        username: string;
        displayName: string;
    };
    readonly players: {
        username: string;
        displayName: string;
    }[];
    readonly code: string;
    readonly game: string;

    constructor(lobby: Lobby) {
        this.host = {
            username: lobby.host,
            displayName: lobby.hostDisplayName
        };
        this.players = lobby.playerNames;
        this.code = lobby.joinCode;
        this.game = lobby.gameName; // defaults to "No Game Selected"
    }
}

export default class Lobby {
    #host: string;
    #players: Client[];
    #game: GameDefinition | null;
    #maxPlayers: number = 32;
    #joinCode: string;
    #rooms: Room[];

    constructor(host: Client, joinCode: string) {
        if (!host.isAuthenticated || !host.username) throw new Error("Unauthenticated host created lobby");

        host.inLobby = true;
        host.lobby = joinCode;

        this.#host = host.username;
        this.#players = [host];
        this.#game = null;
        this.#joinCode = joinCode;
        this.#rooms = [];

        this.update();
    }

    update() {
        const view = new LobbyView(this);

        for (let p in this.#players) {
            const client = this.#players[p];
            if (!client) continue;

            sendLobbyStatus(client.identifier, view);
        }
    }

    joinGame(client: Client) {
        if (this.#players.length >= this.#maxPlayers) return false;

        this.#players.push(client);

        client.inLobby = true;
        client.lobby = this.#joinCode;

        this.update();

        return true;
    }

    selectGame(gameDefinition: GameDefinition) {
        this.#game = gameDefinition;
        this.update();
    }

    startGame() {
        if (!this.#game) return false;
        const numMinPlayers = this.#game.gameMeta.minPlayers;
        const numAvailablePlayers = this.numAvailablePlayers;
        if (numAvailablePlayers < numMinPlayers) return false; // TODO: robots :)

        const game = this.#game.createGame();
        const room = new Room(game, GameManager.nextRoom, this.#joinCode);
        GameManager.registerRoom(room);
        
        const numMaxPlayers = this.#game.gameMeta.maxPlayers;
        for (let i=0; i<numMaxPlayers; i++) {
            const client = this.firstAvailablePlayer;
            if (!client) continue;

            const success = room.handleJoinRoom(client); // marks the client as "inGame" so shouldn't be listed as "available"
            if (!success)
                this.removeFromLobbyById(client.identifier);
        }

        room.startGame();

        this.#rooms.push(room); //should we use the id? Mayhaps

        this.update();
    }

    isHost(username: string) {
        return this.#host == username;
    }

    // NEEDS TESTING
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
        this.update();
    }

    removeFromLobbyById(clientId: number) {
        for (let p in this.#players) {
            const client = this.#players[p];
            if (!client) continue;
            if (client.identifier == clientId) {
                client.inLobby = false;
                client.lobby = undefined;
                if (client.username && this.isHost(client.username))
                    this.assignNewHost();
                sendLobbyClosed(client.identifier);
                delete this.#players[p];
            }
        }

        if (this.#players.length == 0) {
            GameManager.deleteLobby(this.#joinCode);
            return;
        }

        
        this.update();
    }

    // NEEDS TESTING
    removeFromLobby(username: string) {
        for (let p in this.#players) {
            const client = this.#players[p];
            if (!client) continue;
            if (client.username == username) {
                this.removeFromLobbyById(client.identifier);
                return true;
            }
        }
        return false;
    }

    static randomAlphaNumeric() {
        const number = Math.floor(Math.random() * 36);
        
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

    get host() {
        return this.#host;
    }

    get hostDisplayName() {
        for (let i in this.#players) {
            if (this.#players[i] && this.#players[i].username == this.#host)
                return this.#players[i]?.displayName ?? this.#host;
        }
        return this.#host; // default to the host's username
    }

    get playerNames() {
        const list = [];
        for (let p in this.#players) {
            const client = this.#players[p];
            if (!client || !client.username || !client.displayName) continue;

            list.push({
                username: client.username,
                displayName: client.displayName
            });
        }
        return list;
    }

    get gameName() {
        return this.#game ? this.#game.gameMeta.name : 'No Game Selected';
    }

    get numAvailablePlayers() {
        let a = 0;
        for (let p in this.#players) {
            const client = this.#players[p];
            if (!client || client.inGame) continue;

            a++;
        }
        return a;
    }

    get firstAvailablePlayer() {
        for (let p in this.#players) {
            const client = this.#players[p];
            if (!client || client.inGame) continue;

            return client;
        }
        return null;
    }
}