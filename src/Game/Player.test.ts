import { describe, it, expect, beforeEach } from "vitest";

import Player from "./Player.js";

describe("Player", () => {
    let definition: any;
    let gameLabels: any;

    beforeEach(() => {
        definition = {
            piles: [],
            counters: [],
        };

        gameLabels = {};
    });

    it("creates a player", () => {
        const player = new Player(
            definition,
            "HUMAN" as any,
            gameLabels,
            1 as any,
        );

        expect(player.type)
            .toBe("HUMAN");

        expect(player.id)
            .toBe(1);
    });

    it("creates a player with a different type and id", () => {
        const player = new Player(
            definition,
            "AI" as any,
            gameLabels,
            5 as any,
        );

        expect(player.type)
            .toBe("AI");

        expect(player.id)
            .toBe(5);
    });
});