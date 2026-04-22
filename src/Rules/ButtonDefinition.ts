import LabelManager, { Label } from "./LabelManager.js";
import { ActionRole, DisplayName, ButtonType, Visibility } from "../schemas/types.js";

export default class ButtonDefinition {
    label: Label;
    displayName: DisplayName;
    actionRoles: ActionRole[];
    type: ButtonType;
    range: { min: number | undefined, max: number | undefined, increment: number } | undefined;
    
    constructor(definition: {
        labelManager: LabelManager,
        label?: string | undefined,
        displayName?: string | undefined,
        actionRoles?: string[] | undefined,
        type?: ButtonType | undefined,
        range?: { min?: number | undefined, max?: number | undefined, increment?: number | undefined } | undefined,
    }) {
        this.label = definition.labelManager.createLabel(this, definition.label);
        this.displayName = definition.displayName ?? this.label;
        this.actionRoles = definition.actionRoles ?? [this.label];
        this.type = definition.type ?? ButtonType.CLICK;
        this.range = definition.range ? {
            min: definition.range?.min,
            max: definition.range?.max,
            increment: definition.range?.increment ?? 1
        } : undefined;
    }
}