// This is the sub-component of a Phase
// Each step represents one concrete moment in the game cycle
// Each step has associated actions
// A step must have at least one action

export default class Step {
    actions: Action[];

    constructor() {
        this.actions = [];
    }
}