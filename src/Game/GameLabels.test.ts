import { describe, it, expect, beforeEach } from "vitest";

import GameLabels from "./GameLabels.js";

describe("GameLabels", () => {
  let definition: any;
  let gameLabels: GameLabels;

  beforeEach(() => {
    definition = {
      phaseLabels: {
        main: {
          name: "Main Phase",
        },
      },

      stepLabels: {
        draw: {
          name: "Draw Step",
        },
      },

      nextId: 0,
    };

    gameLabels = new GameLabels(definition);
  });

  it("initializes from label manager", () => {
    expect(gameLabels.gamePhaseLabels).toBe(definition.phaseLabels);

    expect(gameLabels.gameStepLabels).toBe(definition.stepLabels);
  });

  it("registers a pile", () => {
    const pile = {} as any;

    gameLabels.registerPile(pile, "deck" as any);

    expect(gameLabels.getFromLabel("deck" as any)).toBe(pile);
  });

  it("registers a counter", () => {
    const counter = {} as any;

    gameLabels.registerCounter(counter, "score" as any);

    expect(gameLabels.getFromLabel("score" as any)).toBe(counter);
  });

  it("registers a button", () => {
    const button = {} as any;

    gameLabels.registerButton(button, "draw" as any);

    expect(gameLabels.getFromLabel("draw" as any)).toBe(button);
  });

  it("unregisters a game object", () => {
    const pile = {} as any;

    gameLabels.registerPile(pile, "deck" as any);

    gameLabels.unregister("deck" as any);

    expect(gameLabels.getFromLabel("deck" as any)).toBeUndefined();
  });

  it("gets phase from label", () => {
    expect(gameLabels.getPhaseFromLabel("main" as any)).toBe(
      definition.phaseLabels.main,
    );
  });

  it("gets step from label", () => {
    expect(gameLabels.getStepFromLabel("draw" as any)).toBe(
      definition.stepLabels.draw,
    );
  });

  it("returns undefined for unknown object label", () => {
    expect(gameLabels.getFromLabel("fake" as any)).toBeUndefined();
  });

  it("increments nextId", () => {
    expect(gameLabels.nextId).toBe("1");

    expect(gameLabels.nextId).toBe("2");

    expect(gameLabels.nextId).toBe("3");
  });
});
