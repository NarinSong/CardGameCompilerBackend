// This is where global variables will go
// The room list, client list, etc. will be in here
// This is so that the distinct parts of the server can all grab information that is important to them
import Client from './Client/Client.js'
import { buildGameFromDatabase } from './Client/GameBuilder.js';
import Database from './Components/Database.js';
import Lobby from './Components/Lobby.js';
import Room from './Components/Room.js';
import GameDefinition from './Rules/GameDefinition.js';
import PickupGame from './SampleGames/JsonReader.js';

export default class GameManager {
    // No constructor, since everything here is static. There is only one.

    static lobbies: Record<string,Lobby> = {};
    static clients: Record<number,Client> = {};
    static rooms: Record<string,Room> = {};
    static availableGames: Record<number, GameDefinition> = {0: PickupGame};
    static roomName: number = 1;


    static createClient() {
        const client = new Client();

        GameManager.clients[client.identifier] = client;

        return client;
    }

    static clientFromId(clientId: number) {
        const client = GameManager.clients[clientId];
        if (!client) return null;
        return client;
    }

    static hostLobby(client: Client) {
        const code = GameManager.uniqueLobbyJoinCode;
        const lobby = new Lobby(client, code);
        GameManager.lobbies[code] = lobby;
        return code;
    }

    static lobbyFromCode(code: string) {
        const lobby = GameManager.lobbies[code];
        if (!lobby) return null;
        return lobby;
    }

    static deleteLobby(code: string) {
        const lobby = GameManager.lobbyFromCode(code);
        if (!lobby) return null;
        
        // TODO kick all players from lobby and let them know

        delete GameManager.lobbies[code];
    }

    static registerRoom(room: Room) {
        GameManager.rooms[room.name] = room;
        return room;
    }

    static removeClient(clientId: number) {
        const client = GameManager.clientFromId(clientId);
        if (!client) return; // Already taken care of

        const room = client.room;
        if (room) delete GameManager.rooms[room.name];

        const lobbyId = client.lobby;
        if (lobbyId) {
            const lobby = GameManager.lobbyFromCode(lobbyId);
            if (lobby) lobby.removeFromLobbyById(client.identifier); // potentially deletes the lobby too, if empty
        }

        delete GameManager.clients[clientId];
    }

    static registerGameDefinition(game: GameDefinition, id: number) {
        GameManager.availableGames[id] = game;
    }

    static async getAvailableGameNames() {
        // Potential: caching
        const list = await Database.getGamesList();
        return list?.concat({name: 'Pickup', id: 0});
    }

    static async getGameDefinition(id: number): Promise<GameDefinition | null> {
        if (GameManager.availableGames[id]) return GameManager.availableGames[id];
        
        return await buildGameFromDatabase(id);
    }

    static get nextRoom() {
        return `Room ${GameManager.roomName++}`;
    }

    static get uniqueLobbyJoinCode() {
        let code = Lobby.createRandomJoinCode();
        while (GameManager.lobbies[code]) code = Lobby.createRandomJoinCode(); // ensure code is unique
        return code;
    }
}