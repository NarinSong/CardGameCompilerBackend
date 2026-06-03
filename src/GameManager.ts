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
import PickupGame from './SampleGames/JsonReader.js';
import { ClientID, GameID, LobbyID, RoomID } from './schemas/types.js';

export default class GameManager {
    // No constructor, since everything here is static. There is only one.

    static lobbies: Record<LobbyID,Lobby> = {};
    static clients: Record<ClientID,Client> = {};
    static rooms: Record<RoomID,Room> = {};
    static availableGames: Record<GameID, GameDefinition> = {0: PickupGame};
    static roomName: number = 1;


    static createClient() {
        const client = new Client();

        GameManager.clients[client.identifier] = client;

        return client;
    }

    static clientFromId(clientId: ClientID) {
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

    static lobbyFromCode(code: LobbyID) {
        const lobby = GameManager.lobbies[code];
        if (!lobby) return null;
        return lobby;
    }

    static deleteLobby(code: LobbyID) {
        const lobby = GameManager.lobbyFromCode(code);
        if (!lobby) return null;
        
        // TODO kick all players from lobby and let them know

        delete GameManager.lobbies[code];
    }

    static registerRoom(room: Room) {
        GameManager.rooms[room.name] = room;
        return room;
    }

    static getRoomFromId(roomId: RoomID) {
        const room = GameManager.rooms[roomId];
        if (!room) return null;
        return room;
    }

    static removeClient(clientId: ClientID) {
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

    static leaveGame(clientId: ClientID) {
        const client = GameManager.clientFromId(clientId);
        if (!client || !client.roomId) return false;

        const room = GameManager.getRoomFromId(client.roomId);
        if (room) GameManager.closeRoom(room);

        return true;
    }

    static closeRoom(room: Room) {
        const clients = room.clients;
        for (const idx in clients) {
            const clientId = +idx;
            const client = GameManager.clientFromId(clientId);
            if (!client) continue;

            sendGameEnded(clientId);
        }

        room.clients = {};
        room.clearTimeouts();

        delete GameManager.rooms[room.name];
    }

    static registerGameDefinition(game: GameDefinition, id: GameID) {
        GameManager.availableGames[id] = game;
    }

    static async getAvailableGameNames() {
        // Potential: caching
        const list = await Database.getGamesList();
        return list?.concat({name: 'Pickup', id: 0});
    }

    static async getGameDefinition(id: GameID): Promise<GameDefinition | null> {
        if (GameManager.availableGames[id]) return GameManager.availableGames[id];
        
        return await buildGameFromDatabase(id);
    }

    static getRegisteredGameDefinition(id: GameID) {
        return GameManager.availableGames[id] ?? null;
    }

    static get nextRoom(): RoomID {
        return `Room ${GameManager.roomName++}`;
    }

    static get uniqueLobbyJoinCode(): LobbyID {
        let code = Lobby.createRandomJoinCode();
        while (GameManager.lobbies[code]) code = Lobby.createRandomJoinCode(); // ensure code is unique
        return code;
    }
}