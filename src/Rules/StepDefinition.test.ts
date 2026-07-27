import { describe, it, expect } from "vitest";
import StepDefinition from "./StepDefinition.js";
import LabelManager from "./LabelManager.js";

describe("StepDefinition constructor", () => {
    it("registers its label with the label manager", () => {
        const lm = new LabelManager();
        const step = new StepDefinition(lm, "draw-step");

        expect(step.label).toBe("draw-step");
        expect(lm.getStepFromLabel("draw-step")).toBe(step);
    });

    // A step must be reachable via LabelManager even when unnamed, since
    // GameDefinition.addStepToPhase looks steps up purely by label.
    it("generates a label when no name is given", () => {
        const lm = new LabelManager();
        const step = new StepDefinition(lm);

        expect(lm.getStepFromLabel(step.label)).toBe(step);
    });

    it("starts with an empty actions array", () => {
        const lm = new LabelManager();
        const step = new StepDefinition(lm, "draw-step");

        expect(step.actions).toEqual([]);
    });
});
