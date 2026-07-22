import { z } from "zod";
import { ValueNodeSchema } from "./AST.js";
import { ActionRolesSchema, ButtonTypeSchema, DefaultLocationSchema, LocationResolverSchema, PileStateSchema, TriggerSchema, VisibilitySchema } from "./types.js";
import { ValueTypeNameSchema } from "./Blocks.js";

export const StandardStringSchema = z.string().max(16).min(1).regex(/^[a-zA-Z0-9]+$/);
export const LongStringSchema = z.string().max(1000).min(1).regex(/^[a-zA-Z0-9 !@#$%^&*(),.?"'\n]+$/);

// Arguments to definitions
export const GameMetaArgsSchema = z.object({
    minPlayers: z.number().optional(),
    maxPlayers: z.number().optional(),
    name: StandardStringSchema,
    cardValueMap: z.record(StandardStringSchema, z.number()).optional(),
    clientSuitMap: z.record(StandardStringSchema, z.number()).optional(),
    clientRankMap: z.record(StandardStringSchema, z.number()).optional(),
    variables: z.record(StandardStringSchema,ValueTypeNameSchema).optional(),
    locations: z.record(StandardStringSchema, DefaultLocationSchema).optional(),
    parentGameId: z.number().optional(),
    description: LongStringSchema.optional(),
    private: z.boolean().optional(),
    id: z.number().optional(),
})

export const PileSchema = z.object({
    label: z.string().optional(),
    initialState: PileStateSchema.optional(),
    visibility: VisibilitySchema.optional(),
    displayName: z.string().optional(),
    actionRoles: ActionRolesSchema.optional(),
    location: LocationResolverSchema.optional(),
});

export const CounterSchema = z.object({
    label: z.string().optional(),
    number: z.number().optional(),
    visibility: VisibilitySchema.optional(),
    displayName: z.string().optional(),
    actionRoles: ActionRolesSchema.optional(),
    location: LocationResolverSchema.optional(),
});

export const ButtonSchema = z.object({
    label: z.string().optional(),
    visibility: VisibilitySchema.optional(),
    actionRoles: ActionRolesSchema.optional(),
    displayName: z.string().optional(),
    type: ButtonTypeSchema.optional(),
    range: z.object({
        min: z.number().optional(),
        max: z.number().optional(),
        increment: z.number().optional(),
    }).optional(),
    location: LocationResolverSchema.optional(),
})

export const PlayerSchema = z.object({
    piles: z.array(PileSchema).optional(),
    counters: z.array(CounterSchema).optional(),
    buttons: z.array(ButtonSchema).optional(),
})

export const BoardSchema = z.object({
    piles: z.array(PileSchema).optional(),
    counters: z.array(CounterSchema).optional(),
    buttons: z.array(ButtonSchema).optional(),
})

// Building up to phase definition

// Start with actions

export const ActionSchema = z.object({
    trigger: TriggerSchema,
    filter: ValueNodeSchema.or(z.null()).optional(),
    result: ValueNodeSchema,
})

export const StepSchema = z.object({
    name: z.string(),
    actions: z.array(ActionSchema),
})

export const PhaseSchema = z.object({
    name: z.string(),
    steps: z.array(StepSchema),
})

const NodeSchema = ValueNodeSchema;

export type GameMetaArgs = z.infer<typeof GameMetaArgsSchema>;
export type GameDefinitionPhase = z.infer<typeof PhaseSchema>;
export type GameDefinitionStep = z.infer<typeof StepSchema>;
export type GameDefinitionNode = z.infer<typeof NodeSchema>;