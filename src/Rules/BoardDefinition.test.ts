import { describe, it, expect } from "vitest";
import BoardDefinition from "./BoardDefinition.js";

describe("BoardDefinition constructor", () => {
    it("initializes piles, counters, and buttons as empty arrays", () => {
        const board = new BoardDefinition();

        expect(board.piles).toEqual([]);
        expect(board.counters).toEqual([]);
        expect(board.buttons).toEqual([]);
    });

    // Guards against a classic JS bug: if the constructor ever used a
    // shared default (e.g. a module-level array) instead of allocating a
    // fresh one per instance, boards would leak piles into each other.
    it("gives each instance its own independent arrays", () => {
        const boardA = new BoardDefinition();
        const boardB = new BoardDefinition();

        boardA.piles.push({} as any);

        expect(boardA.piles.length).toBe(1);
        expect(boardB.piles.length).toBe(0);
    });
});
