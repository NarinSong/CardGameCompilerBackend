// This is where global variables will go
// The room list, client list, etc. will be in here
// This is so that the distinct parts of the server can all grab information that is important to them
import Client from './Client/Client.js'
import { buildGameFromDatabase } from './Client/GameBuilder.js';
import Database from './Components/Database.js';
import Room from './Components/Room.js';
import GameDefinition from './Rules/GameDefinition.js';
import PickupGame from './SampleGames/JsonReader.js';

export default class GameManager {
    // No constructor, since everything here is static. There is only one.

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

    // TODO: assign a worker thread to the room
    static createRoom(gameId: number, clientId: number) {
        const game = this.availableGames[gameId];
        const client = GameManager.clientFromId(clientId);

        // TODO: Build game definition from database if not in "availableGames"
        if (!game || !client) return null; 

        const name = GameManager.nextRoom;

        const room = new Room(game.createGame(), clientId, name);
        client.room = room;

        room.emitGameState();

        GameManager.rooms[name] = room;

        return room;
    }

    static removeClient(clientId: number) {
        const client = GameManager.clientFromId(clientId);
        if (!client) return; // Already taken care of

        const room = client.room;
        if (room) delete GameManager.rooms[room.name];

        delete GameManager.clients[clientId];
    }

    static registerGameDefinition(game: GameDefinition, id: number) {
        GameManager.availableGames[id] = game;
    }

    static async getAvailableGameNames() {
        // Potential: caching
        return await Database.getGamesList();
    }

    static async getGameDefinition(id: number): Promise<GameDefinition | null> {
        if (GameManager.availableGames[id]) return GameManager.availableGames[id];
        
        return await buildGameFromDatabase(id);
    }

    static get nextRoom() {
        return `Room ${GameManager.roomName++}`;
    }
}