import { Label } from "../Rules/LabelManager.js";
import ButtonDefinition from "../Rules/ButtonDefinition.js";
import { ActionRole, ButtonType, DisplayName, PileState, Visibility } from "../schemas/types.js";
import GameLabels from "./GameLabels.js";

export default class Button {
    label: Label;
    actionRoles: ActionRole[];
    displayName: DisplayName;
    type: ButtonType;
    range: { min: number | undefined, max: number | undefined, increment: number } | undefined;

    private constructor(
        label: Label,
        gameLabels: GameLabels,
        actionRoles: ActionRole[],
        displayName: DisplayName,
        type: ButtonType,
        range: { min: number | undefined, max: number | undefined, increment: number } | undefined,
    ) {
        this.label = label;
        this.actionRoles = actionRoles;
        this.displayName = displayName;
        this.type = type;
        this.range = range;

        gameLabels.registerButton(this, this.label);
    }

    static fromDefinition(definition: ButtonDefinition, gameLabels: GameLabels) {
        return new Button(
            definition.label,
            gameLabels,
            definition.actionRoles,
            definition.displayName,
            definition.type,
            definition.range,
        );
    }

    static create(
        label: Label,
        gameLabels: GameLabels,
        actionRoles: ActionRole[],
        displayName: DisplayName,
        type: ButtonType,
        range: { min: number | undefined, max: number | undefined, increment: number } | undefined,
    ) {
        return new Button(label, gameLabels, actionRoles, displayName, type, range);
    }
}
