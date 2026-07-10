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

export type VariableNode = {
  kind: "variable";
  block: "UPDATE_VARIABLE" | "GET_VARIABLE";
  variableType: ValueTypeName;
  args: {
    name: ClientNode;
    value?: ClientNode | undefined;
  };
};

// ClientNode is any block or literal sent by the client
export type ClientNode = LiteralNode | BlockNode | SequenceNode | ArrayNode | VariableNode;


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
      args: z.record(z.string(), ClientNodeSchema as z.ZodType<ClientNode>),
    }),
    z.object({
      kind: z.literal("sequence"),
      blocks: z.array(ClientNodeSchema)
    }),
    z.object({
      kind: z.literal("array"),
      valueType: ValueTypeNameSchema,
      value: z.array(ClientNodeSchema),
    }),
    z.object({
      kind: z.literal("variable"),
      block: z.literal("UPDATE_VARIABLE").or(z.literal("GET_VARIABLE")),
      variableType: ValueTypeNameSchema,
      args: z.object({
        name: ClientNodeSchema as z.ZodType<ClientNode>,
        value: (ClientNodeSchema as z.ZodType<ClientNode>).optional(),
      })
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
  if (node.kind === "variable") {
    const variableTypeCheck = ValueTypeNameSchema.parse(node.variableType);

    return variableTypeCheck;
  }

  const block = BLOCKS[node.block as BlockName];

  if (!block) {
    throw new Error(`Unknown block: ${node.block}`);
  }

  return block.returnType;
}

function validateLiteral(node: LiteralNode): void {
  const schema = ValueTypes[node.valueType];
  schema.parse(node.value);
}

function validateSequence(node: SequenceNode): void {
  for (const block of node.blocks) {
    // Sequence doesn't care about the return types of the child nodes
    validateNode(block);
  }
}

function validateArray(node: ArrayNode): void {
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
}
function validateBlock(node: BlockNode): void {
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

    if (argDef.type === 'Void' || argDef.type === 'Unknown') {
      // If the block doesn't care about the return type, neither should we
      continue;
    }

    if (actualType !== argDef.type) {
      throw new Error(
        `Type mismatch for ${argDef.name}: expected ${argDef.type}, got ${actualType}`
      );
    }
  }
}

function validateVariable(node: VariableNode): void {
  // Validate variable name
  const name = node.args['name'];

  if (!name) {
      throw new Error(`Missing variable name`);
  }

  validateNode(name);

  const nameType = inferNodeType(name);
  if (nameType !== 'String') throw new Error('Variable name is not a string');

  // If UPDATE_VARIABLE, validate the value

  if (node.block === 'GET_VARIABLE') return;
  
  const variableType = inferNodeType(node);
  
  const value = node.args['value'];
  if (!value) throw new Error('UPDATE_VARIABLE missing a value');

  validateNode(value);

  const valueType = inferNodeType(value);
  if (valueType !== variableType) throw new Error(`Variable type mismatch. Tried to set ${variableType} variable to a ${valueType}`);
}

// Throws an error if something is invalid, otherwise does not throw
export function validateNode(node: ClientNode): void {
  if (node.kind === "literal") {
    return validateLiteral(node);
  }
  if (node.kind === "sequence") {
    return validateSequence(node);
  }
  if (node.kind === "array") {
    return validateArray(node);
  }
  if (node.kind === "variable") {
    return validateVariable(node);
  }

  return validateBlock(node);
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

export type ClientBuiltBlocks = z.infer<typeof ClientBuiltBlocksSchema>;