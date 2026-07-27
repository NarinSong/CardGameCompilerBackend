import { describe, it, expect } from "vitest";
import CounterDefinition from "./CounterDefinition.js";
import LabelManager from "./LabelManager.js";
import { Visibility } from "../schemas/types.js";

const location = { locationType: 'relative', location: 'DEFAULT_COUNTER' } as const;

describe("CounterDefinition constructor defaults", () => {
    it("defaults number to 0 when no initial value is given", () => {
        const lm = new LabelManager();
        const counter = new CounterDefinition({ labelManager: lm, location });

        expect(counter.number).toBe(0);
    });

    it("uses the given initial value", () => {
        const lm = new LabelManager();
        const counter = new CounterDefinition({ labelManager: lm, number: 20, location });

        expect(counter.number).toBe(20);
    });

    // displayName and actionRoles both fall back to the assigned label when
    // omitted, so a counter defined with only a label still behaves sanely.
    it("defaults displayName and actionRoles from the label", () => {
        const lm = new LabelManager();
        const counter = new CounterDefinition({ labelManager: lm, label: "score", location });

        expect(counter.label).toBe("score");
        expect(counter.displayName).toBe("score");
        expect(counter.actionRoles).toEqual(["score"]);
        expect(counter.visibility).toBe(Visibility.FACE_UP);
    });

    it("honors explicit overrides", () => {
        const lm = new LabelManager();
        const counter = new CounterDefinition({
            labelManager: lm,
            label: "score",
            displayName: "Score",
            actionRoles: ["increment-score"],
            visibility: Visibility.FACE_DOWN,
            location,
        });

        expect(counter.displayName).toBe("Score");
        expect(counter.actionRoles).toEqual(["increment-score"]);
        expect(counter.visibility).toBe(Visibility.FACE_DOWN);
    });
});
