// The man, the myth, the legen
// Game is what actually runs when a player is playing a game
// It's created from a GameDefinition
// It's passed down to action results

import GameDefinition from "../Rules/GameDefinition.js";
import StepDefinition from "../Rules/StepDefinition.js";
import { ActionRole, PlayerID, PlayerType, TriggerType } from "../schemas/types.js";
import GameState from "./GameState.js";
import Player from "./Player.js";
import { GamePiece } from "./GameLabels.js";
import Logger from "../Components/Logger.js";
import { ActionContext } from "../schemas/AST.js";
import { evaluate } from "../Components/TreeParser.js";
import Card from "../Components/Card";
import Pile from "./Pile";

/**
 * Represents a running game instance and its current state.
 * 
 * A Game contains the game definition it was created from and the mutable game state used while the game is being played. 
 */
export default class Game {
    definition: GameDefinition;
    gameState: GameState;

    aborted = false;

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


    runAutoActions(): void {
        while(true) {
            const action = this.currentActions.find(a=>a.trigger.type == TriggerType.AUTO && evaluate(this, this.buildAutoContext(), a.filter));
            if (!action) return;

            if(this.gameState.incrementAutoActionCount()){
                this.aborted = true;
                return;
            }

            evaluate(this, this.buildAutoContext(), action.result)

        }
    }

    buildAutoContext(): ActionContext {
        return { trigger: {type: TriggerType.AUTO}, player: -1};
    }

    // Assuming for now that the player can join. No restrictions on when :)
    /**
     * Adds a player to the game if space is available.
     * @param type - Type of player to add.
     * @returns The created player, or null if the game is already full.
     */
    handlePlayerJoin(type: PlayerType): Player | null {
        Logger.debug('Player joined');
        if (this.numPlayers < this.definition.maxPlayers) {
            // Assign the new player's id
            let id = this.nextPlayerId;

            const p = new Player(this.definition.player, type, this.gameLabels, id);
            this.players[id] = p;
            this.numPlayers++;

            // Create piles, counters, and buttons
            for (let pd of this.definition.player.piles) {
                this.gameState.createPileFromDefinition(pd, id);
            }

            for (let cd of this.definition.player.counters) {
                this.gameState.createCounterFromDefinition(cd, id);
            }

            for (let bd of this.definition.player.buttons) {
                this.gameState.createButtonFromDefinition(bd, id);
            }

            return p;
        }
        Logger.debug('Player join failure');
        return null;
    }

    /**
     * Fills any required empty player spots with bots and starts the game.
     */
    startGame(): void {
        while (this.numPlayers < this.definition.minPlayers) {
            // Add bots
            this.handlePlayerJoin(PlayerType.ROBOT);
        }

        // Move to step 1
        this.currentStep = this.definition.getStartingStep();

        this.runAutoActions();
    }

    /**
     * Evaluates and performs a click-triggered action for a labeled game object.
     * @param label - The label of the clicked game object.
     * @param cardId - (Optional) the card Id clicked if passed
     * @param playerId
     * @returns True if a valid action was found and executed, false if no valid action was found or if the label does not map to a game object.
     */
    clickAction(label: string, cardId: number|undefined, playerId: PlayerID): boolean {
        const actions = this.currentActions;
        if (!actions) return false;

        // Get the object that was clicked on
        let gameObject : GamePiece | undefined = this.gameLabels.getFromLabel(label);

        if (!gameObject) return false;

        let actionRoles: ActionRole[] = gameObject.actionRoles;

        const card: Card|undefined = this.getCard(cardId)

        for (let action of actions) {
            const ctx: ActionContext = { label: label, trigger: action.trigger, player: playerId, card: card };
            if (action.trigger.type === TriggerType.CLICK && actionRoles.includes(action.trigger.target) && evaluate(this, ctx, action.filter)) {

                console.log(`Player took action by clicking on label ${label}`);
                this.gameState.resetAutoActionCount();
                evaluate(this, ctx, action.result);
                this.runAutoActions();
                return true;
            }

        }

        return false;
    }

    /**
     * Returns the player associated with a given player id.
     * @param id - The id of the player to retrieve.
     * @returns The player associated with the id, or undefined if not found.
     */
    getPlayer(id: PlayerID): Player | undefined {
        return this.gameState.players[id];
    }

    /**
     * Returns the card associated with a given card id.
     * @param cardId - The id of the card to retrieve.
     * @returns The card associated with the id, or undefined if not found.
     */
    getCard(cardId: number|undefined): Card | undefined {
        if (cardId === undefined) {return undefined};

        for (const label in this.gameState.piles) {
            const found = this.gameState.piles[label]?.pile.cards.find(c => c.id === cardId);
            if (found) return found;
        }
        return undefined;

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