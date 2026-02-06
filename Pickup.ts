/*
const Pickup = new GameDefinition();

// Step 0: Set up the labels

const pickupLabels = new LabelsManager();

const DeckLabel = pickupLabels.addLabel('Deck')

Pickup.defineLabels(pickupLabels);

// Step 1: Define the players

Pickup.definePlayers(
    new PlayerDefinition()
);

// Step 2: Set the game meta

Pickup.defineMeta(
    new GameMeta(
        {
            cardType: CARD_TYPE.STANDARD,
            maxPlayers: 1,
            minPlayers: 1,
        }
    )
);

// Step 3: Define the Board

const Board = new BoardDefinition();

const Deck = new Pile(
    {
        label: DeckLabel,
        visibility: VISIBILITY.NOT_VISIBLE,
        intialState: DECK.FULL_DECK,
        stacking: STACKING.STACKED,
    }
);

Board.addPile(Deck);

Pickup.defineBoard(Board);

// Step 4: Create the Actions

const gamePhases = new GamePhaseDefinition();

const main = gamePhases.addPhase('Main');

const step1 = main.addStep('Step1');

step1.addAction(
    new Action(
        {
            trigger: new Trigger(
                {
                    type: TRIGGER.CLICK_TRIGGER,
                    target: DeckLabel
                }
            ),
            filter: () => {
                return true;
            },
            result: () => {
                const tempLabel = pickupLabels.generateLabel();
                const flipped = Board.addPile(
                    new Pile(
                        {
                            label: tempLabel,
                            visibility: VISIBILITY.VISIBLE,
                        }
                    )
                )

                Deck.dealCardTo(flipped);
            }
        }
    )
)

Pickup.definePhases(gamePhases);

// Step 5: Instantiate the Game

const game1 = Pickup.createGame();
*/