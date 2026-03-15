import { z } from "zod";

/**
 * Types of players supported by the game.
 */
export const PlayerTypeSchema = z.enum([
  "HUMAN",
  "ROBOT",
  "AI"
]);

/**
 * Possible states for a pile of cards.
 */
export const PileStateSchema = z.enum([
  "SORTED",
  "EMPTY",
  "SHUFFLED"
]);

/**
 * Possible states of visibility for piles or cards.
 */
export const VisibilitySchema = z.enum([
  "FACE_UP",
  "FACE_DOWN",
  "INVISIBLE"
]);

/**
 * Types of triggers that can execute actions.
 */
export const TriggerTypeSchema = z.enum([
  "CLICK"
]);


/**
 * Standard card ranks used by the game.
 */
export const RANK = [
  "Ace","Two","Three","Four","Five","Six",
  "Seven","Eight","Nine","Ten","Jack","Queen","King"
] as const;

export const RankSchema = z.enum(RANK);

/**
 * Look up table mapping a rank name to its numeric rank index
 */
export const RankIndex = Object.fromEntries(
  RANK.map((name, index) => [name, index])
) as Record<rank, number>;

/**
 * Standard card suits.
 */
export const SUIT = [
  "Clubs",
  "Diamonds",
  "Hearts",
  "Spades"
] as const;

export const SuitSchema = z.enum(SUIT);
export const DisplayNameSchema = z.string();
export const ActionRoleSchema = z.string();
export const ActionRolesSchema = z.array(z.string());
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