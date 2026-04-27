import { z } from "zod";
import { ActionNodeSchema, ValueNodeSchema } from "./AST.js";
import { ActionRoleSchema, ActionRolesSchema, PileStateSchema, TriggerTypeSchema, VisibilitySchema } from "./types.js";

// Arguments to definitions
export const GameMetaArgsSchema = z.object({
    minPlayers: z.number().optional(),
    maxPlayers: z.number().optional(),
    cardValueMap: ValueNodeSchema.optional(),
    clientSuitMap: z.record(z.string(), z.number()).optional(),
    clientRankMap: z.record(z.string(), z.number()).optional(),
    variables: z.record(z.string(), z.number()).optional(),

})

export const PileSchema = z.object({
    label: z.string().optional(),
    initialState: PileStateSchema.optional(),
    visibility: VisibilitySchema.optional(),
    displayName: z.string().optional(),
    actionRoles: ActionRolesSchema.optional(),
});

export const CounterSchema = z.object({
    label: z.string().optional(),
    number: z.number().optional(),
    visibility: VisibilitySchema.optional(),
    displayName: z.string().optional(),
    actionRoles: ActionRolesSchema.optional(),
});

export const PlayerSchema = z.object({
    piles: z.array(PileSchema).optional(),
    counters: z.array(CounterSchema).optional(),
})

export const BoardSchema = z.object({
    piles: z.array(PileSchema).optional(),
    counters: z.array(CounterSchema).optional(),
})

// Building up to phase definition

// Start with actions
export const TriggerSchema = z.object({
    type: TriggerTypeSchema,
    target: ActionRoleSchema,
});

export const ActionSchema = z.object({
    trigger: TriggerSchema,
    filter: ValueNodeSchema.optional().or(z.null()),
    result: ActionNodeSchema,
})

export const StepSchema = z.object({
    name: z.string(),
    actions: z.array(ActionSchema),
})

export const PhaseSchema = z.object({
    name: z.string(),
    steps: z.array(StepSchema),
})

export type GameMetaArgs = z.infer<typeof GameMetaArgsSchema>;
