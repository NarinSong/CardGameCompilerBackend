// This file is for specifying the Blocks server-side, which are then sent to the client

import { z } from "zod";

import { PileStateSchema, VisibilitySchema } from "./types.js";

// These are the values that can be used inside the blocks and their corresponding JS types
export const ValueTypes = {
  Unknown: z.unknown(),
  Void: z.void(),
  Number: z.number(),
  String: z.string(),
  Boolean: z.boolean(),
  PileLabel: z.string(),
  PileState: PileStateSchema,
  Visibility: VisibilitySchema,
  Undefined: z.undefined(),
  Array: z.array(z.any()),
} as const;

export const ValueTypeNameSchema = z.enum(
  Object.keys(ValueTypes) as [
    keyof typeof ValueTypes,
    ...(keyof typeof ValueTypes)[]
  ]
);

export type ValueTypeName = z.infer<typeof ValueTypeNameSchema>;

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

// Put the blocks together in a registry to export them
export const BLOCKS = {
    UNDEFINED,
    DEAL_CARDS,
    CREATE_PILE,
    REMOVE_PILE,
    IF,
    FOR_EACH,
    CLICKED_LABEL,
} as const;

export type BlockName = keyof typeof BLOCKS;
export const BlockNames = Object.keys(BLOCKS) as [...BlockName[]];
