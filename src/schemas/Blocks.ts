// This file is for specifying the Blocks server-side, which are then sent to the client

import { z } from "zod";

import { CardSchema, LocationSchema, PileStateSchema, VisibilitySchema } from "./types.js";

// These are the values that can be used inside the blocks and their corresponding JS types
export const ValueTypes = {
  Unknown: z.unknown(),
  Void: z.void(),
  Number: z.number(),
  String: z.string(),
  Boolean: z.boolean(),
  PileLabel: z.string(),
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
  Location: z.object({
    x: z.number(),
    y: z.number(),
  })
} as const;

export const ValueTypeNameSchema = z.enum(
  Object.keys(ValueTypes) as [
    keyof typeof ValueTypes,
    ...(keyof typeof ValueTypes)[]
  ]
);

export const ValueReturnSchema = z.union([
  z.unknown(),
  z.void(),
  z.undefined(),
  z.string(),
  z.boolean(),
  z.array(z.any()),
  PileStateSchema,
  VisibilitySchema,
  LocationSchema,
  CardSchema,
]);

export type ValueTypeName = z.infer<typeof ValueTypeNameSchema>;
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
    name: "UNDEFINED",
    displayName: "Undefined",
    returnType: "Undefined",
    arguments: []
});



const DEAL_CARDS = defineBlock({
    name: "DEAL_CARDS",
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
    name: "CREATE_PILE",
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
    "name": "REMOVE_PILE",
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
    "name": "IF",
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

const FOR_EACH = defineBlock({
    "name": "FOR_EACH",
    "displayName": "For",
    "returnType": "Void",
    "arguments": [
        {
            "name": "primary",
            "displayName": "Array",
            "type": "Array",
            "optional": false
        },
        {
            "name": "secondary",
            "displayName": "Do",
            "type": "Void",
            "optional": false
        }
    ]
});

const CLICKED_LABEL = defineBlock({
    "name": "CLICKED_LABEL",
    "displayName": "Clicked Label",
    "returnType": "PileLabel",
    "arguments": []
});

const AND = defineBlock({
    "name": "AND",
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
    "name": "OR",
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
    "name": "NOT",
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
    "name": "PLUS",
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
    "name": "TIMES",
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
    "name": "MINUS",
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
    "name": "DIV",
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
    "name": "STRING_EQ",
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
    "name": "TERNARY",
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
    "name": "CTX_CARD",
    "displayName": "Passed Card",
    "returnType": "Card",
    "arguments": []
});

const CTX_ID = defineBlock({
    "name": "CTX_CARD",
    "displayName": "Clicked Card",
    "returnType": "ID",
    "arguments": []
});

const GET_ID_FROM_ROLE = defineBlock({
    "name": "GET_ID_FROM_ROLE",
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
    "name": "PILE_OF",
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
    "name": "HAS_ROLE",
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
    "name": "ASSIGN_ROLE",
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
    "name": "UNASSIGN_ROLE",
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
    "name": "ASSIGN_ROLE_SINGULAR",
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
    "name": "RANK",
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
    "name": "SUIT",
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
    "name": "MAP",
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

const ADD_VARIABLE = defineBlock({
    "name": "ADD_VARIABLE",
    "displayName": "Add Variable",
    "returnType": "Number",
    "arguments": [
        {
            "name": "name",
            "displayName": "Variable Name",
            "type": "String",
            "optional": false
        },
        {
            "name": "value",
            "displayName": "Value",
            "type": "Number",
            "optional": false
        },
    ]
});

const UPDATE_VARIABLE = defineBlock({
    "name": "UPDATE_VARIABLE",
    "displayName": "Update Variable",
    "returnType": "Number",
    "arguments": [
        {
            "name": "name",
            "displayName": "Variable Name",
            "type": "String",
            "optional": false
        },
        {
            "name": "value",
            "displayName": "Value",
            "type": "Number",
            "optional": false
        },
    ]
});

const GET_VARIABLE = defineBlock({
    "name": "GET_VARIABLE",
    "displayName": "Get Variable",
    "returnType": "Number",
    "arguments": [
        {
            "name": "name",
            "displayName": "Variable Name",
            "type": "String",
            "optional": false
        },
    ]
});

const SET_STEP = defineBlock({
    "name": "SET_STEP",
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
    "name": "SET_PHASE",
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


// Put the blocks together in a registry to export them
export const BLOCKS = {
    UNDEFINED,
    DEAL_CARDS,
    CREATE_PILE,
    REMOVE_PILE,
    IF,
    FOR_EACH,
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
    ADD_VARIABLE,
    UPDATE_VARIABLE,
    GET_VARIABLE,
    SET_PHASE,
    SET_STEP,
} as const;

export type BlockName = keyof typeof BLOCKS;
export const BlockNames = Object.keys(BLOCKS) as [...BlockName[]];
