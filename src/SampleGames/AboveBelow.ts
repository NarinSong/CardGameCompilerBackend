import { ValueNode } from "../schemas/AST.js";
import Action from "../Rules/ActionDefinition.js";
import GameDefinition from "../Rules/GameDefinition.js";
import { ButtonType, PileState, TriggerType, Visibility } from "../schemas/types.js";

const AboveBelow = new GameDefinition();

// Step 1: Define the players

AboveBelow.addPlayerPile({ label: 'Victory', initialValue: PileState.EMPTY, visibility: Visibility.FACE_UP });

// Step 2: Set the game meta

AboveBelow.minPlayers = 1,
AboveBelow.maxPlayers = 1;

// Step 3: Define the Board

AboveBelow.addBoardPile({label: 'Deck', initialValue: PileState.SHUFFLED, visibility: Visibility.FACE_DOWN });
AboveBelow.addBoardPile({label: 'Flip', initialValue: PileState.EMPTY, visibility: Visibility.FACE_UP });
AboveBelow.addBoardPile({label: 'Flop', initialValue: PileState.EMPTY, visibility: Visibility.FACE_UP });

AboveBelow.addBoardButton({ label: 'Above', actionRoles: ['Bet'], type: ButtonType.CLICK });
AboveBelow.addBoardButton({ label: 'Same', actionRoles: ['Bet'], type: ButtonType.CLICK });
AboveBelow.addBoardButton({ label: 'Below', actionRoles: ['Bet'], type: ButtonType.CLICK });

// Step 4: Create the Actions
const main = AboveBelow.addPhase('Main');
const flip = AboveBelow.addStepToPhase(main, 'flip');
const flop = AboveBelow.addStepToPhase(main, 'flop');
const end = AboveBelow.addStepToPhase(main, 'end');

const variables = ['up', 'down']; // TODO

function L(v: any): ValueNode {
    return {type: 'LITERAL', primary: v};
}
/*
const flipCard = new Action(
    {
        type: TriggerType.CLICK,
        target: 'Deck'
    },
    null,
    {
        type: 'SEQUENCE',
        primary: [
            {
                type: 'DEAL_CARDS',
                primary: L('Deck'),
                secondary: L('Flip'),
                tertiary: L(1)
            },
            {
                type: 'SET_STEP',
                primary: L('flop')
            }
        ]
    }
);

const makeGuess = new Action(
    {
        type: TriggerType.CLICK,
        target: 'Bet'
    },
    null,
    {
        type: 'SEQUENCE',
        primary: [
            {
                type: 'DEAL_CARDS',
                primary: L('Deck'),
                secondary: L('Flop'),
                tertiary: L(1)
            },
            {
                type: 'SET_VARIABLE',
                name: L('up'),
                value: {
                    type: 'LESS_THAN',
                    primary: {
                        
                    }
                }
            }
        ]
    }
);

AboveBelow.addActionToStep(flip, flipCard);
AboveBelow.addActionToStep(flop, makeGuess);
*/
export default AboveBelow;