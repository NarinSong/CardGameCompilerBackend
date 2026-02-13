import GamePhaseDefinition from "../Rules/GamePhaseDefinition";
import LabelManager, { Label } from "../Rules/LabelManager";
import StepDefinition from "../Rules/StepDefinition";
import Counter from "./Counter";
import Pile from "./Pile";

type GameObject = Pile | Counter;

export default class GameLabels {
    gameObjectLabels: Record<Label, GameObject>;
    gamePhaseLabels: Record<Label, GamePhaseDefinition>;
    gameStepLabels: Record<Label, StepDefinition>;

    constructor(definition: LabelManager) {
        this.gameObjectLabels = {}; // Will be initialized as we go with the piles and counters
        this.gamePhaseLabels = definition.phaseLabels; // TODO: deep clone
        this.gameStepLabels = definition.stepLabels; // TODO: deep clone
    }

    registerPile(pile: Pile, label: Label) {
        this.gameObjectLabels[label] = pile;
    }

    registerCounter(counter: Counter, label: Label) {
        this.gameObjectLabels[label] = counter;
    }

    // TODO: get by label
}