// This is the overarching definition
// All other definitions are held within one large GameDefinition object
// When a player starts a game, they will pass in a GameDefinition object's Rules component

import Action from "./ActionDefinition.js";
import BoardDefinition from "./BoardDefinition.js";
import CounterDefinition from "./CounterDefinition.js";
import GameMeta from "./GameMeta.js";
import GamePhaseDefinition from "./GamePhaseDefinition.js";
import LabelManager, { PhaseLabel, StepLabel } from "./LabelManager.js";
import PileDefinition from "./PileDefinition.js";
import PlayerDefinition from "./PlayerDefinition.js";
import StepDefinition from "./StepDefinition.js";
import { ButtonType, PileState, Visibility } from "../schemas/types.js";
import Game from "../Game/Game.js";
import Logger from "../Components/Logger.js";
import ButtonDefinition from "./ButtonDefinition.js";


/**
 *   Defines the static rules, structure, and metadata for a game.
 * 
 *  A GameDefinition contains the phases, steps, board/player definitions, and action rules needed to create a runtime Game instance.
 */
export default class GameDefinition {
    phases: GamePhaseDefinition[];
    player: PlayerDefinition;
    board: BoardDefinition;
    labelManger: LabelManager;
    gameMeta: GameMeta;
    roles: string[];

    /**
     * Creates a new game definition.
     */
    constructor() {
        this.phases = [];
        this.player = new PlayerDefinition();
        this.board = new BoardDefinition();
        this.labelManger = new LabelManager();
        this.gameMeta = new GameMeta();
        this.roles = [];
    }

    /**
     *  Creates a runtime Game instance from this game definition.
     * 
     * @returns A new game initialized from this definition.
     */
    createGame() {
        return new Game(this);
    }

    /**
     *  Adds a pile definition to a player.
     * @param definition - Configuration for the pile, including its label, display name, action role, initial value, and visibility.
     */
    addPlayerPile(definition: {
            label?: string | undefined,
            displayName?: string | undefined,
            actionRole?: string | undefined,
            initialValue?: PileState | undefined,
            visibility?: Visibility | undefined,
        }) {
        const pile = new PileDefinition({ labelManager: this.labelManger, ... definition });
        this.player.piles.push(pile);
    }

    /**
     *  Adds a counter definition to a player
     * @param definition - Configuration for the counter, including its label, display name, action role, initial value, and visibility.
     */
    addPlayerCounter(definition: {
            label?: string | undefined,
            displayName?: string | undefined,
            actionRole?: string | undefined,
            initialValue?: number | undefined,
            visibility?: Visibility | undefined,
        }) {
        const counter = new CounterDefinition({ labelManager: this.labelManger, ... definition });
        this.player.counters.push(counter);
    }

    /**
     *  Adds a pile definition to the board
     * @param definition - Configuration for the pile, including its label, display name, action role, initial value, and visibility.
     */
    addBoardPile(definition: {
            label?: string | undefined,
            displayName?: string | undefined,
            actionRole?: string | undefined,
            initialValue?: PileState | undefined,
            visibility?: Visibility | undefined,
        }) {
        const pile = new PileDefinition({ labelManager: this.labelManger, ... definition });
        this.board.piles.push(pile);
    }

    /**
     *  Adds a counter definition to the board
     * @param definition - Configuration for the counter, including its label, display name, action role, initial value, and visibility.
     */
    addBoardCounter(definition: {
            label?: string | undefined,
            displayName?: string | undefined,
            actionRole?: string | undefined,
            initialValue?: number | undefined,
            visibility?: Visibility | undefined,
        }) {
        const counter = new CounterDefinition({ labelManager: this.labelManger, ... definition });
        this.board.counters.push(counter);
    }

    addBoardButton(definition: {
        label?: string | undefined,
        displayName?: string | undefined,
        actionRoles?: string[] | undefined,
        type?: ButtonType | undefined,
        range: { min?: number | undefined, max?: number | undefined, increment?: number | undefined } | undefined,
    }) {
        const button = new ButtonDefinition({ labelManager: this.labelManger, ... definition });
        this.board.buttons.push(button);
    }

    /**
     * Adds a phase to the game definition.
     * 
     * @param name - Optional name of the phase.
     * @returns The label assigned to the new phase.
     */
    addPhase(name?: string) {
        const phase = new GamePhaseDefinition(this.labelManger, name);
        this.phases.push(phase);
        return phase.label;
    }

    /**
     *  Adds a step to an existing phase.
     * 
     * @param phaseName - Label of the phase to add the step to.
     * @param stepName - Optional Name of the step.
     * @returns Label assigned to the new step.
     * @throws Error if the phase does not exist.
     */
    addStepToPhase(phaseName: PhaseLabel, stepName?: string) {
        const phase = this.labelManger.getPhaseFromLabel(phaseName);
        if (!phase)
            throw new Error("Failed to add step to nonexistent phase");
        
        const step = new StepDefinition(this.labelManger, stepName);
        phase.addStep(step);
        return step.label;
    }

    /**
     *  Adds an action to an existing step.
     * 
     * @param stepName - Label of the step to add the action to.
     * @param action - An action to append to the step.
     * @throws Error if the step doesn't exist.
     */
    addActionToStep(stepName: StepLabel, action: Action) {
        const step = this.labelManger.getStepFromLabel(stepName);
        if (!step)
            throw new Error("Failed to add action to nonexistent step");

        step.actions.push(action);
    }

    /**
     *  Returns the first step of the first phase.
     * 
     * This is treated as the starting step for the game definition.
     * 
     * @returns The starting step, or null if no valid starting step exists.
     */
    getStartingStep() {
        if (this.phases.length != 0 && this.phases[0]?.steps.length != 0) {
            return this.phases[0]?.steps[0] || null;
        }

        Logger.debug(`No starting step for this game`);
        Logger.debug(`Phases: ${this.phases.reduce((prev, curr, idx, arr) => `${prev} ${curr.label}`, '')}`);
        Logger.debug(`Steps: ${this.phases[0] ? this.phases[0].steps.reduce((prev, curr, idx, arr) => `${prev} ${curr.label}`, '') : ' N/A'}`);

        return null;
    }

    addRole(role: string) {
        if (this.roles.includes(role)) return null;

        this.roles.push(role);

        return role;
    }

    /**
     *  The minimum number of players supported by this game.
     */
    get minPlayers () {
        return this.gameMeta.minPlayers;
    }

    /**
     *  The maximum number of players supported by this game.
     */
    get maxPlayers () {
        return this.gameMeta.maxPlayers;
    }

    /**
     *  Sets the minimum number of players supported by this game.
     */
    set minPlayers (minPlayers: number) {
        this.gameMeta.minPlayers = minPlayers;
    }

    /**
     *  Sets the maximum number of players supported by this game.
     */
    set maxPlayers (maxPlayers: number) {
        this.gameMeta.maxPlayers = maxPlayers;
    }
}