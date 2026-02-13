// This is the sub-component of a Phase
// Each step represents one concrete moment in the game cycle
// Each step has associated actions
// A step must have at least one action

import Action from "./ActionDefinition";
import LabelManager, { StepLabel } from "./LabelManager";

export default class StepDefinition {
    actions: Action[];
    label: StepLabel;

    constructor(labelManager: LabelManager, name?: string) {
        this.label = labelManager.createStepLabel(this, name);
        this.actions = [];
    }
}