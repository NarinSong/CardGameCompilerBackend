// Pile is a stack of cards
// It can have a label
// It can have a visibility (whether face-up or face-down, and for which players)
// Also it can have layout (spread vs stack vs singles)
// And type (52-card, dominoes, etc.)

import { Label } from "./LabelManager";
import { PileState, Visibility } from "./TypesDefinition";

export default class PileDefinition {
    label: Label;
    initialState: PileState;
    visibility: Visibility;

    constructor(label: Label, initialState?: PileState, visibility?: Visibility) {
        this.label = label;
        this.initialState = initialState || PileState.EMPTY;
        this.visibility = visibility || Visibility.FACE_UP;
    }

}