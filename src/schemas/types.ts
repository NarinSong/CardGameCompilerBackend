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

export const ButtonTypeSchema = z.enum([
  "CLICK",
  "NUMBER"
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
  "CLICK",
  "AUTO"
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
  "Spades",
  "Jokers",
  "Trumps",
] as const;

export const SuitSchema = z.enum(SUIT);
export const CardSchema = z.object({
  rank: RankSchema,
  suit: SuitSchema,
  id: z.number()
});
export const DisplayNameSchema = z.string();
export const ActionRoleSchema = z.string();
export const LabelSchema = z.string();
export const ActionRolesSchema = z.array(z.string());
export const PlayerIDSchema = z.number();
export const LocationSchema = z.object({
  x: z.number(),
  y: z.number(),
});
export const DefaultLocationSchema = z.object({
    anchor: z.object({
        x: z.number(),
        y: z.number(),
    }),
    direction: z.union([z.literal('VERTICAL'), z.literal('HORIZONTAL')]),
    verticalOffset: z.number(),
    horizontalOffset: z.number(),
    wraptAt: z.number(),
    wrapTo: z.number(),
});
export const LocationResolverSchema = z.discriminatedUnion('locationType', [
  z.object({
    locationType: z.literal('exact'),
    location: LocationSchema
  }),
  z.object({
    locationType: z.literal('relative'),
    location: z.string()
  })
]);
export const ButtonRangeSchema = z.object({
  min: z.number().or(z.undefined()),
  max: z.number().or(z.undefined()),
  increment: z.number().or(z.undefined()),
});
export const ButtonRangeArgumentSchema = z.object({
  min: z.number().or(z.undefined()).optional(),
  max: z.number().or(z.undefined()).optional(),
  increment: z.number().or(z.undefined()).optional(),
});

/* BoardID must equal -1 */
export const BoardIDSchema = z.literal(-1);

export const TriggerSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(TriggerTypeSchema.enum.CLICK),
    target: ActionRoleSchema,
  }),

  z.object({
    type: z.literal(TriggerTypeSchema.enum.AUTO),
    target: z.undefined().optional(),
  }),
]);

// Deck constructs
const DeckPartSchema = z.object({
  ranks: z.array(RankSchema),
  suits: z.array(SuitSchema),
});
const DeckDefinitionSchema = z.array(DeckPartSchema);

// Enums
export const Visibility = VisibilitySchema.enum;
export const PileState = PileStateSchema.enum;
export const ButtonType = ButtonTypeSchema.enum;
export const TriggerType = TriggerTypeSchema.enum;
export const PlayerType = PlayerTypeSchema.enum;

// Types
export type PlayerType = z.infer<typeof PlayerTypeSchema>;
export type PileState = z.infer<typeof PileStateSchema>;
export type ButtonType = z.infer<typeof ButtonTypeSchema>;
export type Visibility = z.infer<typeof VisibilitySchema>;
export type TriggerType = z.infer<typeof TriggerTypeSchema>;
export type DisplayName = z.infer<typeof DisplayNameSchema>;
export type ActionRole = z.infer<typeof ActionRoleSchema>;
export type Label = z.infer<typeof LabelSchema>;
export type PlayerID = z.infer<typeof PlayerIDSchema>;
export type BoardID = z.infer<typeof BoardIDSchema>;
export type rank = z.infer<typeof RankSchema>;
export type suit = z.infer<typeof SuitSchema>;
export type CardType = z.infer<typeof CardSchema>;
export type Location = z.infer<typeof LocationSchema>;
export type DefaultLocation = z.infer<typeof DefaultLocationSchema>;
export type LocationResolver = z.infer<typeof LocationResolverSchema>;
export type ButtonRange = z.infer<typeof ButtonRangeSchema>;
export type ButtonRangeArgument = z.infer<typeof ButtonRangeArgumentSchema>;
export type DeckDefinition = z.infer<typeof DeckDefinitionSchema>;

// IDs
export type ClientID = number;
export type GameID = number;
export type RoomID = string;
export type LobbyID = string;


// Default locations

// Screen is 1920 x 1080
export const DEFAULT_PILE_LOCATION: DefaultLocation = {
    anchor: {
        x: 0,
        y: 0,
    },
    direction: "HORIZONTAL",
    verticalOffset: -120,
    horizontalOffset: 80,
    wraptAt: 900,
    wrapTo: -900,
};
export const DEFAULT_COUNTER_LOCATION: DefaultLocation = {
    anchor: {
        x: -900,
        y: 500,
    },
    direction: "HORIZONTAL",
    verticalOffset: -80,
    horizontalOffset: 80,
    wraptAt: 900,
    wrapTo: -900,
};
export const DEFAULT_BUTTON_LOCATION: DefaultLocation = {
    anchor: {
        x: -900,
        y: -500,
    },
    direction: "HORIZONTAL",
    verticalOffset: 80,
    horizontalOffset: 80,
    wraptAt: 900,
    wrapTo: -900,
};

// Default deck. TODO: Switch to RANKENUM.ACE, etc. so that it's more readable
export const DEFAULT_DECK_DEFINITION: DeckDefinition = [
  {
    ranks: [RANK[0], RANK[1], RANK[2], RANK[3], RANK[4], RANK[5], RANK[6], RANK[7], RANK[8], RANK[9], RANK[10], RANK[11], RANK[12], ],
    suits: [SUIT[0], SUIT[1], SUIT[2], SUIT[3]],
  }
];