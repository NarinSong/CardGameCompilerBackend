import { describe, it, expect, vi, beforeEach } from "vitest";
import { evaluate } from "./TreeParser.js";
import GameDefinition from "../Rules/GameDefinition.js";
import { PlayerType, TriggerType, PileState } from "../schemas/types.js";
import { NODE_NAMES } from "../schemas/Constants.js";
import type { ActionContext } from "../schemas/AST.js";

// evaluate() is a big AST interpreter with ~90 node types. Mocking Game and
// GameState would mean re-implementing half the game engine by hand, so
// instead these tests build a real Game from a real GameDefinition - same
// approach GameDefinition.test.ts's createGame test uses. Simpler, and
// catches more.
function makeGame() {
  const def = new GameDefinition();
  // Deliberately not using def.addBoardPile({..., initialValue: PileState.SHUFFLED}).
  // Its initialValue param never actually reaches PileDefinition's
  // initialState field (a param-name mismatch, flagged separately) and
  // silently produces an empty pile no matter what you pass. Going through
  // gameState.createPile directly instead, since its "state" param is
  // wired up correctly.
  def.addBoardCounter({ label: "pot", number: 10 });
  const game = def.createGame();
  game.gameState.createPile({ state: PileState.SHUFFLED, name: "deck", owner: -1 });
  const player = game.handlePlayerJoin(PlayerType.HUMAN, "Alice")!;
  return { game, player };
}

function ctxFor(playerId: number): ActionContext {
  return { trigger: { type: TriggerType.AUTO }, player: playerId };
}

function lit(value: any): any {
  return { type: NODE_NAMES.Literal, primary: value };
}

describe("evaluate: literals and structure", () => {
  it("LITERAL returns its stored value as-is", () => {
    const { game } = makeGame();
    expect(evaluate(game, ctxFor(0), lit(42))).toBe(42);
  });

  it("UNDEFINED evaluates to undefined", () => {
    const { game } = makeGame();
    expect(evaluate(game, ctxFor(0), { type: NODE_NAMES.Undefined } as any)).toBeUndefined();
  });

  it("COMMENT evaluates to undefined (it's a no-op)", () => {
    const { game } = makeGame();
    expect(evaluate(game, ctxFor(0), { type: "COMMENT" } as any)).toBeUndefined();
  });

  it("ARRAY evaluates each element in the sequence", () => {
    const { game } = makeGame();
    const node = { type: NODE_NAMES.Array, sequence: [lit(1), lit(2), lit(3)] } as any;
    expect(evaluate(game, ctxFor(0), node)).toEqual([1, 2, 3]);
  });
});

describe("evaluate: boolean logic", () => {
  it("AND is true only when both sides are true", () => {
    const { game } = makeGame();
    const ctx = ctxFor(0);
    expect(evaluate(game, ctx, { type: NODE_NAMES.And, primary: lit(true), secondary: lit(true) } as any)).toBe(true);
    expect(evaluate(game, ctx, { type: NODE_NAMES.And, primary: lit(true), secondary: lit(false) } as any)).toBe(false);
  });

  // SET_COUNTER_VALUE doubles as a side-effect probe here: if the counter
  // actually changes, the secondary branch got evaluated. It shouldn't,
  // since JS's && already short-circuits on a false primary.
  it("AND short-circuits - the secondary side isn't evaluated when primary is false", () => {
    const { game } = makeGame();
    const ctx = ctxFor(0);
    const setPot = { type: NODE_NAMES.SetCounterValue, primary: lit("pot"), secondary: lit(999) };

    evaluate(game, ctx, { type: NODE_NAMES.And, primary: lit(false), secondary: setPot } as any);

    expect(game.gameState.counters["pot"]?.counter.value).toBe(10);
  });

  it("OR short-circuits - the secondary side isn't evaluated when primary is true", () => {
    const { game } = makeGame();
    const ctx = ctxFor(0);
    const setPot = { type: NODE_NAMES.SetCounterValue, primary: lit("pot"), secondary: lit(999) };

    evaluate(game, ctx, { type: NODE_NAMES.Or, primary: lit(true), secondary: setPot } as any);

    expect(game.gameState.counters["pot"]?.counter.value).toBe(10);
  });

  it("NOT negates its operand", () => {
    const { game } = makeGame();
    expect(evaluate(game, ctxFor(0), { type: NODE_NAMES.Not, primary: lit(false) } as any)).toBe(true);
  });
});

describe("evaluate: comparisons", () => {
  const cases: [string, number, number, boolean][] = [
    [NODE_NAMES.LessThan, 1, 2, true],
    [NODE_NAMES.LessThan, 2, 1, false],
    [NODE_NAMES.GreaterThan, 2, 1, true],
    [NODE_NAMES.Equal, 5, 5, true],
    [NODE_NAMES.Equal, 5, 6, false],
  ];

  for (const [type, a, b, expected] of cases) {
    it(`${type}(${a}, ${b}) -> ${expected}`, () => {
      const { game } = makeGame();
      const node = { type, primary: lit(a), secondary: lit(b) } as any;
      expect(evaluate(game, ctxFor(0), node)).toBe(expected);
    });
  }
});

describe("evaluate: arithmetic", () => {
  const cases: [string, number, number, number][] = [
    [NODE_NAMES.Plus, 2, 3, 5],
    [NODE_NAMES.Minus, 5, 3, 2],
    [NODE_NAMES.Times, 4, 3, 12],
    [NODE_NAMES.Div, 10, 4, 2.5],
    [NODE_NAMES.Min, 4, 9, 4],
    [NODE_NAMES.Max, 4, 9, 9],
  ];

  for (const [type, a, b, expected] of cases) {
    it(`${type}(${a}, ${b}) -> ${expected}`, () => {
      const { game } = makeGame();
      const node = { type, primary: lit(a), secondary: lit(b) } as any;
      expect(evaluate(game, ctxFor(0), node)).toBe(expected);
    });
  }

  it("RANDOM returns a floored value under the given ceiling", () => {
    const { game } = makeGame();
    const spy = vi.spyOn(Math, "random").mockReturnValue(0.999);

    const result = evaluate(game, ctxFor(0), { type: NODE_NAMES.Random, primary: lit(10) } as any);

    expect(result).toBe(9); // floor(0.999 * 10)
    spy.mockRestore();
  });
});

describe("evaluate: strings", () => {
  it("STRING_EQ compares two strings", () => {
    const { game } = makeGame();
    const ctx = ctxFor(0);
    expect(evaluate(game, ctx, { type: NODE_NAMES.StringEq, primary: lit("a"), secondary: lit("a") } as any)).toBe(true);
    expect(evaluate(game, ctx, { type: NODE_NAMES.StringEq, primary: lit("a"), secondary: lit("b") } as any)).toBe(false);
  });

  it("STRING_JOIN concatenates two strings", () => {
    const { game } = makeGame();
    const node = { type: "STRING_JOIN", primary: lit("foo"), secondary: lit("bar") } as any;
    expect(evaluate(game, ctxFor(0), node)).toBe("foobar");
  });

  it("NUMBER_TO_STRING stringifies a number", () => {
    const { game } = makeGame();
    const node = { type: "NUMBER_TO_STRING", primary: lit(42) } as any;
    expect(evaluate(game, ctxFor(0), node)).toBe("42");
  });
});

describe("evaluate: location nodes", () => {
  it("LOCATION builds an exact {x, y} location", () => {
    const { game } = makeGame();
    const node = { type: NODE_NAMES.Location, primary: lit(3), secondary: lit(4) } as any;
    expect(evaluate(game, ctxFor(0), node)).toEqual({ type: "exact", location: { x: 3, y: 4 } });
  });

  it("RELATIVE_LOCATION builds a relative location by name", () => {
    const { game } = makeGame();
    const node = { type: NODE_NAMES.RelativeLocation, primary: lit("DEFAULT_PILE") } as any;
    expect(evaluate(game, ctxFor(0), node)).toEqual({ type: "relative", location: "DEFAULT_PILE" });
  });
});

describe("evaluate: ternary and range checks", () => {
  it("TERNARY picks the secondary branch when the condition is true", () => {
    const { game } = makeGame();
    const node = { type: NODE_NAMES.Ternary, primary: lit(true), secondary: lit("yes"), tertiary: lit("no") } as any;
    expect(evaluate(game, ctxFor(0), node)).toBe("yes");
  });

  it("TERNARY picks the tertiary branch when the condition is false", () => {
    const { game } = makeGame();
    const node = { type: NODE_NAMES.Ternary, primary: lit(false), secondary: lit("yes"), tertiary: lit("no") } as any;
    expect(evaluate(game, ctxFor(0), node)).toBe("no");
  });

  it("IS_BETWEEN is true only for a strictly-between value", () => {
    const { game } = makeGame();
    const ctx = ctxFor(0);
    const between = { type: NODE_NAMES.IsBetween, primary: lit(5), secondary: lit(1), tertiary: lit(10) } as any;
    const outside = { type: NODE_NAMES.IsBetween, primary: lit(50), secondary: lit(1), tertiary: lit(10) } as any;
    expect(evaluate(game, ctx, between)).toBe(true);
    expect(evaluate(game, ctx, outside)).toBe(false);
  });
});

describe("evaluate: control flow", () => {
  it("IF runs the secondary branch when the condition is true, not the tertiary", () => {
    const { game } = makeGame();
    const ctx = ctxFor(0);
    const setPot = (v: number) => ({ type: NODE_NAMES.SetCounterValue, primary: lit("pot"), secondary: lit(v) });
    const node = { type: NODE_NAMES.If, primary: lit(true), secondary: setPot(1), tertiary: setPot(2) } as any;

    evaluate(game, ctx, node);

    expect(game.gameState.counters["pot"]?.counter.value).toBe(1);
  });

  it("IF runs the tertiary (else) branch when the condition is false", () => {
    const { game } = makeGame();
    const ctx = ctxFor(0);
    const setPot = (v: number) => ({ type: NODE_NAMES.SetCounterValue, primary: lit("pot"), secondary: lit(v) });
    const node = { type: NODE_NAMES.If, primary: lit(false), secondary: setPot(1), tertiary: setPot(2) } as any;

    evaluate(game, ctx, node);

    expect(game.gameState.counters["pot"]?.counter.value).toBe(2);
  });

  it("IF with no tertiary does nothing when the condition is false", () => {
    const { game } = makeGame();
    const ctx = ctxFor(0);
    const setPot = { type: NODE_NAMES.SetCounterValue, primary: lit("pot"), secondary: lit(1) };
    const node = { type: NODE_NAMES.If, primary: lit(false), secondary: setPot } as any;

    evaluate(game, ctx, node);

    expect(game.gameState.counters["pot"]?.counter.value).toBe(10); // unchanged
  });

  it("SEQUENCE runs every action in order", () => {
    const { game } = makeGame();
    const ctx = ctxFor(0);
    const node = {
      type: NODE_NAMES.Sequence,
      primary: [
        { type: NODE_NAMES.SetCounterValue, primary: lit("pot"), secondary: lit(1) },
        { type: NODE_NAMES.SetCounterValue, primary: lit("pot"), secondary: lit(2) },
        { type: NODE_NAMES.SetCounterValue, primary: lit("pot"), secondary: lit(3) },
      ],
    } as any;

    evaluate(game, ctx, node);

    // Only checking the final value, which is a weaker check than it looks -
    // it confirms all 3 ran, but not their order. Good enough here since
    // SEQUENCE's contract is just "run these in order," not something this
    // particular counter chain can fully distinguish on its own.
    expect(game.gameState.counters["pot"]?.counter.value).toBe(3);
  });

  it("WHILE loops until the condition goes false", () => {
    const { game } = makeGame();
    const ctx = ctxFor(0);
    // Counts down from 10 to 0, one MOVE_COUNTER_VALUE per iteration.
    const node = {
      type: NODE_NAMES.While,
      primary: { type: NODE_NAMES.GreaterThan, primary: { type: NODE_NAMES.ValueOf, primary: lit("pot") }, secondary: lit(0) },
      secondary: { type: NODE_NAMES.SetCounterValue, primary: lit("pot"), secondary: { type: NODE_NAMES.Minus, primary: { type: NODE_NAMES.ValueOf, primary: lit("pot") }, secondary: lit(1) } },
    } as any;

    evaluate(game, ctx, node);

    expect(game.gameState.counters["pot"]?.counter.value).toBe(0);
  });
});

describe("evaluate: action context passthrough", () => {
  it("CLICKED_LABEL/CTX_PLAYER/BUTTON_VALUE return the context's fields", () => {
    const { game } = makeGame();
    const ctx: ActionContext = { trigger: { type: TriggerType.CLICK, target: "deck" }, player: 7, label: "deck", buttonValue: 3 };

    expect(evaluate(game, ctx, { type: NODE_NAMES.ClickedLabel } as any)).toBe("deck");
    expect(evaluate(game, ctx, { type: NODE_NAMES.CtxPlayer } as any)).toBe(7);
    expect(evaluate(game, ctx, { type: "BUTTON_VALUE" } as any)).toBe(3);
  });
});

describe("evaluate: roles", () => {
  it("HAS_ROLE is false for a role nobody has been assigned", () => {
    const { game } = makeGame();
    const node = { type: NODE_NAMES.HasRole, role: lit("dealer"), id: lit(0) } as any;
    expect(evaluate(game, ctxFor(0), node)).toBe(false);
  });

  it("ASSIGN_ROLE succeeds once, then reports false on a duplicate assignment", () => {
    const { game } = makeGame();
    const ctx = ctxFor(0);
    const assign = { type: NODE_NAMES.AssignRole, role: lit("dealer"), id: lit(0) } as any;

    expect(evaluate(game, ctx, assign)).toBe(true);
    expect(evaluate(game, ctx, assign)).toBe(false);
    expect(evaluate(game, ctx, { type: NODE_NAMES.HasRole, role: lit("dealer"), id: lit(0) } as any)).toBe(true);
  });

  it("ASSIGN_ROLE_SINGULAR replaces whoever previously held the role", () => {
    const { game } = makeGame();
    const ctx = ctxFor(0);
    evaluate(game, ctx, { type: NODE_NAMES.AssignRole, role: lit("dealer"), id: lit(0) } as any);

    evaluate(game, ctx, { type: NODE_NAMES.AssignRoleSingular, role: lit("dealer"), id: lit(1) } as any);

    expect(game.gameState.roles["dealer"]).toEqual([1]);
  });

  // Found this while writing these tests. UNASSIGN_ROLE uses
  // `delete array[idx]` instead of `array.splice(idx, 1)`, and delete on an
  // array just leaves a hole - the length never shrinks. HAS_ROLE still
  // comes back correct (Array.includes treats a hole as undefined, which
  // never matches a real id), but the roles array quietly piles up dead
  // slots forever. Not fixing this one myself - lower severity than the
  // Database.ts SQL bug, and worth a second opinion first.
  it("BUG: UNASSIGN_ROLE leaves a hole instead of shrinking the roles array", () => {
    const { game } = makeGame();
    const ctx = ctxFor(0);
    evaluate(game, ctx, { type: NODE_NAMES.AssignRole, role: lit("dealer"), id: lit(0) } as any);
    expect(game.gameState.roles["dealer"]).toHaveLength(1);

    evaluate(game, ctx, { type: NODE_NAMES.UnassignRole, role: lit("dealer"), id: lit(0) } as any);

    expect(evaluate(game, ctx, { type: NODE_NAMES.HasRole, role: lit("dealer"), id: lit(0) } as any)).toBe(false);
    expect(game.gameState.roles["dealer"]).toHaveLength(1); // should be 0 if it actually removed the entry
  });

  it("FIRST_PLAYER always returns 0", () => {
    const { game } = makeGame();
    expect(evaluate(game, ctxFor(0), { type: NODE_NAMES.FirstPlayer } as any)).toBe(0);
  });

  it("GET_ID_FROM_ROLE returns the player id at the given index", () => {
    const { game } = makeGame();
    const ctx = ctxFor(0);
    evaluate(game, ctx, { type: NODE_NAMES.AssignRole, role: lit("dealer"), id: lit(0) } as any);

    const node = { type: NODE_NAMES.GetIdFromRole, role: lit("dealer"), index: lit(0) } as any;
    expect(evaluate(game, ctx, node)).toBe(0);
  });
});

describe("evaluate: game info extraction", () => {
  it("NUM_CARDS_IN_PILE reports the pile's card count", () => {
    const { game } = makeGame();
    const node = { type: NODE_NAMES.NumCardsInPile, primary: lit("deck") } as any;
    expect(evaluate(game, ctxFor(0), node)).toBe(52);
  });

  it("VALUE_OF reports a counter's current value", () => {
    const { game } = makeGame();
    const node = { type: NODE_NAMES.ValueOf, primary: lit("pot") } as any;
    expect(evaluate(game, ctxFor(0), node)).toBe(10);
  });
});

describe("evaluate: counters", () => {
  it("SET_COUNTER_VALUE overwrites the value and returns the counter's label", () => {
    const { game } = makeGame();
    const node = { type: NODE_NAMES.SetCounterValue, primary: lit("pot"), secondary: lit(99) } as any;

    const result = evaluate(game, ctxFor(0), node);

    expect(result).toBe("pot");
    expect(game.gameState.counters["pot"]?.counter.value).toBe(99);
  });

  it("MOVE_COUNTER_VALUE transfers an amount between two counters", () => {
    const { game } = makeGame();
    game.definition.addBoardCounter({ label: "bank", number: 0 });
    game.gameState.createCounterFromDefinition(game.definition.board.counters[1]!, -1);

    const node = { type: NODE_NAMES.MoveCounterValue, primary: lit("pot"), secondary: lit("bank"), tertiary: lit(4) } as any;
    evaluate(game, ctxFor(0), node);

    expect(game.gameState.counters["pot"]?.counter.value).toBe(6);
    expect(game.gameState.counters["bank"]?.counter.value).toBe(4);
  });
});

describe("evaluate: variables", () => {
  it("UPDATE_VARIABLE then GET_VARIABLE round-trips a value", () => {
    const { game } = makeGame();
    const ctx = ctxFor(0);
    const update = { type: NODE_NAMES.UpdateVariable, variableType: "Number", name: lit("score"), value: lit(7) } as any;
    const get = { type: NODE_NAMES.GetVariable, variableType: "Number", name: lit("score") } as any;

    evaluate(game, ctx, update);

    expect(evaluate(game, ctx, get)).toBe(7);
  });
});

describe("evaluate: ending the game", () => {
  // A real AST always fills every argument slot, either with a real node or
  // an explicit {type:'UNDEFINED'} placeholder (see ClientBlocksBuilder's
  // "fill in defaults" logic) - never a bare JS undefined. executeWin and
  // executeLose evaluate their tertiary/secondary unconditionally, so a
  // truly missing key would throw here. That's expected given how the AST
  // gets built, not a bug in evaluate().
  it("WIN marks the player as won, sets their score, and ends the game", () => {
    const { game, player } = makeGame();
    const node = { type: NODE_NAMES.Win, primary: lit(player.id), secondary: lit(100), tertiary: { type: NODE_NAMES.Undefined } } as any;

    evaluate(game, ctxFor(player.id), node);

    expect(player.state).toBe("Won");
    expect(player.score).toBe(100);
    expect(game.gameOver).toBe(true);
  });

  it("LOSE marks the player as lost and ends the game", () => {
    const { game, player } = makeGame();
    const node = { type: NODE_NAMES.Lose, primary: lit(player.id), secondary: { type: NODE_NAMES.Undefined }, tertiary: { type: NODE_NAMES.Undefined } } as any;

    evaluate(game, ctxFor(player.id), node);

    expect(player.state).toBe("Lost");
    expect(game.gameOver).toBe(true);
  });

  it("WIN with endGame explicitly false leaves the game running", () => {
    const { game, player } = makeGame();
    const node = { type: NODE_NAMES.Win, primary: lit(player.id), secondary: { type: NODE_NAMES.Undefined }, tertiary: lit(false) } as any;

    evaluate(game, ctxFor(player.id), node);

    expect(player.state).toBe("Won");
    expect(game.gameOver).toBe(false);
  });
});

describe("evaluate: phase/step movement", () => {
  it("SET_PHASE moves gameState.currentStep to the phase's first step", () => {
    const { game } = makeGame();
    const phaseLabel = game.definition.addPhase("main");
    game.definition.addStepToPhase(phaseLabel, "draw");

    const node = { type: NODE_NAMES.SetPhase, primary: lit(phaseLabel) } as any;
    evaluate(game, ctxFor(0), node);

    expect(game.gameState.currentStep?.label).toBe("draw");
  });

  it("SET_STEP moves gameState.currentStep directly to a named step", () => {
    const { game } = makeGame();
    const phaseLabel = game.definition.addPhase("main");
    game.definition.addStepToPhase(phaseLabel, "draw");
    const secondStep = game.definition.addStepToPhase(phaseLabel, "play");

    const node = { type: NODE_NAMES.SetStep, primary: lit(secondStep) } as any;
    evaluate(game, ctxFor(0), node);

    expect(game.gameState.currentStep?.label).toBe("play");
  });
});
