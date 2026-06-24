// Schemas are used to verify client input (using zod)

import { z } from "zod";
import { TriggerSchema, LabelSchema, CardSchema } from "./types.js";
import { ValueReturn, ValueReturnSchema } from "./Blocks.js";

export const AST_NAMES = {
  Undefined: "UNDEFINED",
  Array: "ARRAY",
  Literal: "LITERAL",
  Not: "NOT",
  And: "AND",
  Or: "OR",
  Plus: "PLUS",
  Times: "TIMES",
  Div: "DIV",
  Minus: "MINUS",
  StringEq: "STRING_EQ",
  Map: "MAP",
  Ternary: "TERNARY",
  ClickedLabel: "CLICKED_LABEL",
  CtxId: "CTX_ID",
  CtxCard: "CTX_CARD",
  Rank: "RANK",
  Suit: "SUIT",
  SetPhase: "SET_PHASE",
  SetStep: "SET_STEP",
  HasRole: "HAS_ROLE",
  AssignRole: "ASSIGN_ROLE",
  UnassignRole: "UNASSIGN_ROLE",
  AssignRoleSingular: "ASSIGN_ROLE_SINGULAR",
  DealCards: "DEAL_CARDS",
  If: "IF",
  CreatePile: "CREATE_PILE",
  GetIdFromRole: "GET_ID_FROM_ROLE",
  PileOf: "PILE_OF",
  AddVariable: "ADD_VARIABLE",
  UpdateVariable: "UPDATE_VARIABLE",
  GetVariable: "GET_VARIABLE",
  Sequence: "SEQUENCE",
  RemovePile: "REMOVE_PILE",
} as const;

// Group nodes based on structure

const LiteralSchema = z.enum([
  AST_NAMES.Literal,
]);
const StructuresSchema = z.literal(AST_NAMES.Array);
const UndefinedSchema = z.literal(AST_NAMES.Undefined);

const OperatorlessSchema = z.enum([
  AST_NAMES.ClickedLabel,
  AST_NAMES.CtxId,
  AST_NAMES.CtxCard,
]);
const UnaryOperatorsSchema = z.enum([
  AST_NAMES.Not,
  AST_NAMES.Rank,
  AST_NAMES.Suit,
  AST_NAMES.SetPhase,
  AST_NAMES.SetStep,
]);
const BinaryOperatorsSchema = z.enum([
  AST_NAMES.And,
  AST_NAMES.Or,
  AST_NAMES.Plus,
  AST_NAMES.Times,
  AST_NAMES.Div,
  AST_NAMES.Minus,
  AST_NAMES.StringEq,
  AST_NAMES.Map
]);

const TernaryOperatorsSchema = z.enum([
  AST_NAMES.Ternary,
  AST_NAMES.DealCards,
  AST_NAMES.If,
]);

const RoleOperatorsSchema = z.enum([
  AST_NAMES.AssignRole,
  AST_NAMES.UnassignRole,
  AST_NAMES.AssignRoleSingular,
  AST_NAMES.HasRole,
]);

const VariableOperatorsSchema = z.enum([
  AST_NAMES.AddVariable,
  AST_NAMES.UpdateVariable,
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
  type: typeof AST_NAMES.CreatePile;
  state: AST_Node;
  name: AST_Node;
  visibility: AST_Node;
  actionRoles: AST_Node;
  displayName: AST_Node;
  owner: AST_Node;
  location: AST_Node;
} | {
  type: typeof AST_NAMES.GetIdFromRole;
  role: AST_Node;
  index: AST_Node;
} | {
  type: typeof AST_NAMES.PileOf;
  id: AST_Node;
  actionRole: AST_Node;
} | {
  type: VariableOperatorsNames;
  name: AST_Node;
  value: AST_Node;
} | {
  type: typeof AST_NAMES.GetVariable;
  name: AST_Node;
} | {
  type: typeof AST_NAMES.Sequence;
  primary: AST_Node[];
} | {
  type: typeof AST_NAMES.RemovePile;
  pile: AST_Node;
  sendTo: AST_Node;
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
      type: z.literal(AST_NAMES.CreatePile),
      state: ValueNodeSchema,
      name: ValueNodeSchema,
      visibility: ValueNodeSchema,
      actionRoles: ValueNodeSchema,
      displayName: ValueNodeSchema,
      owner: ValueNodeSchema,
      location: ValueNodeSchema,
    }),

    z.object({
      type: z.literal(AST_NAMES.GetIdFromRole),
      role: ValueNodeSchema,
      index: ValueNodeSchema
    }),

    z.object({
      type: z.literal(AST_NAMES.PileOf),
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
    type: z.literal(AST_NAMES.GetVariable),
    name: ValueNodeSchema,
    }),

    /* Logic */

    z.object({
      type: z.literal(AST_NAMES.Sequence),
      primary: z.array(ValueNodeSchema)
    }),

    /* Game actions */

    z.object({
      type: z.literal(AST_NAMES.RemovePile),
      pile: ValueNodeSchema,
      sendTo: ValueNodeSchema
    })

  ])
);

export const ActionContextSchema = z.object({
  trigger: TriggerSchema,
  id: z.number().optional(),
  label: LabelSchema.optional(),
  card: CardSchema.optional()
});

export const ASTSchema = z.union([
  ValueNodeSchema
]);

export type ValueNode = z.infer<typeof ValueNodeSchema>;
export type ActionContext = z.infer<typeof ActionContextSchema>;
export type AST = z.infer<typeof ASTSchema>;