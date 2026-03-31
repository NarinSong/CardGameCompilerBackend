// The trigger is a concrete thing a player can do within Unity
// When a trigger (clicking on a card, etc.) occurs, the client
//      will message the server and the server will look for
//      associated actions, which will be filtered and the result run

import { ActionRole, TriggerType } from "../schemas/types.js";

/**
 * Defines the properties for a Trigger that can initiate an action.
 * 
 * A Trigger specifies the type of player interaction and the target action role that the interaction applies to.
 */
export default class Trigger {
    type: TriggerType;
    target: ActionRole;

    /**
     * Creates a Trigger.
     * @param type - The type of trigger. Eg. "CLICK".
     * @param target - The action role that the trigger applies to.
     */
    constructor(type: TriggerType, target: ActionRole) {
        this.type = type;
        this.target = target;
    }
}