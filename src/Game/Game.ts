// The man, the myth, the legen
// Game is what actually runs when a player is playing a game
// It's created from a GameDefinition
// It's passed down to action results

import GameDefinition from "../Rules/GameDefinition";
import StepDefinition from "../Rules/StepDefinition";
import { ActionRole, PlayerType, TriggerType } from "../types";
import GameState from "./GameState";
import Player from "./Player";
import { GamePiece } from "./GameLabels";
import Logger from "../Components/Logger";
import { ActionContext, evaluate } from "../Components/TreeParser";


export default class Game {
    definition: GameDefinition;
    gameState: GameState;

    // Player handling
    #nextPlayerId: number = 0;
    
    constructor(definition: GameDefinition) {
        this.gameState = new GameState(definition);
        this.definition = definition;
    }

    // Assuming for now that the player can join. No restrictions on when :)
    handlePlayerJoin(type: PlayerType) {
        Logger.debug('Player joined');
        if (this.numPlayers < this.definition.maxPlayers) {
            // Assign the new player's id
            let id = this.nextPlayerId;

            const p = new Player(this.definition.player, type, this.gameLabels, id);
            this.players[id] = p;
            this.numPlayers++;

            // Create piles and counters
            for (let pd of this.definition.player.piles) {
                this.gameState.createPileFromDefinition(pd, id);
            }

            for (let cd of this.definition.player.counters) {
                this.gameState.createCounterFromDefinition(cd, id);
            }

            return p;
        }
        Logger.debug('Player join failure');
        return null;
    }

    startGame() {
        while (this.numPlayers < this.definition.minPlayers) {
            // Add bots
            this.handlePlayerJoin(PlayerType.ROBOT);
        }

        // Move to step 1
        this.currentStep = this.definition.getStartingStep();
    }

    clickAction(label: string) {
        const actions = this.currentActions;
        if (!actions) return;

        // Get the object that was clicked on
        let gameObject : GamePiece | undefined = this.gameLabels.getFromLabel(label);

        if (!gameObject) return;

        let actionRole: ActionRole = gameObject.actionRole;

        for (let action of actions) {
            const ctx: ActionContext = { label: label, trigger: action.trigger };
            if (action.trigger.type === TriggerType.CLICK && action.trigger.target == actionRole && evaluate(this, ctx, action.filter)) {
                
                console.log(`Player took action by clicking on label ${label}`);
                evaluate(this, ctx, action.result);
                return true;
            }
        }

        return false;
    }

    get nextPlayerId() {
        return this.#nextPlayerId++;
    }

    get currentActions() {
        return this.currentStep?.actions || [];
    }

    get players() {
        return this.gameState.players;
    }

    get numPlayers() {
        return this.gameState.numPlayers;
    }

    get currentStep() {
        return this.gameState.currentStep;
    }

    get gameLabels() {
        return this.gameState.gameLabels;
    }

    set currentStep(step: StepDefinition | null) {
        this.gameState.currentStep = step;
    }

    set numPlayers(numPlayers) {
        this.gameState.numPlayers = numPlayers;
    }
}