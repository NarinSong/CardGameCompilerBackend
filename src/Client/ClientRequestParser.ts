import { z } from "zod";
import GameManager from "../GameManager";
import Client from "./Client";
import CodeBlocks from "./CodeBlocks.json";

// This file is for handling incoming socket requests from the client
// All incoming requests come through here
// This file *just* type-checks and forwards the requests to the appropriate place
// There should not be any kind of game logic in here
// All of the functions have a callback. Anything that doesn't return data will indicate either success or failure
// Note: callback returns void, so return callback(arg); is the same as callback(arg); return;

function clientRequestGetAvailableGames(clientId: number, callback: (games: Record<string,number>) => void) {
    // Get the available games from the database and send those to the client
    const games: Record<string,number> = {'Pickup': 0, 'War': 1}; //TODO: replace with database call

    callback(games);
}

function clientRequestGetAvailableBlocks(clientId: number, callback: (games: typeof CodeBlocks) => void) {
    // Send the available code blocks to the client

    callback(CodeBlocks);
}

function clientRequestStartNewGame(clientId: number, game: unknown, callback: (succeeded: string | null) => void) {
    const result = z.number().safeParse(game)
    if (!result.success)
        return callback(null);

    // TODO: Check if the client is already in a game

    const room = GameManager.createRoom(result.data, clientId);

    callback(room ? room.name: null);
}

function clientRequestClickLabel(clientId: number, label: unknown, callback: (succeeded: boolean) => void) {
    const result = z.string().safeParse(label)
    if (!result.success)
        return callback(false);

    const client = Client.clientFromId(clientId);
    if (!client) return callback(false);

    const room = client.room;
    if (!room) return callback(false);

    room.handlePlayerClick(result.data);

    callback(true);
}


export {
    clientRequestGetAvailableGames,
    clientRequestGetAvailableBlocks,
    clientRequestStartNewGame,
    clientRequestClickLabel,
}