import Game from "../Game/Game";
import Card from "./Card";
import { ActionContext, evaluate, ValueNode } from "./TreeParser";

export default class ValueMap<T,N> {
    #mapping: ValueNode;

    constructor(mapping: ValueNode) {
        this.#mapping = mapping;
    }

    get(g: Game, ctx: ActionContext) {
        // Note: ctx is assumed to include the target of type T
        return evaluate(g, ctx, this.#mapping) as N;
    }
}

export type SuitDisplayMap = ValueMap<string, number>;
export type CardValueMap = ValueMap<Card, number>;