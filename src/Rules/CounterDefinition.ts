import { ActionRole, DisplayName, Visibility } from "../schemas/types.js";
import LabelManager, { Label } from "./LabelManager.js";


/**
 * Defines the properties that make up a counter in a game.
 * 
 * A CounterDefinition describes the initial value, label, display name, action roles, and visibility used when creating a counter.
 */
export default class CounterDefinition {
    number: number;
    label: Label;
    displayName: DisplayName;
    actionRoles: ActionRole[];
    visibility: Visibility;

    /**
     * Creates a new counter.
     * @param definition - Configuration for the counter, including its label manager, label, display name, action roles, initial value, and visibility.
     */
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