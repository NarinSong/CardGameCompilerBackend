import Card from "../Components.ts/Card";
import { Label } from "../Rules/LabelManager";
import PileDefinition from "../Rules/PileDefinition";
import { PileState, Visibility } from "../types";
import GameLabels from "./GameLabels";

export default class Pile {
    cards: Card[];
    label: Label;
    visibility: Visibility;

    private constructor(
        initialState: PileState,
        label: Label,
        visibility: Visibility,
        gameLabels: GameLabels
    ) {
        this.cards = Card.fromInitialState(initialState);
        this.label = label;
        this.visibility = visibility;

        gameLabels.registerPile(this, this.label);
    }

    static fromDefinition(definition: PileDefinition, gameLabels: GameLabels) {
        return new Pile(
            definition.initialState,
            definition.label,
            definition.visibility,
            gameLabels
        );
    }

    static create(
        initialState: PileState,
        label: Label,
        visibility: Visibility,
        gameLabels: GameLabels
    ) {
        return new Pile(initialState, label, visibility, gameLabels);
    }
}
