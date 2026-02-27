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
import { BoardID, PileState, PlayerID, PlayerType, Visibility } from "../types";
import Board from "./Board";
import Counter from "./Counter";
import GameLabels from "./GameLabels";
import Pile from "./Pile";
import Player from "./Player";

export default class GameState {
    gameLabels: GameLabels;
    players: Record<PlayerID, Player>;
    numPlayers: number = 0;
    board: Board;
    currentStep: StepDefinition | null;
    piles: Record<Label, {pile: Pile, owner: PlayerID | BoardID}>;
    counters: Record<Label, {counter: Counter, owner: PlayerID | BoardID}>;

    constructor(definition: GameDefinition) {
        this.gameLabels = new GameLabels(definition.labelManger);
        this.board = new Board(definition.board, this.gameLabels);
        this.players = {};
        this.currentStep = null;
        this.piles = {};
        this.counters = {};
        this.initializeBoard(definition.board);
    }

    initializeBoard(definition: BoardDefinition) {
        for (let pd of definition.piles) {
            this.createPileFromDefinition(pd, -1);
        }

        for (let cd of definition.counters) {
            this.createCounterFromDefinition(cd, -1);
        }
    }

    // --- These functions are available to the "Results" part of actions ---

    createPileFromDefinition(pileDefinition: PileDefinition, id: number) {
        const pile = Pile.fromDefinition(pileDefinition, this.gameLabels);

        this.piles[pile.label] = { pile: pile, owner: id };
    }

    createCounterFromDefinition(counterDefinition: CounterDefinition, id: number) {
        const counter = Counter.fromDefinition(counterDefinition, this.gameLabels);

        this.counters[counter.label] = { counter: counter, owner: id };
    }

    createPile(obj: { state?: PileState | undefined, name?: string | undefined, visibility?: Visibility | undefined, actionRole?: string | undefined, displayName?: string | undefined, owner?: PlayerID | BoardID | undefined } = {}) {
        const name = obj.name        ?? this.gameLabels.nextId;

        const pile = Pile.create(
            obj.state       ?? PileState.EMPTY,
            name,
            obj.visibility  ?? Visibility.FACE_DOWN,
            this.gameLabels,
            obj.actionRole  ?? name,
            obj.displayName ?? name,
        );
        this.piles[name] = { pile: pile, owner: obj.owner ?? -1 };

        return pile.label;
    }

    createPileOnBoard(obj: { state?: PileState | undefined, name?: string | undefined, visibility?: Visibility | undefined, actionRole?: string | undefined, displayName?: string | undefined } = {}) {
        return this.createPile({ ...obj, owner: -1 });
    }

    createPileForPlayer(obj: { state?: PileState | undefined, name?: string | undefined, visibility?: Visibility | undefined, actionRole?: string | undefined, displayName?: string | undefined, owner?: PlayerID | undefined } = {}) {
        return this.createPile(obj);
    }

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

    dealCards(from: Label, to: Label, number: number) {
        const p1 = this.gameLabels.getFromLabel(from) as Pile;
        const p2 = this.gameLabels.getFromLabel(to) as Pile;

        if (p1 && p2) {
            Card.dealCards(p1, p2, number);
        }
    }

    moveToStep(stepName: string) {
        const step = this.gameLabels.getStepFromLabel(stepName);

        if (!step) return;

        this.currentStep = step;
    }
}