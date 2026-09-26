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
  "FACE_UP_SPREAD",
  "FACE_DOWN_SPREAD",
  "INVISIBLE",
  "PRIVATE", // FACE_DOWN for everyone except the owner, who it's FACE_UP for
  "PRIVATE_SPREAD",
]);

/**
 * Types of triggers that can execute actions.
 */
export const TriggerTypeSchema = z.enum([
  "CLICK",
  "AUTO"
]);



export const CardSchema = z.object({
  properties: z.record(z.string(), z.string()),
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
    wrapAt: z.number(),
    wrapTo: z.number(),
});
export const LocationResolverSchema = z.discriminatedUnion('locationType', [
  z.object({
    locationType: z.literal('exact'),
    location: LocationSchema
  }),
  z.object({
    locationType: z.literal('relative'),
    location: z.string(),
    ownerLocation: z.string().optional().or(z.undefined()),
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
const DeckPropertySchema = z.object({
  name: z.string(),
  values: z.array(z.string())
});
const DeckPartSchema = z.array(DeckPropertySchema);
const DeckDefinitionSchema = z.array(DeckPartSchema);
const MapSchema = z.object({name: z.string(), map: z.record(z.string(),z.number())});

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
export type CardType = z.infer<typeof CardSchema>;
export type Location = z.infer<typeof LocationSchema>;
export type DefaultLocation = z.infer<typeof DefaultLocationSchema>;
export type LocationResolver = z.infer<typeof LocationResolverSchema>;
export type ButtonRange = z.infer<typeof ButtonRangeSchema>;
export type ButtonRangeArgument = z.infer<typeof ButtonRangeArgumentSchema>;
export type DeckDefinition = z.infer<typeof DeckDefinitionSchema>;
export type MapType = z.infer<typeof MapSchema>;

// IDs
export type ClientID = number;
export type GameID = number;
export type RoomID = string;
export type LobbyID = string;

// Helper value
export const NumericSchema = z.number().or(z.bigint());


// Default locations

// Screen is 1920 x 1080
export const DEFAULT_PILE_LOCATION: DefaultLocation = {
    anchor: {
        x: -800,
        y: 0,
    },
    direction: "HORIZONTAL",
    verticalOffset: -200,
    horizontalOffset: 130,
    wrapAt: 800,
    wrapTo: -800,
};
export const DEFAULT_COUNTER_LOCATION: DefaultLocation = {
    anchor: {
        x: -800,
        y: 450,
    },
    direction: "HORIZONTAL",
    verticalOffset: -150,
    horizontalOffset: 150,
    wrapAt: 800,
    wrapTo: -800,
};
export const DEFAULT_BUTTON_LOCATION: DefaultLocation = {
    anchor: {
        x: -780,
        y: -450,
    },
    direction: "HORIZONTAL",
    verticalOffset: 100,
    horizontalOffset: 250,
    wrapAt: 780,
    wrapTo: -780,
};
export const DEFAULT_TEXT_LOCATION: DefaultLocation = {
    anchor: {
        x: -780,
        y: 450,
    },
    direction: "VERTICAL",
    verticalOffset: -100,
    horizontalOffset: 250,
    wrapAt: -450,
    wrapTo: 450,
};

export const DEFAULT_DECK_DEFINITION: DeckDefinition = [
  [
    {
      name: 'rank',
      values: ['Ace','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten','Jack','Queen','King'],
      
    }, {
      name: 'suit',
      values: ['Hearts','Clubs','Spades','Diamonds'],
    }
  ]
];