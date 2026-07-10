import z from "zod";

export const InsertSchema = z.object({
  affectedRows: z.number(),
  insertId: z.number(),
  warningStatus: z.number(),
});

export const UpdateSchema = z.object({
  affectedRows: z.number(),
  warningStatus: z.number(),
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
    creator: z.number(),
    parent: z.number(),
    id: z.number(),
    privateGame: z.number(),
});

export type InsertResult = z.infer<typeof InsertSchema>;
export type UpdateResult = z.infer<typeof UpdateSchema>;
export type SelectHashByUsername = z.infer<typeof SelectHashByUsernameSchema>;
export type SelectGameSavesById = z.infer<typeof SelectGameSavesByIdSchema>;
export type SelectFullGameSavesById = z.infer<typeof SelectFullGameSavesByIdSchema>;
export type SelectAllGameSaves = z.infer<typeof SelectAllGameSavesSchema>;