import { describe, it, expect, vi } from "vitest";

import ClientView from "./ClientView.js";
import ValueMap from "../Components/ValueMap.js";
import { Visibility, PlayerType } from "../schemas/types.js";

describe("ClientView", () => {
  const suitMap = new ValueMap<string, number>({
    Hearts: 3,
    Clubs: 0,
  });

  const rankMap = new ValueMap<string, number>({
    Ace: 0,
    King: 12,
  });

  const gameMeta = {
    nextLocation: vi.fn((name, current) => ({
      x: 0,
      y: 0,
    })),
  } as any;

  const player = {
    id: 1,

    type: PlayerType.HUMAN,
  } as any;

  it("returns null for invisible pile", () => {
    const pile = {
      visibility: Visibility.INVISIBLE,
    } as any;

    expect(
      ClientView.pileView(pile, 1, player, suitMap, rankMap, {}, gameMeta),
    ).toBeNull();
  });

  it("creates face down pile view hiding cards", () => {
    const pile = {
      visibility: Visibility.FACE_DOWN,

      cards: [
        {
          suit: "Hearts",
          rank: "Ace",
          id: 10,
        },
      ],

      label: "deck",

      displayName: "Deck",

      actionRoles: [],

      location: {
        locationType: "exact",
        location: {
          x: 1,
          y: 2,
        },
      },
    } as any;

    const result = ClientView.pileView(
      pile,
      1,
      player,
      suitMap,
      rankMap,
      {},
      gameMeta,
    );

    expect(result?.cards).toEqual([
      {
        suit: 0,
        rank: 0,
        id: 0,
      },
    ]);
  });

  it("maps visible pile cards", () => {
    const pile = {
      visibility: Visibility.FACE_UP,

      cards: [
        {
          suit: "Hearts",
          rank: "Ace",
          id: 5,
        },
      ],

      label: "hand",

      displayName: "Hand",

      actionRoles: [],

      location: {
        locationType: "exact",
        location: {
          x: 0,
          y: 0,
        },
      },
    } as any;

    const result = ClientView.pileView(
      pile,
      1,
      player,
      suitMap,
      rankMap,
      {},
      gameMeta,
    );

    expect(result?.cards).toEqual([
      {
        suit: 3,
        rank: 0,
        id: 5,
      },
    ]);
  });

  it("returns null for invisible counter", () => {
    const counter = {
      visibility: Visibility.INVISIBLE,
    } as any;

    expect(ClientView.counterView(counter, 1, player, {}, gameMeta)).toBeNull();
  });

  it("hides face down counter value", () => {
    const counter = {
      visibility: Visibility.FACE_DOWN,

      value: 50,

      label: "score",

      displayName: "Score",

      actionRoles: [],

      location: {
        locationType: "exact",
        location: { x: 0, y: 0 },
      },
    } as any;

    const result = ClientView.counterView(counter, 1, player, {}, gameMeta);

    expect(result?.value).toBe(0);
  });

  it("shows visible counter value", () => {
    const counter = {
      visibility: Visibility.FACE_UP,

      value: 25,

      label: "score",

      displayName: "Score",

      actionRoles: [],

      location: {
        locationType: "exact",
        location: { x: 0, y: 0 },
      },
    } as any;

    const result = ClientView.counterView(counter, 1, player, {}, gameMeta);

    expect(result?.value).toBe(25);
  });

  it("returns null for invisible button", () => {
    const button = {
      visibility: Visibility.INVISIBLE,
    } as any;

    expect(ClientView.buttonView(button, 1, player, {}, gameMeta)).toBeNull();
  });

  it("creates button view", () => {
    const button = {
      visibility: Visibility.FACE_UP,

      label: "draw",

      displayName: "Draw Card",

      actionRoles: [],

      type: "ACTION",

      range: undefined,

      location: {
        locationType: "exact",
        location: {
          x: 1,
          y: 1,
        },
      },
    } as any;

    const result = ClientView.buttonView(button, 1, player, {}, gameMeta);

    expect(result?.label).toBe("draw");
  });

  it("creates ClientView from game state", () => {
    const game = {
      gameState: {
        piles: {},

        counters: {},

        buttons: {},

        players: {
          1: {
            id: 1,
            type: PlayerType.HUMAN,
          },
        },
      },

      definition: {
        gameMeta: {
          clientSuitMap: suitMap,

          clientRankMap: rankMap,

          nextLocation: vi.fn(),
        },
      },
    } as any;

    const result = ClientView.fromGamestate(game, player);

    expect(result.players).toEqual([
      {
        playerId: 1,
        type: PlayerType.HUMAN,
      },
    ]);
  });
});
