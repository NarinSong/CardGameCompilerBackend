// This file is where the "Room" object will be stored.
// There will be many of these, and each one will have a dedicated worker thread
// Each room can hold one game

import Game from "./Game/Game";

export default class Room {
    game: Game | null;

    constructor() {
        this.game = null;
    }

    // TODO: initialize game etc.
}