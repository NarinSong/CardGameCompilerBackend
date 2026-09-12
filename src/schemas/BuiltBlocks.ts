// This file is for blocks that are put together on the client side and sent to the server

import { z } from "zod";
import { ArgDef, BlockName, BlockNames, BLOCKS, ValueTypeName, ValueTypeNameSchema, ValueTypes } from "./Blocks.js";
import { BoardSchema, GameMetaArgsSchema, PlayerSchema } from "./GameDefinitionArgs.js";
import { TriggerSchema } from "./types.js";
import { NODE_NAMES } from "./Constants.js";

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

export type NodeContext = {
  phase: string;
  step: string;
  action: number;
  path: string[];
}

export class ValidationError extends Error {
    context: NodeContext;
    constructor(message: unknown, context: NodeContext) {
        super(JSON.stringify(message));
        this.context = context;
    }
}

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
function inferNodeType(node: ClientNode, context: NodeContext): ValueTypeName {
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
    const variableTypeCheck = ValueTypeNameSchema.safeParse(node.variableType);

    if (!variableTypeCheck.success)
      throw new ValidationError(variableTypeCheck.error, context);

    return variableTypeCheck.data;
  }

  const block = BLOCKS[node.block as BlockName];

  if (!block) {
    throw new ValidationError(`Unknown block: ${node.block}`, context);
  }

  if (block.name === NODE_NAMES.Ternary) {
    const one = node.args[1];
    const two = node.args[2];

    if (!one || !two) throw new ValidationError('Undefined ternary argument', context);

    setUpContext(one, context);
    const first = inferNodeType(node.args[1] as ClientNode, context);
    restoreContext(context);

    setUpContext(two, context);
    const second = inferNodeType(node.args[2] as ClientNode, context);
    restoreContext(context);

    if (first === second) return first;
    throw new ValidationError("Ternary has invalid return type", context);
  }

  return block.returnType;
}

function validateLiteral(node: LiteralNode, context: NodeContext): void {
  const schema = ValueTypes[node.valueType];
  const value = schema.safeParse(node.value);

  if (!value.success) {
    throw new ValidationError(value.error, context);
  }
}

function validateSequence(node: SequenceNode, context: NodeContext): void {
  for (const block of node.blocks) {
    // Sequence doesn't care about the return types of the child nodes
    validateNode(block, context);
  }
}

function validateArray(node: ArrayNode, context: NodeContext): void {
  for (const value of node.value) {
    if (typeof value === 'undefined') {
        throw new ValidationError(`Undefined array value`, context);
    }

    validateNode(value, context);

    const actualType = inferNodeType(value, context);

    if (actualType !== node.valueType) {
      throw new ValidationError(
        `Type mismatch for array: expected ${node.valueType}, got ${actualType}`, context
      );
    }
  }
}

function validateBlock(node: BlockNode, context: NodeContext): void {
  const block = BLOCKS[node.block as BlockName];

  if (!block) {
    throw new ValidationError(`Unknown block ${node.block}`, context);
  }

  for (const argDef of block.arguments as readonly ArgDef[]) {
    const provided = node.args[argDef.name];

    if (!provided) {
      if (!argDef.optional) {
        throw new Error(`Missing arg ${argDef.name}`);
      }
      continue;
    }

    validateNode(provided, context);

    const actualType = inferNodeType(provided, context);

    if (argDef.type === 'Void' || argDef.type === 'Unknown') {
      // If the block doesn't care about the return type, neither should we
      continue;
    }

    // Kind of a loose comparison but it'll allow any "string" to match with any other "string" and vice-versa
    if (ValueTypes[actualType].type !== ValueTypes[argDef.type].type) {
      throw new ValidationError(
        `Type mismatch for ${argDef.name}: expected ${argDef.type}, got ${actualType}`, context
      );
    }
  }
}

function validateVariable(node: VariableNode, context: NodeContext): void {
  // Validate variable name
  const name = node.args['name'];

  if (!name) {
      throw new ValidationError(`Missing variable name`, context);
  }

  validateNode(name, context);

  const nameType = inferNodeType(name, context);
  if (nameType !== 'String') throw new ValidationError('Variable name is not a string', context);

  // If UPDATE_VARIABLE, validate the value

  if (node.block === 'GET_VARIABLE') return;
  
  const variableType = inferNodeType(node, context);
  
  const value = node.args['value'];
  if (!value) throw new ValidationError('UPDATE_VARIABLE missing a value', context);

  validateNode(value, context);

  const valueType = inferNodeType(value, context);
  if (valueType !== variableType) throw new ValidationError(`Variable type mismatch. Tried to set ${variableType} variable to a ${valueType}`, context);
}

function setUpContext(node: ClientNode, context: NodeContext) {
  switch (node.kind) {
    case 'literal':   context.path.push(node.valueType); return;
    case 'sequence':  context.path.push(node.kind);      return;
    case 'array':     context.path.push(node.kind);      return;
    case 'variable':  context.path.push(node.block);     return;
    case 'block':     context.path.push(node.block);     return;
  }

  // As any is used to tell TS that something went wrong. Normally this code is unreachable
  context.path.push((node as any).kind);
}

function restoreContext(context: NodeContext) {
  context.path.pop();
}

// Throws an error if something is invalid, otherwise does not throw
export function validateNode(node: ClientNode, context: NodeContext): void {
  setUpContext(node, context);
  
  switch (node.kind) {
    case 'literal':   validateLiteral(node, context);  restoreContext(context); return;
    case 'sequence':  validateSequence(node, context); restoreContext(context); return;
    case 'array':     validateArray(node, context);    restoreContext(context); return;
    case 'variable':  validateVariable(node, context); restoreContext(context); return;
    case 'block':     validateBlock(node, context);    restoreContext(context); return;
  }

  throw new ValidationError('Invalid ClientNode attempted validation', context);
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