// Pile is a stack of cards
// It can have a label
// It can have a visibility (whether face-up or face-down, and for which players)
// Also it can have layout (spread vs stack vs singles)
// And type (52-card, dominoes, etc.)

import LabelManager, { Label } from "./LabelManager";
import { PileState, Visibility } from "../types";

export default class PileDefinition {
    label: Label;
    initialState: PileState;
    visibility: Visibility;

    constructor(labelManager: LabelManager, name: string, initialState?: PileState, visibility?: Visibility) {
        this.label = labelManager.createLabel(this, name);
        this.initialState = initialState || PileState.EMPTY;
        this.visibility = visibility || Visibility.FACE_UP;
    }

}