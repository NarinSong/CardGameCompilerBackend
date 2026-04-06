import { z } from "zod";
import GameManager from "../GameManager.js";
import CodeBlocks from "./CodeBlocks.json" with { type: "json" };

// This file is for handling incoming socket requests from the client
// All incoming requests come through here
// This file *just* type-checks and forwards the requests to the appropriate place
// There should not be any kind of game logic in here
// All of the export functions have a callback. Anything that doesn't return data will indicate either success or failure
// Note: callback returns void, so return callback(arg); is the same as callback(arg); return;
function noop() {}
function fCheck(callback: unknown) {return typeof callback === 'function';}

export function clientRequestPing(clientId: number, callback: unknown = noop) {
    if (!fCheck(callback)) return; // callback: (msg: string) => void
    callback(`Hello there ${clientId}`);
}

export async function clientRequestSignUp(clientId: number, username: unknown, password: unknown, displayName: unknown, callback: unknown = noop) {
    if (!fCheck(callback)) return; // callback: (token: string | null) => void
    
    // Verify client input
    const usernameCheck = z
        .string()
        .min(3)
        .max(16)
        .regex(/^[a-z0-9_]+$/)
        .safeParse(username);

    const passwordCheck = z
        .string()
        .regex(/^[a-zA-Z0-9!@#$%^&*(),.?]+$/)
        .min(4)
        .max(64)
        .safeParse(password);

    const displayNameCheck = z
        .string()
        .min(3)
        .max(16)
        .regex(/^[a-zA-Z0-9 ]+$/)
        .safeParse(displayName);

    if (!usernameCheck.success || !passwordCheck.success || !displayNameCheck.success) return callback(null);

    // Verify that the user isn't already signed in
    const client = GameManager.clientFromId(clientId);
    if (!client) return callback(null);
    if (client.isAuthenticated) return callback(null);

    // Verify rate limiting
    if (!client.rateLimitAllowed) return callback(null);

    // Attempt sign up
    const success = await client.signUp(usernameCheck.data, passwordCheck.data, displayNameCheck.data);
    if (!success) return callback(null);

    return callback(success);
}

export async function clientRequestSignIn(clientId: number, username: unknown, password: unknown, callback: unknown = noop) {
    if (!fCheck(callback)) return;// (token: string | null, displayName?: string) => void

    // Verify client input
    const usernameCheck = z
        .string()
        .min(3)
        .max(16)
        .regex(/^[a-z0-9_]+$/)
        .safeParse(username);

    const passwordCheck = z
        .string()
        .regex(/^[a-zA-Z0-9!@#$%^&*(),.?]+$/)
        .min(4)
        .safeParse(password);

    if (!usernameCheck.success || !passwordCheck.success) return callback(null);

    // Verify that the user isn't already signed in
    const client = GameManager.clientFromId(clientId);
    if (!client) return callback(null);
    if (client.isAuthenticated) return callback(null);

    // Verify rate limiting
    if (!client.rateLimitAllowed) return callback(null);

    // Attempt sign up
    const success = await client.signIn(usernameCheck.data, passwordCheck.data);
    if (!success || !client.displayName) return callback(null);

    return callback(success, client.displayName);
}

export async function clientRequestSignOut(clientId: number, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(success: boolean) => void

    // Verify that the user is signed in
    const client = GameManager.clientFromId(clientId);
    if (!client) return callback(false);
    if (!client.isAuthenticated) return callback(false);

    // Attempt sign out
    const success = await client.signOut();
    if (!success) return callback(false);

    return callback(true);
}

export function clientRequestGetAvailableGames(clientId: number, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(games: { [name: string]: number }) => void

    // Get the available games from the database and send those to the client
    const games: {name: string, id: number}[] = [
        { name: 'Pickup', id: 0},{ name: 'War', id: 1 },
        { name: 'aPickup', id: 2},{ name: 'Attack', id: 3 },
        { name: 'bPickup', id: 4},{ name: 'Send', id: 5 },
        { name: 'cPickup', id: 6},{ name: 'Mahjong', id: 7 },
        { name: 'rePickup', id: 8},{ name: 'Next', id: 9 },
        { name: 'rePickup', id: 10},{ name: 'Skipbo', id: 11 },
        { name: 'dPickup', id: 12},{ name: 'Go', id: 13 },
        { name: 'gPickup', id: 14},{ name: 'Chess', id: 15 },
    ]; //TODO: replace with database call

    callback(games);
}

export function clientRequestGetAvailableBlocks(clientId: number, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(blocks: typeof CodeBlocks) => void

    // Send the available code blocks to the client
    callback(CodeBlocks);
}

export function clientRequestStartNewGame(clientId: number, game: unknown, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(succeeded: string | null) => void

    const result = z.number().safeParse(game)
    if (!result.success)
        return callback(null);

    // TODO: Check if the client is already in a game

    const room = GameManager.createRoom(result.data, clientId);

    callback(room ? room.name: null);
}

export function clientRequestClickLabel(clientId: number, label: unknown, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(succeeded: boolean) => void 

    const result = z.string().safeParse(label)
    if (!result.success)
        return callback(false);

    const client = GameManager.clientFromId(clientId);
    if (!client) return callback(false);

    const room = client.room;
    if (!room) return callback(false);

    room.handlePlayerClick(result.data);

    callback(true);
}