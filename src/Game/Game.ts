// The man, the myth, the legen
// Game is what actually runs when a player is playing a game
// It's created from a GameDefinition
// It's passed down to action results

import GameDefinition from "../Rules/GameDefinition";
import { PlayerType } from "../types";
import GameState from "./GameState";
import Player from "./Player";


export default class Game {
    definition: GameDefinition;
    gameState: GameState;
    
    constructor(definition: GameDefinition) {
        this.gameState = new GameState(definition);
        this.definition = definition;
    }

    // Assuming for now that the player can join. No restrictions on when :)
    handlePlayerJoin(type: PlayerType) {
        if (this.players.length < this.definition.maxPlayers) {
            const p = new Player(this.definition.player, type, this.gameLabels);
            this.players.push(p);
            return p;
        }
        return null;
    }

    startGame() {
        while (this.players.length < this.definition.minPlayers) {
            // Add bots
            this.handlePlayerJoin(PlayerType.ROBOT);
        }

        // Move to step 1
        this.definition.getStartingStep();
    }

    get currentActions() {
        return this.currentStep?.actions || [];
    }

    get players() {
        return this.gameState.players;
    }

    get currentStep() {
        return this.gameState.currentStep;
    }

    get gameLabels() {
        return this.gameState.gameLabels;
    }
}