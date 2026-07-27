import { describe, it, expect } from "vitest";
import GameDefinition from "./GameDefinition.js";
import Action from "./ActionDefinition.js";
import Game from "../Game/Game.js";
import { TriggerType } from "../schemas/types.js";

function makeAction() {
    return new Action(
        { type: TriggerType.CLICK, target: "deck" },
        null,
        { type: 'LITERAL', primary: true },
    );
}

describe("GameDefinition constructor", () => {
    it("initializes empty phases, roles, a player, and a board", () => {
        const def = new GameDefinition();

        expect(def.phases).toEqual([]);
        expect(def.roles).toEqual([]);
        expect(def.player.piles).toEqual([]);
        expect(def.board.piles).toEqual([]);
    });
});

describe("GameDefinition player additions", () => {
    // addPlayerPile() should fill in a relative location pointing at the
    // shared DEFAULT_PILE anchor when the caller doesn't specify one.
    it("adds a pile to the player with a default relative location", () => {
        const def = new GameDefinition();

        def.addPlayerPile({ label: "hand" });

        expect(def.player.piles).toHaveLength(1);
        expect(def.player.piles[0]!.label).toBe("hand");
        expect(def.player.piles[0]!.location).toEqual({ locationType: 'relative', location: 'DEFAULT_PILE' });
    });

    it("adds a counter to the player", () => {
        const def = new GameDefinition();

        def.addPlayerCounter({ label: "score", number: 10 });

        expect(def.player.counters).toHaveLength(1);
        expect(def.player.counters[0]!.number).toBe(10);
    });

    it("adds a button to the player", () => {
        const def = new GameDefinition();

        def.addPlayerButton({ label: "pass" });

        expect(def.player.buttons).toHaveLength(1);
        expect(def.player.buttons[0]!.label).toBe("pass");
    });
});

describe("GameDefinition board additions", () => {
    // Mirrors the player additions above, but these should land on
    // def.board instead of def.player.
    it("adds a pile to the board", () => {
        const def = new GameDefinition();

        def.addBoardPile({ label: "discard" });

        expect(def.board.piles).toHaveLength(1);
        expect(def.board.piles[0]!.label).toBe("discard");
    });

    it("adds a counter to the board", () => {
        const def = new GameDefinition();

        def.addBoardCounter({ label: "pot" });

        expect(def.board.counters).toHaveLength(1);
        expect(def.board.counters[0]!.label).toBe("pot");
    });

    it("adds a button to the board", () => {
        const def = new GameDefinition();

        def.addBoardButton({ label: "deal" });

        expect(def.board.buttons).toHaveLength(1);
        expect(def.board.buttons[0]!.label).toBe("deal");
    });
});

describe("GameDefinition phase/step/action wiring", () => {
    it("adds a phase and returns its label", () => {
        const def = new GameDefinition();

        const phaseLabel = def.addPhase("setup");

        expect(phaseLabel).toBe("setup");
        expect(def.phases).toHaveLength(1);
        expect(def.phases[0]!.label).toBe("setup");
    });

    it("adds a step to an existing phase and returns its label", () => {
        const def = new GameDefinition();
        const phaseLabel = def.addPhase("setup");

        const stepLabel = def.addStepToPhase(phaseLabel, "draw");

        expect(stepLabel).toBe("draw");
        expect(def.phases[0]!.steps).toHaveLength(1);
        expect(def.phases[0]!.steps[0]!.label).toBe("draw");
    });

    // addStepToPhase looks the phase up by label through the LabelManager;
    // an unregistered label should fail loudly rather than silently no-op.
    it("throws when adding a step to a nonexistent phase", () => {
        const def = new GameDefinition();

        expect(() => def.addStepToPhase("no-such-phase")).toThrow("Failed to add step to nonexistent phase");
    });

    it("adds an action to an existing step", () => {
        const def = new GameDefinition();
        const phaseLabel = def.addPhase("setup");
        const stepLabel = def.addStepToPhase(phaseLabel, "draw");
        const action = makeAction();

        def.addActionToStep(stepLabel, action);

        expect(def.phases[0]!.steps[0]!.actions).toEqual([action]);
    });

    // Same reasoning as the nonexistent-phase case, but for steps.
    it("throws when adding an action to a nonexistent step", () => {
        const def = new GameDefinition();
        const action = makeAction();

        expect(() => def.addActionToStep("no-such-step", action)).toThrow("Failed to add action to nonexistent step");
    });
});

describe("GameDefinition.getStartingStep", () => {
    // The game engine treats this as "no valid starting point" rather than
    // throwing, so both of these should resolve to null instead of erroring.
    it("returns null when there are no phases", () => {
        const def = new GameDefinition();

        expect(def.getStartingStep()).toBeNull();
    });

    it("returns null when the first phase has no steps", () => {
        const def = new GameDefinition();
        def.addPhase("setup");

        expect(def.getStartingStep()).toBeNull();
    });

    it("returns the first step of the first phase", () => {
        const def = new GameDefinition();
        const phaseLabel = def.addPhase("setup");
        def.addStepToPhase(phaseLabel, "draw");
        def.addStepToPhase(phaseLabel, "play");

        const startingStep = def.getStartingStep();

        expect(startingStep?.label).toBe("draw");
    });
});

describe("GameDefinition.addRole", () => {
    it("adds a new role and returns its name", () => {
        const def = new GameDefinition();

        const result = def.addRole("dealer");

        expect(result).toBe("dealer");
        expect(def.roles).toEqual(["dealer"]);
    });

    // addRole is meant to be idempotent: calling it twice with the same
    // name should report failure (null) instead of storing a duplicate.
    it("returns null and does not duplicate an existing role", () => {
        const def = new GameDefinition();
        def.addRole("dealer");

        const result = def.addRole("dealer");

        expect(result).toBeNull();
        expect(def.roles).toEqual(["dealer"]);
    });
});

describe("GameDefinition minPlayers/maxPlayers", () => {
    // These are accessor properties that forward to gameMeta rather than
    // storing their own state, so we assert both sides stay in sync.
    it("delegates to gameMeta", () => {
        const def = new GameDefinition();

        def.minPlayers = 2;
        def.maxPlayers = 5;

        expect(def.minPlayers).toBe(2);
        expect(def.maxPlayers).toBe(5);
        expect(def.gameMeta.minPlayers).toBe(2);
        expect(def.gameMeta.maxPlayers).toBe(5);
    });
});

describe("GameDefinition.createGame", () => {
    // toBeInstanceOf(Game) alone only proves the return type wasn't swapped
    // for a lookalike object; it says nothing about whether the definition
    // was actually used. Also assert on gameState so a bug where createGame
    // returns an empty/blank Game would still get caught.
    it("returns a Game whose state was built from this definition's board", () => {
        const def = new GameDefinition();
        def.addBoardPile({ label: "discard" });

        const game = def.createGame();

        expect(game).toBeInstanceOf(Game);
        expect(game.definition).toBe(def);
        expect(game.gameState.piles["discard"]).toBeDefined();
        expect(game.gameState.piles["discard"]!.owner).toBe(-1);
    });
});
