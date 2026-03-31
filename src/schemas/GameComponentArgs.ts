import { z } from "zod";
import { RankSchema, SuitSchema } from "./types.js";

export const CardArgsSchema = z.object({
    rank: RankSchema,
    suit: SuitSchema,
})


export type CardArgs = z.infer<typeof CardArgsSchema>;