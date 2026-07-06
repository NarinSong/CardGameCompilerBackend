import { check, z } from "zod";
import GameManager from "../GameManager.js";
import { BLOCKS } from "../schemas/Blocks.js";
import { buildGameFromJSON } from "./GameBuilder.js";
import Database from "../Components/Database.js";
import { ClientGameDefinitionSchema } from "../schemas/ClientGameDefinition.js";

// This file is for handling incoming socket requests from the client
// All incoming requests come through here
// This file *just* type-checks and forwards the requests to the appropriate place
// There should not be any kind of game logic in here
// All of the export functions have a callback. Anything that doesn't return data will indicate either success or failure
// Note: callback returns void, so return callback(arg); is the same as callback(arg); return;
function noop() {}
function fCheck(callback: unknown) {return typeof callback === 'function';}

/**
 * Respond back to the client with a pong
 * 
 * @param clientId - The id of the client requesting a ping.
 * @param callback - Response handler. Called with a greeting string on success.
 * @returns void
 */
export function clientRequestPing(clientId: number, callback: unknown = noop) {
    if (!fCheck(callback)) return; // callback: (msg: string) => void
    callback(`Hello there ${clientId}`);
}


/**
 * Verifies the client input upon sign up and responds with the session id if successful.
 * 
 * @param clientId - The id of the client requesting the sign up.
 * @param username - The username the client inputs.
 * @param password - The password the client inputs.
 * @param displayName - The display name the client inputs.
 * @param callback - Response handler. Called with a session id upon success.
 * @returns void if callback is not a function, returns callback(success) upon a successful sign up, otherwise callback(null).
 */
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

/**
 * Verifies the client input upon sign in and responds with the session id if successful.
 * @param clientId - The id of the client requesting the sign in.
 * @param username - The username the client inputs.
 * @param password - The password the client inputs.
 * @param callback - Response handler. Called with a session id upon success.
 * @returns void if callback is not a function, returns callback(success) upon a successful sign in, otherwise callback(null). 
 */
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
        .max(128)
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

/**
 * Signs out the client.
 * @param clientId - The id of the client requesting the sign out.
 * @param callback - Response handler. Called with a true boolean value if successful.
 * @returns void if callback is not a function, returns callback(true) upon a successful sign out, otherwise callback(false).
 */
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

export async function clientRequestGetColor(clientId: number, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(color: hex string, defaults to '#ffffff' on failure) => void

    const client = GameManager.clientFromId(clientId);
    if (!client) return callback('#ffffff');
    if (!client.isAuthenticated) return callback('#ffffff');
    if (!client.color) return callback('#ffffff');

    callback(client.color);
}

export async function clientRequestChangeColor(clientId: number, color: unknown, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(success: boolean) => void

    const checkColor = z
        .string()
        .regex(/^#[0-9a-fA-F]{6}$/)
        .min(7)
        .max(7)
        .safeParse(color);

    if (!checkColor.success)
        return callback(false);

    const client = GameManager.clientFromId(clientId);
    if (!client) return callback(false);
    if (!client.isAuthenticated) return callback(false);
    if (!client.username) return callback(false);

    const success = await Database.saveUserColor(client.username, checkColor.data);

    if (success)
        client.color = checkColor.data;

    callback(success);
}

export async function clientRequestChangeDisplayName(clientId: number, displayName: unknown, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(success: boolean) => void

    const displayNameCheck = z
        .string()
        .min(3)
        .max(16)
        .regex(/^[a-zA-Z0-9 ]+$/)
        .safeParse(displayName);

    if (!displayNameCheck.success)
        return callback(false);

    const client = GameManager.clientFromId(clientId);
    if (!client) return callback(false);
    if (!client.isAuthenticated) return callback(false);
    if (!client.username) return callback(false);
    
    const success = await Database.saveUserDisplayName(client.username, displayNameCheck.data);

    if (success)
        client.updateDisplayName(displayNameCheck.data);

    callback(success);
}

export async function clientRequestChangeProfileDescription(clientId: number, description: unknown, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(success: boolean) => void

    const descriptionCheck = z
        .string()
        .min(3)
        .max(500)
        .regex(/^[a-zA-Z0-9 ]+$/)
        .safeParse(description);

    if (!descriptionCheck.success)
        return callback(false);

    const client = GameManager.clientFromId(clientId);
    if (!client) return callback(false);
    if (!client.isAuthenticated) return callback(false);
    if (!client.username) return callback(false);
    
    const success = await Database.saveUserDescription(client.username, descriptionCheck.data);

    callback(success);
}

export async function clientRequestChangeProfilePicture(clientId: number, picture: unknown, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(success: boolean) => void

    const pictureCheck = z
        .url()
        .safeParse(picture);

    if (!pictureCheck.success)
        return callback(false);

    const client = GameManager.clientFromId(clientId);
    if (!client) return callback(false);
    if (!client.isAuthenticated) return callback(false);
    if (!client.username) return callback(false);
    
    const success = await Database.saveUserProfilePicture(client.username, pictureCheck.data);

    callback(success);
}

/**
 * Sends the client all the games stored in the database.
 * 
 * @param clientId - The id of the client requesting the available games.
 * @param callback - Response handler. Called with the list of game names and its id.
 * @returns void if callback is not a function, returns callback(games) for the games found in the database.
 */
export async function clientRequestGetAvailableGames(clientId: number, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(games: { [name: string]: number }) => void

    // Get the available games from the database and send those to the client
    const games = await GameManager.getAvailableGameNames();

    callback(games);
}

export async function clientRequestGetGameInfo(clientId: number, gameId: unknown, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(game: null | { name: string; description: string }) => void

    const gameIdCheck = z
        .number()
        .safeParse(gameId);

    if (!gameIdCheck.success) 
        return callback(null);

    const game = await GameManager.getGameDefinition(gameIdCheck.data);
    if (!game)
        return callback(null);

    callback(
        {
            name: game.gameMeta.name,
            description: 'A game'
        }
    );
}

/**
 * Handles the request of saving a game and verifies the inputs.
 * 
 * @param clientId - The id of the client initiating the request.
 * @param json - The json containg the game info and rules.
 * @param gameName - The name of the game.
 * @param parentGameId - The id of the parent game in which it was derived from, if any.
 * @param gameDescription - description for the game.
 * @param isPrivate - Whether the game is viewable only to the client or everyone.
 * @param callback - Response handler. Called with true (boolean value) and its id.
 * @returns void if callback is not a function, returns callback(true, id) if save was successful, else callback(false).
 * @todo connect actual id
 * @todo get save id from database
 */
export async function clientRequestSaveGame(clientId: number, json: unknown, gameName: unknown, parentGameId: unknown, gameDescription: unknown, isPrivate: unknown, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(success: boolean, id?: number) => void

    // Auth check
    const client = GameManager.clientFromId(clientId);
    if (!client) return callback(false);
    const username = client.username;
    if (!username) return callback(false);

    // Verify client input
    const jsonCheck = 
        ClientGameDefinitionSchema
        .safeParse(json);

    const gameNameCheck = z
        .string()
        .min(3)
        .max(16)
        .regex(/^[a-z0-9_]+$/)
        .safeParse(gameName);
    
    const parentIdCheck = z
        .number()
        .optional()
        .safeParse(parentGameId);

    const gameDescriptionCheck = z
        .string()
        .regex(/^[a-zA-Z0-9!@#$%^&*(),.?]+$/)
        .max(10000)
        .safeParse(gameDescription); // can be blank ''

    const isPrivateCheck = z
        .boolean()
        .safeParse(isPrivate);

    if (!jsonCheck.success || !gameNameCheck.success || !parentIdCheck.success || !gameDescriptionCheck.success || !isPrivateCheck.success) return callback(false);

    const def = buildGameFromJSON(jsonCheck.data);
    if (!def) return callback(false);

    //TODO: connect actual id
    const id = 1;

    // Save game in database and available games
    await Database.saveGameJson(JSON.stringify(jsonCheck.data), gameNameCheck.data, username, parentIdCheck.data ?? null, gameDescriptionCheck.data, isPrivateCheck.data);
    
    // todo: get save id from database
    GameManager.registerGameDefinition(def, id, JSON.stringify(jsonCheck.data)); 

    callback(true, id);
}

/**
 * Send the client the available code blocks.
 * @param clientId - The id of the client initiating the request.
 * @param callback - Response handler. Called with the available code blocks.
 * @returns void if callback is not a function, else returns callback(BLOCKS).
 */
export function clientRequestGetAvailableBlocks(clientId: number, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(blocks: typeof BLOCKS) => void

    // Send the available code blocks to the client
    callback(Object.values(BLOCKS));
}

export function clientRequestHostLobby(clientId: number, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(code: string | null) => void

    const client = GameManager.clientFromId(clientId);
    if (!client || !client.isAuthenticated || client.inLobby || client.inGame) 
        return callback(null);

    const code = GameManager.hostLobby(client);

    callback(code);
}

export function clientRequestJoinLobby(clientId: number, code: unknown, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(success: boolean) => void

    const codeCheck = z
        .string()
        .min(6)
        .max(6)
        .regex(/^[A-Z0-9]+$/)
        .safeParse(code);

    if (!codeCheck.success) return callback(false);

    const client = GameManager.clientFromId(clientId);
    if (!client || !client.isAuthenticated || client.inLobby || client.inGame) 
        return callback(false);

    const lobby = GameManager.lobbyFromCode(codeCheck.data);
    if (!lobby) return callback(false);

    const success = lobby.joinGame(client);

    callback(success);
}

export function clientRequestRemoveFromLobby(clientId: number, username: unknown, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(success: boolean) => void

    const usernameCheck = z
        .string()
        .min(3)
        .max(16)
        .regex(/^[a-z0-9_]+$/)
        .safeParse(username);

    if (!usernameCheck.success) return callback(false);

    const client = GameManager.clientFromId(clientId);
    if (!client || !client.isAuthenticated || !client.username || !client.inLobby || !client.lobby || client.inGame) 
        return callback(false);

    const lobby = GameManager.lobbyFromCode(client.lobby);
    if (!lobby) return callback(false);
    if (!lobby.isHost(clientId)) return callback(false);

    const success = lobby.removeFromLobby(usernameCheck.data);

    callback(success);
}

export function clientRequestLeaveLobby(clientId: number, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(success: boolean) => void

    const client = GameManager.clientFromId(clientId);
    if (!client || !client.isAuthenticated || !client.username || !client.inLobby || !client.lobby || client.inGame) 
        return callback(false);

    const lobby = GameManager.lobbyFromCode(client.lobby);
    if (!lobby) return callback(false);

    const success = lobby.removeFromLobby(client.username);

    callback(success);
}

export async function clientRequestSelectGame(clientId: number, gameId: unknown, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(succeess: boolean) => void

    const gameIdCheck = z
        .number()
        .safeParse(gameId);

    if (!gameIdCheck.success) return callback(false);

    const client = GameManager.clientFromId(clientId);
    if (!client || !client.isAuthenticated || !client.username || !client.inLobby || !client.lobby || client.inGame) 
        return callback(false);

    const lobby = GameManager.lobbyFromCode(client.lobby);
    if (!lobby) return callback(false);

    if (!lobby.isHost(clientId)) return callback(false);

    const game = await GameManager.getGameDefinition(gameIdCheck.data);
    if (!game) return callback(false);

    if (!GameManager.getRegisteredGameDefinitionJson(gameIdCheck.data)) {
        const result = await Database.getGameFromId(gameIdCheck.data);
        if (result?.[0]) {
            GameManager.registerGameDefinition(game, gameIdCheck.data, result[0].gameRules);
        }
    }

    lobby.selectGame(gameIdCheck.data);

    callback(true);
}

/**
 * Handles client request to start a new game.
 * 
 * @param clientId - The id of the client initiating the request. 
 * @param callback - Response handler. Called with the name of room.
 * @returns void if callback is not a function, returns callback(true) if successful, else callback(false).
 */
export async function clientRequestStartNewGame(clientId: number, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(succeess: boolean) => void

    const client = GameManager.clientFromId(clientId);
    if (!client || !client.isAuthenticated || !client.username || !client.inLobby || !client.lobby || client.inGame) 
        return callback(false);

    const lobby = GameManager.lobbyFromCode(client.lobby);
    if (!lobby) return callback(false);

    if (!lobby.isHost(clientId)) return callback(false);

    const success = await lobby.startGame();

    callback(success);
}

/**
 * Handles the client clicking an object.
 * @param clientId - The id of the client initiating the request. 
 * @param label - The label of the pile or game object being clicked.
 * @param callback - Response handler. Called with the boolean true.
 * @returns void if callback is not a function, returns callback(true) if successful, else callback(false).
 */
export function clientRequestClickLabel(clientId: number, label: unknown, cardId: unknown, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(succeeded: boolean) => void 

    const labelCheck = z
        .string()
        .safeParse(label);

    if (!labelCheck.success)
        return callback(false);

    const cardIdCheck = z
        .number()
        .safeParse(cardId);

    if (!cardIdCheck.success)
        return callback(false);

    const client = GameManager.clientFromId(clientId);
    if (!client || !client.roomId) return callback(false);

    const room = GameManager.getRoomFromId(client.roomId);
    if (!room) return callback(false);

    room.handlePlayerClick(labelCheck.data, cardIdCheck.data);

    callback(true);
}

export function clientRequestReactWithEmote(clientId: number, emote: unknown, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(succeeded: boolean) => void 

    const emoteCheck = z
        .string()
        .safeParse(emote);

    if (!emoteCheck.success)
        return callback(false);

    const client = GameManager.clientFromId(clientId);
    if (!client || !client.roomId || !client.username) return callback(false);

    const room = GameManager.getRoomFromId(client.roomId);
    if (!room) return callback(false);

    room.handleEmote(clientId, client.username, emoteCheck.data);

    callback(true);
}



export function clientRequestLeaveGame(clientId: number, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(succeess: boolean) => void

    const client = GameManager.clientFromId(clientId);
    if (!client || !client.isAuthenticated || !client.username || !client.inLobby || !client.lobby || !client.inGame) 
        return callback(false);

    const lobby = GameManager.lobbyFromCode(client.lobby);
    if (!lobby) return callback(false);

    const success = GameManager.leaveGame(clientId);

    callback(success);
}

export function clientRequestEndGame(clientId: number, callback: unknown = noop) {
    if (!fCheck(callback)) return;//(succeess: boolean) => void

    const client = GameManager.clientFromId(clientId);
    if (!client || !client.isAuthenticated || !client.username || !client.inLobby || !client.lobby || !client.inGame) 
        return callback(false);

    const lobby = GameManager.lobbyFromCode(client.lobby);
    if (!lobby) return callback(false);

    if (!lobby.isHost(clientId)) return callback(false);

    // Leave game does the same thing as end game at the moment :)
    const success = GameManager.leaveGame(clientId);

    callback(success);
}