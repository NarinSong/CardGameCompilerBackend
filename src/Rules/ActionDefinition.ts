// An action is something that a player can do during a step or phase
// Each action has an associated trigger (what the player does)
//      along with a filter (when they can do it)
//      and a result (what happens when the action is taken)

import { FilterFn } from "../types";
import Filter from "./FilterDefinition";
import Result from "./ResultDefinition";
import Trigger from "./TriggerDefinition";

const defaultFilter : FilterFn = () => true;

export default class Action {
    result: Result;
    filter: Filter;
    trigger: Trigger;

    constructor(trigger: Trigger, filter: Filter | null, result: Result) {
        this.trigger = trigger;
        this.filter = filter || new Filter(defaultFilter);
        this.result = result;
    }
}