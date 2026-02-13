// This is an overarching component for the game flow
// One phase can have any number of steps
// Each phase and step can have associated actions which the players may take
// One game can have any number of phases associated with it

import LabelManager, { PhaseLabel } from "./LabelManager";
import StepDefinition from "./StepDefinition";

export default class GamePhaseDefinition {
    steps: StepDefinition[];
    label: PhaseLabel;

    constructor(labelManager: LabelManager, name?: string, steps?: StepDefinition[]) {
        this.label = labelManager.createPhaseLabel(this, name);
        this.steps = steps || [];
    }

    addStep(step: StepDefinition) {
        this.steps.push(step);
    }
}