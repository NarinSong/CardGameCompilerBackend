import { parentPort, workerData } from "node:worker_threads";
import Game from "../Game/Game.js";
import GameDefinition from "../Rules/GameDefinition.js";


//Data of the game sent by the main thread
const game = new Game(workerData.gameDefinition as GameDefinition);

parentPort?.on("message", (msg) => {
    switch (msg.type){
        case "START_GAME":
            game.startGame();
            //
            // parentPort?.postMessage({type: "GAME_STATE", state: game});
            break;
        case "PLAYER_CLICK":
            let actionTaken = game.clickAction(msg.label);
            if (actionTaken) {
                // Update clients with new gamestate
                // parentPort?.postMessage({type: "GAME_STATE", state: game});
            }
            
            break;

    }
});