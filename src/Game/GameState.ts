// This is what holds the board and players
// It also has the interactions that actions' results are allowed to use

import Card from "../Components/Card.js";
import { coerceLocation } from "../Components/LocationUtils.js";
import BoardDefinition from "../Rules/BoardDefinition.js";
import ButtonDefinition from "../Rules/ButtonDefinition.js";
import CounterDefinition from "../Rules/CounterDefinition.js";
import GameDefinition from "../Rules/GameDefinition.js";
import GameMeta from "../Rules/GameMeta.js";
import { Label, PhaseLabel, StepLabel } from "../Rules/LabelManager.js";
import PileDefinition from "../Rules/PileDefinition.js";
import StepDefinition from "../Rules/StepDefinition.js";
import { ValueReturn, ValueTypeName, ValueTypeNameSchema, ValueTypeValues, ValueTypeValuesSchema } from "../schemas/Blocks.js";
import { BoardID, ButtonRange, ButtonType, Location, LocationResolver, PileState, PlayerID, Visibility } from "../schemas/types.js";
import Board from "./Board.js";
import Button from "./Button.js";
import Counter from "./Counter.js";
import GameLabels from "./GameLabels.js";
import Pile from "./Pile.js";
import Player from "./Player.js";

type EmptyVariableArrayType = Record<string, Record<string, ValueTypeValues>>;
type VariableArrayType = Record<ValueTypeName, Record<string, ValueTypeValues>>;

/**
 * Represents the game state during runtime.
 * 
 * A GameState tracks the labels in the game, number of players, players, roles, board, current step, piles, counters, buttons, and variables.
 */
export default class GameState {
    gameLabels: GameLabels;
    players: Record<PlayerID, Player>;
    roles: Record<string, PlayerID[]>; 
    numPlayers: number = 0;
    board: Board;
    currentStep: StepDefinition | null;
    piles: Record<Label, {pile: Pile, owner: PlayerID | BoardID}>;
    counters: Record<Label, {counter: Counter, owner: PlayerID | BoardID}>;
    buttons: Record<Label, {button: Button, owner: PlayerID | BoardID}>;
    gameMeta: GameMeta;

    variables: VariableArrayType;


    /**
     * Creates a new GameState instance.
     * @param definition - The game definition used to initialize the game labels and board.
     */
    constructor(definition: GameDefinition) {
        this.gameLabels = new GameLabels(definition.labelManger);
        this.board = new Board(definition.board, this.gameLabels);
        this.players = {};
        this.roles = {}; // Assigned with a 'time' Trigger
        this.currentStep = null;
        this.piles = {};
        this.counters = {};
        this.buttons = {};
        this.variables = Object.keys(ValueTypeNameSchema).reduce<EmptyVariableArrayType>(
            (prev: EmptyVariableArrayType, curr: string) => { return {...prev, [curr]: {} } }, {}
        ) as VariableArrayType;

        this.gameMeta = definition.gameMeta; // Linked. Game Meta should be *immutable*
        this.initializeBoard(definition.board);
    }

    /**
     * Initializes the counters and piles for the board.
     * @param definition - The board definition used to initialize the board's piles and counters.
     */
    initializeBoard(definition: BoardDefinition) {
        for (let pd of definition.piles) {
            this.createPileFromDefinition(pd, -1);
        }

        for (let cd of definition.counters) {
            this.createCounterFromDefinition(cd, -1);
        }

        for (let bd of definition.buttons) {
            this.createButtonFromDefinition(bd, -1);
        }
    }

    // --- These functions are available to the "Results" part of actions ---

    /**
     * Creates a pile from a pile definition.
     * @param pileDefinition - Configuration for the pile, including its label, display name, action roles, initial state, and visibility.
     * @param id - The identifier for the owner of the pile.
     */
    createPileFromDefinition(pileDefinition: PileDefinition, id: number) {
        const pile = Pile.fromDefinition(pileDefinition, this.gameLabels);

        this.piles[pile.label] = { pile: pile, owner: id };
    }

    /**
     * Creates a counter from a counter definition.
     * @param counterDefinition - Configuration for the counter, including its label, display name, action roles, initial state, and visibility.
     * @param id - The identifier for the owner of the counter.
     */
    createCounterFromDefinition(counterDefinition: CounterDefinition, id: number) {
        const counter = Counter.fromDefinition(counterDefinition, this.gameLabels);

        this.counters[counter.label] = { counter: counter, owner: id };
    }

    /**
     * Creates a button from a button definition.
     * @param buttonDefinition - Configuration for the button, including its label, display name, action roles, type, and range if applicable.
     * @param id - The identifier for the owner of the button.
     */
    createButtonFromDefinition(buttonDefinition: ButtonDefinition, id: number) {
        const button = Button.fromDefinition(buttonDefinition, this.gameLabels);

        this.buttons[button.label] = { button: button, owner: id };
    }

    /**
     * Creates a pile using explicit parameters.
     * @param obj - An object containing the pile's configuration.
     * @returns The pile label.
     */
    createPile(obj: { state?: PileState | undefined, name?: string | undefined, visibility?: Visibility | undefined, actionRoles?: string[] | undefined, displayName?: string | undefined, owner?: PlayerID | BoardID | undefined, location?: LocationResolver | undefined } = {}) {
        const name = obj.name        ?? this.gameLabels.nextId;

        const pile = Pile.create(
            obj.state       ?? PileState.EMPTY,
            name,
            obj.visibility  ?? Visibility.FACE_DOWN,
            this.gameLabels,
            obj.actionRoles ?? [name],
            obj.displayName ?? name,
            obj.location ?? coerceLocation(obj.location, 'PILE'),
        );
        this.piles[name] = { pile: pile, owner: obj.owner ?? -1 };

        return pile.label;
    }

    /**
     * Creates a pile owned by the board.
     * @param obj - An object containing the pile's configuration.
     * @returns The pile label.
     */
    createPileOnBoard(obj: { state?: PileState | undefined, name?: string | undefined, visibility?: Visibility | undefined, actionRoles?: string[] | undefined, displayName?: string | undefined, location?: LocationResolver | undefined } = {}) {
        return this.createPile({ ...obj, owner: -1 });
    }

    /**
     * Creates a pile owned by a player.
     * @param obj - An object containing the pile's configuration.
     * @returns The pile label.
     */
    createPileForPlayer(obj: { state?: PileState | undefined, name?: string | undefined, visibility?: Visibility | undefined, actionRoles?: string[] | undefined, displayName?: string | undefined, owner?: PlayerID | undefined, location?: LocationResolver | undefined } = {}) {
        return this.createPile(obj);
    }

    /**
     * Removes a pile by label.
     * @param pile - The label of the pile to remove.
     * @param sendCardsTo - Optional pile label to receive the removed pile's cards.
     * @returns undefined if no pile with that label exists.
     */
    removePileByLabel(pile: Label, sendCardsTo?: Label | undefined) {
        const mainPile: Pile | undefined = this.piles[pile]?.pile;
        const to: Pile | undefined = sendCardsTo ? this.piles[sendCardsTo]?.pile : undefined;

        if (!mainPile)
            return;

        if (to) {
            Card.dealCards(mainPile, to, 100000);
        }

        this.gameLabels.unregister(pile);
        delete this.piles[pile];
    }

    /**
     * Removes a button by label.
     * @param button - The label of the button to remove.
     * @returns undefined if no button with that label exists.
     */
    removeButtonByLabel(button: Label) {
        const mainButton: Button | undefined = this.buttons[button]?.button;

        if (!mainButton)
            return;

        this.gameLabels.unregister(button);
        delete this.buttons[button];
    }

    /**
     * Removes a counter by label.
     * @param counter - The label of the counter to remove.
     * @param sendValueTo - Optional counter label to receive the removed counter's value.
     * @returns undefined if no counter with that label exists.
     */
    removeCounterByLabel(counter: Label, sendValueTo?: Label | undefined) {
        const mainCounter: Counter | undefined = this.counters[counter]?.counter;
        const to: Counter | undefined = sendValueTo ? this.counters[sendValueTo]?.counter : undefined;

        if (!mainCounter)
            return;

        if (to) {
            to.value += mainCounter.value;
        }

        this.gameLabels.unregister(counter);
        delete this.counters[counter];
    }

    /**
     * Creates a button using explicit parameters.
     * @param obj - An object containing the button's configuration.
     * @returns The button label.
     */
    createButton(obj: { name?: string | undefined, visibility?: Visibility | undefined, actionRoles?: string[] | undefined, displayName?: string | undefined, owner?: PlayerID | BoardID | undefined, type?: ButtonType | undefined, range?: ButtonRange | undefined, location?: LocationResolver | undefined } = {}) {
        const name = obj.name        ?? this.gameLabels.nextId;

        const button = Button.create(
            name,
            obj.visibility  ?? Visibility.FACE_DOWN,
            this.gameLabels,
            obj.actionRoles ?? [name],
            obj.displayName ?? name,
            obj.type ?? 'CLICK',
            obj.range,
            obj.location ?? coerceLocation(obj.location, 'BUTTON'),
        );

        this.buttons[name] = { button: button, owner: obj.owner ?? -1 };

        return button.label;
    }

    /**
     * Creates a counter using explicit parameters.
     * @param obj - An object containing the counter's configuration.
     * @returns The counter label.
     */
    createCounter(obj: { state?: number | undefined, name?: string | undefined, visibility?: Visibility | undefined, actionRoles?: string[] | undefined, displayName?: string | undefined, owner?: PlayerID | BoardID | undefined, location?: LocationResolver | undefined } = {}) {
        const name = obj.name        ?? this.gameLabels.nextId;

        const counter = Counter.create(
            obj.state       ?? 0,
            name,
            obj.visibility  ?? Visibility.FACE_DOWN,
            this.gameLabels,
            obj.actionRoles ?? [name],
            obj.displayName ?? name,
            obj.location ?? coerceLocation(obj.location, 'COUNTER'),
        );
        this.counters[name] = { counter: counter, owner: obj.owner ?? -1 };

        return counter.label;
    }

    /**
     * Deal a number of cards from one pile to another.
     * @param from - The pile where the cards will be dealt from.
     * @param to - The pile that will receive the dealt cards.
     * @param number - The number of cards you would like to deal.
     */
    dealCards(from: Label, to: Label, number: number) {
        const p1 = this.gameLabels.getFromLabel(from) as Pile;
        const p2 = this.gameLabels.getFromLabel(to) as Pile;

        if (p1 && p2) {
            Card.dealCards(p1, p2, number);
        }
    }

    /**
     * Shuffles the cards in a pile.
     * @param pile - The label of the pile to shuffle.
     */
    shuffle(pile: Label) {
        const p1 = this.gameLabels.getFromLabel(pile) as Pile;

        if (p1) {
            p1.cards = Card.shuffle(p1.cards);
        }
    }

    /**
     * Moves the game state to the first step of a given phase.
     * @param phaseName - The label of the phase to move to.
     * @returns undefined if the phase does not exist or has no steps.
     */
    moveToPhase(phaseName: PhaseLabel) {
        const phase = this.gameLabels.getPhaseFromLabel(phaseName);

        if (!phase || !phase.steps[0]) return;

        this.currentStep = phase.steps[0];
    }

    /**
     * Moves the game state to the next step.
     * @param stepName - The label of the next step.
     * @returns undefined if the step does not exist.
     */
    moveToStep(stepName: StepLabel) {
        const step = this.gameLabels.getStepFromLabel(stepName);

        if (!step) return;

        this.currentStep = step;
    }

    /**
     * Retrieves a variable value from the game state.
     * @param type - The type of the variable.
     * @param name - The name of the variable.
     * @returns The value of the variable, or undefined if not found.
     */
    getVariable(type: ValueTypeName, name: string) {
        return this.variables[type][name];
    }

    /**
     * Sets a variable value in the game state.
     * @param type - The type of the variable.
     * @param name - The name of the variable.
     * @param value - The value to set.
     */
    setVariable(type: ValueTypeName, name: string, value: ValueTypeValues) {
        this.variables[type][name] = value;
    }
}