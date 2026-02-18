// The trigger is a concrete thing a player can do within Unity
// When a trigger (clicking on a card, etc.) occurs, the client
//      will message the server and the server will look for
//      associated actions, which will be filtered and the result run

import { ActionRole, TriggerType } from "../types";

export default class Trigger {
    type: TriggerType;
    target: ActionRole;

    constructor(type: TriggerType, target: ActionRole) {
        this.type = type;
        this.target = target;
    }
}