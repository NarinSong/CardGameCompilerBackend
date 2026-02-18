// This is what holds the board and players
// It also has the interactions that actions' results are allowed to use

import Card from "../Components/Card";
import Logger from "../Components/Logger";
import GameDefinition from "../Rules/GameDefinition";
import { Label, StepLabel } from "../Rules/LabelManager";
import PileDefinition from "../Rules/PileDefinition";
import StepDefinition from "../Rules/StepDefinition";
import { PileState, Visibility } from "../types";
import Board from "./Board";
import Counter from "./Counter";
import GameLabels from "./GameLabels";
import Pile from "./Pile";
import Player from "./Player";

export default class GameState {
    gameLabels: GameLabels;
    players: Player[];
    board: Board;
    currentStep: StepDefinition | null;

    constructor(definition: GameDefinition) {
        this.gameLabels = new GameLabels(definition.labelManger);
        this.board = new Board(definition.board, this.gameLabels);
        this.players = [];
        this.currentStep = null;
    }
    

    // --- These functions are available to the "Results" part of actions ---

    addPile(obj: { state?: PileState, name?: string, visibility?: Visibility, actionRole?: string, displayName?: string } = {}) {
        // To the board
        const name = obj.name        ?? this.gameLabels.nextId;

        const pile = Pile.create(
            obj.state       ?? PileState.EMPTY,
            name,
            obj.visibility  ?? Visibility.FACE_DOWN,
            this.gameLabels,
            obj.actionRole  ?? name,
            obj.displayName ?? name,
        );
        this.board.piles.push(pile);

        return pile.label;
    }

    removePileFromBoard(obj: { pile: Label, sendCardsTo?: Label }) {
        const pile: Pile | Counter | undefined = this.gameLabels.getFromLabel(obj.pile);
        const to: Pile | Counter | undefined = obj.sendCardsTo ? this.gameLabels.getFromLabel(obj.sendCardsTo) : undefined;

        if (!pile || !(pile instanceof Pile))
            return;

        const idx = this.board.piles.findIndex((value: Pile) => pile.label == value.label);

        Logger.debug(`Removing pile at index ${idx} from the board. It's label is ${obj.pile}`);

        if (idx === -1)
            return;

        if (to && to instanceof Pile) {
            Card.dealCards(pile, to, 100000);
        }

        this.gameLabels.unregister(obj.pile);
        this.board.piles.splice(idx, 1);
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