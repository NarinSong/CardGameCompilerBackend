// This is what holds the board and players
// It also has the interactions that actions' results are allowed to use

import Card from "../Components/Card";
import Logger from "../Components/Logger";
import BoardDefinition from "../Rules/BoardDefinition";
import CounterDefinition from "../Rules/CounterDefinition";
import GameDefinition from "../Rules/GameDefinition";
import { Label, StepLabel } from "../Rules/LabelManager";
import PileDefinition from "../Rules/PileDefinition";
import StepDefinition from "../Rules/StepDefinition";
import { BoardID, PileState, PlayerID, PlayerType, Visibility } from "../schemas/types";
import Board from "./Board";
import Counter from "./Counter";
import GameLabels from "./GameLabels";
import Pile from "./Pile";
import Player from "./Player";


/**
 * Represents the game state during runtime.
 * 
 * A GameState tracks the labels in the game, number of players, players, board, current step, piles, and counters.
 */
export default class GameState {
    gameLabels: GameLabels;
    players: Record<PlayerID, Player>;
    numPlayers: number = 0;
    board: Board;
    currentStep: StepDefinition | null;
    piles: Record<Label, {pile: Pile, owner: PlayerID | BoardID}>;
    counters: Record<Label, {counter: Counter, owner: PlayerID | BoardID}>;

    /**
     * Creates a new GameState instance.
     * @param definition - The game definition used to initialize the game labels and board.
     */
    constructor(definition: GameDefinition) {
        this.gameLabels = new GameLabels(definition.labelManger);
        this.board = new Board(definition.board, this.gameLabels);
        this.players = {};
        this.currentStep = null;
        this.piles = {};
        this.counters = {};
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
     * Creates a pile using explicit parameters.
     * @param obj - An object containing the pile's configuration.
     * @returns The pile label.
     */
    createPile(obj: { state?: PileState | undefined, name?: string | undefined, visibility?: Visibility | undefined, actionRoles?: string[] | undefined, displayName?: string | undefined, owner?: PlayerID | BoardID | undefined } = {}) {
        const name = obj.name        ?? this.gameLabels.nextId;

        const pile = Pile.create(
            obj.state       ?? PileState.EMPTY,
            name,
            obj.visibility  ?? Visibility.FACE_DOWN,
            this.gameLabels,
            obj.actionRoles ?? [name],
            obj.displayName ?? name,
        );
        this.piles[name] = { pile: pile, owner: obj.owner ?? -1 };

        return pile.label;
    }

    /**
     * Creates a pile owned by the board.
     * @param obj - An object containing the pile's configuration.
     * @returns The pile label.
     */
    createPileOnBoard(obj: { state?: PileState | undefined, name?: string | undefined, visibility?: Visibility | undefined, actionRoles?: string[] | undefined, displayName?: string | undefined } = {}) {
        return this.createPile({ ...obj, owner: -1 });
    }

    /**
     * Creates a pile owned by a player.
     * @param obj - An object containing the pile's configuration.
     * @returns The pile label.
     */
    createPileForPlayer(obj: { state?: PileState | undefined, name?: string | undefined, visibility?: Visibility | undefined, actionRoles?: string[] | undefined, displayName?: string | undefined, owner?: PlayerID | undefined } = {}) {
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
     * Moves the game state to the next step.
     * @param stepName - The label of the next step.
     * @returns undefined if the step does not exist.
     */
    moveToStep(stepName: string) {
        const step = this.gameLabels.getStepFromLabel(stepName);

        if (!step) return;

        this.currentStep = step;
    }
}