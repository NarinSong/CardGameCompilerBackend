import { parentPort, workerData } from "node:worker_threads";
import Game from "../Game/Game.js";
import ClientView from "../Client/ClientView.js";
import { buildGameFromJSON } from "../Client/GameBuilder.js";

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
            break;
        case "PLAYER_CLICK":
            let actionTaken = game.clickAction(msg.label, msg.cardId, msg.playerId);
            if (game.aborted) { parentPort?.postMessage({ type: "GAME_ABORTED" }); break; }
            if (actionTaken) {
                // Update clients with new gamestate
                updateGameState();
            }
            
            break;
        case "JOIN_ROOM":
            const player = game.handlePlayerJoin(msg.playerType);
            if (game.aborted) { parentPort?.postMessage({ type: "GAME_ABORTED" }); break; }
            parentPort?.postMessage({
                type: "PLAYER_JOINED",
                playerId: player?.id ?? null
            });
            break;

    }
});