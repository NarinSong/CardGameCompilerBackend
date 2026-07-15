import { describe, it, expect, vi, beforeEach } from "vitest";

import Button from "./Button.js";

import {
    Visibility,
    ButtonType,
} from "../schemas/types.js";

describe("Button", () => {

    let gameLabels: any;

    beforeEach(() => {

        gameLabels = {
            registerButton: vi.fn(),
        };

    });

    it("creates a button", () => {

        const location = vi.fn();

        const button = Button.create(
            "draw" as any,
            Visibility.FACE_UP,
            gameLabels,
            ["DRAW"] as any,
            "Draw",
            ButtonType.ACTION,
            undefined,
            location,
        );

        expect(button.label)
            .toBe("draw");

        expect(button.visibility)
            .toBe(Visibility.FACE_UP);

        expect(button.actionRoles)
            .toEqual(["DRAW"]);

        expect(button.displayName)
            .toBe("Draw");

        expect(button.type)
            .toBe(ButtonType.ACTION);

        expect(button.range)
            .toBeUndefined();

        expect(button.location)
            .toBe(location);

        expect(gameLabels.registerButton)
            .toHaveBeenCalledWith(button, "draw");

    });

    it("creates a button from definition", () => {

        const location = vi.fn();

        const definition = {
            label: "roll",
            visibility: Visibility.FACE_DOWN,
            actionRoles: ["ROLL"],
            displayName: "Roll Dice",
            type: ButtonType.RANGE,
            range: {
                min: 1,
                max: 6,
            },
            location,
        };

        const button = Button.fromDefinition(
            definition as any,
            gameLabels,
        );

        expect(button.label)
            .toBe("roll");

        expect(button.visibility)
            .toBe(Visibility.FACE_DOWN);

        expect(button.actionRoles)
            .toEqual(["ROLL"]);

        expect(button.displayName)
            .toBe("Roll Dice");

        expect(button.type)
            .toBe(ButtonType.RANGE);

        expect(button.range)
            .toEqual({
                min: 1,
                max: 6,
            });

        expect(button.location)
            .toBe(location);

        expect(gameLabels.registerButton)
            .toHaveBeenCalledWith(button, "roll");

    });

});