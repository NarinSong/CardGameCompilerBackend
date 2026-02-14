import path from "node:path";
import GameManager from "./GameManager";
import Room from "./Room";

const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

export default class PrototypeClient {
    constructor() {
        const app = express();
        const server = createServer(app);
        const io = new Server(server);

        app.get('/', (req: any, res: any) => {
            res.sendFile(path.join(__dirname, '..', 'client-prototype', 'index.html'));
        });

        // NOTE: the following prototype client logic was created by ChatGPT
        // It is NOT INTENDED FOR USE IN THE FINAL PRODUCT
        // This code should not be optimized except for testing purposes

        io.on("connection", (socket: any) => {
            console.log("Client connected:", socket.id);

            // --------------------------
            // CREATE CLIENT
            // --------------------------
            const client = GameManager.createPrototypeClient(socket);

            let room: Room | null = null;

            // --------------------------
            // NEW GAME
            // --------------------------
            socket.on("newGame", () => {
                console.log("New game requested by", socket.id);

                room = GameManager.createPrototypeRoom(client);

                const gameState = room.game.gameState; // TODO: get gamestate from a specific player's perspective

                socket.emit("gamestate", gameState);
            });

            // --------------------------
            // PLAYER CLICK EVENT
            // --------------------------
            socket.on("playerClickEvent", (label: string) => {
                console.log("Click from", socket.id, "on", label);

                if (!room) {
                    console.log('No room: returning.')
                    return;
                }

                console.log(`Attempting to click ${label} in ${room.name}`);


                room.handlePlayerClick(label);
            });

            // --------------------------
            // DISCONNECT
            // --------------------------
            socket.on("disconnect", () => {
                console.log("Client disconnected:", socket.id);

                GameManager.removePrototypeClient(socket.id, room?.name);
            });
        });

        server.listen(8020, () => {
            console.log('server running at http://localhost:8020');
        });
    }
}

