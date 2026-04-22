import { ValueNode } from "../schemas/AST.js";
import Action from "../Rules/ActionDefinition.js";
import GameDefinition from "../Rules/GameDefinition.js";
import Trigger from "../Rules/TriggerDefinition.js";
import { ButtonType, PileState, TriggerType, Visibility } from "../schemas/types.js";

const Between = new GameDefinition();

// Step 1: Define the players

// Nothing here, since the players have nothing

// It would look like 
// Pickup.addPlayerPile('Hand', PileState.EMPTY, Visibility.FACE_UP);

// Step 2: Set the game meta

Between.minPlayers = 1,
Between.maxPlayers = 1;

// Step 3: Define the Board

Between.addBoardPile({label: 'Deck', initialValue: PileState.SHUFFLED, visibility: Visibility.FACE_DOWN });
Between.addBoardPile({label: 'Discard', initialValue: PileState.EMPTY, visibility: Visibility.FACE_UP });
Between.addBoardPile({label: 'Play', initialValue: PileState.EMPTY, visibility: Visibility.FACE_UP });
Between.addBoardPile({label: 'Hit', initialValue: PileState.EMPTY, visibility: Visibility.FACE_UP });

Between.addBoardCounter({ label: 'Pot', initialValue: 50 });

Between.addBoardButton({ label: 'Bet', type: ButtonType.NUMBER, range: { min: 0, increment: 1 } });

Between.addPlayerCounter({ actionRole: 'Chips', initialValue: 50 });

// Step 4: Create the Actions

// TODO: register the role 'activePlayer'

const main = Between.addPhase('Main');
const step0 = Between.addStepToPhase(main, 'start');
const step1 = Between.addStepToPhase(main, 'step1');

function L(v: any): ValueNode {
    return {type: 'LITERAL', primary: v};
}

const start = new Action(
    new Trigger(TriggerType.AUTO),
    null,
    {
        type: 'SEQUENCE',
        primary: [
            {
                type: 'DEAL_CARDS',
                primary: L('Deck'),
                secondary: L('Play'),
                tertiary: L(2),
            },
            {
                type: 'CHANGE_STEP',
                primary: 'step1'
            },
            {
                type: 'ASSIGN_ROLE_SINGULAR',
                role: L('activePlayer'),
                id: {
                    type: 'FIRST_PLAYER' // TODO
                }
            }
        ]
    }
);

const playCard = new Action(
    new Trigger(TriggerType.CLICK, 'Bet'),
    {
        type: 'HAS_ROLE',
        id: {
            type: 'CTX_ID'
        },
        role: L('activePlayer')
    },
    {
        type: 'SEQUENCE',
        primary: [
            {
                type: 'DEAL_CARDS',
                primary: L('Deck'),
                secondary: L('Hit'),
                tertiary: L(1),
            },
            {
                type: 'IF',
                primary: {
                    type: 'IS_BETWEEN',
                    // This is fake
                },
                secondary: {
                    type: 'MOVE_COUNTER', //ALSO FAKE
                    primary: L('POT'),
                    secondary: {
                        type: 'FROM_PLAYER_ACTION_ROLE', // FAKE TOO
                        primary: {
                            type: 'CTX_ID'
                        },
                        secondary: L('Chips')
                    },
                    tertiary: {
                        type: 'CLICKED_VALUE' // NEED TO IMPLEMENT
                    }
                },
                tertiary: {
                    type: 'MOVE_COUNTER', //ALSO FAKE
                    primary: {
                        type: 'FROM_PLAYER_ACTION_ROLE', // FAKE TOO
                        primary: {
                            type: 'CTX_ID'
                        },
                        secondary: L('Chips')
                    },
                    secondary: L('POT'),
                    tertiary: {
                        type: 'CLICKED_VALUE' // NEED TO IMPLEMENT
                    }
                }
            },
            {
                type: 'DEAL_CARDS',
                primary: L('Play'),
                secondary: L('Discard'),
                tertiary: L(2),
            },
            {
                type: 'DEAL_CARDS',
                primary: L('Hit'),
                secondary: L('Discard'),
                tertiary: L(1),
            },
            {
                type: 'IF',
                primary: {
                    type: 'LESS_THAN', // TODO
                    primary: {
                        type: 'NUM_CARDS_IN_PILE', // TODO
                        primary: L('Deck')
                    },
                    secondary: L(3)
                },
                secondary: {
                    type: 'SHUFFLE_INTO', // TODO
                    primary: L('Discard'),
                    secondary: L('Deck')
                }
            },
            {
                type: 'ASSIGN_ROLE_SINGULAR',
                id: {
                    type: 'NEXT_PLAYER',
                    current: {
                        type: 'CTX_ID'
                    }
                },
                role: L('activePlayer')
            }
        ]
    }
);

Between.addActionToStep(step0, start);
Between.addActionToStep(step1, playCard);

export default Between;