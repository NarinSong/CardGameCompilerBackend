import { describe, it, expect } from "vitest";
import GamePhaseDefinition from "./GamePhaseDefinition.js";
import StepDefinition from "./StepDefinition.js";
import LabelManager from "./LabelManager.js";

describe("GamePhaseDefinition constructor", () => {
    it("registers its label with the label manager", () => {
        const lm = new LabelManager();
        const phase = new GamePhaseDefinition(lm, "setup");

        expect(phase.label).toBe("setup");
        expect(lm.getPhaseFromLabel("setup")).toBe(phase);
    });

    it("defaults steps to an empty array when none are given", () => {
        const lm = new LabelManager();
        const phase = new GamePhaseDefinition(lm, "setup");

        expect(phase.steps).toEqual([]);
    });

    it("uses the steps passed in", () => {
        const lm = new LabelManager();
        const step = new StepDefinition(lm, "draw-step");
        const phase = new GamePhaseDefinition(lm, "setup", [step]);

        expect(phase.steps).toEqual([step]);
    });
});

describe("GamePhaseDefinition.addStep", () => {
    it("appends a step to the phase's steps array", () => {
        const lm = new LabelManager();
        const phase = new GamePhaseDefinition(lm, "setup");
        const step = new StepDefinition(lm, "draw-step");

        phase.addStep(step);

        expect(phase.steps).toEqual([step]);
    });

    // Step order determines turn order within a phase, so addStep must
    // append rather than e.g. sort or prepend.
    it("preserves insertion order across multiple steps", () => {
        const lm = new LabelManager();
        const phase = new GamePhaseDefinition(lm, "setup");
        const first = new StepDefinition(lm, "first");
        const second = new StepDefinition(lm, "second");

        phase.addStep(first);
        phase.addStep(second);

        expect(phase.steps).toEqual([first, second]);
    });
});
