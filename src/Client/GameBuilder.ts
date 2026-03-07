// Game builder expects a payload from the client, which it will then turn into a game definition
// It will also house the type checking (yay!) to ensure that there won't be any runtime errors

import Action from "../Rules/ActionDefinition";
import GameDefinition from "../Rules/GameDefinition";
import GamePhaseDefinition from "../Rules/GamePhaseDefinition";
import { verifyClientGameDefintion } from "../schemas/ClientGameDefinition";

export function buildGameFromJSON(clientJson: unknown) {
    const data = verifyClientGameDefintion(clientJson);
    if (!data) return null;

    // JSON is verified, let's build a game

    const game = new GameDefinition();

    // Define the game meta (it's already built, so we just override if we have any changes to make)
    if (typeof data.gameMeta.minPlayers !== 'undefined')
        game.minPlayers = data.gameMeta.minPlayers;
    if (typeof data.gameMeta.maxPlayers !== 'undefined')
        game.maxPlayers = data.gameMeta.maxPlayers;

    // TODO: the remaining game meta :)
    // It isn't implemented in GameDefinition yet, so we'll have to make getters for it

    // Define the players
    if (typeof data.playerDefinition.piles !== 'undefined')
        for (let pile of data.playerDefinition.piles) {
            if (!pile) continue;

            game.addPlayerPile(pile); // TODO: verify labels, actionRoles, etc.
        }
    
    if (typeof data.playerDefinition.counters !== 'undefined')
        for (let counter of data.playerDefinition.counters) {
            if (!counter) continue;

            game.addPlayerCounter(counter); // TODO: verify labels, actionRoles, etc.
        }
    
    // Define the board
    if (typeof data.boardDefinition.piles !== 'undefined')
        for (let pile of data.boardDefinition.piles) {
            if (!pile) continue;

            game.addBoardPile(pile); // TODO: verify labels, actionRoles, etc.
        }
    
    if (typeof data.boardDefinition.counters !== 'undefined')
        for (let counter of data.boardDefinition.counters) {
            if (!counter) continue;

            game.addBoardCounter(counter); // TODO: verify labels, actionRoles, etc.
        }
    
    // Create the game phases
    for (let phaseData of data.phases) {
        const phase = phaseData.name;
        game.addPhase(phase);

        // Add the steps
        for (let stepData of phaseData.steps) {
            const step = stepData.name;
            game.addStepToPhase(phase, step);

            // Add the actions
            for (let actionData of stepData.actions) {
                const action = new Action(
                    actionData.trigger,
                    actionData.filter ?? null,
                    actionData.result
                );

                game.addActionToStep(step, action);
            }
        }
    }

    return game;
}