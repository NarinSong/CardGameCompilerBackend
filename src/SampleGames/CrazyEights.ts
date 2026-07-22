import { AST_Node, ValueNode } from "../schemas/AST.js";
import Action from "../Rules/ActionDefinition.js";
import GameDefinition from "../Rules/GameDefinition.js";
import { PileState, TriggerType, Visibility } from "../schemas/types.js";

const CrazyEights = new GameDefinition();

// Step 1: Define the players
CrazyEights.addPlayerPile({ label: 'Hand', actionRole: 'Hand', initialValue: PileState.EMPTY, visibility: Visibility.FACE_UP });

// Step 2: Set the game meta

CrazyEights.minPlayers = 2,
CrazyEights.maxPlayers = 4;

// Register game variable with type 'Suit'
const currentSuitVariable = 'CurrentSuit';
CrazyEights.gameMeta.variables[currentSuitVariable] = 'Suit';

// Step 3: Define the Board

CrazyEights.addBoardPile({label: 'Deck', initialValue: PileState.SHUFFLED, visibility: Visibility.FACE_DOWN });
CrazyEights.addBoardPile({label: 'Discard', initialValue: PileState.EMPTY, visibility: Visibility.FACE_UP });
CrazyEights.addBoardButton({label: 'Pass', type: 'CLICK'});

// Suit selection buttons
CrazyEights.addBoardButton({label: 'Hearts',   actionRoles: ['suitSelection'], type: 'CLICK', visibility: Visibility.INVISIBLE});
CrazyEights.addBoardButton({label: 'Spades',   actionRoles: ['suitSelection'], type: 'CLICK', visibility: Visibility.INVISIBLE});
CrazyEights.addBoardButton({label: 'Clubs',    actionRoles: ['suitSelection'], type: 'CLICK', visibility: Visibility.INVISIBLE});
CrazyEights.addBoardButton({label: 'Diamonds', actionRoles: ['suitSelection'], type: 'CLICK', visibility: Visibility.INVISIBLE});

// Step 4: Create the Actions
const main = CrazyEights.addPhase('Main');
const setup = CrazyEights.addStepToPhase(main, 'setup')
const play = CrazyEights.addStepToPhase(main, 'play');
const chooseSuit = CrazyEights.addStepToPhase(main, 'wild');

function L(v: any): ValueNode {
    return {type: 'LITERAL', primary: v};
}

const UNDEFINED_NODE: AST_Node = { type: 'UNDEFINED' };

const deal = new Action(
    {
        type: TriggerType.AUTO
    },
    null,
    {
        type: 'SEQUENCE',
        primary: [
            // Deal 7 cards to each player
            {
                type: 'WHILE',
                primary: {
                    type: 'NOT',
                    primary: {
                        type: 'HAS_ROLE',
                        id: {
                            type: 'FIRST_PLAYER'
                        },
                        role: L('active')
                    }
                },
                secondary: {
                    type: 'DEAL_CARDS',
                    primary: L('Deck'),
                    secondary: {
                        type: 'PILE_OF',
                        id: {
                            type: 'NEXT_PLAYER',
                            primary: L('active')
                        },
                        actionRole: L('Hand')
                    },
                    tertiary: L(7)
                }
            },

            // Flip one card to the discard pile
            {
                type: 'DEAL_CARDS',
                primary: L('Deck'),
                secondary: L('Discard'),
                tertiary: L(1)
            },
            {
                type: 'UPDATE_VARIABLE',
                name: L(currentSuitVariable),
                variableType: 'Suit',
                value: {
                    type: 'SUIT',
                    primary: {
                        type: 'CARD_OF_PILE',
                        primary: L('Discard'),
                        secondary: L(1)
                    }
                }
            },

            // Set step to play
            {
                type: 'SET_STEP',
                primary: L(play)
            }
        ]
    }
)

CrazyEights.addActionToStep(setup, deal);

const playCard = new Action(
    {
        type: TriggerType.CLICK,
        target: 'Hand'
    },
    {
        type: 'AND',
        primary: {
            type: 'HAS_ROLE',
            id: {
                type: 'CTX_PLAYER'
            },
            role: L('active')
        },
        // Card suit or value matches with the top card of the discard pile or chosen suit if it's an 8
        secondary: {
            type: 'OR',
            primary: {
                type: 'EQUAL',
                primary: {
                    type: 'RANK',
                    primary: {
                        type: 'CARD_OF_PILE',
                        primary: L('Discard'),
                        secondary: L(1)
                    }
                },
                secondary: {
                    type: 'RANK',
                    primary: {
                        type: 'CTX_CARD'
                    }
                }
            },
            secondary: {
                type: 'EQUAL',
                primary: {
                    type: 'GET_VARIABLE',
                    name: L(currentSuitVariable),
                    variableType: 'Suit'
                },
                secondary: {
                    type: 'SUIT',
                    primary: {
                        type: 'CTX_CARD'
                    }
                }
            }
        }
    },
    {
        type: 'SEQUENCE',
        primary: [
            {
                type: 'UPDATE_VARIABLE',
                variableType: 'Suit',
                name: L(currentSuitVariable),
                value: {
                    type: 'SUIT',
                    primary: {
                        type: 'CTX_CARD'
                    }
                }
            },
            {
                type: 'DEAL_CARDS',
                primary: {
                    type: 'CLICKED_LABEL'
                },
                secondary: L('Discard'),
                tertiary: L(1)
            },
            // Check for win
            {
                type: 'IF',
                primary: {
                    type: 'EQUAL',
                    primary: {
                        type: 'NUM_CARDS_IN_PILE',
                        primary: {
                            type: 'CLICKED_LABEL'
                        }
                    },
                    secondary: L(0)
                },
                secondary: {
                    type: 'WIN',
                    primary: {
                        type: 'CTX_PLAYER'
                    },
                    secondary: UNDEFINED_NODE,
                    tertiary: L(true)
                },
                tertiary: UNDEFINED_NODE
            },
            // Pass turn or go to eights step to allow suit choice
            {
                type: 'IF',
                primary: {
                    type: 'STRING_EQ',
                    primary: {
                        type: 'RANK',
                        primary: {
                            type: 'CTX_CARD'
                        }
                    },
                    secondary: L('Eight')
                },
                secondary: {
                    type: 'SEQUENCE',
                    primary: [
                        {
                            type: 'SET_STEP',
                            primary: L(chooseSuit)
                        },
                        {
                            type: 'SET_BUTTON_VISIBILITY',
                            primary: L('Hearts'),
                            secondary: L(Visibility.FACE_UP)
                        },
                        {
                            type: 'SET_BUTTON_VISIBILITY',
                            primary: L('Spades'),
                            secondary: L(Visibility.FACE_UP)
                        },
                        {
                            type: 'SET_BUTTON_VISIBILITY',
                            primary: L('Clubs'),
                            secondary: L(Visibility.FACE_UP)
                        },
                        {
                            type: 'SET_BUTTON_VISIBILITY',
                            primary: L('Diamonds'),
                            secondary: L(Visibility.FACE_UP)
                        }
                    ]
                },
                tertiary: {
                    type: 'NEXT_PLAYER',
                    primary: L('active')
                }
            }
        ]
    }
);

CrazyEights.addActionToStep(play, playCard);

const wild = new Action(
    {
        type: 'CLICK',
        target: 'suitSelection'
    },
    {
        type: 'HAS_ROLE',
        id: {
            type: 'CTX_PLAYER'
        },
        role: L('active')
    },
    {
        type: 'SEQUENCE',
        primary: [
            // Select the suit
            {
                type: 'UPDATE_VARIABLE',
                variableType: 'Suit',
                name: L(currentSuitVariable),
                value: {
                    type: 'CLICKED_LABEL' // Labels are 'Hearts', 'Spades', 'Clubs', and 'Diamonds'
                }
            },
            // Hide the buttons
            {
                type: 'SET_BUTTON_VISIBILITY',
                primary: L('Hearts'),
                secondary: L(Visibility.INVISIBLE)
            },
            {
                type: 'SET_BUTTON_VISIBILITY',
                primary: L('Spades'),
                secondary: L(Visibility.INVISIBLE)
            },
            {
                type: 'SET_BUTTON_VISIBILITY',
                primary: L('Clubs'),
                secondary: L(Visibility.INVISIBLE)
            },
            {
                type: 'SET_BUTTON_VISIBILITY',
                primary: L('Diamonds'),
                secondary: L(Visibility.INVISIBLE)
            },
            // Change step
            {
                type: 'SET_STEP',
                primary: L(play)
            },
            // Next player
            {
                type: 'NEXT_PLAYER',
                primary: L('active')
            }
        ]
    }
);

CrazyEights.addActionToStep(chooseSuit, wild);

const pass = new Action(
    {
        type: TriggerType.CLICK,
        target: 'Pass'
    },
    {
        type: 'HAS_ROLE',
        id: {
            type: 'CTX_PLAYER'
        },
        role: L('active')
    },
    {
        type: 'SEQUENCE',
        primary: [
            // Draw 1 card
            {
                type: 'DEAL_CARDS',
                primary: L('Deck'),
                secondary: {
                    type: 'PILE_OF',
                    id: {
                        type: 'CTX_PLAYER'
                    },
                    actionRole: L('Hand')
                },
                tertiary: L(1)
            },
            // Pass turn
            {
                type: 'NEXT_PLAYER',
                primary: L('active')
            }
        ]
    }
)

CrazyEights.addActionToStep(play, pass);

export default CrazyEights;