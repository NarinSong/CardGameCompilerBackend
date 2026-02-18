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
import Logger from "../Components/Logger";

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

    addPhase(name?: string) {
        const phase = new GamePhaseDefinition(this.labelManger, name);
        this.phases.push(phase);
        return phase.label;
    }

    addStepToPhase(phaseName: PhaseLabel, stepName?: string) {
        const phase = this.labelManger.getPhaseFromLabel(phaseName);
        if (!phase)
            throw new Error("Failed to add step to nonexistent phase");
        
        const step = new StepDefinition(this.labelManger, stepName);
        phase.addStep(step);
        return step.label;
    }

    addActionToStep(stepName: StepLabel, action: Action) {
        const step = this.labelManger.getStepFromLabel(stepName);
        if (!step)
            throw new Error("Failed to add action to nonexistent step");

        step.actions.push(action);
    }

    getStartingStep() {
        if (this.phases.length != 0 && this.phases[0]?.steps.length != 0) {
            return this.phases[0]?.steps[0] || null;
        }

        Logger.debug(`No starting step for this game`);
        Logger.debug(`Phases: ${this.phases.reduce((prev, curr, idx, arr) => `${prev} ${curr.label}`, '')}`);
        Logger.debug(`Steps: ${this.phases[0] ? this.phases[0].steps.reduce((prev, curr, idx, arr) => `${prev} ${curr.label}`, '') : ' N/A'}`);

        return null;
    }

    get minPlayers () {
        return this.gameMeta.minPlayers;
    }

    get maxPlayers () {
        return this.gameMeta.maxPlayers;
    }

    set minPlayers (minPlayers: number) {
        this.gameMeta.minPlayers = minPlayers;
    }

    set maxPlayers (maxPlayers: number) {
        this.gameMeta.maxPlayers = maxPlayers;
    }
}