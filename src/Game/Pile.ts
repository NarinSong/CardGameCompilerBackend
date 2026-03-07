import Card from "../Components/Card";
import { Label } from "../Rules/LabelManager";
import PileDefinition from "../Rules/PileDefinition";
import { ActionRole, DisplayName, PileState, Visibility } from "../types";
import GameLabels from "./GameLabels";

export default class Pile {
    cards: Card[];
    label: Label;
    visibility: Visibility;
    actionRoles: ActionRole[];
    displayName: DisplayName;

    private constructor(
        initialState: PileState,
        label: Label,
        visibility: Visibility,
        gameLabels: GameLabels,
        actionRoles: ActionRole[],
        displayName: DisplayName,
    ) {
        this.cards = Card.fromInitialState(initialState);
        this.label = label;
        this.visibility = visibility;
        this.actionRoles = actionRoles;
        this.displayName = displayName;

        gameLabels.registerPile(this, this.label);
    }

    static fromDefinition(definition: PileDefinition, gameLabels: GameLabels) {
        return new Pile(
            definition.initialState,
            definition.label,
            definition.visibility,
            gameLabels,
            definition.actionRoles,
            definition.displayName,
        );
    }

    static create(
        initialState: PileState,
        label: Label,
        visibility: Visibility,
        gameLabels: GameLabels,
        actionRoles: ActionRole[],
        displayName: DisplayName,
    ) {
        return new Pile(initialState, label, visibility, gameLabels, actionRoles, displayName);
    }
}
