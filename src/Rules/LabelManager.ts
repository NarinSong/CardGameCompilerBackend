import CounterDefinition from "./CounterDefinition";
import GamePhaseDefinition from "./GamePhaseDefinition";
import PileDefinition from "./PileDefinition";
import StepDefinition from "./StepDefinition";

export type Label = string;
export type PhaseLabel = string;
export type StepLabel = string;
export type GameObject = PileDefinition | CounterDefinition;

export default class LabelManager {
    labels: Record<Label, GameObject>;
    stepLabels: Record<StepLabel, StepDefinition>;
    phaseLabels: Record<PhaseLabel, GamePhaseDefinition>;
    #nextId: number;

    constructor() {
        this.labels = {};
        this.stepLabels = {};
        this.phaseLabels = {};
        this.#nextId = 1000;
    }

    createLabel(object: GameObject, name?: string) {
        if (!name || this.getFromLabel(name)) {name = this.nextId;}
        this.labels[name] = object;
        return name;
    }

    createPhaseLabel(phase: GamePhaseDefinition, name?: string) {
        if (!name || this.getPhaseFromLabel(name)) {name = this.nextId;}
        this.phaseLabels[name] = phase;
        return name;
    }

    createStepLabel(step: StepDefinition, name?: string) {
        if (!name || this.getStepFromLabel(name)) {name = this.nextId;}
        this.stepLabels[name] = step;
        return name;
    }

    getFromLabel(l: Label) {
        return this.labels[l];
    }

    getPhaseFromLabel(l: PhaseLabel) {
        return this.phaseLabels[l];
    }

    getStepFromLabel(l: StepLabel) {
        return this.stepLabels[l];
    }

    get nextId() {
        return '' + (++this.#nextId);
    }
}