// This file is for blocks that are put together on the client side and sent to the server

import { z } from "zod";
import { ArgDef, BlockName, BlockNames, BLOCKS, ValueTypeName, ValueTypeNameSchema, ValueTypes } from "./Blocks.js";
import { BoardSchema, GameMetaArgsSchema, PlayerSchema } from "./GameDefinitionArgs.js";
import { TriggerSchema } from "./types.js";

type LiteralNode = {
  kind: "literal";
  valueType: ValueTypeName;
  value: any; // literals can be anything
};

export type SequenceNode = {
  kind: "sequence",
  blocks: ClientNode[]
}

export type ArrayNode = {
  kind: "array",
  valueType: ValueTypeName,
  value: ClientNode[];
}

export type BlockNode = {
  kind: "block";
  block: BlockName;
  args: Record<string, ClientNode>;
};

// ClientNode is any block or literal sent by the client
export type ClientNode = LiteralNode | BlockNode | SequenceNode | ArrayNode;


// These Zod schemas verify structure only. That they are blocks, rather than what blocks they are.
const LiteralSchema = z.object({
  kind: z.literal("literal"),
  valueType: ValueTypeNameSchema,
  value: z.any(),
});

const ClientNodeSchema: z.ZodType<ClientNode> = z.lazy(() =>
  z.discriminatedUnion('kind', [
    LiteralSchema,
    z.object({
      kind: z.literal("block"),
      block: z.enum(BlockNames),
      args: z.record(z.string(), ClientNodeSchema as z.ZodType<BlockNode>),
    }),
    z.object({
      kind: z.literal("sequence"),
      blocks: z.array(ClientNodeSchema)
    }),
    z.object({
      kind: z.literal("array"),
      valueType: ValueTypeNameSchema,
      value: z.array(ClientNodeSchema),
    })
  ])
);


// Recursive type-checking function for client-sent verified block structures
function inferNodeType(node: ClientNode): ValueTypeName {
  if (node.kind === "literal") {
    return node.valueType;
  }
  if (node.kind === "sequence") {
    return "Void";
  }
  if (node.kind === "array") {
    return "Array";
  }

  const block = BLOCKS[node.block as BlockName];

  if (!block) {
    throw new Error(`Unknown block: ${node.block}`);
  }

  return block.returnType;
}

// Throws an error if something is invalid, otherwise does not throw
export function validateNode(node: ClientNode): void {
  if (node.kind === "literal") {
    const schema = ValueTypes[node.valueType];

    schema.parse(node.value);

    return;
  }
  if (node.kind === "sequence") {
    for (const block of node.blocks) {
      // Sequence doesn't care about the return types of the child nodes
      validateNode(block);
    }

    return;
  }
  if (node.kind === "array") {
    for (const value of node.value) {
      if (typeof value === 'undefined') {
          throw new Error(`Undefined array value`);
      }

      validateNode(value);

      const actualType = inferNodeType(value);

      if (actualType !== node.valueType) {
        throw new Error(
          `Type mismatch for array: expected ${node.valueType}, got ${actualType}`
        );
      }
    }


    return;
  }

  const block = BLOCKS[node.block as BlockName];

  if (!block) {
    throw new Error(`Unknown block ${node.block}`);
  }

  for (const argDef of block.arguments as readonly ArgDef[]) {
    const provided = node.args[argDef.name];

    if (!provided) {
      if (!argDef.optional) {
        throw new Error(`Missing arg ${argDef.name}`);
      }
      continue;
    }

    validateNode(provided);

    const actualType = inferNodeType(provided);

    if (actualType !== argDef.type) {
      throw new Error(
        `Type mismatch for ${argDef.name}: expected ${argDef.type}, got ${actualType}`
      );
    }
  }
}

const ClientActionSchema = z.object({
  trigger: TriggerSchema,
  filter: ClientNodeSchema.optional().or(z.null()),
  result: ClientNodeSchema
});

const ClientStepSchema = z.object({
  name: z.string(),
  actions: z.array(ClientActionSchema),
});

const ClientPhaseSchema = z.object({
  name: z.string(),
  steps: z.array(ClientStepSchema)
});

export const ClientBuiltBlocksSchema = z.object({
  gameMeta: GameMetaArgsSchema,
  playerDefinition: PlayerSchema,
  boardDefinition: BoardSchema,
  phases: z.array(ClientPhaseSchema),
});