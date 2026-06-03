// Lobby holds players and child rooms

import Client from "../Client/Client.js";
import GameManager from "../GameManager.js";
import { sendLobbyClosed, sendLobbyStatus } from "../index.js";
import Room from "./Room.js";
import GameDefinition from "../Rules/GameDefinition.js";
import { ClientID, GameID, LobbyID, RoomID } from "../schemas/types.js";

const A = "A".charCodeAt(0);

export class LobbyView {
    readonly host: {
        username: string;
        displayName: string;
    };
    readonly players: {
        username: string;
        displayName: string;
        color: string;
    }[];
    readonly code: string;
    readonly game: string;
    readonly gameDescription: string;

    constructor(lobby: Lobby) {
        this.host = {
            username: lobby.hostName,
            displayName: lobby.hostDisplayName
        };
        this.players = lobby.playerDetails;
        this.code = lobby.joinCode;
        this.game = lobby.gameName; // defaults to "No Game Selected"
        this.gameDescription = 'Game description';
    }
}

export default class Lobby {
    #host: ClientID;
    #hostName: string;
    #players: ClientID[];
    #game: GameID | null;
    #maxPlayers: number = 32;
    #joinCode: string;
    #rooms: RoomID[];

    constructor(host: Client, joinCode: LobbyID) {
        if (!host.isAuthenticated || !host.username) throw new Error("Unauthenticated host created lobby");

        host.inLobby = true;
        host.lobby = joinCode;

        this.#host = host.identifier;
        this.#hostName = host.username;
        this.#players = [host.identifier];
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

            sendLobbyStatus(client, view);
        }
    }

    joinGame(client: Client) {
        if (this.#players.length >= this.#maxPlayers) return false;

        this.#players.push(client.identifier);

        client.inLobby = true;
        client.lobby = this.#joinCode;

        this.update();

        return true;
    }

    selectGame(gameId: GameID) {
        this.#game = gameId;
        this.update();
    }

    startGame() {
        if (!this.#game) return false;
        const gameDefinition = GameManager.getRegisteredGameDefinition(this.#game);
        if (!gameDefinition) return false;

        const numMinPlayers = gameDefinition.gameMeta.minPlayers;
        const numAvailablePlayers = this.numAvailablePlayers;
        if (numAvailablePlayers < numMinPlayers) return false; // TODO: robots :)

        const game = gameDefinition.createGame();
        const room = new Room(game, GameManager.nextRoom, this.#joinCode);
        GameManager.registerRoom(room);
        
        const numMaxPlayers = gameDefinition.gameMeta.maxPlayers;
        for (let i=0; i<numMaxPlayers; i++) {
            const client = this.firstAvailablePlayer;
            if (!client) continue;

            const success = room.handleJoinRoom(client); // marks the client as "inGame" so shouldn't be listed as "available"
            if (!success)
                this.removeFromLobbyById(client);
        }

        room.startGame();

        this.#rooms.push(room.name);

        this.update();
    }

    isHost(clientId: ClientID) {
        return this.#host == clientId;
    }

    // NEEDS TESTING
    assignNewHost() {
        const hostId = this.#players[0];
        if (this.#players.length == 0 || !hostId) {
            GameManager.deleteLobby(this.#joinCode);
            return;
        }

        const host = GameManager.clientFromId(hostId);
        if (!host || !host.username)  {
            GameManager.deleteLobby(this.#joinCode);
            return;
        }

        this.#host = hostId;
        this.#hostName = host.username;
        this.update();
    }

    checkForHost() {
        for (let i in this.#players) {
            if (this.#players[i] && this.isHost(this.#players[i]))
                return true;
        }

        return false;
    }

    removeFromLobbyById(clientId: number) {
        for (let p in this.#players) {
            const currentId = this.#players[p];
            if (!currentId) continue;
            if (currentId == clientId) {
                const client = GameManager.clientFromId(currentId);
                if (!client) continue;

                client.inLobby = false;
                client.lobby = undefined;
                this.#players.splice(+p, 1);

                if (this.isHost(currentId))
                    this.assignNewHost();

                sendLobbyClosed(client.identifier);
            }
        }

        if (this.#players.length == 0) {
            GameManager.deleteLobby(this.#joinCode);
            return;
        }

        // Double-check the host status
        if (!this.checkForHost())
            this.assignNewHost();

        
        this.update();
    }

    // NEEDS TESTING
    removeFromLobby(username: string) {
        for (let p in this.#players) {
            const clientId = this.#players[p];
            if (!clientId) continue;
            const client = GameManager.clientFromId(clientId);
            if (!client) continue;

            if (client.username == username) {
                this.removeFromLobbyById(clientId);
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

    static createRandomJoinCode(): LobbyID {
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

    get host() {
        return this.#host;
    }

    get hostName() {
        return this.#hostName;
    }

    get hostDisplayName() {
        for (let i in this.#players) {
            if (this.#players[i] == this.#host) {
                const host = GameManager.clientFromId(this.#host);
                return host && host.displayName ? host.displayName : this.#hostName;
            }
        }
        return this.#hostName; // default to the host's username
    }

    get playerDetails() {
        const list = [];
        for (let p in this.#players) {
            const clientId = this.#players[p];
            if (!clientId) continue;
            const client = GameManager.clientFromId(clientId);
            if (!client || !client.username || !client.displayName) continue;

            list.push({
                username: client.username,
                displayName: client.displayName,
                color: client.color
            });
        }
        return list;
    }

    get gameName() {
        if (!this.#game) return 'No Game Selected';
        const game = GameManager.getRegisteredGameDefinition(this.#game);

        return game ? game.gameMeta.name : 'No Game Selected';
    }

    get numAvailablePlayers() {
        let a = 0;
        for (let p in this.#players) {
            const clientId = this.#players[p];
            if (!clientId) continue;
            const client = GameManager.clientFromId(clientId);
            if (!client || client.inGame) continue;

            a++;
        }
        return a;
    }

    get firstAvailablePlayer() {
        for (let p in this.#players) {
            const clientId = this.#players[p];
            if (!clientId) continue;
            const client = GameManager.clientFromId(clientId);
            if (!client || client.inGame) continue;

            return clientId;
        }
        return null;
    }
}