// An action is something that a player can do during a step or phase
// Each action has an associated trigger (what the player does)
//      along with a filter (when they can do it)
//      and a result (what happens when the action is taken)

import Filter from "./FilterDefinition";
import Trigger from "./TriggerDefinition";

export default class Action {
    result: Result;
    filter: Filter;
    trigger: Trigger;

    constructor(trigger: Trigger, filter?: Filter, result: Result) {
        this.trigger = trigger;
        this.filter = filter || () => true;
        this.result = result;
    }
}