// This is where global variables will go
// The room list, client list, etc. will be in here
// This is so that the distinct parts of the server can all grab information that is important to them
import Client from './Client/Client'
import Room from './Room';
import GameDefinition from './Rules/GameDefinition';

export default class GameManager {
    // No constructor, since everything here is static. There is only one.

    static clients: Record<number,Client> = {};
    static rooms: Record<string,Room> = {};
    static availableGames: Record<number, GameDefinition> = {};
    static roomName: number = 1;


    static createClient() {
        const client = new Client();

        GameManager.clients[client.identifier] = client;

        return client;
    }

    // TODO: assign a worker thread to the room
    static createRoom(gameId: number, clientId: number) {
        const game = this.availableGames[gameId];
        const client = Client.clientFromId(clientId);

        // TODO: Build game definition from database if not in "availableGames"
        if (!game || !client) return null; 

        const name = GameManager.nextRoom;

        const room = new Room(game.createGame(), clientId, name);
        client.room = room;

        GameManager.rooms[name] = room;

        return room;
    }

    static removeClient(clientId: number) {
        const client = Client.clientFromId(clientId);
        if (!client) return; // Already taken care of

        const room = client.room;
        if (room) delete GameManager.rooms[room.name];

        delete GameManager.clients[clientId];
    }

    static get nextRoom() {
        return `Room ${GameManager.roomName++}`;
    }
}