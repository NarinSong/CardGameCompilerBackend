import z from "zod";
import { NumericSchema } from "./types.js";

export const InsertSchema = z.object({
  affectedRows: NumericSchema,
  insertId: NumericSchema,
  warningStatus: NumericSchema,
});

export const UpdateSchema = z.object({
  affectedRows:  NumericSchema,
  warningStatus: NumericSchema,
});

export const SelectHashByUsernameSchema = z.object({
    id: z.number(),
    passwordHash: z.string(),
    displayName: z.string(),
    color: z.string(),
});

export const SelectGameSavesByIdSchema = z.object({
    creator: z.number()
});

export const SelectFullGameSavesByIdSchema = z.object({
    blockeditorstate: z.string(),
    creator: z.number(),
});

export const SelectAllGameSavesSchema = z.object({
    gamename: z.string(),
    creator: NumericSchema,
    parent:  NumericSchema,
    id: NumericSchema,
    privateGame: NumericSchema,
});

export type InsertResult = z.infer<typeof InsertSchema>;
export type UpdateResult = z.infer<typeof UpdateSchema>;
export type SelectHashByUsername = z.infer<typeof SelectHashByUsernameSchema>;
export type SelectGameSavesById = z.infer<typeof SelectGameSavesByIdSchema>;
export type SelectFullGameSavesById = z.infer<typeof SelectFullGameSavesByIdSchema>;
export type SelectAllGameSaves = z.infer<typeof SelectAllGameSavesSchema>;