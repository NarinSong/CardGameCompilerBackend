import { parentPort, workerData } from "node:worker_threads";
import Game from "../Game/Game.js";
import ClientView from "../Client/ClientView.js";
import { buildGameFromJSON } from "../Client/GameBuilder.js";



//the JSON of the game sent by the main thread
const definition = buildGameFromJSON(JSON.parse(workerData.gameDefinitionJson));
if (!definition) throw new Error("Failed to build game definition in worker");
const game = definition.createGame();


function buildViews(game: Game) {
    return Object.entries(game.gameState.players).map(([_, player]) => ({
        playerId: player.id,
        view: ClientView.fromGamestate(game, player)
    }));
}

parentPort?.on("message", (msg) => {
    switch (msg.type){
        case "START_GAME":
            game.startGame();
            
            parentPort?.postMessage({type: "GAME_STATE", views: buildViews(game)});
            break;
        case "PLAYER_CLICK":
            let actionTaken = game.clickAction(msg.label);
            if (actionTaken) {
                // Update clients with new gamestate
                parentPort?.postMessage({type: "GAME_STATE", views: buildViews(game)});
            }
            
            break;
        case "JOIN_ROOM":
            const player = game.handlePlayerJoin(msg.playerType);
            parentPort?.postMessage({
                type: "PLAYER_JOINED",
                playerId: player?.id ?? null
            });
            break;

    }
});