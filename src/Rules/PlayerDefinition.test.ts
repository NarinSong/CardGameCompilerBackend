import { describe, it, expect } from "vitest";
import PlayerDefinition from "./PlayerDefinition.js";
import PileDefinition from "./PileDefinition.js";
import CounterDefinition from "./CounterDefinition.js";
import ButtonDefinition from "./ButtonDefinition.js";
import LabelManager from "./LabelManager.js";

const location = { locationType: 'relative', location: 'DEFAULT_PILE' } as const;

describe("PlayerDefinition constructor", () => {
    it("defaults piles, counters, and buttons to empty arrays", () => {
        const player = new PlayerDefinition();

        expect(player.piles).toEqual([]);
        expect(player.counters).toEqual([]);
        expect(player.buttons).toEqual([]);
    });

    // Constructor uses `arg || []`, so this also confirms passed-in arrays
    // (including a later-mutated empty one) aren't silently replaced.
    it("uses the piles, counters, and buttons passed in", () => {
        const lm = new LabelManager();
        const pile = new PileDefinition({ labelManager: lm, location });
        const counter = new CounterDefinition({ labelManager: lm, location });
        const button = new ButtonDefinition({ labelManager: lm, location });

        const player = new PlayerDefinition([pile], [counter], [button]);

        expect(player.piles).toEqual([pile]);
        expect(player.counters).toEqual([counter]);
        expect(player.buttons).toEqual([button]);
    });
});
