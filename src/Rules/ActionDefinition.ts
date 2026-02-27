// An action is something that a player can do during a step or phase
// Each action has an associated trigger (what the player does)
//      along with a filter (when they can do it)
//      and a result (what happens when the action is taken)

import { ActionNode, ValueNode } from "../AST/Parser2";
import { FilterFn } from "../types";
import Trigger from "./TriggerDefinition";

export default class Action {
    result: ActionNode;
    filter: ValueNode;
    trigger: Trigger;

    constructor(trigger: Trigger, filter: ValueNode | null, result: ActionNode) {
        this.trigger = trigger;
        this.filter = filter || { type: 'LITERAL', primary: true };
        this.result = result;
    }
}