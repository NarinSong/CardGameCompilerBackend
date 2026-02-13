// This is what holds the board and players
// It also has the interactions that actions' results are allowed to use

import GameDefinition from "../Rules/GameDefinition";
import StepDefinition from "../Rules/StepDefinition";
import Board from "./Board";
import GameLabels from "./GameLabels";
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
    
}