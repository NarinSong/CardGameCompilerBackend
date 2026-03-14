import CounterDefinition from "./CounterDefinition";
import GamePhaseDefinition from "./GamePhaseDefinition";
import PileDefinition from "./PileDefinition";
import StepDefinition from "./StepDefinition";


/**
 * Unique identifier for a game object.
 */
export type Label = string;
/**
 * Unique identifier for a game phase.
 */
export type PhaseLabel = string;
/**
 * Unique identifier for a game step.
 */
export type StepLabel = string;
/**
 * Game objects that can be associated with a label.
 */
export type GameObject = PileDefinition | CounterDefinition;


/**
 * Manages labels used to identify game objects, phases, and steps.
 * 
 * The LabelManager generates unique labels and provides lookup functions to retrieve objects associated with those labels.
 */
export default class LabelManager {
    labels: Record<Label, GameObject>;
    stepLabels: Record<StepLabel, StepDefinition>;
    phaseLabels: Record<PhaseLabel, GamePhaseDefinition>;
    #nextId: number;

    /**
     * Creates a new LabelManager object.
     */
    constructor() {
        this.labels = {};
        this.stepLabels = {};
        this.phaseLabels = {};
        this.#nextId = 1000;
    }

    /**
     * Creates a new label for a game object.
     * @param object - The object that will receive the label.
     * @param name - Optional name of this label.
     * @returns The assigned label.
     */
    createLabel(object: GameObject, name?: string) {
        if (!name || this.getFromLabel(name)) {name = this.nextId;}
        this.labels[name] = object;
        return name;
    }

    /**
     * Creates a new label for the phase.
     * @param phase - The phase that will receive a label.
     * @param name - Optional name of this label.
     * @returns The name of this label.
     */
    createPhaseLabel(phase: GamePhaseDefinition, name?: string) {
        if (!name || this.getPhaseFromLabel(name)) {name = this.nextId;}
        this.phaseLabels[name] = phase;
        return name;
    }

    /**
     * Creates a new label for the step.
     * @param step - The step that will receive a label.
     * @param name - Optional name of this label.
     * @returns The name of this label.
     */
    createStepLabel(step: StepDefinition, name?: string) {
        if (!name || this.getStepFromLabel(name)) {name = this.nextId;}
        this.stepLabels[name] = step;
        return name;
    }

    /**
     * Returns the game object associated with a label.
     * @param l - The label of the game object.
     * @returns The game object.
     */
    getFromLabel(l: Label) {
        return this.labels[l];
    }

    /**
     * Returns the phase associated with a label.
     * @param l - The label of the phase.
     * @returns The phase.
     */
    getPhaseFromLabel(l: PhaseLabel) {
        return this.phaseLabels[l];
    }

    /**
     * Returns the step associated with a label.
     * @param l - The label of the step.
     * @returns The step.
     */
    getStepFromLabel(l: StepLabel) {
        return this.stepLabels[l];
    }

    /**
     * Generates the next unique label identifier.
     * @returns The next label id.
     */
    get nextId() {
        return '' + (++this.#nextId);
    }
}