import { describe, it, expect, vi, beforeEach } from "vitest";
import Text from "./Text.js";
import { Visibility } from "../schemas/types.js";

describe("Text", () => {
    let gameLabels: any;

    beforeEach(() => {
        gameLabels = { registerText: vi.fn() };
    });

    // Mirrors how Pile/Counter/Button get built - a private constructor
    // behind two static factories, so this checks .create()'s explicit-args
    // path registers the label and sets every field correctly.
    it("creates a text", () => {
        const location = vi.fn() as any;

        const text = Text.create(
            "You win!",
            "banner" as any,
            Visibility.FACE_UP,
            gameLabels,
            ["BANNER"] as any,
            "Banner",
            location,
        );

        expect(text.text).toBe("You win!");
        expect(text.label).toBe("banner");
        expect(text.visibility).toBe(Visibility.FACE_UP);
        expect(text.actionRoles).toEqual(["BANNER"]);
        expect(text.displayName).toBe("Banner");
        expect(text.location).toBe(location);
        expect(gameLabels.registerText).toHaveBeenCalledWith(text, "banner");
    });

    it("creates a text from definition", () => {
        const definition = {
            text: "Game over",
            label: "status",
            visibility: Visibility.FACE_DOWN,
            actionRoles: ["STATUS"],
            displayName: "Status",
            location: vi.fn() as any,
        } as any;

        const text = Text.fromDefinition(definition, gameLabels);

        expect(text.text).toBe("Game over");
        expect(text.label).toBe("status");
        expect(text.visibility).toBe(Visibility.FACE_DOWN);
        expect(text.actionRoles).toEqual(["STATUS"]);
        expect(text.displayName).toBe("Status");
    });

    // Same per-player label suffixing rule as Counter/Pile - board owner
    // (-1) is left unsuffixed, any real player id gets appended.
    it("suffixes the label with a player id when one is given", () => {
        const definition = {
            text: "Your turn",
            label: "turn",
            visibility: Visibility.FACE_UP,
            actionRoles: ["turn"],
            displayName: "Turn",
            location: vi.fn() as any,
        } as any;

        const text = Text.fromDefinition(definition, gameLabels, 2);

        expect(text.label).toBe("turn2");
    });

    it("does not suffix the label for the board owner (-1)", () => {
        const definition = {
            text: "Game over",
            label: "status",
            visibility: Visibility.FACE_UP,
            actionRoles: ["status"],
            displayName: "Status",
            location: vi.fn() as any,
        } as any;

        const text = Text.fromDefinition(definition, gameLabels, -1);

        expect(text.label).toBe("status");
    });
});
