import Card from "../Components/Card";
import GameState from "../Game/GameState";
import Pile from "../Game/Pile";
import Action from "../Rules/ActionDefinition";
import Filter from "../Rules/FilterDefinition";
import GameDefinition from "../Rules/GameDefinition";
import { Label } from "../Rules/LabelManager";
import Result from "../Rules/ResultDefinition";
import Trigger from "../Rules/TriggerDefinition";
import { PileState, rank, Rank, TriggerType, Visibility } from "../types";

const War = new GameDefinition();

// Step 1: Define the players

// Nothing here, since the players have nothing

// It would look like 
// War.addPlayerPile('Hand', PileState.EMPTY, Visibility.FACE_UP);

// Step 2: Set the game meta

War.minPlayers = 1,
War.maxPlayers = 1;

// Step 3: Define the Board

War.addBoardPile({label: 'Robot', initialValue: PileState.SHUFFLED, visibility: Visibility.FACE_DOWN });
War.addBoardPile({label: 'RobotDiscard', initialValue: PileState.EMPTY, visibility: Visibility.FACE_UP });
War.addBoardPile({label: 'RobotPlay', initialValue: PileState.EMPTY, visibility: Visibility.FACE_UP });

War.addPlayerPile({label: 'Player', initialValue: PileState.SHUFFLED, visibility: Visibility.FACE_DOWN});
War.addPlayerPile({label: 'PlayerDiscard', initialValue: PileState.EMPTY, visibility: Visibility.FACE_UP});
War.addPlayerPile({label: 'PlayerPlay', initialValue: PileState.EMPTY, visibility: Visibility.FACE_UP});

// Step 4: Create the Actions

const main = War.addPhase('Main');
const step1 = War.addStepToPhase(main, 'step1');

const playCard = new Action(
    new Trigger(TriggerType.CLICK, 'Player'),
    null,
    new Result(
        (game: GameState, label: Label) => {
            game.dealCards('Robot', 'RobotPlay', 1);
            game.dealCards('Player', 'PlayerPlay', 1);

            game.moveToStep('step2');
        }
    )
);

War.addActionToStep(step1, playCard);

const step2 = War.addStepToPhase(main, 'step2');

const warEval = new Action(
    new Trigger(TriggerType.CLICK, 'PlayerPlay'),
    null,
    new Result(
        (game: GameState, label: Label) => {
            const rp = game.gameLabels.getFromLabel('RobotPlay') as Pile;
            const pp = game.gameLabels.getFromLabel('PlayerPlay') as Pile;
            if (Card.isBigger(rp.cards[0], pp.cards[0])) {
                // Robot wins
                game.dealCards('RobotPlay', 'RobotDiscard', 1);
                game.dealCards('PlayerPlay', 'RobotDiscard', 1);
            } else {
                // Player wins
                game.dealCards('RobotPlay', 'PlayerDiscard', 1);
                game.dealCards('PlayerPlay', 'PlayerDiscard', 1);
            }

            game.moveToStep('step1');
        }
    )
)

War.addActionToStep(step2, warEval);

const restoreCard = new Action(
    new Trigger(TriggerType.CLICK, 'Card'),
    null,
    new Result(
        (game: GameState, label: Label) => {
            console.log('Removing ' + label);
            game.removePileFromBoard({ pile: label, sendCardsTo: 'Deck' });
        }
    )
)

War.addActionToStep(step1, restoreCard);

export default War;