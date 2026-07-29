import { describe, it, expect } from "vitest";
import LabelManager from "./LabelManager.js";
import PileDefinition from "./PileDefinition.js";
import GamePhaseDefinition from "./GamePhaseDefinition.js";
import StepDefinition from "./StepDefinition.js";
import { Visibility, PileState } from "../schemas/types.js";

function makePile(labelManager: LabelManager, label?: string) {
    return new PileDefinition({
        labelManager,
        label,
        initialState: PileState.EMPTY,
        visibility: Visibility.FACE_UP,
        location: { locationType: 'relative', location: 'DEFAULT_PILE' },
    });
}

describe("LabelManager.createLabel", () => {
    it("assigns the requested name when it is available", () => {
        const lm = new LabelManager();
        const pile = makePile(lm, "deck");

        expect(pile.label).toBe("deck");
        expect(lm.getFromLabel("deck")).toBe(pile);
    });

    // createLabel() falls back to `nextId` (a numeric string) whenever no
    // name is supplied, so an unnamed object should end up keyed by one.
    it("generates an id when no name is given", () => {
        const lm = new LabelManager();
        const pile = makePile(lm);

        expect(pile.label).toBe(lm.getFromLabel(pile.label)!.label);
        expect(Number.isNaN(Number(pile.label))).toBe(false);
    });

    // Requesting an already-used name should not silently overwrite the
    // first object's entry; the second object must get its own generated id
    // and the original mapping must stay intact.
    it("generates a new id if the requested name is already taken", () => {
        const lm = new LabelManager();
        const first = makePile(lm, "deck");
        const second = makePile(lm, "deck");

        expect(second.label).not.toBe("deck");
        expect(lm.getFromLabel("deck")).toBe(first);
    });
});

describe("LabelManager.createPhaseLabel / createStepLabel", () => {
    it("assigns requested names and looks them up", () => {
        const lm = new LabelManager();
        const phase = new GamePhaseDefinition(lm, "setup");
        const step = new StepDefinition(lm, "draw");

        expect(phase.label).toBe("setup");
        expect(lm.getPhaseFromLabel("setup")).toBe(phase);

        expect(step.label).toBe("draw");
        expect(lm.getStepFromLabel("draw")).toBe(step);
    });

    // Same collision-fallback behavior as createLabel, but for phases: the
    // manager keeps phase names in a separate namespace from object labels.
    it("falls back to a generated id on name collision", () => {
        const lm = new LabelManager();
        const first = new GamePhaseDefinition(lm, "setup");
        const second = new GamePhaseDefinition(lm, "setup");

        expect(second.label).not.toBe("setup");
        expect(lm.getPhaseFromLabel("setup")).toBe(first);
    });
});

describe("LabelManager.nextId", () => {
    // nextId is what createLabel/createPhaseLabel/createStepLabel fall back
    // to on collision, so it must never repeat a value across calls.
    it("returns a strictly increasing sequence of string ids", () => {
        const lm = new LabelManager();

        const a = lm.nextId;
        const b = lm.nextId;

        expect(typeof a).toBe("string");
        expect(Number(b)).toBeGreaterThan(Number(a));
    });
});

describe("LabelManager lookups for unknown labels", () => {
    it("returns undefined for labels that were never created", () => {
        const lm = new LabelManager();

        expect(lm.getFromLabel("nope")).toBeUndefined();
        expect(lm.getPhaseFromLabel("nope")).toBeUndefined();
        expect(lm.getStepFromLabel("nope")).toBeUndefined();
    });
});
