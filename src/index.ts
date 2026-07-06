import { Server, Socket } from 'socket.io';
import GameManager from './GameManager.js';
import ClientView from './Client/ClientView.js';
import Logger from './Components/Logger.js';
import { clientRequestChangeColor, clientRequestChangeDisplayName, clientRequestChangeProfileDescription, clientRequestClickLabel, clientRequestEndGame, clientRequestGetAvailableBlocks, clientRequestGetAvailableGames, clientRequestGetColor, clientRequestGetGameInfo, clientRequestHostLobby, clientRequestJoinLobby, clientRequestLeaveGame, clientRequestLeaveLobby, clientRequestPing, clientRequestReactWithEmote, clientRequestRemoveFromLobby, clientRequestSaveGame, clientRequestSelectGame, clientRequestSignIn, clientRequestSignOut, clientRequestSignUp, clientRequestStartNewGame } from './Client/ClientRequestParser.js';
import { LobbyView } from './Components/Lobby.js';
import { ClientID } from './schemas/types.js';

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
const SOCKETS : Record<ClientID, Socket> = {};

io.on('connection', (socket: Socket) => {
    console.log('New socket connected');

    // TODO: potentially map to an already existing client id

    // Create client
    const client = GameManager.createClient();
    SOCKET_ID_TO_CLIENT_ID[socket.id] = client.identifier;
    SOCKETS[client.identifier] = socket;

    const id: ClientID = client.identifier;

    // Listeners
    socket.on('ping', (callback) => {clientRequestPing(id, callback);});

    // Auth
    socket.on('signUp', (username, password, displayName, callback) => {clientRequestSignUp(id, username, password, displayName, callback);});
    socket.on('signIn', (username, password, callback) => {clientRequestSignIn(id, username, password, callback);});
    socket.on('signOut', (callback) => {clientRequestSignOut(id, callback);});

    // Account management
    socket.on('getColor', (callback) => {clientRequestGetColor(id, callback);});
    socket.on('setColor', (color, callback) => {clientRequestChangeColor(id, color, callback);});
    socket.on('setDisplayName', (displayName, callback) => {clientRequestChangeDisplayName(id, displayName, callback);});
    socket.on('setDescription', (description, callback) => {clientRequestChangeProfileDescription(id, description, callback);});
    socket.on('setProfilePicture', (profileUrl, callback) => {clientRequestChangeDisplayName(id, profileUrl, callback);});


    // Game Builder
    socket.on('getAvailableBlocks', (callback) => {clientRequestGetAvailableBlocks(id, callback);});
    socket.on('saveGame', (json, gameName, parentGameId, gameDescription, isPrivate, callback) => {clientRequestSaveGame(id, json, gameName, parentGameId, gameDescription, isPrivate, callback);});

    // Lobby handling
    socket.on('hostLobby', (callback) => {clientRequestHostLobby(id, callback);});
    socket.on('joinLobby', (code, callback) => {clientRequestJoinLobby(id, code, callback);});
    socket.on('leaveLobby', (callback) => {clientRequestLeaveLobby(id, callback);});
    socket.on('removeFromLobby', (username, callback) => {clientRequestRemoveFromLobby(id, username, callback);});
    socket.on('getAvailableGames', (callback) => {clientRequestGetAvailableGames(id, callback);});
    socket.on('getGameInfo', (gameId, callback) => {clientRequestGetGameInfo(id, gameId, callback);});
    socket.on('selectGame', (gameId, callback) => {clientRequestSelectGame(id, gameId, callback);});
    socket.on('startNewGame', (callback) => {clientRequestStartNewGame(id, callback);});

    // Game play
    socket.on('playerClickEvent', (label, cardId, callback) => {clientRequestClickLabel(id, label, cardId, callback);});

    // Emotes and chat
    socket.on('emoteReaction', (emote, callback) => {clientRequestReactWithEmote(id, emote, callback);});

    // Game scene buttons
    socket.on('leaveGame', (callback) => {clientRequestLeaveGame(id, callback);});
    socket.on('endGame', (callback) => {clientRequestEndGame(id, callback);});

    // Disconnect
    socket.on('disconnect', () => {
        // TODO: set up auto-reconnect or recovery
        GameManager.removeClient(id);
        delete SOCKETS[id];
    })
})

/**
 * log the failed send.
 * @param clientId - Client id that was supposed to receive.
 * @param functionName - Function name that it failed on.
 */
function failedSend(clientId: ClientID, functionName: string) {
    Logger.log(`Failed emit: ${clientId} attempted ${functionName}`);
}

// Emitters
/**
 * Send the gamestate to the client
 * @param clientId - Client id to send gamestate to.
 * @param gamestate - Game state to send to client.
 * @returns void
 */
function sendClientGamestate(clientId: ClientID, gamestate: ClientView) {
    const socket = SOCKETS[clientId];
    if (!socket) {
        failedSend(clientId, 'sendClientGamestate()');
        return;
    }

    socket.emit('gamestate', gamestate);
}

function sendGameEnded(clientId: ClientID) {
    const socket = SOCKETS[clientId];
    if (!socket) {
        failedSend(clientId, 'sendGameEnded()');
        return;
    }

    socket.emit('gameEnded');
}

function sendLobbyStatus(clientId: ClientID, lobbyStatus: LobbyView) {
    const socket = SOCKETS[clientId];
    if (!socket) {
        failedSend(clientId, 'sendClientGamestate()');
        return;
    }

    socket.emit('lobbyStatus', lobbyStatus);
}

function sendLobbyClosed(clientId: ClientID) {
    const socket = SOCKETS[clientId];
    if (!socket) {
        failedSend(clientId, 'sendLobbyClosed()');
        return;
    }

    socket.emit('lobbyClosed');
}

function sendReaction(clientId: ClientID, from: string, reaction: string) {
    const socket = SOCKETS[clientId];
    if (!socket) {
        failedSend(clientId, 'sendReaction()');
        return;
    }

    socket.emit('reaction', from, reaction);
}

// Exports. Note: socket is not exported
export { sendClientGamestate, sendGameEnded, sendLobbyStatus, sendLobbyClosed, sendReaction };