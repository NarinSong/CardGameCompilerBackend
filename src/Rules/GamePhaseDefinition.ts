// This is an overarching component for the game flow
// One phase can have any number of steps
// Each phase and step can have associated actions which the players may take
// One game can have any number of phases associated with it

import Step from "./StepDefinition";

export default class GamePhaseDefinition {
    steps: Step[];

    constructor(steps?: Step[]) {
        this.steps = steps || [];
    }

    addStep(step: Step) {
        this.steps.push(step);
    }
}