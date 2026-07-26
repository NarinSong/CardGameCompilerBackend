import { ActionRole, DisplayName, LocationResolver, Visibility } from "../schemas/types.js";
import LabelManager, { Label } from "./LabelManager.js";

export default class TextDefinition {
    text: string;
    label: Label;
    displayName: DisplayName;
    actionRoles: ActionRole[];
    visibility: Visibility;
    location: LocationResolver;

    constructor(definition: {
        labelManager: LabelManager,
        label?: string | undefined,
        displayName?: string | undefined,
        actionRoles?: string[] | undefined,
        text?: string | undefined,
        visibility?: Visibility | undefined,
        location: LocationResolver,
    }) {
        this.text = definition.text ?? '';
        this.label = definition.labelManager.createLabel(this, definition.label);
        this.displayName = definition.displayName ?? this.label;
        this.actionRoles = definition.actionRoles ?? [this.label];
        this.visibility = definition.visibility ?? Visibility.FACE_UP;
        this.location = definition.location; // Location default is handled up a layer
    }
}