import CounterDefinition from "../Rules/CounterDefinition";
import { Label } from "../Rules/LabelManager";
import { ActionRole, DisplayName, Visibility } from "../schemas/types";
import GameLabels from "./GameLabels";

/**
 * Represents a counter in the game.
 * 
 * A Counter stores a numeric value and metadata such as its label, action roles, display name, and visibility.
 */
export default class Counter {
    label: Label;
    value: number;
    actionRoles: ActionRole[];
    displayName: DisplayName;
    visibility: Visibility;
    
    /**
     * Creates a new counter instance.
     * 
     * This constructor is private and should only be called through the provided factory methods.
     * 
     * @param initialState - The initial numeric value of the counter.
     * @param label - The unique label used to identify the counter.
     * @param visibility - The visibility of the counter.
     * @param gameLabels - The game's label manager.
     * @param actionRoles - The actions that can be done with the counter.
     * @param displayName - The display name shown in the game.
     */
    private constructor(
        initialState: number,
        label: Label,
        visibility: Visibility,
        gameLabels: GameLabels,
        actionRoles: ActionRole[],
        displayName: DisplayName,
    ) {
        this.value = initialState;
        this.label = label;
        this.visibility = visibility;
        this.actionRoles = actionRoles;
        this.displayName = displayName;

        gameLabels.registerCounter(this, this.label);
    }
    
    /**
     * Creates a counter from CounterDefinition.
     * @param definition - Configuration for the counter, including its label, display name, action roles, initial value, and visibility.
     * @param gameLabels - The game's label manager.
     * @returns A newly constructed counter.
     */
    static fromDefinition(definition: CounterDefinition, gameLabels: GameLabels) {
        return new Counter(
            definition.number,
            definition.label,
            definition.visibility,
            gameLabels,
            definition.actionRoles,
            definition.displayName,
        );
    }

    /**
     * Creates a new counter using explicit parameters.
     * @param initialState - The initial value of the counter.
     * @param label - The name of the counter.
     * @param visibility - The visibility of the counter.
     * @param gameLabels - The game's label manager.
     * @param actionRoles - The actions that can be done with the counter.
     * @param displayName - The display name shown in the game.
     * @returns A newly constructed counter.
     */
    static create(
        initialState: number,
        label: Label,
        visibility: Visibility,
        gameLabels: GameLabels,
        actionRoles: ActionRole[],
        displayName: DisplayName,
    ) {
        return new Counter(initialState, label, visibility, gameLabels, actionRoles, displayName);
    }
}