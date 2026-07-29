import { describe, it, expect, vi, beforeEach } from "vitest";
import Counter from "./Counter.js";
import { Visibility } from "../schemas/types.js";

describe("Counter", () => {
    let gameLabels: any;

    beforeEach(() => {
        gameLabels = { registerCounter: vi.fn() };
    });

    it("creates a counter", () => {
        const location = vi.fn() as any;

        const counter = Counter.create(
            10,
            "score" as any,
            Visibility.FACE_UP,
            gameLabels,
            ["SCORE"] as any,
            "Score",
            location,
        );

        expect(counter.value).toBe(10);
        expect(counter.label).toBe("score");
        expect(counter.visibility).toBe(Visibility.FACE_UP);
        expect(counter.actionRoles).toEqual(["SCORE"]);
        expect(counter.displayName).toBe("Score");
        expect(counter.location).toBe(location);
        expect(gameLabels.registerCounter).toHaveBeenCalledWith(counter, "score");
    });

    it("creates a counter from definition", () => {
        const location = vi.fn() as any;

        const definition = {
            number: 5,
            label: "pot",
            visibility: Visibility.FACE_DOWN,
            actionRoles: ["POT"],
            displayName: "Pot",
            location,
        } as any;

        const counter = Counter.fromDefinition(definition, gameLabels);

        expect(counter.value).toBe(5);
        expect(counter.label).toBe("pot");
        expect(counter.visibility).toBe(Visibility.FACE_DOWN);
        expect(counter.actionRoles).toEqual(["POT"]);
        expect(counter.displayName).toBe("Pot");
    });

    // Per-player counters get the player id appended to their label so each
    // player's copy doesn't collide with anyone else's - the board owner
    // (-1) is the one case that should NOT get suffixed.
    it("suffixes the label with a player id when one is given", () => {
        const definition = {
            number: 0,
            label: "score",
            visibility: Visibility.FACE_UP,
            actionRoles: ["score"],
            displayName: "Score",
            location: vi.fn() as any,
        } as any;

        const counter = Counter.fromDefinition(definition, gameLabels, 3);

        expect(counter.label).toBe("score3");
    });

    it("does not suffix the label for the board owner (-1)", () => {
        const definition = {
            number: 0,
            label: "pot",
            visibility: Visibility.FACE_UP,
            actionRoles: ["pot"],
            displayName: "Pot",
            location: vi.fn() as any,
        } as any;

        const counter = Counter.fromDefinition(definition, gameLabels, -1);

        expect(counter.label).toBe("pot");
    });
});
