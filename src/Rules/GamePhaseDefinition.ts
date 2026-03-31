// This is an overarching component for the game flow
// One phase can have any number of steps
// Each phase and step can have associated actions which the players may take
// One game can have any number of phases associated with it

import LabelManager, { PhaseLabel } from "./LabelManager.js";
import StepDefinition from "./StepDefinition.js";

/**
 * Defines the properties for a phase in the game.
 * 
 * A GamePhaseDefinition contains the steps that occur in a phase and the label to identify that phase.
 */
export default class GamePhaseDefinition {
    steps: StepDefinition[];
    label: PhaseLabel;

    /**
     * Creates a new game phase definition.
     * @param labelManager - Label manager to create the phase label.
     * @param name - Optional name for the phase.
     * @param steps - Optional steps for the phase.
     */
    constructor(labelManager: LabelManager, name?: string, steps?: StepDefinition[]) {
        this.label = labelManager.createPhaseLabel(this, name);
        this.steps = steps || [];
    }

    /**
     * Adds a step to the phase.
     * @param step - The step to add to the phase.
     */
    addStep(step: StepDefinition) {
        this.steps.push(step);
    }
}