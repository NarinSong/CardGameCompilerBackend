import { describe, it, expect } from "vitest";
import TextDefinition from "./TextDefinition.js";
import LabelManager from "./LabelManager.js";
import { Visibility } from "../schemas/types.js";

const location = { locationType: 'relative', location: 'DEFAULT_TEXT' } as const;

describe("TextDefinition constructor defaults", () => {
    // An unset text shouldn't come back as undefined - downstream code
    // (TreeParser's TEXT_VALUE_OF, ClientView's textView) reads .text
    // directly as a string, so it needs a safe default to display.
    it("defaults text to an empty string", () => {
        const lm = new LabelManager();
        const text = new TextDefinition({ labelManager: lm, location });

        expect(text.text).toBe("");
    });

    it("uses the given text", () => {
        const lm = new LabelManager();
        const text = new TextDefinition({ labelManager: lm, text: "You win!", location });

        expect(text.text).toBe("You win!");
    });

    // Same label-derived fallback pattern as the other definitions -
    // displayName/actionRoles shouldn't be required just to name a text.
    it("defaults displayName and actionRoles from the label", () => {
        const lm = new LabelManager();
        const text = new TextDefinition({ labelManager: lm, label: "banner", location });

        expect(text.label).toBe("banner");
        expect(text.displayName).toBe("banner");
        expect(text.actionRoles).toEqual(["banner"]);
        expect(text.visibility).toBe(Visibility.FACE_UP);
    });

    it("honors explicit overrides", () => {
        const lm = new LabelManager();
        const text = new TextDefinition({
            labelManager: lm,
            label: "banner",
            displayName: "Win Banner",
            actionRoles: ["announce"],
            visibility: Visibility.FACE_DOWN,
            location,
        });

        expect(text.displayName).toBe("Win Banner");
        expect(text.actionRoles).toEqual(["announce"]);
        expect(text.visibility).toBe(Visibility.FACE_DOWN);
    });
});
