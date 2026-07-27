import { Label } from "../Rules/LabelManager.js";
import TextDefinition from "../Rules/TextDefinition.js";
import { ActionRole, DisplayName, LocationResolver, Visibility } from "../schemas/types.js";
import GameLabels from "./GameLabels.js";

export default class Text {
    label: Label;
    text: string;
    actionRoles: ActionRole[];
    displayName: DisplayName;
    visibility: Visibility;
    location: LocationResolver;
    
    private constructor(
        text: string,
        label: Label,
        visibility: Visibility,
        gameLabels: GameLabels,
        actionRoles: ActionRole[],
        displayName: DisplayName,
        location: LocationResolver,
    ) {
        this.text = text;
        this.label = label;
        this.visibility = visibility;
        this.actionRoles = actionRoles;
        this.displayName = displayName;
        this.location = location;

        gameLabels.registerText(this, this.label);
    }
    
    static fromDefinition(definition: TextDefinition, gameLabels: GameLabels, playerId?: number): Text {
        const label = typeof playerId !== 'undefined' && playerId !== -1 ? definition.label + playerId : definition.label;

        return new Text(
            definition.text,
            label,
            definition.visibility,
            gameLabels,
            definition.actionRoles,
            definition.displayName,
            definition.location,
        );
    }

    static create(
        text: string,
        label: Label,
        visibility: Visibility,
        gameLabels: GameLabels,
        actionRoles: ActionRole[],
        displayName: DisplayName,
        location: LocationResolver,
    ): Text {
        return new Text(text, label, visibility, gameLabels, actionRoles, displayName, location);
    }
}