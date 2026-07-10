// This file is for specifying the Blocks server-side, which are then sent to the client

import { z } from "zod";

import { ButtonTypeSchema, CardSchema, LocationResolverSchema, PileStateSchema, RankSchema, SuitSchema, VisibilitySchema } from "./types.js";
import { NODE_NAMES } from "./Constants.js";

// These are the values that can be used inside the blocks and their corresponding JS types
export const ValueTypes = {
  Unknown: z.unknown(),
  Void: z.void(),
  Number: z.number(),
  String: z.string(),
  Boolean: z.boolean(),
  PileLabel: z.string(),
  CounterLabel: z.string(),
  ButtonLabel: z.string(),
  ActionRole: z.string(),
  PileState: PileStateSchema,
  Visibility: VisibilitySchema,
  Undefined: z.undefined(),
  Array: z.array(z.any()),
  Card: z.object({
    rank: z.string(),
    value: z.string()
  }),
  ID: z.number(),
  Player: z.number(),
  PlayerRole: z.string(),
  Step: z.string(),
  Phase: z.string(),
  Location: LocationResolverSchema,
  ButtonRange: z.object({ min: z.number().or(z.undefined()), max: z.number().or(z.undefined()), increment: z.number().or(z.undefined())}),
  ButtonType: ButtonTypeSchema,
  Rank: RankSchema,
  Suit: SuitSchema,
  VariableType: z.string(),
} as const;

export const ValueTypeNameSchema = z.enum(
  Object.keys(ValueTypes) as [
    keyof typeof ValueTypes,
    ...(keyof typeof ValueTypes)[]
  ]
);

export const ValueTypeValuesSchema = z.union(Object.values(ValueTypes));

export const ValueReturnSchema = z.union([
  z.unknown(),
  z.void(),
  z.undefined(),
  z.string(),
  z.boolean(),
  z.array(z.any()),
  PileStateSchema,
  VisibilitySchema,
  LocationResolverSchema,
  CardSchema,
]);

export type ValueTypeName = z.infer<typeof ValueTypeNameSchema>;
export type ValueTypeValues = z.infer<typeof ValueTypeValuesSchema>;
export type ValueReturn = z.infer<typeof ValueReturnSchema>;

// Helper types and functions to define blocks

// Block arguments/parameters
export type ArgDef<T extends ValueTypeName = ValueTypeName> = {
  name: string;
  displayName: string;
  type: T;
  optional?: boolean;
};

// How the blocks are structured
type BlockDef<
  TReturn extends ValueTypeName = ValueTypeName,
  TArgs extends readonly ArgDef[] = readonly ArgDef[]
> = {
  name: string;
  displayName: string;
  returnType: TReturn;
  arguments: TArgs;
};

function defineBlock<
  TReturn extends ValueTypeName,
  TArgs extends readonly ArgDef[]
>(def: BlockDef<TReturn, TArgs>) {
  return def;
}

// Each block is created using the "defineBlock" helper function

const UNDEFINED = defineBlock({
    name: NODE_NAMES.Undefined,
    displayName: "Undefined",
    returnType: "Undefined",
    arguments: []
});



const DEAL_CARDS = defineBlock({
    name: NODE_NAMES.DealCards,
    displayName: "Deal Cards",
    returnType: "Void",
    arguments: [
        {
        name: "primary",
        displayName: "From",
        type: "PileLabel",
        },
        {
        name: "secondary",
        displayName: "To",
        type: "PileLabel",
        },
        {
        name: "tertiary",
        displayName: "number",
        type: "Number",
        },
    ] as const,
});

const CREATE_PILE = defineBlock({
    name: NODE_NAMES.CreatePile,
    displayName: "Create Pile",
    returnType: "PileLabel",
    arguments: [
        {
            name: "state",
            displayName: "Initial State",
            type: "PileState",
            optional: true
        },
        {
            "name": "name",
            "displayName": "Name",
            "type": "PileLabel",
            "optional": true
        },
        {
            "name": "visibility",
            "displayName": "Visibility",
            "type": "Visibility",
            "optional": true
        },
        {
            "name": "displayName",
            "displayName": "Display Name",
            "type": "String",
            "optional": true
        },
        {
            "name": "actionRoles",
            "displayName": "Action Roles",
            "type": "Array",
            "optional": true
        },
        {
            "name": "owner",
            "displayName": "Owner",
            "type": "Number",
            "optional": true
        },
        {
            "name": "location",
            "displayName": "Location",
            "type": "Location",
            "optional": true
        }
    ] as const
});

const REMOVE_PILE = defineBlock({
    "name": NODE_NAMES.RemovePile,
    "displayName": "Delete Pile",
    "returnType": "Void",
    "arguments": [
        {
            "name": "pile",
            "displayName": "Pile",
            "type": "PileLabel",
            "optional": false
        },
        {
            "name": "sendTo",
            "displayName": "To",
            "type": "PileLabel",
            "optional": true
        }
    ]
});

const IF = defineBlock({
    "name": NODE_NAMES.If,
    "displayName": "if",
    "returnType": "Void",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Condition",
            "type": "Boolean",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Then",
            "type": "Void",
            "optional": false
        },
        {
            "name": "tertiary",
            "displayName": "Else",
            "type": "Void",
            "optional": true
        }
    ]
});

const CLICKED_LABEL = defineBlock({
    "name": NODE_NAMES.ClickedLabel,
    "displayName": "Clicked Label",
    "returnType": "PileLabel",
    "arguments": []
});

const AND = defineBlock({
    "name": NODE_NAMES.And,
    "displayName": "And",
    "returnType": "Boolean",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Left",
            "type": "Boolean",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Right",
            "type": "Boolean",
            "optional": false
        }
    ]
});

const OR = defineBlock({
    "name": NODE_NAMES.Or,
    "displayName": "Or",
    "returnType": "Boolean",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Left",
            "type": "Boolean",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Right",
            "type": "Boolean",
            "optional": false
        }
    ]
});

const NOT = defineBlock({
    "name": NODE_NAMES.Not,
    "displayName": "Not",
    "returnType": "Boolean",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Argument",
            "type": "Boolean",
            "optional": false
        }
    ]
});

const PLUS = defineBlock({
    "name": NODE_NAMES.Plus,
    "displayName": "Plus",
    "returnType": "Number",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Left",
            "type": "Number",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Right",
            "type": "Number",
            "optional": false
        }
    ]
});

const TIMES = defineBlock({
    "name": NODE_NAMES.Times,
    "displayName": "Times",
    "returnType": "Number",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Left",
            "type": "Number",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Right",
            "type": "Number",
            "optional": false
        }
    ]
});

const MINUS = defineBlock({
    "name": NODE_NAMES.Minus,
    "displayName": "Minus",
    "returnType": "Number",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Left",
            "type": "Number",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Right",
            "type": "Number",
            "optional": false
        }
    ]
});

const DIV = defineBlock({
    "name": NODE_NAMES.Div,
    "displayName": "Divide",
    "returnType": "Number",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Left",
            "type": "Number",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Right",
            "type": "Number",
            "optional": false
        }
    ]
});

const STRING_EQ = defineBlock({
    "name": NODE_NAMES.StringEq,
    "displayName": "String Equals",
    "returnType": "Boolean",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Left",
            "type": "String",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Right",
            "type": "String",
            "optional": false
        }
    ]
});

const TERNARY = defineBlock({
    "name": NODE_NAMES.Ternary,
    "displayName": "Ternary",
    "returnType": "Number",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Condition",
            "type": "Boolean",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "If true",
            "type": "Void",
            "optional": false
        },
        {
            "name": "tertiary",
            "displayName": "If false",
            "type": "Void",
            "optional": false
        }
    ]
});

const CTX_CARD = defineBlock({
    "name": NODE_NAMES.CtxCard,
    "displayName": "Passed Card",
    "returnType": "Card",
    "arguments": []
});

const CTX_ID = defineBlock({
    "name": NODE_NAMES.CtxId,
    "displayName": "Clicked Card",
    "returnType": "ID",
    "arguments": []
});

const GET_ID_FROM_ROLE = defineBlock({
    "name": NODE_NAMES.GetIdFromRole,
    "displayName": "Get Player from Role",
    "returnType": "Player",
    "arguments": [
        {
            "name": "role",
            "displayName": "Role",
            "type": "PlayerRole",
            "optional": false
        },
        {
            "name": "index",
            "displayName": "Which Player",
            "type": "Number",
            "optional": true
        }
    ]
});

const PILE_OF = defineBlock({
    "name": NODE_NAMES.PileOf,
    "displayName": "Get a Player's Pile",
    "returnType": "PileLabel",
    "arguments": [
        {
            "name": "id",
            "displayName": "Player ID",
            "type": "Player",
            "optional": false
        },
        {
            "name": "actionRole",
            "displayName": "Pile's Action Role",
            "type": "ActionRole",
            "optional": false
        }
    ]
});

const HAS_ROLE = defineBlock({
    "name": NODE_NAMES.HasRole,
    "displayName": "Player has Role",
    "returnType": "Boolean",
    "arguments": [
        {
            "name": "id",
            "displayName": "Player ID",
            "type": "Player",
            "optional": false
        },
        {
            "name": "role",
            "displayName": "Player Role",
            "type": "PlayerRole",
            "optional": false
        }
    ]
});

const ASSIGN_ROLE = defineBlock({
    "name": NODE_NAMES.AssignRole,
    "displayName": "Assign a Role",
    "returnType": "Boolean",
    "arguments": [
        {
            "name": "id",
            "displayName": "Player ID",
            "type": "Player",
            "optional": false
        },
        {
            "name": "role",
            "displayName": "Player Role",
            "type": "PlayerRole",
            "optional": false
        }
    ]
});

const UNASSIGN_ROLE = defineBlock({
    "name": NODE_NAMES.UnassignRole,
    "displayName": "Unassign a Role",
    "returnType": "Boolean",
    "arguments": [
        {
            "name": "id",
            "displayName": "Player ID",
            "type": "Player",
            "optional": false
        },
        {
            "name": "role",
            "displayName": "Player Role",
            "type": "PlayerRole",
            "optional": false
        }
    ]
});

const ASSIGN_ROLE_SINGULAR = defineBlock({
    "name": NODE_NAMES.AssignRoleSingular,
    "displayName": "Assign a Role to One Player",
    "returnType": "Boolean",
    "arguments": [
        {
            "name": "id",
            "displayName": "Player ID",
            "type": "Player",
            "optional": false
        },
        {
            "name": "role",
            "displayName": "Player Role",
            "type": "PlayerRole",
            "optional": false
        }
    ]
});

const RANK = defineBlock({
    "name": NODE_NAMES.Rank,
    "displayName": "Card Rank",
    "returnType": "String",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Card",
            "type": "Card",
            "optional": false
        }
    ]
});

const SUIT = defineBlock({
    "name": NODE_NAMES.Suit,
    "displayName": "Card Suit",
    "returnType": "String",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Card",
            "type": "Card",
            "optional": false
        }
    ]
});

const MAP = defineBlock({
    "name": NODE_NAMES.Map,
    "displayName": "Map",
    "returnType": "Number",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Index",
            "type": "String",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Map Name",
            "type": "String",
            "optional": false
        },
    ]
});

const UPDATE_VARIABLE = defineBlock({
    "name": NODE_NAMES.UpdateVariable,
    "displayName": "Update Variable",
    "returnType": "Unknown",
    "arguments": [
        {
            "name": "name",
            "displayName": "Variable Name",
            "type": "String",
            "optional": false
        },
        {
            "name": "variableType",
            "displayName": "Type",
            "type": "VariableType",
            "optional": false
        },
        {
            "name": "value",
            "displayName": "Value",
            "type": "Unknown",
            "optional": false
        },
    ]
});

const GET_VARIABLE = defineBlock({
    "name": NODE_NAMES.GetVariable,
    "displayName": "Get Variable",
    "returnType": "Unknown",
    "arguments": [
        {
            "name": "name",
            "displayName": "Variable Name",
            "type": "String",
            "optional": false
        },
        {
            "name": "variableType",
            "displayName": "Type",
            "type": "VariableType",
            "optional": false
        },
    ]
});

const SET_STEP = defineBlock({
    "name": NODE_NAMES.SetStep,
    "displayName": "Set Step",
    "returnType": "Void",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Step",
            "type": "Step",
            "optional": false
        },
    ]
});

const SET_PHASE = defineBlock({
    "name": NODE_NAMES.SetPhase,
    "displayName": "Set Phase",
    "returnType": "Void",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Phase",
            "type": "Phase",
            "optional": false
        },
    ]
});

const WHILE = defineBlock({
    "name": NODE_NAMES.While,
    "displayName": "While",
    "returnType": "Void",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Condition",
            "type": "Boolean",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Run",
            "type": "Void",
            "optional": false
        },
    ]
});

const NEXT_PLAYER = defineBlock({
    "name": NODE_NAMES.NextPlayer,
    "displayName": "Next Player",
    "returnType": "Player",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Role",
            "type": "PlayerRole",
            "optional": false
        },
    ]
});

const LESS_THAN = defineBlock({
    "name": NODE_NAMES.LessThan,
    "displayName": "<",
    "returnType": "Boolean",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Left",
            "type": "Number",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Right",
            "type": "Number",
            "optional": false
        },
    ]
});

const GREATER_THAN = defineBlock({
    "name": NODE_NAMES.GreaterThan,
    "displayName": ">",
    "returnType": "Boolean",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Left",
            "type": "Number",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Right",
            "type": "Number",
            "optional": false
        },
    ]
});

const EQUAL = defineBlock({
    "name": NODE_NAMES.Equal,
    "displayName": "=",
    "returnType": "Boolean",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Left",
            "type": "Number",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Right",
            "type": "Number",
            "optional": false
        },
    ]
});

const SHUFFLE_INTO = defineBlock({
    "name": NODE_NAMES.ShuffleInto,
    "displayName": "Shuffle",
    "returnType": "PileLabel",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Pile",
            "type": "PileLabel",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Destination Pile",
            "type": "PileLabel",
            "optional": true
        },
    ]
});

const NUM_CARDS_IN_PILE = defineBlock({
    "name": NODE_NAMES.NumCardsInPile,
    "displayName": "Number of Cards in Pile",
    "returnType": "Number",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Pile",
            "type": "Number",
            "optional": false
        },
    ]
});

const VALUE_OF = defineBlock({
    "name": NODE_NAMES.ValueOf,
    "displayName": "Value of Counter",
    "returnType": "Number",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Counter",
            "type": "CounterLabel",
            "optional": false
        },
    ]
});

const MOVE_COUNTER_VALUE = defineBlock({
    "name": NODE_NAMES.MoveCounterValue,
    "displayName": "Move Counter Value",
    "returnType": "Void",
    "arguments": [
        {
            "name": "primary",
            "displayName": "From",
            "type": "CounterLabel",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "To",
            "type": "CounterLabel",
            "optional": false
        },
        {
            "name": "tertiary",
            "displayName": "Amount",
            "type": "Number",
            "optional": true
        },
    ]
});

const IS_BETWEEN = defineBlock({
    "name": NODE_NAMES.IsBetween,
    "displayName": "Number is Between",
    "returnType": "Boolean",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Card",
            "type": "Number",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Left",
            "type": "Number",
            "optional": false
        },
        {
            "name": "tertiary",
            "displayName": "Right",
            "type": "Number",
            "optional": false
        },
    ]
});

const FIRST_PLAYER = defineBlock({
    "name": NODE_NAMES.FirstPlayer,
    "displayName": "First Player",
    "returnType": "Player",
    "arguments": []
});

const LOCATION = defineBlock({
    "name": NODE_NAMES.Location,
    "displayName": "Location",
    "returnType": "Location",
    "arguments": [
        {
            "name": "primary",
            "displayName": "X",
            "type": "Number",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Y",
            "type": "Number",
            "optional": false
        },
    ]
});

const CREATE_COUNTER = defineBlock({
    name: NODE_NAMES.CreateCounter,
    displayName: "Create Counter",
    returnType: "CounterLabel",
    arguments: [
        {
            name: "state",
            displayName: "Initial State",
            type: "Number",
            optional: true
        },
        {
            "name": "name",
            "displayName": "Name",
            "type": "PileLabel",
            "optional": true
        },
        {
            "name": "visibility",
            "displayName": "Visibility",
            "type": "Visibility",
            "optional": true
        },
        {
            "name": "displayName",
            "displayName": "Display Name",
            "type": "String",
            "optional": true
        },
        {
            "name": "actionRoles",
            "displayName": "Action Roles",
            "type": "Array",
            "optional": true
        },
        {
            "name": "owner",
            "displayName": "Owner",
            "type": "Number",
            "optional": true
        },
        {
            "name": "location",
            "displayName": "Location",
            "type": "Location",
            "optional": true
        }
    ] as const
});

const CREATE_BUTTON = defineBlock({
    name: NODE_NAMES.CreateButton,
    displayName: "Create Button",
    returnType: "ButtonLabel",
    arguments: [
        {
            "name": "name",
            "displayName": "Name",
            "type": "PileLabel",
            "optional": true
        },
        {
            "name": "visibility",
            "displayName": "Visibility",
            "type": "Visibility",
            "optional": true
        },
        {
            "name": "displayName",
            "displayName": "Display Name",
            "type": "String",
            "optional": true
        },
        {
            "name": "actionRoles",
            "displayName": "Action Roles",
            "type": "Array",
            "optional": true
        },
        {
            "name": "owner",
            "displayName": "Owner",
            "type": "Number",
            "optional": true
        },
        {
            "name": "location",
            "displayName": "Location",
            "type": "Location",
            "optional": true
        },
        {
            "name": "buttonType",
            "displayName": "Type",
            "type": "ButtonType",
            "optional": true
        },
        {
            "name": "range",
            "displayName": "Range",
            "type": "ButtonRange",
            "optional": true
        },
    ] as const
});

const BUTTON_RANGE = defineBlock({
    "name": NODE_NAMES.ButtonRange,
    "displayName": "Button Range",
    "returnType": "ButtonRange",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Min",
            "type": "Number",
            "optional": true
        },
        {
            "name": "secondary",
            "displayName": "Max",
            "type": "Number",
            "optional": true
        },
        {
            "name": "tertiary",
            "displayName": "Increment",
            "type": "Number",
            "optional": true
        },
    ]
});

const WIN = defineBlock({
    "name": NODE_NAMES.Win,
    "displayName": "Win",
    "returnType": "Void",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Player",
            "type": "Player",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Score",
            "type": "Number",
            "optional": true
        },
        {
            "name": "tertiary",
            "displayName": "End the Game",
            "type": "Boolean",
            "optional": true
        },
    ]
});

const LOSE = defineBlock({
    "name": NODE_NAMES.Lose,
    "displayName": "Lose",
    "returnType": "Void",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Player",
            "type": "Player",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Score",
            "type": "Number",
            "optional": true
        },
        {
            "name": "tertiary",
            "displayName": "End the Game",
            "type": "Boolean",
            "optional": true
        },
    ]
});

const BUTTON_VALUE = defineBlock({
    "name": NODE_NAMES.ButtonValue,
    "displayName": "Button Value",
    "returnType": "Number",
    "arguments": []
});

const CARD_OF_PILE = defineBlock({
    "name": NODE_NAMES.CardOfPile,
    "displayName": "Card of Pile",
    "returnType": "Card",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Pile",
            "type": "PileLabel",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Index",
            "type": "Number",
            "optional": true
        },
    ]
});

const SET_RANGE = defineBlock({
    "name": NODE_NAMES.SetRange,
    "displayName": "Set Range",
    "returnType": "ButtonLabel",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Button",
            "type": "ButtonLabel",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Range",
            "type": "ButtonRange",
            "optional": false
        },
    ]
});

const SET_COUNTER_VALUE = defineBlock({
    "name": NODE_NAMES.SetCounterValue,
    "displayName": "Set Counter Value",
    "returnType": "CounterLabel",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Counter",
            "type": "CounterLabel",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Value",
            "type": "Number",
            "optional": true
        },
    ]
});

const SET_PILE_VISIBILITY = defineBlock({
    "name": NODE_NAMES.SetPileVisibility,
    "displayName": "Set Pile Visibility",
    "returnType": "PileLabel",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Pile",
            "type": "PileLabel",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Visibility",
            "type": "Visibility",
            "optional": true
        },
    ]
});

const SET_BUTTON_VISIBILITY = defineBlock({
    "name": NODE_NAMES.SetButtonVisisibility,
    "displayName": "Set Button Visibility",
    "returnType": "ButtonLabel",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Button",
            "type": "ButtonLabel",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Visibility",
            "type": "Visibility",
            "optional": true
        },
    ]
});

const SET_COUNTER_VISIBILITY = defineBlock({
    "name": NODE_NAMES.SetCounterVisibility,
    "displayName": "Set Counter Visibility",
    "returnType": "CounterLabel",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Counter",
            "type": "CounterLabel",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Visibility",
            "type": "Visibility",
            "optional": true
        },
    ]
});

const REMOVE_COUNTER = defineBlock({
    "name": NODE_NAMES.RemoveCounter,
    "displayName": "Remove Counter",
    "returnType": "Void",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Counter",
            "type": "CounterLabel",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Send Value To",
            "type": "CounterLabel",
            "optional": true
        },
    ]
});

const REMOVE_BUTTON = defineBlock({
    "name": NODE_NAMES.RemoveButton,
    "displayName": "Remove Button",
    "returnType": "ButtonLabel",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Button",
            "type": "ButtonLabel",
            "optional": false
        },
    ]
});

const COUNTER_OF = defineBlock({
    "name": NODE_NAMES.CounterOf,
    "displayName": "Get a Player's Counter",
    "returnType": "CounterLabel",
    "arguments": [
        {
            "name": "id",
            "displayName": "Player ID",
            "type": "Player",
            "optional": false
        },
        {
            "name": "actionRole",
            "displayName": "Counter's Action Role",
            "type": "ActionRole",
            "optional": false
        }
    ]
});

const BUTTON_OF = defineBlock({
    "name": NODE_NAMES.ButtonOf,
    "displayName": "Get a Player's Button",
    "returnType": "ButtonLabel",
    "arguments": [
        {
            "name": "id",
            "displayName": "Player ID",
            "type": "Player",
            "optional": false
        },
        {
            "name": "actionRole",
            "displayName": "Button's Action Role",
            "type": "ActionRole",
            "optional": false
        }
    ]
});

const PILE_SET = defineBlock({
    "name": NODE_NAMES.PileSet,
    "displayName": "How Many in a Set of Cards",
    "returnType": "PileLabel",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Pile",
            "type": "PileLabel",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Rank",
            "type": "Rank",
            "optional": true
        },
        {
            "name": "tertiary",
            "displayName": "Suit",
            "type": "Suit",
            "optional": true
        }
    ]
});

const PILE_SET_OF_RANK = defineBlock({
    "name": NODE_NAMES.PileSetOfRank,
    "displayName": "Contains Set of Cards",
    "returnType": "PileLabel",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Pile",
            "type": "PileLabel",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Number",
            "type": "Number",
            "optional": true // defaults to if the pile has any (1)
        },
        {
            "name": "tertiary",
            "displayName": "Rank",
            "type": "Rank",
            "optional": true
        },
        {
            "name": "fourth",
            "displayName": "Suit",
            "type": "Suit",
            "optional": true
        }
    ]
});

const PILE_FLUSH = defineBlock({
    "name": NODE_NAMES.PileFlush,
    "displayName": "Pile Flush",
    "returnType": "PileLabel",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Pile",
            "type": "PileLabel",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Suit",
            "type": "Suit",
            "optional": true
        },
        {
            "name": "tertiary",
            "displayName": "Rank",
            "type": "Rank",
            "optional": true
        }
    ]
});

const PILE_FLUSH_OF_SUIT = defineBlock({
    "name": NODE_NAMES.PileFlushOfSuit,
    "displayName": "Contains Flush of Cards",
    "returnType": "PileLabel",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Pile",
            "type": "PileLabel",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Number",
            "type": "Number",
            "optional": true // defaults to if the pile has any (1)
        },
        {
            "name": "tertiary",
            "displayName": "Suit",
            "type": "Suit",
            "optional": true
        },
        {
            "name": "fourth",
            "displayName": "Rank",
            "type": "Rank",
            "optional": true
        }
    ]
});

const PILE_RUN = defineBlock({
    "name": NODE_NAMES.PileRun,
    "displayName": "Cards in a Row",
    "returnType": "PileLabel",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Pile",
            "type": "PileLabel",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Suit",
            "type": "Suit",
            "optional": true
        }
    ]
});

const PILE_RUN_FROM = defineBlock({
    "name": NODE_NAMES.PileRunFrom,
    "displayName": "Contains Run of Cards",
    "returnType": "PileLabel",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Pile",
            "type": "PileLabel",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Number",
            "type": "Number",
            "optional": true // defaults to if the pile has any (1)
        },
        {
            "name": "tertiary",
            "displayName": "Rank",
            "type": "Rank",
            "optional": true
        },
        {
            "name": "fourth",
            "displayName": "Suit",
            "type": "Suit",
            "optional": true
        }
    ]
});

// Put the blocks together in a registry to export them
export const BLOCKS = {
    UNDEFINED,
    DEAL_CARDS,
    CREATE_PILE,
    REMOVE_PILE,
    IF,
    CLICKED_LABEL,
    AND,
    OR,
    NOT,
    PLUS,
    TIMES,
    MINUS,
    DIV,
    STRING_EQ,
    TERNARY,
    CTX_CARD,
    CTX_ID,
    GET_ID_FROM_ROLE,
    PILE_OF,
    HAS_ROLE,
    ASSIGN_ROLE,
    UNASSIGN_ROLE,
    ASSIGN_ROLE_SINGULAR,
    RANK,
    SUIT,
    MAP,
    UPDATE_VARIABLE,
    GET_VARIABLE,
    SET_PHASE,
    SET_STEP,
    WHILE,
    NEXT_PLAYER,
    LESS_THAN,
    GREATER_THAN,
    EQUAL,
    SHUFFLE_INTO,
    NUM_CARDS_IN_PILE,
    VALUE_OF,
    MOVE_COUNTER_VALUE,
    IS_BETWEEN,
    FIRST_PLAYER,
    LOCATION,
    CREATE_COUNTER,
    CREATE_BUTTON,
    WIN,
    LOSE,
    BUTTON_RANGE,
    SET_RANGE,
    BUTTON_VALUE,
    CARD_OF_PILE,
    SET_COUNTER_VALUE,
    SET_PILE_VISIBILITY,
    SET_BUTTON_VISIBILITY,
    SET_COUNTER_VISIBILITY,
    REMOVE_COUNTER,
    REMOVE_BUTTON,
    COUNTER_OF,
    BUTTON_OF,
    PILE_SET,
    PILE_SET_OF_RANK,
    PILE_FLUSH,
    PILE_FLUSH_OF_SUIT,
    PILE_RUN,
    PILE_RUN_FROM,
} as const;

export type BlockName = keyof typeof BLOCKS;
export const BlockNames = Object.keys(BLOCKS) as [...BlockName[]];
