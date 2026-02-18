// Pile is a stack of cards
// It can have a label
// It can have a visibility (whether face-up or face-down, and for which players)
// Also it can have layout (spread vs stack vs singles)
// And type (52-card, dominoes, etc.)

import LabelManager, { Label } from "./LabelManager";
import { ActionRole, DisplayName, PileState, Visibility } from "../types";

export default class PileDefinition {
    label: Label;
    initialState: PileState;
    visibility: Visibility;
    displayName: DisplayName;
    actionRole: ActionRole;
    
    constructor(definition: {
        labelManager: LabelManager,
        label?: string | undefined,
        displayName?: string | undefined,
        actionRole?: string | undefined,
        initialValue?: PileState | undefined,
        visibility?: Visibility | undefined,
    }) {
        this.initialState = definition.initialValue ?? PileState.EMPTY;
        this.label = definition.labelManager.createLabel(this, definition.label);
        this.displayName = definition.displayName ?? this.label;
        this.actionRole = definition.actionRole ?? this.label;
        this.visibility = definition.visibility ?? Visibility.FACE_UP;
    }
}