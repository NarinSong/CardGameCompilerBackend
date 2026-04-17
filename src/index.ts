import { Server, Socket } from 'socket.io';
import GameManager from './GameManager.js';
import ClientView from './Client/ClientView.js';
import Logger from './Components/Logger.js';
import { clientRequestClickLabel, clientRequestGetAvailableBlocks, clientRequestGetAvailableGames, clientRequestPing, clientRequestSaveGame, clientRequestSignIn, clientRequestSignOut, clientRequestSignUp, clientRequestStartNewGame } from './Client/ClientRequestParser.js';

// Execution begins here
// All socket connections come through here. Incoming AND outgoing.
const VERSION = '0.1.9';

Logger.LOG_LEVEL = 5;
Logger.log('The server is open for business.');
Logger.log(`Running CGC v${VERSION}`);

const io = new Server(8020);

Logger.log('Listening for socket.io connections on port 8020');

/**
 * Maps socket.io socket ids to internal client ids.
 */
const SOCKET_ID_TO_CLIENT_ID : Record<string, number> = {};

/**
 * Maps client ids to their socket ids
 */
const SOCKETS : Record<number, Socket> = {};

io.on('connection', (socket: Socket) => {
    console.log('New socket connected');

    // TODO: potentially map to an already existing client id

    // Create client
    const client = GameManager.createClient();
    SOCKET_ID_TO_CLIENT_ID[socket.id] = client.identifier;
    SOCKETS[client.identifier] = socket;

    const id = client.identifier;

    // Listeners
    socket.on('ping', (callback) => {clientRequestPing(id, callback);});

    // Auth
    socket.on('signUp', (username, password, displayName, callback) => {clientRequestSignUp(id, username, password, displayName, callback);});
    socket.on('signIn', (username, password, callback) => {clientRequestSignIn(id, username, password, callback);});
    socket.on('signOut', (callback) => {clientRequestSignOut(id, callback);});

    socket.on('getAvailableGames', (callback) => {clientRequestGetAvailableGames(id, callback);});

    // Game Builder
    socket.on('getAvailableBlocks', (callback) => {clientRequestGetAvailableBlocks(id, callback);});
    socket.on('saveGame', (json, gameName, parentGameId, gameDescription, isPrivate, callback) => {clientRequestSaveGame(id, json, gameName, parentGameId, gameDescription, isPrivate, callback);});

    // Game play
    socket.on('startNewGame', (gameId, callback) => {clientRequestStartNewGame(id, gameId, callback);});
    socket.on('playerClickEvent', (label, callback) => {clientRequestClickLabel(id, label, callback);});

    // Disconnect
    socket.on('disconnect', () => {
        // TODO: set up auto-reonnect or recovery
        GameManager.removeClient(id);
        delete SOCKETS[id];
    })
})

/**
 * log the failed send.
 * @param clientId - Client id that was supposed to receive.
 * @param functionName - Function name that it failed on.
 */
function failedSend(clientId: number, functionName: string) {
    Logger.log(`Failed emit: ${clientId} attempted ${functionName}`);
}

// Emitters
/**
 * Send the gamestate to the client
 * @param clientId - Client id to send gamestate to.
 * @param gamestate - Game state to send to client.
 * @returns void
 */
function sendClientGamestate(clientId: number, gamestate: ClientView) {
    const socket = SOCKETS[clientId];
    if (!socket) {
        failedSend(clientId, 'sendClientGamestate()');
        return;
    }

    socket.emit('gamestate', gamestate);
}

// Exports. Note: socket is not exported
export { sendClientGamestate };