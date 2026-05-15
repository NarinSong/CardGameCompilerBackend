// This file is for blocks that are put together on the client side and sent to the server

import { z } from "zod";
import { ArgDef, BlockName, BLOCKS, ValueTypeName, ValueTypes } from "./Blocks";

type LiteralNode = {
  kind: "literal";
  valueType: ValueTypeName;
  value: unknown; // literals can be anything
};

type BlockNode = {
  kind: "block";
  block: string;
  args: Record<string, ClientNode>;
};

// ClientNode is any block or literal sent by the client
type ClientNode = LiteralNode | BlockNode;


// These Zod schemas verify structure only. That they are blocks, rather than what blocks they are.
const LiteralSchema = z.object({
  kind: z.literal("literal"),
  valueType: z.enum(["Void", "Number", "String", "Boolean", "PileLabel"]),
  value: z.unknown(),
});

const ClientNodeSchema: z.ZodType<ClientNode> = z.lazy(() =>
  z.union([
    LiteralSchema,
    z.object({
      kind: z.literal("block"),
      block: z.string(),
      args: z.record(z.string(), ClientNodeSchema),
    }),
  ])
);


// Recursive type-checking function for client-sent verified block structures
function inferNodeType(node: ClientNode): ValueTypeName {
  if (node.kind === "literal") {
    return node.valueType;
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