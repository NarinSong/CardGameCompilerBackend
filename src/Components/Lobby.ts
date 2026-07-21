// Lobby holds players and child rooms

import Client from "../Client/Client.js";
import GameManager from "../GameManager.js";
import { sendLobbyClosed, sendLobbyStatus } from "../index.js";
import Room from "./Room.js";
import { ClientID, GameID, LobbyID, RoomID } from "../schemas/types.js";

const A = "A".charCodeAt(0);

/**
 * A snapshot of the lobby state sent to clients.
 * 
 * Contains the host info, player list, join code, and selected game details.
 */
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

    /**
     * Creates a LobbyView from a Lobby instance.
     * @param lobby - The lobby to generate a view from.
     */
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

/**
 * Represents a lobby that holds players before and during a game.
 * 
 * A Lobby manages the host, player list, join code, selected game, and associated rooms.
 */
export default class Lobby {
    #host: ClientID;
    #hostName: string;
    #players: ClientID[];
    #game: GameID | null;
    #maxPlayers: number = 32;
    #joinCode: string;
    #rooms: RoomID[];

    /**
     * Creates a new lobby.
     * @param host - The client hosting the lobby.
     * @param joinCode - The unique join code for the lobby.
     * @throws Error if the host is not authenticated.
     */
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

    /**
     * Sends the current lobby state to all players in the lobby.
     */
    update(): void {
        const view = new LobbyView(this);

        for (let p in this.#players) {
            const client = this.#players[p];
            if (!client) continue;

            sendLobbyStatus(client, view);
        }
    }

    /**
     * Adds a client to the lobby.
     * @param client - The client joining the lobby.
     * @returns True if the client successfully joined, false if the lobby is full.
     */
    joinGame(client: Client): boolean {
        if (this.#players.length >= this.#maxPlayers) return false;

        this.#players.push(client.identifier);

        client.inLobby = true;
        client.lobby = this.#joinCode;

        this.update();

        return true;
    }

    /**
     * Sets the selected game for the lobby.
     * @param gameId - The id of the game to select.
     */
    selectGame(gameId: GameID): void {
        this.#game = gameId;
        this.update();
    }

    /**
     * Starts the game for all available players in the lobby.
     * Creates a room and assigns players to it.
     * @returns Promise resolving to true if the game started successfully, false otherwise.
     */
    async startGame(): Promise<boolean> {
        if (!this.#game) return false;
        const gameDefinition = GameManager.getRegisteredGameDefinition(this.#game);
        if (!gameDefinition) return false;

        const numMinPlayers = gameDefinition.gameMeta.minPlayers;
        const numAvailablePlayers = this.numAvailablePlayers;
        if (numAvailablePlayers < numMinPlayers) return false; // TODO: robots :)

        //GameDefinition now will be created in the worker thread for each room.
        // const game = gameDefinition.createGame();
        const room = new Room(this.#game, GameManager.nextRoom, this.#joinCode);
        GameManager.registerRoom(room);
        
        const numMaxPlayers = gameDefinition.gameMeta.maxPlayers;
        for (let i=0; i<numMaxPlayers; i++) {
            const client = this.firstAvailablePlayer;
            if (!client) continue;

            const success = await room.handleJoinRoom(client); // marks the client as "inGame" so shouldn't be listed as "available"
            if (!success)
                this.removeFromLobbyById(client);
        }

        room.startGame();

        this.#rooms.push(room.name);

        this.update();

        return true;
    }

    /**
     * Checks if a client is the host of the lobby.
     * @param clientId - The id of the client to check.
     * @returns True if the client is the host, else false.
     */
    isHost(clientId: ClientID): boolean {
        return this.#host == clientId;
    }

    // NEEDS TESTING
    /**
     * Assigns a new host from the remaining players.
     * If no players remain, the lobby is deleted.
     */
    assignNewHost(): void {
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

    /**
     * Checks if the current host is still in the lobby.
     * @returns True if the host is present, else false.
     */
    checkForHost(): boolean {
        for (let i in this.#players) {
            if (this.#players[i] && this.isHost(this.#players[i]))
                return true;
        }

        return false;
    }

    /**
     * Removes a player from the lobby by their client id.
     * Also removes them from any active room, reassigns the host if needed, and deletes the lobby if empty.
     * @param clientId - The id of the client to remove.
     */
    removeFromLobbyById(clientId: number): void {
        for (let p in this.#players) {
            const currentId = this.#players[p];
            if (!currentId) continue;
            if (currentId == clientId) {
                const client = GameManager.clientFromId(currentId);
                if (!client) continue;

                // Remove from room
                if (client.roomId) {
                    const room = GameManager.getRoomFromId(client.roomId);
                    if (room) delete room.clients[currentId];
                    client.inGame = false;
                    client.roomId = null;
                }

                // Remove from lobby
                client.inLobby = false;
                client.lobby = null;
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
    /**
     * Removes a player from the lobby by their username.
     * @param username - The username of the player to remove.
     * @returns True if the player was found and removed, else false.
     */
    removeFromLobby(username: string): boolean {
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

    /**
     * Returns a random alphanumeric character (0-9 or A-Z).
     * @returns A single character string.
     */
    static randomAlphaNumeric(): string {
        const number = Math.floor(Math.random() * 36);
        
        if (number < 10) return ''+number; //0-9

        return String.fromCharCode( number - 10 + A ); //A-Z
    }

    /**
     * Generates a random 6-character alphanumeric join code.
     * @returns A random lobby join code string.
     */
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