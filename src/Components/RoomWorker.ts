import { parentPort, workerData } from "node:worker_threads";
import Game from "../Game/Game.js";
import ClientView from "../Client/ClientView.js";
import { buildGameFromJSON } from "../Client/GameBuilder.js";
import { PlayerID } from "../schemas/types.js";

// This is the worker thread that owns and runs the game instance.
// It receives messages from the parent thread (Room.ts) via postMessage()
// and responds with game state updates or player join confirmations.

//the JSON of the game sent by the main thread
const definition = buildGameFromJSON(JSON.parse(workerData.gameDefinitionJson));
if (!definition) throw new Error("Failed to build game definition in worker");
const game = definition.createGame();

/**
 * Builds a list of player views from the current game state.
 * @param game - The current game instance.
 * @returns An array of objects containing each player's id and their corresponding ClientView.
 */
function buildViews(game: Game): { playerId: number; view: ClientView; }[] {
    return Object.entries(game.gameState.players).map(([_, player]) => ({
        playerId: player.id,
        view: ClientView.fromGamestate(game, player)
    }));
}

function updateGameState(): void {
    parentPort?.postMessage({type: "GAME_STATE", views: buildViews(game)});
}

function buildPlayerResults(game: Game): { playerId: number; status: string; score: number }[] {
    return Object.values(game.players).map(p => ({
        playerId: p.id,
        status: p.state,
        score: p.score
    }));
}

/**
 * Handles messages from the parent thread.
 * 
 * Supported message types:
 * - START_GAME: Starts the game and emits the initial game state.
 * - PLAYER_CLICK: Processes a player click and emits the updated game state if an action was taken.
 * - JOIN_ROOM: Handles a player joining the room and responds with their assigned player id.
 */
parentPort?.on("message", (msg) => {
    switch (msg.type){
        case "START_GAME":
            game.startGame();
            if (game.aborted) { parentPort?.postMessage({ type: "GAME_ABORTED" }); break; }
            updateGameState();
            if (game.gameOver) { parentPort?.postMessage({ type: "GAME_OVER", players: buildPlayerResults(game) }); }
            break;
        case "PLAYER_CLICK":
            let actionTaken = game.clickAction(msg.label, msg.cardId, msg.playerId, msg.buttonValue);
            if (game.aborted) { parentPort?.postMessage({ type: "GAME_ABORTED" }); break; }
            if (actionTaken) {
                // Update clients with new gamestate
                updateGameState();
            }
            if (game.gameState.popups.length > 0) {
                parentPort?.postMessage({ type: "SEND_POPUPS", popups: game.gameState.popups });
                game.gameState.popups.splice(0);
            }
            if (game.gameOver) { parentPort?.postMessage({ type: "GAME_OVER", players: buildPlayerResults(game) }); }
            
            break;
        case "JOIN_ROOM":
            const player = game.handlePlayerJoin(msg.playerType, msg.playerName);
            if (game.aborted) { parentPort?.postMessage({ type: "GAME_ABORTED" }); break; }
            parentPort?.postMessage({
                type: "PLAYER_JOINED",
                playerId: player?.id ?? null
            });
            break;

    }
});