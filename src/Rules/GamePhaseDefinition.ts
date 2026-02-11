// This is an overarching component for the game flow
// One phase can have any number of steps
// Each phase and step can have associated actions which the players may take
// One game can have any number of phases associated with it

export default class GamePhaseDefinition {
    this.steps: Step[];

    constructor() {
        this.steps = [];
    }
}