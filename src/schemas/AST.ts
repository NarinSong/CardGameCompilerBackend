// Schemas are used to verify client input (using zod)

import { z } from "zod";
import { TriggerSchema, LabelSchema, CardSchema } from "./types.js";
import { ValueReturn, ValueReturnSchema } from "./Blocks.js";
import { NODE_NAMES } from "./Constants.js";

// Group nodes based on structure

const LiteralSchema = z.enum([
  NODE_NAMES.Literal,
]);
const StructuresSchema = z.literal(NODE_NAMES.Array);
const UndefinedSchema = z.literal(NODE_NAMES.Undefined);

const OperatorlessSchema = z.enum([
  NODE_NAMES.ClickedLabel,
  NODE_NAMES.CtxId,
  NODE_NAMES.CtxCard,
  NODE_NAMES.FirstPlayer,
  NODE_NAMES.ButtonValue,
]);
const UnaryOperatorsSchema = z.enum([
  NODE_NAMES.Not,
  NODE_NAMES.Rank,
  NODE_NAMES.Suit,
  NODE_NAMES.SetPhase,
  NODE_NAMES.SetStep,
  NODE_NAMES.NextPlayer,
  NODE_NAMES.NumCardsInPile,
  NODE_NAMES.ValueOf,
]);
const BinaryOperatorsSchema = z.enum([
  NODE_NAMES.And,
  NODE_NAMES.Or,
  NODE_NAMES.Plus,
  NODE_NAMES.Times,
  NODE_NAMES.Div,
  NODE_NAMES.Minus,
  NODE_NAMES.StringEq,
  NODE_NAMES.Map,
  NODE_NAMES.While,
  NODE_NAMES.LessThan,
  NODE_NAMES.GreaterThan,
  NODE_NAMES.Equal,
  NODE_NAMES.ShuffleInto,
  NODE_NAMES.Location,
]);

const TernaryOperatorsSchema = z.enum([
  NODE_NAMES.Ternary,
  NODE_NAMES.DealCards,
  NODE_NAMES.If,
  NODE_NAMES.MoveCounterValue,
  NODE_NAMES.IsBetween,
  NODE_NAMES.Win,
  NODE_NAMES.Lose,
  NODE_NAMES.ButtonRange,
]);

const RoleOperatorsSchema = z.enum([
  NODE_NAMES.AssignRole,
  NODE_NAMES.UnassignRole,
  NODE_NAMES.AssignRoleSingular,
  NODE_NAMES.HasRole,
]);

const VariableOperatorsSchema = z.enum([
  NODE_NAMES.AddVariable,
  NODE_NAMES.UpdateVariable,
])

type LiteralNames = z.infer<typeof LiteralSchema>;
type StructuresNames = z.infer<typeof StructuresSchema>;
type UndefinedNames = z.infer<typeof UndefinedSchema>;
type UnaryOperatorsNames = z.infer<typeof UnaryOperatorsSchema>;
type OperatorlessNames = z.infer<typeof OperatorlessSchema>;
type BinaryOperatorsNames = z.infer<typeof BinaryOperatorsSchema>;
type TernaryOperatorsNames = z.infer<typeof TernaryOperatorsSchema>;
type RoleOperatorsNames = z.infer<typeof RoleOperatorsSchema>;
type VariableOperatorsNames = z.infer<typeof VariableOperatorsSchema>;

// Typescript type structure

export type AST_Node = 
{
  type: UndefinedNames;
} | {
  type: LiteralNames;
  primary: ValueReturn;
} | {
  type: OperatorlessNames;
} | {
  type: UnaryOperatorsNames;
  primary: AST_Node;
} | {
  type: BinaryOperatorsNames;
  primary: AST_Node;
  secondary: AST_Node;
} | {
  type: TernaryOperatorsNames;
  primary: AST_Node;
  secondary: AST_Node;
  tertiary: AST_Node;
} | {
  type: RoleOperatorsNames;
  id: AST_Node;
  role: AST_Node;
} | {
  type: StructuresNames;
  sequence: AST_Node[];
} | {
  type: typeof NODE_NAMES.CreatePile;
  state: AST_Node;
  name: AST_Node;
  visibility: AST_Node;
  actionRoles: AST_Node;
  displayName: AST_Node;
  owner: AST_Node;
  location: AST_Node;
} | {
  type: typeof NODE_NAMES.GetIdFromRole;
  role: AST_Node;
  index: AST_Node;
} | {
  type: typeof NODE_NAMES.PileOf;
  id: AST_Node;
  actionRole: AST_Node;
} | {
  type: VariableOperatorsNames;
  name: AST_Node;
  value: AST_Node;
} | {
  type: typeof NODE_NAMES.GetVariable;
  name: AST_Node;
} | {
  type: typeof NODE_NAMES.Sequence;
  primary: AST_Node[];
} | {
  type: typeof NODE_NAMES.RemovePile;
  pile: AST_Node;
  sendTo: AST_Node;
} | {
  type: typeof NODE_NAMES.CreateCounter;
  state: AST_Node;
  name: AST_Node;
  visibility: AST_Node;
  actionRoles: AST_Node;
  displayName: AST_Node;
  owner: AST_Node;
  location: AST_Node;
} | {
  type: typeof NODE_NAMES.CreateButton;
  state: AST_Node;
  name: AST_Node;
  visibility: AST_Node;
  actionRoles: AST_Node;
  displayName: AST_Node;
  owner: AST_Node;
  location: AST_Node;
  buttonType: AST_Node;
  range: AST_Node;
};

export const ValueNodeSchema: z.ZodType<AST_Node> = z.lazy(() =>
  z.discriminatedUnion("type", [

    z.object({
      type: UndefinedSchema
    }),

    z.object({
      type: LiteralSchema,
      primary: ValueReturnSchema
    }),

    z.object({
      type: OperatorlessSchema
    }),

    z.object({
      type: UnaryOperatorsSchema,
      primary: ValueNodeSchema
    }),

    z.object({
      type: BinaryOperatorsSchema,
      primary: ValueNodeSchema,
      secondary: ValueNodeSchema
    }),

    z.object({
      type: TernaryOperatorsSchema,
      primary: ValueNodeSchema,
      secondary: ValueNodeSchema,
      tertiary: ValueNodeSchema
    }),

    z.object({
      type: StructuresSchema,
      sequence: z.array(ValueNodeSchema)
    }),

    z.object({
      type: z.literal(NODE_NAMES.CreatePile),
      state: ValueNodeSchema,
      name: ValueNodeSchema,
      visibility: ValueNodeSchema,
      actionRoles: ValueNodeSchema,
      displayName: ValueNodeSchema,
      owner: ValueNodeSchema,
      location: ValueNodeSchema,
    }),

    z.object({
      type: z.literal(NODE_NAMES.CreateCounter),
      state: ValueNodeSchema,
      name: ValueNodeSchema,
      visibility: ValueNodeSchema,
      actionRoles: ValueNodeSchema,
      displayName: ValueNodeSchema,
      owner: ValueNodeSchema,
      location: ValueNodeSchema,
    }),

    z.object({
      type: z.literal(NODE_NAMES.CreateButton),
      state: ValueNodeSchema,
      name: ValueNodeSchema,
      visibility: ValueNodeSchema,
      actionRoles: ValueNodeSchema,
      displayName: ValueNodeSchema,
      owner: ValueNodeSchema,
      location: ValueNodeSchema,
      buttonType: ValueNodeSchema,
      range: ValueNodeSchema,
    }),

    z.object({
      type: z.literal(NODE_NAMES.GetIdFromRole),
      role: ValueNodeSchema,
      index: ValueNodeSchema
    }),

    z.object({
      type: z.literal(NODE_NAMES.PileOf),
      id: ValueNodeSchema,
      actionRole: ValueNodeSchema
    }),

    z.object({
      type: RoleOperatorsSchema,
      id: ValueNodeSchema,
      role: ValueNodeSchema
    }),

    /* Variables */

    z.object({
      type: VariableOperatorsSchema,
      name: ValueNodeSchema,
      value: ValueNodeSchema,
    }),

    z.object({
    type: z.literal(NODE_NAMES.GetVariable),
    name: ValueNodeSchema,
    }),

    /* Logic */

    z.object({
      type: z.literal(NODE_NAMES.Sequence),
      primary: z.array(ValueNodeSchema)
    }),

    /* Game actions */

    z.object({
      type: z.literal(NODE_NAMES.RemovePile),
      pile: ValueNodeSchema,
      sendTo: ValueNodeSchema
    })

  ])
);

export const ActionContextSchema = z.object({
  trigger: TriggerSchema,
  id: z.number().optional(),
  label: LabelSchema.optional(),
  card: CardSchema.optional(),
  buttonValue: z.number().optional(),
});

export const ASTSchema = z.union([
  ValueNodeSchema
]);

export type ValueNode = z.infer<typeof ValueNodeSchema>;
export type ActionContext = z.infer<typeof ActionContextSchema>;
export type AST = z.infer<typeof ASTSchema>;