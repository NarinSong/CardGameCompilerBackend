import { describe, it, expect, vi, beforeEach } from "vitest";

import Pile from "./Pile.js";
import Card from "../Components/Card.js";

import { Visibility, PileState } from "../schemas/types.js";

vi.mock("../Components/Card.js", () => ({
  default: {
    fromInitialState: vi.fn(),
  },
}));

describe("Pile", () => {
  let gameLabels: any;

  beforeEach(() => {
    gameLabels = {
      registerPile: vi.fn(),
    };

    vi.mocked(Card.fromInitialState).mockReturnValue([]);
  });

  it("creates a pile", () => {
    const location = vi.fn();

    const pile = Pile.create(
      PileState.SHUFFLED,
      "deck" as any,
      Visibility.FACE_UP,
      gameLabels,
      ["DRAW"] as any,
      "Deck" as any,
      location,
    );

    expect(Card.fromInitialState).toHaveBeenCalledWith(PileState.SHUFFLED);

    expect(pile.cards).toEqual([]);

    expect(pile.label).toBe("deck");

    expect(pile.visibility).toBe(Visibility.FACE_UP);

    expect(pile.actionRoles).toEqual(["DRAW"]);

    expect(pile.displayName).toBe("Deck");

    expect(pile.location).toBe(location);

    expect(gameLabels.registerPile).toHaveBeenCalledWith(pile, "deck");
  });

  it("creates a pile from definition", () => {
    const location = vi.fn();

    const definition = {
      initialState: PileState.EMPTY,
      label: "discard",
      visibility: Visibility.FACE_DOWN,
      actionRoles: ["VIEW"],
      displayName: "Discard",
      location,
    } as any;

    const pile = Pile.fromDefinition(definition, gameLabels);

    expect(Card.fromInitialState).toHaveBeenCalledWith(PileState.EMPTY);

    expect(pile.label).toBe("discard");

    expect(pile.visibility).toBe(Visibility.FACE_DOWN);

    expect(pile.actionRoles).toEqual(["VIEW"]);

    expect(pile.displayName).toBe("Discard");

    expect(pile.location).toBe(location);

    expect(gameLabels.registerPile).toHaveBeenCalledWith(pile, "discard");
  });
});
