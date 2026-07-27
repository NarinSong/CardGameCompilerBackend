import { describe, it, expect } from "vitest";
import PileDefinition from "./PileDefinition.js";
import LabelManager from "./LabelManager.js";
import { PileState, Visibility } from "../schemas/types.js";

const location = { locationType: 'relative', location: 'DEFAULT_PILE' } as const;

describe("PileDefinition constructor defaults", () => {
    it("defaults initialState to EMPTY", () => {
        const lm = new LabelManager();
        const pile = new PileDefinition({ labelManager: lm, location });

        expect(pile.initialState).toBe(PileState.EMPTY);
    });

    it("uses the given initial state", () => {
        const lm = new LabelManager();
        const pile = new PileDefinition({ labelManager: lm, initialState: PileState.SHUFFLED, location });

        expect(pile.initialState).toBe(PileState.SHUFFLED);
    });

    // Same label-derived fallback pattern as CounterDefinition/ButtonDefinition:
    // displayName/actionRoles shouldn't be required just to name a pile.
    it("defaults displayName and actionRoles from the label", () => {
        const lm = new LabelManager();
        const pile = new PileDefinition({ labelManager: lm, label: "deck", location });

        expect(pile.label).toBe("deck");
        expect(pile.displayName).toBe("deck");
        expect(pile.actionRoles).toEqual(["deck"]);
        expect(pile.visibility).toBe(Visibility.FACE_UP);
    });

    it("honors explicit overrides", () => {
        const lm = new LabelManager();
        const pile = new PileDefinition({
            labelManager: lm,
            label: "deck",
            displayName: "Draw Deck",
            actionRoles: ["draw"],
            visibility: Visibility.FACE_DOWN,
            location,
        });

        expect(pile.displayName).toBe("Draw Deck");
        expect(pile.actionRoles).toEqual(["draw"]);
        expect(pile.visibility).toBe(Visibility.FACE_DOWN);
    });
});
