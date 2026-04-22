import { ValueNode } from "../schemas/AST.js";
import Action from "../Rules/ActionDefinition.js";
import GameDefinition from "../Rules/GameDefinition.js";
import { PileState, TriggerType, Visibility } from "../schemas/types.js";

const Pickup = new GameDefinition();

// Step 1: Define the players

// Nothing here, since the players have nothing

// It would look like 
// Pickup.addPlayerPile('Hand', PileState.EMPTY, Visibility.FACE_UP);

// Step 2: Set the game meta

Pickup.minPlayers = 1,
Pickup.maxPlayers = 4;

// Step 3: Define the Board

Pickup.addBoardPile({label: 'Deck', initialValue: PileState.SHUFFLED, visibility: Visibility.FACE_DOWN });
Pickup.addBoardPile({label: 'Deck2', actionRole: 'Deck', initialValue: PileState.SHUFFLED, visibility: Visibility.FACE_DOWN });

// Step 4: Create the Actions

const main = Pickup.addPhase('Main');
const step1 = Pickup.addStepToPhase(main, 'step1');

function L(v: any): ValueNode {
    return {type: 'LITERAL', primary: v};
}

const playCard = new Action(
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
                primary: {
                    type: 'CLICKED_LABEL'
                },
                secondary: {
                    type: 'CREATE_PILE',
                    visibility: L(Visibility.FACE_UP),
                    actionRoles: {
                        type: 'ARRAY',
                        sequence: [L('Card')]
                    },
                    displayName: L('Card Pile'),
                    state: { type: 'UNDEFINED' },
                    name: { type: 'UNDEFINED' },
                    owner: L(-1)
                },
                tertiary: L(1)
            }
        ]
    }
);

Pickup.addActionToStep(step1, playCard);

const restoreCard = new Action(
    {
        type: TriggerType.CLICK,
        target: 'Card'
    },
    null,
    {
        type: 'REMOVE_PILE',
        pile: {
            type: 'CLICKED_LABEL'
        },
        sendTo: L('Deck')
    }
)

Pickup.addActionToStep(step1, restoreCard);

export default Pickup;