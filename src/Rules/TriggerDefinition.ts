// The trigger is a concrete thing a player can do within Unity
// When a trigger (clicking on a card, etc.) occurs, the client
//      will message the server and the server will look for
//      associated actions, which will be filtered and the result run

import { Label } from "./LabelManager";
import { TriggerType } from "./TypesDefinition";

export default class Trigger {
    type: TriggerType;
    target: Label;

    constructor(type: TriggerType, target: Label) {
        this.type = type;
        this.target = target;
    }
}