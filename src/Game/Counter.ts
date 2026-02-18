import CounterDefinition from "../Rules/CounterDefinition";
import { Label } from "../Rules/LabelManager";
import { ActionRole, DisplayName, Visibility } from "../types";
import GameLabels from "./GameLabels";

export default class Counter {
    label: Label;
    value: number;
    actionRole: ActionRole;
    displayName: DisplayName;
    visibility: Visibility;
    
    private constructor(
        initialState: number,
        label: Label,
        visibility: Visibility,
        gameLabels: GameLabels,
        actionRole: ActionRole,
        displayName: DisplayName,
    ) {
        this.value = initialState;
        this.label = label;
        this.visibility = visibility;
        this.actionRole = actionRole;
        this.displayName = displayName;

        gameLabels.registerCounter(this, this.label);
    }
    
    static fromDefinition(definition: CounterDefinition, gameLabels: GameLabels) {
        return new Counter(
            definition.number,
            definition.label,
            definition.visibility,
            gameLabels,
            definition.actionRole,
            definition.displayName,
        );
    }

    static create(
        initialState: number,
        label: Label,
        visibility: Visibility,
        gameLabels: GameLabels,
        actionRole: ActionRole,
        displayName: DisplayName,
    ) {
        return new Counter(initialState, label, visibility, gameLabels, actionRole, displayName);
    }
}