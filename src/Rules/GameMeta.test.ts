import { describe, it, expect } from "vitest";
import GameMeta from "./GameMeta.js";
import { DEFAULT_PILE_LOCATION } from "../schemas/types.js";

describe("GameMeta constructor defaults", () => {
    it("defaults minPlayers to 1 and maxPlayers to 4", () => {
        const meta = new GameMeta({ name: "Game" });

        expect(meta.minPlayers).toBe(1);
        expect(meta.maxPlayers).toBe(4);
    });

    it("uses the given min/max players", () => {
        const meta = new GameMeta({ name: "Game", minPlayers: 2, maxPlayers: 6 });

        expect(meta.minPlayers).toBe(2);
        expect(meta.maxPlayers).toBe(6);
    });

    it("defaults description to the name when not given", () => {
        const meta = new GameMeta({ name: "Poker" });

        expect(meta.description).toBe("Poker");
    });

    it("uses the given description when provided", () => {
        const meta = new GameMeta({ name: "Poker", description: "A card game" });

        expect(meta.description).toBe("A card game");
    });

    it("defaults private to true", () => {
        const meta = new GameMeta({ name: "Poker" });

        expect(meta.private).toBe(true);
    });

    it("defaults variables to an empty object", () => {
        const meta = new GameMeta({ name: "Poker" });

        expect(meta.variables).toEqual({});
    });

    it("includes default locations for pile, button, and counter", () => {
        const meta = new GameMeta({ name: "Poker" });

        expect(meta.locations.DEFAULT_PILE).toBeDefined();
        expect(meta.locations.DEFAULT_BUTTON).toBeDefined();
        expect(meta.locations.DEFAULT_COUNTER).toBeDefined();
    });

    // The constructor loops `for (let i in obj.locations)` and assigns into
    // a map pre-seeded with the three defaults, so a custom key should be
    // added alongside them rather than replacing the whole locations map.
    it("merges in custom locations without dropping the defaults", () => {
        const customLocation = {
            anchor: { x: 1, y: 1 },
            direction: "VERTICAL" as const,
            verticalOffset: 1,
            horizontalOffset: 1,
            wrapAt: 10,
            wrapTo: 0,
        };
        const meta = new GameMeta({ name: "Poker", locations: { CUSTOM: customLocation } });

        expect(meta.locations.CUSTOM).toEqual(customLocation);
        expect(meta.locations.DEFAULT_PILE).toBeDefined();
    });
});

// These setters intentionally couple minPlayers/maxPlayers to prevent the
// object from ever holding an invalid state where min > max.
describe("GameMeta minPlayers/maxPlayers clamping", () => {
    it("raises maxPlayers when minPlayers is set above it", () => {
        const meta = new GameMeta({ name: "Poker", minPlayers: 2, maxPlayers: 4 });

        meta.minPlayers = 6;

        expect(meta.minPlayers).toBe(6);
        expect(meta.maxPlayers).toBe(6);
    });

    it("lowers minPlayers when maxPlayers is set below it", () => {
        const meta = new GameMeta({ name: "Poker", minPlayers: 2, maxPlayers: 4 });

        meta.maxPlayers = 1;

        expect(meta.maxPlayers).toBe(1);
        expect(meta.minPlayers).toBe(1);
    });

    it("leaves maxPlayers unaffected when minPlayers is set within range", () => {
        const meta = new GameMeta({ name: "Poker", minPlayers: 2, maxPlayers: 4 });

        meta.minPlayers = 3;

        expect(meta.minPlayers).toBe(3);
        expect(meta.maxPlayers).toBe(4);
    });
});

// Pure helper used by nextLocation to advance one axis and detect wraparound.
describe("GameMeta.locationOffset", () => {
    it("adds the offset when under the threshold", () => {
        const result = GameMeta.locationOffset(10, 5, 100, -100);

        expect(result).toEqual({ value: 15, wrapped: false });
    });

    // Past `threshold`, the axis resets to `wrapTo` and reports wrapped:true
    // so the caller (nextLocation) knows to bump the other axis.
    it("wraps to the given value when past the threshold", () => {
        const result = GameMeta.locationOffset(95, 10, 100, -100);

        expect(result).toEqual({ value: -100, wrapped: true });
    });
});

describe("GameMeta.nextLocation", () => {
    // First call (no currentLocation) should land exactly on the anchor,
    // no offset applied. This used to be off-by-one; fixed upstream in
    // "Fix skipping the anchor on locations". Pulling values from the
    // constant instead of hardcoding numbers so this doesn't rot again
    // next time the layout grid changes.
    it("returns the anchor untouched when no current location is given", () => {
        const meta = new GameMeta({ name: "Poker" });

        const loc = meta.nextLocation("DEFAULT_PILE");

        expect(loc).toEqual({ x: DEFAULT_PILE_LOCATION.anchor.x, y: DEFAULT_PILE_LOCATION.anchor.y });
    });

    it("offsets horizontally from a given current location", () => {
        const meta = new GameMeta({ name: "Poker" });
        const start = { x: DEFAULT_PILE_LOCATION.anchor.x, y: DEFAULT_PILE_LOCATION.anchor.y };

        const loc = meta.nextLocation("DEFAULT_PILE", start);

        expect(loc).toEqual({
            x: DEFAULT_PILE_LOCATION.anchor.x + DEFAULT_PILE_LOCATION.horizontalOffset,
            y: DEFAULT_PILE_LOCATION.anchor.y,
        });
    });

    // Once the horizontal offset pushes x past wraptAt, x should reset to
    // wrapTo and y should bump by verticalOffset so successive rows don't
    // overlap. Start one offset-step short of the threshold to force it.
    it("wraps and bumps the vertical axis when the horizontal threshold is exceeded", () => {
        const meta = new GameMeta({ name: "Poker" });
        const start = {
            x: DEFAULT_PILE_LOCATION.wrapAt - DEFAULT_PILE_LOCATION.horizontalOffset + 1,
            y: 50,
        };

        const loc = meta.nextLocation("DEFAULT_PILE", start);

        expect(loc).toEqual({ x: DEFAULT_PILE_LOCATION.wrapTo, y: 50 + DEFAULT_PILE_LOCATION.verticalOffset });
    });

    // An unregistered location name has no anchor/offsets to work from, so
    // nextLocation falls back to the origin instead of throwing.
    it("returns the origin for an unknown location name", () => {
        const meta = new GameMeta({ name: "Poker" });

        const loc = meta.nextLocation("NOT_A_LOCATION");

        expect(loc).toEqual({ x: 0, y: 0 });
    });
});
