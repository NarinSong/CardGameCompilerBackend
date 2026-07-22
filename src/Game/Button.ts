import { Label } from "../Rules/LabelManager.js";
import ButtonDefinition from "../Rules/ButtonDefinition.js";
import { ActionRole, ButtonRange, ButtonType, DisplayName, LocationResolver, Visibility } from "../schemas/types.js";
import GameLabels from "./GameLabels.js";

/**
 * Represents an in game button.
 * 
 *  A Button consists of a label, Action roles, display name, button type, and range if necessary.
 */
export default class Button {
    label: Label;
    visibility: Visibility;
    actionRoles: ActionRole[];
    displayName: DisplayName;
    type: ButtonType;
    range: ButtonRange | undefined;
    location: LocationResolver;

    /**
     * Creates a new Button
     * @param label - Name associated with the button.
     * @param visibility - The visibility of the button.
     * @param gameLabels - Manages all the in game labels.
     * @param actionRoles - The action roles associated with the button.
     * @param displayName - In game name of the button.
     * @param type - Type of the button.
     * @param range - The numeric range configuration for the button, if applicable.
     * @param location - The location of the button on the board.
     */
    private constructor(
        label: Label,
        visibility: Visibility,
        gameLabels: GameLabels,
        actionRoles: ActionRole[],
        displayName: DisplayName,
        type: ButtonType,
        range: ButtonRange | undefined,
        location: LocationResolver,
    ) {
        this.label = label;
        this.visibility = visibility;
        this.actionRoles = actionRoles;
        this.displayName = displayName;
        this.type = type;
        this.range = range;
        this.location = location;

        gameLabels.registerButton(this, this.label);
    }

    /**
     * Creates a Button from ButtonDefinition.
     * @param definition - Configuration for the Button, including its label, display name, action roles, button type, and range if necessary.
     * @param gameLabels - The game's label manager.
     * @returns A newly constructed button.
     */
    static fromDefinition(definition: ButtonDefinition, gameLabels: GameLabels, playerId?: number): Button {
        const label = typeof playerId !== 'undefined' ? definition.label + playerId : definition.label;

        return new Button(
            label,
            definition.visibility,
            gameLabels,
            definition.actionRoles,
            definition.displayName,
            definition.type,
            definition.range,
            definition.location,
        );
    }

    /**
     * Creates a new Button with explicit parameters
     * @param label - Name associated with the button.
     * @param visibility - The visibility of the button.
     * @param gameLabels - Manages all the in game labels.
     * @param actionRoles - The action roles associated with the button.
     * @param displayName - In game name of the button.
     * @param type - Type of the button.
     * @param range - The numeric range configuration for the button, if applicable.
     * @param location - The location of the button on the board.
     * @returns the newly constructed button.
     */
    static create(
        label: Label,
        visibility: Visibility,
        gameLabels: GameLabels,
        actionRoles: ActionRole[],
        displayName: DisplayName,
        type: ButtonType,
        range: ButtonRange | undefined,
        location: LocationResolver
    ): Button {
        return new Button(label, visibility, gameLabels, actionRoles, displayName, type, range, location);
    }
}
