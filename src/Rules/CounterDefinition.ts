import { ActionRole, DisplayName, Visibility } from "../schemas/types";
import LabelManager, { Label } from "./LabelManager";

export default class CounterDefinition {
    number: number;
    label: Label;
    displayName: DisplayName;
    actionRoles: ActionRole[];
    visibility: Visibility;

    constructor(definition: {
        labelManager: LabelManager,
        label?: string | undefined,
        displayName?: string | undefined,
        actionRoles?: string[] | undefined,
        initialValue?: number | undefined,
        visibility?: Visibility | undefined,
    }) {
        this.number = definition.initialValue ?? 0;
        this.label = definition.labelManager.createLabel(this, definition.label);
        this.displayName = definition.displayName ?? this.label;
        this.actionRoles = definition.actionRoles ?? [this.label];
        this.visibility = definition.visibility ?? Visibility.FACE_UP;
    }
}