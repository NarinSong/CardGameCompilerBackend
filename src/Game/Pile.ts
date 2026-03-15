import Card from "../Components/Card";
import { Label } from "../Rules/LabelManager";
import PileDefinition from "../Rules/PileDefinition";
import { ActionRole, DisplayName, PileState, Visibility } from "../schemas/types";
import GameLabels from "./GameLabels";

/**
 * Defines a Pile of cards in the card.
 * 
 * A Pile stores its cards, label, visibility, action roles, and display name.
 */
export default class Pile {
    cards: Card[];
    label: Label;
    visibility: Visibility;
    actionRoles: ActionRole[];
    displayName: DisplayName;

    /**
     * Creates a new pile.
     * 
     * This constructor is private and should only be called through the provided factory methods.
     * 
     * @param initialState - The initial configuration of the pile (e.g., "SORTED", "EMPTY", "SHUFFLED").
     * @param label - The unique name given to the pile.
     * @param visibility - The visibility of the pile.
     * @param gameLabels - The game's label manager.
     * @param actionRoles - The actions that can be done with the pile.
     * @param displayName - The display name shown in the game.
     */
    private constructor(
        initialState: PileState,
        label: Label,
        visibility: Visibility,
        gameLabels: GameLabels,
        actionRoles: ActionRole[],
        displayName: DisplayName,
    ) {
        this.cards = Card.fromInitialState(initialState);
        this.label = label;
        this.visibility = visibility;
        this.actionRoles = actionRoles;
        this.displayName = displayName;

        gameLabels.registerPile(this, this.label);
    }

    /**
     * Creates a pile from PileDefinition.
     * @param definition - Configuration for the pile, including its label, display name, action roles, initial state, and visibility.
     * @param gameLabels - The game's label manager.
     * @returns A newly constructed pile.
     */
    static fromDefinition(definition: PileDefinition, gameLabels: GameLabels) {
        return new Pile(
            definition.initialState,
            definition.label,
            definition.visibility,
            gameLabels,
            definition.actionRoles,
            definition.displayName,
        );
    }

    /**
     * Creates a new pile using explicit parameters.
     * @param initialState - The initial configuration of the pile (e.g., ""SORTED", "EMPTY", "SHUFFLED").
     * @param label - The unique name given to the pile.
     * @param visibility - The visibility of the pile.
     * @param gameLabels - The game's label manager.
     * @param actionRoles - The actions that can be done with the pile.
     * @param displayName - The display name shown in the game.
     * @returns A newly constructed pile.
     */
    static create(
        initialState: PileState,
        label: Label,
        visibility: Visibility,
        gameLabels: GameLabels,
        actionRoles: ActionRole[],
        displayName: DisplayName,
    ) {
        return new Pile(initialState, label, visibility, gameLabels, actionRoles, displayName);
    }
}
