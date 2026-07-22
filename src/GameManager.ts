// This is where global variables will go
// The room list, client list, etc. will be in here
// This is so that the distinct parts of the server can all grab information that is important to them
import Client from './Client/Client.js'
import { buildGameFromDatabase } from './Client/GameBuilder.js';
import Database from './Components/Database.js';
import Lobby from './Components/Lobby.js';
import Room from './Components/Room.js';
import { sendGameEnded } from './index.js';
import GameDefinition from './Rules/GameDefinition.js';
import { ClientID, GameID, LobbyID, RoomID } from './schemas/types.js';
import { SelectAllGameSaves } from './schemas/DatabaseSchemas.js';

/**
 * Manages all global server state including clients, lobbies, rooms, and available games.
 * 
 * GameManager is a static-only class — there is only one instance of this state on the server.
 */
export default class GameManager {
    // No constructor, since everything here is static. There is only one.

    static lobbies: Record<LobbyID,Lobby> = {};
    static clients: Record<ClientID,Client> = {};
    static rooms: Record<RoomID,Room> = {};
    static availableGames: Record<GameID, GameDefinition> = {};
    static availableGamesJson: Record<GameID, string> = {};
    static roomName: number = 1;


    /**
     * Creates a new client and registers it.
     * @returns The newly created client.
     */
    static createClient(): Client {
        const client = new Client();

        GameManager.clients[client.identifier] = client;

        return client;
    }

    /**
     * Returns the client associated with a given id.
     * @param clientId - The id of the client to retrieve.
     * @returns The client, or null if not found.
     */
    static clientFromId(clientId: ClientID): Client | null {
        const client = GameManager.clients[clientId];
        if (!client) return null;
        return client;
    }

    /**
     * Creates a new lobby hosted by the given client.
     * @param client - The client hosting the lobby.
     * @returns The unique join code for the new lobby.
     */
    static hostLobby(client: Client): LobbyID {
        const code = GameManager.uniqueLobbyJoinCode;
        const lobby = new Lobby(client, code);
        GameManager.lobbies[code] = lobby;
        return code;
    }

    /**
     * Returns the lobby associated with a given join code.
     * @param code - The join code of the lobby.
     * @returns The lobby, or null if not found.
     */
    static lobbyFromCode(code: LobbyID): Lobby | null {
        const lobby = GameManager.lobbies[code];
        if (!lobby) return null;
        return lobby;
    }

    /**
     * Deletes a lobby by its join code.
     * @param code - The join code of the lobby to delete.
     * @returns null if the lobby does not exist.
     * @todo kick all players from lobby and notify them.
     */
    static deleteLobby(code: LobbyID): void {
        const lobby = GameManager.lobbyFromCode(code);
        if (!lobby) return;
        

        delete GameManager.lobbies[code];
    }

    /**
     * Registers a room in the global room list.
     * @param room - The room to register.
     * @returns The registered room.
     */
    static registerRoom(room: Room): Room {
        GameManager.rooms[room.name] = room;
        return room;
    }

    /**
     * Returns the room associated with a given room id.
     * @param roomId - The id of the room to retrieve.
     * @returns The room, or null if not found.
     */
    static getRoomFromId(roomId: RoomID): Room | null {
        const room = GameManager.rooms[roomId];
        if (!room) return null;
        return room;
    }

    /**
     * Removes a client from the server, cleaning up their room and lobby if applicable.
     * @param clientId - The id of the client to remove.
     */
    static removeClient(clientId: ClientID): void {
        const client = GameManager.clientFromId(clientId);
        if (!client || !client.roomId) return; // Already taken care of

        const room = GameManager.getRoomFromId(client.roomId);
        if (room) GameManager.closeRoom(room);

        const lobbyId = client.lobby;
        if (lobbyId) {
            const lobby = GameManager.lobbyFromCode(lobbyId);
            if (lobby) lobby.removeFromLobbyById(client.identifier); // potentially deletes the lobby too, if empty
        }

        delete GameManager.clients[clientId];
    }

    /**
     * Removes a client from their current game room.
     * @param clientId - The id of the client leaving the game.
     * @returns True if the client was successfully removed, false if the client was not in a game.
     */
    static leaveGame(clientId: ClientID): boolean {
        const client = GameManager.clientFromId(clientId);
        if (!client || !client.roomId) return false;

        const room = GameManager.getRoomFromId(client.roomId);
        if (room) GameManager.closeRoom(room);

        return true;
    }

    /**
     * Closes a room, notifies all clients that the game has ended, and cleans up room state.
     * @param room - The room to close.
     */
    static closeRoom(room: Room): void {
        const clients = room.clients;
        for (const idx in clients) {
            const clientId = +idx;
            const client = GameManager.clientFromId(clientId);
            if (!client) continue;

            sendGameEnded(clientId);
            client.inGame = false;
            client.roomId = null;
        }

        room.clients = {};
        room.clearTimeouts();

        delete GameManager.rooms[room.name];
    }

    /**
     * Registers a game definition and its JSON representation by id.
     * @param game - The game definition to register.
     * @param id - The id to register the game under.
     * @param json - The JSON string representation of the game definition.
     */
    static registerGameDefinition(game: GameDefinition, id: GameID , json: string): void {
        GameManager.availableGames[id] = game;
        GameManager.availableGamesJson[id] = json;
    }

    /**
     * Returns all block editor saves visible to a given client.
     * Includes public games and games created by the client.
     * @param databaseId - The database id of the requesting client.
     * @returns A list of visible game saves.
     */
    static async getEditorBlockSavesList(databaseId: number): Promise<SelectAllGameSaves[]> {
        const list = await Database.getAllGameEditorBlocks();
        if (!list) return [];

        return list.filter((value) => {
            return value.privateGame || value.creator === databaseId;
        })
    }

    /**
     * Returns the list of all available game names and ids, including built-in games.
     * @returns A list of game names and ids, or undefined on database failure.
     */
    static async getAvailableGameNames(): Promise<{name: string, id: number}[]> {
        // Potential: caching
        const list = await Database.getGamesList();
        return [{name: 'Pickup', id: 1000}, {name:'Button Counter', id: 999}, {name:'Crazy Eights', id: 998}].concat(list ?? []);
    }

    /**
     * Returns a game definition by id, loading from the database if not already registered.
     * @param id - The id of the game to retrieve.
     * @returns The game definition, or null if not found.
     */
    static async getGameDefinition(id: GameID): Promise<GameDefinition | null> {
        if (GameManager.availableGames[id]) return GameManager.availableGames[id];
        
        return await buildGameFromDatabase(id);
    }

    /**
     * Returns a registered game definition by id without hitting the database.
     * @param id - The id of the game to retrieve.
     * @returns The game definition, or null if not registered.
     */
    static getRegisteredGameDefinition(id: GameID): GameDefinition | null {
        return GameManager.availableGames[id] ?? null;
    }
    
    /**
     * Returns the JSON string of a registered game definition by id.
     * @param id - The id of the game to retrieve.
     * @returns The JSON string, or null if not registered.
     */
    static getRegisteredGameDefinitionJson(id: GameID): string | null {
        return GameManager.availableGamesJson[id] ?? null;
    }

    /**
     * Generates the next unique room id.
     */
    static get nextRoom(): RoomID {
        return `Room ${GameManager.roomName++}`;
    }

    /**
     * Generates a unique lobby join code that is not currently in use.
     */
    static get uniqueLobbyJoinCode(): LobbyID {
        let code = Lobby.createRandomJoinCode();
        while (GameManager.lobbies[code]) code = Lobby.createRandomJoinCode(); // ensure code is unique
        return code;
    }
}