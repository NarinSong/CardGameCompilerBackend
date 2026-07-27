import { describe, it, expect, vi, beforeEach } from "vitest";

// ClientBuiltBlocksSchema and validateNode cover every block type in
// Blocks.ts, which is a lot of ground. Mocked here the same way
// GameBuilder.test.ts mocks verifyClientGameDefintion, so the focus stays on
// ClientBlocksBuilder's own AST conversion instead of full schema validation.
vi.mock("../schemas/BuiltBlocks.js", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../schemas/BuiltBlocks.js")>();
  return {
    ...actual,
    ClientBuiltBlocksSchema: { safeParse: vi.fn() },
    validateNode: vi.fn(),
  };
});

import {
  safeBuildClientGameDefinitionFormBlocks,
  buildClientGameDefinitionFromblocks,
} from "./ClientBlocksBuilder.js";
import { ClientBuiltBlocksSchema, validateNode } from "../schemas/BuiltBlocks.js";

function basePayload(overrides: Record<string, any> = {}) {
  return {
    gameMeta: { name: "Test" },
    playerDefinition: {},
    boardDefinition: {},
    phases: [],
    ...overrides,
  };
}

function mockValidJson(data: Record<string, any>) {
  vi.mocked(ClientBuiltBlocksSchema.safeParse).mockReturnValue({ success: true, data } as any);
}

describe("buildClientGameDefinitionFromblocks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(validateNode).mockImplementation(() => {});
  });

  it("throws the zod error when schema validation fails", () => {
    const zodError = new Error("bad shape");
    vi.mocked(ClientBuiltBlocksSchema.safeParse).mockReturnValue({ success: false, error: zodError } as any);

    expect(() => buildClientGameDefinitionFromblocks({})).toThrow(zodError);
  });

  it("passes gameMeta/playerDefinition/boardDefinition through unchanged", () => {
    mockValidJson(basePayload({
      gameMeta: { name: "MyGame" },
      playerDefinition: { piles: [{ label: "hand" }] },
      boardDefinition: { counters: [{ label: "pot" }] },
    }));

    const result = buildClientGameDefinitionFromblocks({});

    expect(result.gameMeta).toEqual({ name: "MyGame" });
    expect(result.playerDefinition).toEqual({ piles: [{ label: "hand" }] });
    expect(result.boardDefinition).toEqual({ counters: [{ label: "pot" }] });
  });

  // Simplest possible case: a single literal result, no filter. This is
  // really what the whole function exists to do - turn the client's
  // block-editor tree into the phase/step/action shape GameBuilder expects.
  it("converts a literal result block into a LITERAL AST node", () => {
    mockValidJson(basePayload({
      phases: [{
        name: "main",
        steps: [{
          name: "draw",
          actions: [{
            trigger: { type: "AUTO" },
            filter: null,
            result: { kind: "literal", valueType: "Boolean", value: true },
          }],
        }],
      }],
    }));

    const result = buildClientGameDefinitionFromblocks({});

    expect(result.phases[0]?.steps[0]?.actions[0]).toEqual({
      trigger: { type: "AUTO" },
      filter: null,
      result: { type: "LITERAL", primary: true },
    });
  });

  // A COMMENT block is just a note the editor lets you leave - not real
  // logic. blockNodeToAst turns it into null, and a null result here means
  // drop the action, don't send it through half-formed.
  it("drops an action entirely when its result is a COMMENT block", () => {
    mockValidJson(basePayload({
      phases: [{
        name: "main",
        steps: [{
          name: "draw",
          actions: [{
            trigger: { type: "AUTO" },
            filter: null,
            result: { kind: "block", block: "COMMENT", args: {} },
          }],
        }],
      }],
    }));

    const result = buildClientGameDefinitionFromblocks({});

    expect(result.phases[0]?.steps[0]?.actions).toEqual([]);
  });

  // NOT has one argument, "primary". If the client left it unwired, it
  // needs to show up as an explicit UNDEFINED node, not just be missing -
  // the interpreter expects every declared argument to be present.
  it("fills in UNDEFINED for a block's missing arguments", () => {
    mockValidJson(basePayload({
      phases: [{
        name: "main",
        steps: [{
          name: "draw",
          actions: [{
            trigger: { type: "AUTO" },
            filter: null,
            result: { kind: "block", block: "NOT", args: {} },
          }],
        }],
      }],
    }));

    const result = buildClientGameDefinitionFromblocks({});

    expect(result.phases[0]?.steps[0]?.actions[0]?.result).toEqual({
      type: "NOT",
      primary: { type: "UNDEFINED" },
    });
  });

  it("converts a filter block alongside the result", () => {
    mockValidJson(basePayload({
      phases: [{
        name: "main",
        steps: [{
          name: "draw",
          actions: [{
            trigger: { type: "CLICK", target: "deck" },
            filter: { kind: "literal", valueType: "Boolean", value: false },
            result: { kind: "literal", valueType: "Boolean", value: true },
          }],
        }],
      }],
    }));

    const result = buildClientGameDefinitionFromblocks({});

    expect(result.phases[0]?.steps[0]?.actions[0]?.filter).toEqual({ type: "LITERAL", primary: false });
  });

  it("recursively converts a sequence of blocks", () => {
    mockValidJson(basePayload({
      phases: [{
        name: "main",
        steps: [{
          name: "draw",
          actions: [{
            trigger: { type: "AUTO" },
            filter: null,
            result: {
              kind: "sequence",
              blocks: [
                { kind: "literal", valueType: "Boolean", value: true },
                { kind: "literal", valueType: "Boolean", value: false },
              ],
            },
          }],
        }],
      }],
    }));

    const result = buildClientGameDefinitionFromblocks({});

    expect(result.phases[0]?.steps[0]?.actions[0]?.result).toEqual({
      type: "SEQUENCE",
      primary: [
        { type: "LITERAL", primary: true },
        { type: "LITERAL", primary: false },
      ],
    });
  });
});

describe("safeBuildClientGameDefinitionFormBlocks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // This is the wrapper callers actually use. It should swallow the thrown
  // zod error rather than letting it bubble up.
  it("returns null instead of throwing when validation fails", () => {
    vi.mocked(ClientBuiltBlocksSchema.safeParse).mockReturnValue({ success: false, error: new Error("bad") } as any);

    expect(safeBuildClientGameDefinitionFormBlocks({})).toBeNull();
  });

  it("returns the built definition when everything is valid", () => {
    vi.mocked(validateNode).mockImplementation(() => {});
    mockValidJson(basePayload());

    const result = safeBuildClientGameDefinitionFormBlocks({});

    expect(result).not.toBeNull();
    expect(result?.phases).toEqual([]);
  });
});
