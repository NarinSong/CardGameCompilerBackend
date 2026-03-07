import CounterDefinition from "../Rules/CounterDefinition";
import { Label } from "../Rules/LabelManager";
import { ActionRole, DisplayName, Visibility } from "../schemas/types";
import GameLabels from "./GameLabels";

export default class Counter {
    label: Label;
    value: number;
    actionRoles: ActionRole[];
    displayName: DisplayName;
    visibility: Visibility;
    
    private constructor(
        initialState: number,
        label: Label,
        visibility: Visibility,
        gameLabels: GameLabels,
        actionRoles: ActionRole[],
        displayName: DisplayName,
    ) {
        this.value = initialState;
        this.label = label;
        this.visibility = visibility;
        this.actionRoles = actionRoles;
        this.displayName = displayName;

        gameLabels.registerCounter(this, this.label);
    }
    
    static fromDefinition(definition: CounterDefinition, gameLabels: GameLabels) {
        return new Counter(
            definition.number,
            definition.label,
            definition.visibility,
            gameLabels,
            definition.actionRoles,
            definition.displayName,
        );
    }

    static create(
        initialState: number,
        label: Label,
        visibility: Visibility,
        gameLabels: GameLabels,
        actionRoles: ActionRole[],
        displayName: DisplayName,
    ) {
        return new Counter(initialState, label, visibility, gameLabels, actionRoles, displayName);
    }
}