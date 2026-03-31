// This is the sub-component of a Phase
// Each step represents one concrete moment in the game cycle
// Each step has associated actions
// A step must have at least one action

import Action from "./ActionDefinition.js";
import LabelManager, { StepLabel } from "./LabelManager.js";

/**
 * Defines the actions associated with the step and its name.
 * 
 * A StepDefinition contains a list of actions and its label.
 */
export default class StepDefinition {
    actions: Action[];
    label: StepLabel;

    /**
     * Creates a new step definition.
     * @param labelManager - Label manager to create the step label.
     * @param name - Optional name for the step.
     */
    constructor(labelManager: LabelManager, name?: string) {
        this.label = labelManager.createStepLabel(this, name);
        this.actions = [];
    }
}