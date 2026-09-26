import { z } from "zod";

export const CardArgsSchema = z.record(z.string(), z.string());


export type CardArgs = z.infer<typeof CardArgsSchema>;