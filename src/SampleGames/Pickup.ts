import GameState from "../Game/GameState";
import Action from "../Rules/ActionDefinition";
import GameDefinition from "../Rules/GameDefinition";
import Result from "../Rules/ResultDefinition";
import Trigger from "../Rules/TriggerDefinition";
import { PileState, TriggerType, Visibility } from "../types";

const Pickup = new GameDefinition();

// Step 1: Define the players

// Nothing here, since the players have nothing

// It would look like 
// Pickup.addPlayerPile('Hand', PileState.EMPTY, Visibility.FACE_UP);

// Step 2: Set the game meta

Pickup.minPlayers = 1,
Pickup.maxPlayers = 4;

// Step 3: Define the Board

Pickup.addBoardPile('Deck', PileState.SHUFFLED, Visibility.FACE_DOWN);

// Step 4: Create the Actions

const main = Pickup.addPhase('Main');
const step1 = Pickup.addStepToPhase(main, 'step1');

const playCard = new Action(
    new Trigger(TriggerType.CLICK, 'Deck'),
    null,
    new Result(
        (game: GameState) => {
            const pile = game.addPile({visibility: Visibility.FACE_UP});
            game.dealCards('Deck', pile, 1);
        }
    )
);

Pickup.addActionToStep(step1, playCard);

export default Pickup;