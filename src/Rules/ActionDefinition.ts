// An action is something that a player can do during a step or phase
// Each action has an associated trigger (what the player does)
//      along with a filter (when they can do it)
//      and a result (what happens when the action is taken)

import { ActionNode, ValueNode } from "../schemas/AST";
import Trigger from "./TriggerDefinition";

/**
 *   Defines the trigger, filter, and result that make up a game action.
 * 
 *  An Action describes what causes the action (trigger), when it is allowed to occur (filter), and what happens when it executes (result).
 */
export default class Action {
    result: ActionNode;
    filter: ValueNode;
    trigger: Trigger;

    /**
     * Creates a new action definition.
     * @param trigger - The trigger that initiates the action.
     * @param filter - The condition that determines whether the action is allowed. If null, the action is always permitted.
     * @param result - The effect that occurs when the action executes.
     */
    constructor(trigger: Trigger, filter: ValueNode | null, result: ActionNode) {
        this.trigger = trigger;
        this.filter = filter || { type: 'LITERAL', primary: true };
        this.result = result;
    }
}