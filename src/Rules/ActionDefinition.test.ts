import { describe, it, expect } from "vitest";
import Action from "./ActionDefinition.js";
import { TriggerType } from "../schemas/types.js";
import { ValueNode } from "../schemas/AST.js";

const trigger = { type: TriggerType.CLICK, target: "deck" } as const;
const result: ValueNode = { type: 'LITERAL', primary: true };

describe("Action constructor", () => {
    it("stores the trigger and result as given", () => {
        const action = new Action(trigger, null, result);

        expect(action.trigger).toBe(trigger);
        expect(action.result).toBe(result);
    });

    // A null filter means "always allowed" — the constructor represents
    // that as an explicit LITERAL(true) node so downstream evaluators
    // don't need a separate null-check code path for unfiltered actions.
    it("defaults the filter to an always-true literal when null", () => {
        const action = new Action(trigger, null, result);

        expect(action.filter).toEqual({ type: 'LITERAL', primary: true });
    });

    // Only a `null` filter should trigger the default; an explicit filter,
    // even one that always evaluates false, must be passed through as-is.
    it("keeps a provided filter instead of defaulting", () => {
        const filter: ValueNode = { type: 'LITERAL', primary: false };
        const action = new Action(trigger, filter, result);

        expect(action.filter).toBe(filter);
    });
});
