// The man, the myth, the legen
// Game is what actually runs when a player is playing a game
// It's created from a GameDefinition
// It's passed down to action results

import GameDefinition from "../Rules/GameDefinition";
import StepDefinition from "../Rules/StepDefinition";
import { ActionRole, PlayerType, TriggerType } from "../schemas/types";
import GameState from "./GameState";
import Player from "./Player";
import { GamePiece } from "./GameLabels";
import Logger from "../Components/Logger";
import { ActionContext, evaluate } from "../Components/TreeParser";

/**
 * Represents a running game instance and its current state.
 * 
 * A Game contains the game definition it was created from and the mutable game state used while the game is being played. 
 */
export default class Game {
    definition: GameDefinition;
    gameState: GameState;

    // Player handling
    #nextPlayerId: number = 0;
    
    /**
     * Creates a new game.
     * @param definition - The game definition used to initialize the game.
     */
    constructor(definition: GameDefinition) {
        this.gameState = new GameState(definition);
        this.definition = definition;
    }

    // Assuming for now that the player can join. No restrictions on when :)
    /**
     * Adds a player to the game if space is available.
     * @param type - Type of player to add.
     * @returns The created player, or null if the game is already full.
     */
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

    /**
     * Fills any required empty player spots with bots and starts the game.
     */
    startGame() {
        while (this.numPlayers < this.definition.minPlayers) {
            // Add bots
            this.handlePlayerJoin(PlayerType.ROBOT);
        }

        // Move to step 1
        this.currentStep = this.definition.getStartingStep();
    }

    /**
     * Evaluates and performs a click-triggered action for a labeled game object.
     * @param label - The label of the clicked game object.
     * @returns True if a valid action was found and executed, false if no valid action was found, or undefined if the label does not map to a game object.
     */
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

    /**
     * Generates the next player id.
     */
    get nextPlayerId() {
        return this.#nextPlayerId++;
    }

    /**
     * Actions available in the current step.
     */
    get currentActions() {
        return this.currentStep?.actions || [];
    }

    /**
     * The players in the game.
     */
    get players() {
        return this.gameState.players;
    }

    /** 
     * The number of players currently in the game.
     */
    get numPlayers() {
        return this.gameState.numPlayers;
    }

    /**
     * The current step of the game.
     */
    get currentStep() {
        return this.gameState.currentStep;
    }

    /**
     * Labels currently registered in the game.
     */
    get gameLabels() {
        return this.gameState.gameLabels;
    }

    /**
     * Sets the current step.
     * @param step - A step definition to set, or null if no step is active.
     */
    set currentStep(step: StepDefinition | null) {
        this.gameState.currentStep = step;
    }

    /**
     * Sets the number of players in the game.
     */
    set numPlayers(numPlayers) {
        this.gameState.numPlayers = numPlayers;
    }
}