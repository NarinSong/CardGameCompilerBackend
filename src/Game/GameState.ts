// This is what holds the board and players
// It also has the interactions that actions' results are allowed to use

import Card from "../Components/Card";
import GameDefinition from "../Rules/GameDefinition";
import { Label } from "../Rules/LabelManager";
import PileDefinition from "../Rules/PileDefinition";
import StepDefinition from "../Rules/StepDefinition";
import { PileState, Visibility } from "../types";
import Board from "./Board";
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

    addPile(obj: { state?: PileState, name?: string, visibility?: Visibility } = {}) {
        // To the board
        const pile = Pile.create(
            obj.state || PileState.EMPTY,
            obj.name || this.gameLabels.nextId,
            obj.visibility || Visibility.FACE_DOWN,
            this.gameLabels
        );
        this.board.piles.push(pile);

        return pile.label;
    }

    dealCards(from: Label, to: Label, number: number) {
        const p1 = this.gameLabels.getFromLabel(from) as Pile;
        const p2 = this.gameLabels.getFromLabel(to) as Pile;

        if (p1 && p2) {
            Card.dealCards(p1, p2, number);
        }
    }
}