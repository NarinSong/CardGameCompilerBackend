// Pile is a stack of cards
// It can have a label
// It can have a visibility (whether face-up or face-down, and for which players)
// Also it can have layout (spread vs stack vs singles)
// And type (52-card, dominoes, etc.)

import LabelManager, { Label } from "./LabelManager.js";
import { ActionRole, DisplayName, PileState, Visibility } from "../schemas/types.js";

/**
 * Defines the properties that make up a pile in a game.
 * 
 * A PileDefinition contains the label, initial state, visibility, display name, and action roles needed to create a pile.
 */
export default class PileDefinition {
    label: Label;
    initialState: PileState;
    visibility: Visibility;
    displayName: DisplayName;
    actionRoles: ActionRole[];
    /**
     * Creates a new pile definition.
     * @param definition - Configuration for the pile, including its label manager, label, display name, action roles, initial value, and visibility.
     */
    constructor(definition: {
        labelManager: LabelManager,
        label?: string | undefined,
        displayName?: string | undefined,
        actionRoles?: string[] | undefined,
        initialValue?: PileState | undefined,
        visibility?: Visibility | undefined,
    }) {
        this.initialState = definition.initialValue ?? PileState.EMPTY;
        this.label = definition.labelManager.createLabel(this, definition.label);
        this.displayName = definition.displayName ?? this.label;
        this.actionRoles = definition.actionRoles ?? [this.label];
        this.visibility = definition.visibility ?? Visibility.FACE_UP;
    }
}