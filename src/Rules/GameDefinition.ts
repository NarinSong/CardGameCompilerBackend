// This is the overarching definition
// All other definitions are held within one large GameDefinition object
// When a player starts a game, they will pass in a GameDefinition object's Rules component

import Action from "./ActionDefinition";
import BoardDefinition from "./BoardDefinition";
import CounterDefinition from "./CounterDefinition";
import GameMeta from "./GameMeta";
import GamePhaseDefinition from "./GamePhaseDefinition";
import LabelManager, { PhaseLabel, StepLabel } from "./LabelManager";
import PileDefinition from "./PileDefinition";
import PlayerDefinition from "./PlayerDefinition";
import StepDefinition from "./StepDefinition";
import { PileState, Visibility } from "../types";
import Game from "../Game/Game";

export default class GameDefinition {
    phases: GamePhaseDefinition[];
    player: PlayerDefinition;
    board: BoardDefinition;
    labelManger: LabelManager;
    gameMeta: GameMeta;

    constructor() {
        this.phases = [];
        this.player = new PlayerDefinition();
        this.board = new BoardDefinition();
        this.labelManger = new LabelManager();
        this.gameMeta = new GameMeta();
    }

    createGame() {
        return new Game(this);
    }

    addPlayerPile(name: string, startingState?: PileState, visibility?: Visibility) {
        const pile = new PileDefinition(this.labelManger, name, startingState, visibility);
        this.player.piles.push(pile);
    }

    addPlayerCounter(name: string, startingValue?: number) {
        const counter = new CounterDefinition(this.labelManger, name, startingValue);
        this.player.counters.push(counter);
    }

    addBoardPile(name: string, startingState?: PileState, visibility?: Visibility) {
        const pile = new PileDefinition(this.labelManger, name, startingState, visibility);
        this.board.piles.push(pile);
    }

    addBoardCounter(name: string, startingValue?: number) {
        const counter = new CounterDefinition(this.labelManger, name, startingValue);
        this.board.counters.push(counter);
    }

    addPhase(name?: string) {
        const phase = new GamePhaseDefinition(this.labelManger, name);
        return phase.label;
    }

    addStepToPhase(phaseName: PhaseLabel, stepName?: string) {
        const phase = this.labelManger.getPhaseFromLabel(phaseName);
        if (!phase)
            throw new Error("Failed to add step to nonexistent phase");
        
        const step = new StepDefinition(this.labelManger, stepName);
        return step.label;
    }

    addActionToStep(stepName: StepLabel, action: Action) {
        const step = this.labelManger.getStepFromLabel(stepName);
        if (!step)
            throw new Error("Failed to add action to nonexistent step");

        step.actions.push(action);
    }

    getStartingStep() {
        if (this.phases.length && this.phases[0]?.steps.length) {
            return this.phases[0].steps[0];
        }

        return null;
    }

    set minPlayers (minPlayers: number) {
        this.gameMeta.minPlayers = minPlayers;
    }

    set maxPlayers (maxPlayers: number) {
        this.gameMeta.maxPlayers = maxPlayers;
    }
}