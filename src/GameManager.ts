// This is where global variables will go
// The room list, client list, etc. will be in here
// This is so that the distinct parts of the server can all grab information that is important to them
import Client from './Client'
import Room from './Room';

export default class GameManager {
    // No constructor, since everything here is static. There is only one.

    static clients: Client[];
    static rooms: Room[];
}