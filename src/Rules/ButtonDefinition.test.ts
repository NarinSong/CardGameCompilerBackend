import { describe, it, expect } from "vitest";
import ButtonDefinition from "./ButtonDefinition.js";
import LabelManager from "./LabelManager.js";
import { ButtonType, Visibility } from "../schemas/types.js";

const location = { locationType: 'relative', location: 'DEFAULT_BUTTON' } as const;

describe("ButtonDefinition constructor defaults", () => {
    it("applies default visibility, type, displayName, and actionRoles", () => {
        const lm = new LabelManager();
        const button = new ButtonDefinition({ labelManager: lm, label: "draw-btn", location });

        expect(button.label).toBe("draw-btn");
        expect(button.visibility).toBe(Visibility.FACE_UP);
        expect(button.displayName).toBe("draw-btn");
        expect(button.actionRoles).toEqual(["draw-btn"]);
        expect(button.type).toBe(ButtonType.CLICK);
        expect(button.range).toBeUndefined();
        expect(button.location).toBe(location);
    });

    it("registers the label with the label manager", () => {
        const lm = new LabelManager();
        const button = new ButtonDefinition({ labelManager: lm, label: "draw-btn", location });

        expect(lm.getFromLabel("draw-btn")).toBe(button);
    });

    it("honors explicit overrides", () => {
        const lm = new LabelManager();
        const button = new ButtonDefinition({
            labelManager: lm,
            label: "bet-btn",
            displayName: "Place Bet",
            actionRoles: ["bet", "wager"],
            visibility: Visibility.INVISIBLE,
            type: ButtonType.NUMBER,
            location,
        });

        expect(button.displayName).toBe("Place Bet");
        expect(button.actionRoles).toEqual(["bet", "wager"]);
        expect(button.visibility).toBe(Visibility.INVISIBLE);
        expect(button.type).toBe(ButtonType.NUMBER);
    });

    // range is undefined unless the caller opts in; once they do, a
    // missing increment shouldn't leave the button impossible to step
    // through, so the constructor fills in 1.
    it("fills in a default increment of 1 when a range is given without one", () => {
        const lm = new LabelManager();
        const button = new ButtonDefinition({
            labelManager: lm,
            range: { min: 1, max: 10 },
            location,
        });

        expect(button.range).toEqual({ min: 1, max: 10, increment: 1 });
    });

    it("keeps an explicit increment when provided", () => {
        const lm = new LabelManager();
        const button = new ButtonDefinition({
            labelManager: lm,
            range: { min: 0, max: 100, increment: 5 },
            location,
        });

        expect(button.range).toEqual({ min: 0, max: 100, increment: 5 });
    });
});
