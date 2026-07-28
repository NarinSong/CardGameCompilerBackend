import { describe, it, expect } from "vitest";
import Board from "./Board.js";

// Board's constructor body is empty right now - it takes a BoardDefinition
// and GameLabels but doesn't do anything with either, and nothing else in
// the codebase reads .board off a GameState instance. Looks like a stub
// that was never finished rather than something with real behavior yet.
// This test just confirms it can be constructed without throwing.
describe("Board", () => {
    it("can be constructed without throwing", () => {
        const definition = { piles: [], counters: [], buttons: [] } as any;
        const gameLabels = {} as any;

        expect(() => new Board(definition, gameLabels)).not.toThrow();
    });
});
