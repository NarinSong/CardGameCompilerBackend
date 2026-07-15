import { describe, it, expect, vi } from "vitest";

import ValueMap, {
  CalculationMap,
  DEFAULT_CARD_RANK_MAP,
  DEFAULT_CLIENT_VIEW_RANK_MAP,
  DEFAULT_CLIENT_VIEW_SUIT_MAP,
  DEFAULT_VALUE_MAP,
} from "./ValueMap.js";

import { evaluate } from "./TreeParser.js";

import type Game from "../Game/Game.js";

// Mock evaluate
vi.mock("./TreeParser.js", () => ({
  evaluate: vi.fn(),
}));

describe("ValueMap", () => {
  it("returns mapped value for existing key", () => {
    const map = new ValueMap<string, number>({
      test: 123,
    });

    expect(map.get("test")).toBe(123);
  });

  it("returns undefined for missing key", () => {
    const map = new ValueMap<string, number>({
      test: 123,
    });

    expect(map.get("missing")).toBeUndefined();
  });

  it("works with numeric values", () => {
    const map = new ValueMap<number, string>({
      1: "one",
      2: "two",
    });

    expect(map.get(1)).toBe("one");
  });
});

describe("CalculationMap", () => {
  it("evaluates stored ValueNode using game context", () => {
    const evaluatorNode = {
      type: "LITERAL",

      primary: 10,
    } as any;

    const map = new CalculationMap<number, number>(evaluatorNode);

    const game = {} as Game;

    const ctx = {} as any;

    vi.mocked(evaluate).mockReturnValue(50);

    const result = map.get(game, ctx);

    expect(evaluate).toHaveBeenCalledWith(game, ctx, evaluatorNode);

    expect(result).toBe(50);
  });
});

describe("Default card rank map", () => {
  it("maps Ace to 0", () => {
    expect(DEFAULT_CARD_RANK_MAP.get("Ace")).toBe(0);
  });

  it("maps King to 12", () => {
    expect(DEFAULT_CARD_RANK_MAP.get("King")).toBe(12);
  });

  it("client rank map uses same mapping", () => {
    expect(DEFAULT_CLIENT_VIEW_RANK_MAP.get("Queen")).toBe(11);
  });
});

describe("Default suit map", () => {
  it("maps suits to display numbers", () => {
    expect(DEFAULT_CLIENT_VIEW_SUIT_MAP.get("Clubs")).toBe(0);

    expect(DEFAULT_CLIENT_VIEW_SUIT_MAP.get("Hearts")).toBe(3);

    expect(DEFAULT_CLIENT_VIEW_SUIT_MAP.get("Trumps")).toBe(5);
  });
});

describe("DEFAULT_VALUE_MAP", () => {
  it("is a CalculationMap instance", () => {
    expect(DEFAULT_VALUE_MAP).toBeInstanceOf(CalculationMap);
  });
});
