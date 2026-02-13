import Card from "../Components.ts/Card";
import { Label } from "../Rules/LabelManager";
import PileDefinition from "../Rules/PileDefinition";
import { Visibility } from "../types";
import GameLabels from "./GameLabels";

export default class Pile {
    cards: Card[];
    label: Label;
    visibility: Visibility;

    
    constructor (definition: PileDefinition, gameLabels: GameLabels) {
        this.cards = Card.fromInitialState(definition.initialState);
        this.label = definition.label;
        this.visibility = definition.visibility;

        gameLabels.registerPile(this, this.label);
    }
}