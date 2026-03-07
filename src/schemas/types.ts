import { z } from "zod";

export const PlayerTypeSchema = z.enum([
  "HUMAN",
  "ROBOT",
  "AI"
]);

export const PileStateSchema = z.enum([
  "SORTED",
  "EMPTY",
  "SHUFFLED"
]);

export const VisibilitySchema = z.enum([
  "FACE_UP",
  "FACE_DOWN",
  "INVISIBLE"
]);

export const TriggerTypeSchema = z.enum([
  "CLICK"
]);


export const RANK = [
  "Ace","Two","Three","Four","Five","Six",
  "Seven","Eight","Nine","Ten","Jack","Queen","King"
] as const;

export const RankSchema = z.enum(RANK);

export const RankIndex = Object.fromEntries(
  RANK.map((name, index) => [name, index])
) as Record<rank, number>;

export const SUIT = [
  "Clubs",
  "Diamonds",
  "Hearts",
  "Spades"
] as const;

export const SuitSchema = z.enum(SUIT);
export const DisplayNameSchema = z.string();
export const ActionRoleSchema = z.string();
export const PlayerIDSchema = z.number();

/* BoardID must equal -1 */
export const BoardIDSchema = z.literal(-1);

// Enums
export const Visibility = VisibilitySchema.enum;
export const PileState = PileStateSchema.enum;
export const TriggerType = TriggerTypeSchema.enum;
export const PlayerType = PlayerTypeSchema.enum;

// Types
export type PlayerType = z.infer<typeof PlayerTypeSchema>;
export type PileState = z.infer<typeof PileStateSchema>;
export type Visibility = z.infer<typeof VisibilitySchema>;
export type TriggerType = z.infer<typeof TriggerTypeSchema>;
export type DisplayName = z.infer<typeof DisplayNameSchema>;
export type ActionRole = z.infer<typeof ActionRoleSchema>;
export type PlayerID = z.infer<typeof PlayerIDSchema>;
export type BoardID = z.infer<typeof BoardIDSchema>;
export type rank = z.infer<typeof RankSchema>;
export type suit = z.infer<typeof SuitSchema>;