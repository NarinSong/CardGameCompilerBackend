import { describe, it, expect, vi, beforeEach } from "vitest";

import GameState from "./GameState.js";

import GameDefinition from "../Rules/GameDefinition.js";

import { Visibility, PileState } from "../schemas/types.js";

describe("GameState", () => {
  let definition: any;
  let state: GameState;

  beforeEach(() => {
    definition = {
      labelManger: {
        phaseLabels: {},

        stepLabels: {},

        nextId: 0,

        getFromLabel: vi.fn(),

        unregister: vi.fn(),
      },

      board: {
        piles: [],

        counters: [],

        buttons: [],
      },

      gameMeta: {},
    };

    state = new GameState(definition as GameDefinition);
  });

  it("creates empty game state", () => {
    expect(state.players).toEqual({});

    expect(state.numPlayers).toBe(0);

    expect(state.currentStep).toBeNull;
  });

  it("creates a pile", () => {
    const label = state.createPile({
      name: "deck",

      visibility: Visibility.FACE_UP,
    });

    expect(state.piles[label]).toBeDefined();

    expect(state.piles[label].owner).toBe(-1);
  });

  it("creates board pile", () => {
    const label = state.createPileOnBoard({
      name: "boardDeck",
    });

    expect(state.piles[label]).toBeDefined();

    expect(state.piles[label].owner).toBe(-1);
  });

  it("creates counter", () => {
    const label = state.createCounter({
      name: "score",

      state: 10,
    });

    expect(state.counters[label].counter.value).toBe(10);
  });

  it("creates button", () => {
    const label = state.createButton({
      name: "draw",
    });

    expect(state.buttons[label]).toBeDefined();
  });

  it("removes pile", () => {
    const label = state.createPile({
      name: "trash",
    });

    state.removePileByLabel(label);

    expect(state.piles[label]).toBeUndefined();
  });

  it("removes counter and transfers value", () => {
    const first = state.createCounter({
      name: "score",

      state: 10,
    });

    const second = state.createCounter({
      name: "total",

      state: 5,
    });

    state.removeCounterByLabel(first, second);

    expect(state.counters[second].counter.value).toBe(15);
  });

  it("removes button", () => {
    const label = state.createButton({
      name: "play",
    });

    state.removeButtonByLabel(label);

    expect(state.buttons[label]).toBeUndefined();
  });

  it("moves to step", () => {
    const step = {
      name: "draw",
    };

    state.gameLabels.getStepFromLabel = vi.fn(() => step);

    state.moveToStep("draw");

    expect(state.currentStep).toBe(step);
  });

  it("moves to phase first step", () => {
    const step = {
      name: "start",
    };

    const phase = {
      steps: [step],
    };

    state.gameLabels.getPhaseFromLabel = vi.fn(() => phase);

    state.moveToPhase("main");

    expect(state.currentStep).toBe(step);
  });

  it("does not move to invalid step", () => {
    state.gameLabels.getStepFromLabel = vi.fn(() => undefined);

    state.moveToStep("fake");

    expect(state.currentStep).toBeNull();
  });
});
