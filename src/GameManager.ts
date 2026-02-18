// This is where global variables will go
// The room list, client list, etc. will be in here
// This is so that the distinct parts of the server can all grab information that is important to them
import { Socket } from 'socket.io';
import Client from './Client'
import Room from './Room';
import Pickup from './SampleGames/Pickup';
import War from './SampleGames/War';

export default class GameManager {
    // No constructor, since everything here is static. There is only one.

    static clients: Record<string,Client> = {};
    static rooms: Record<string,Room> = {};
    static roomName: number = 1;

    static createPrototypeClient(socket: Socket) {
        const client = new Client(socket.id, socket);
        
        GameManager.clients[socket.id] = client;

        return client;
    }

    // TODO: assign a worker thread to the room
    static createPrototypeRoom(client: Client) {
        const name = GameManager.nextRoom;

        const room = new Room(War.createGame(), client, name);

        GameManager.rooms[name] = room;

        return room;
    }

    static removePrototypeClient(socketId: string, roomName?: string) {
        delete GameManager.clients[socketId];
        
        if (roomName)
            delete GameManager.rooms[roomName];
    }

    static get nextRoom() {
        return `Room ${GameManager.roomName++}`;
    }
}