// Schemas are used to verify client input (using zod)

import { z } from "zod";

const Literal = z.literal("LITERAL");
const Structures = z.literal("ARRAY");
const Undefined = z.literal("UNDEFINED");

const UnaryOperators = z.literal("NOT");
const BinaryOperators = z.enum([
  "AND",
  "OR",
  "PLUS",
  "TIMES",
  "DIV",
  "MINUS",
  "STRING_EQ",
  "MAP"
]);

const TernaryOperators = z.literal("TERNARY");

// TODO: fix these
const LabelSchema = z.string();
const CardSchema = z.any();
const PileSchema = z.any();
const PileStateSchema = z.any();
const VisibilitySchema = z.any();
const PlayerIDSchema = z.any();
const BoardIDSchema = z.any();
const TriggerSchema = z.any();


const PileReturnInfoSchema = z.union([
  PileStateSchema,
  VisibilitySchema,
  PlayerIDSchema,
  BoardIDSchema
]);

const ValueReturnSchema: z.ZodType<any> = z.union([
  z.number(),
  LabelSchema,
  z.boolean(),
  PileReturnInfoSchema,
  CardSchema,
  PileSchema,
  z.array(z.any())
]);

export const ValueNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.union([

    z.object({
      type: Undefined
    }),

    z.object({
      type: Literal,
      primary: ValueReturnSchema
    }),

    z.object({
      type: UnaryOperators,
      primary: ValueNodeSchema
    }),

    z.object({
      type: BinaryOperators,
      primary: ValueNodeSchema,
      secondary: ValueNodeSchema
    }),

    z.object({
      type: TernaryOperators,
      primary: ValueNodeSchema,
      secondary: ValueNodeSchema,
      tertiary: ValueNodeSchema
    }),

    z.object({
      type: Structures,
      sequence: z.array(ValueNodeSchema)
    }),

    z.object({
      type: z.literal("CREATE_PILE"),
      state: ValueNodeSchema,
      name: ValueNodeSchema,
      visibility: ValueNodeSchema,
      actionRoles: ValueNodeSchema,
      displayName: ValueNodeSchema,
      owner: ValueNodeSchema
    }),

    z.object({
      type: z.literal("CLICKED_LABEL")
    }),

    z.object({
      type: z.literal("RANK"),
      primary: ValueNodeSchema
    }),

    z.object({
      type: z.literal("SUIT"),
      primary: ValueNodeSchema
    }),

    z.object({
      type: z.literal("CTX_CARD")
    })
  ])
);

export const ActionNodeSchema: z.ZodType<any> = z.lazy(() =>
  z.union([

    /* Logic */

    z.object({
      type: z.literal("IF"),
      primary: ValueNodeSchema,
      secondary: ActionNodeSchema,
      tertiary: ActionNodeSchema.optional()
    }),

    z.object({
      type: z.literal("SEQUENCE"),
      primary: z.array(ActionNodeSchema)
    }),

    /* Game actions */

    z.object({
      type: z.literal("DEAL_CARDS"),
      primary: ValueNodeSchema,
      secondary: ValueNodeSchema,
      tertiary: ValueNodeSchema
    }),

    z.object({
      type: z.literal("REMOVE_PILE"),
      pile: ValueNodeSchema,
      sendTo: ValueNodeSchema
    })

  ])
);

export const ActionContextSchema = z.object({
  trigger: TriggerSchema,
  label: LabelSchema.optional(),
  card: CardSchema.optional()
});

export const ASTSchema = z.union([
  ValueNodeSchema,
  ActionNodeSchema
]);

export type ValueReturn = z.infer<typeof ValueReturnSchema>;
export type ValueNode = z.infer<typeof ValueNodeSchema>;
export type ActionNode = z.infer<typeof ActionNodeSchema>;
export type ActionContext = z.infer<typeof ActionContextSchema>;
export type AST = z.infer<typeof ASTSchema>;