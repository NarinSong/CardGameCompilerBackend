import Game from "../Game/Game";
import Card from "./Card";
import { ActionContext, evaluate, ValueNode } from "./TreeParser";

export default class ValueMap<T extends string | number, N> implements ValueMap<T,N> {
    #mapping: Record<T,N>;

    constructor(mapping: Record<T,N>) {
        this.#mapping = mapping;
    }

    get(key: T) {
        // Note: ctx is assumed to include the target of type T
        return this.#mapping[key];
    }
}

export class CalculationMap<T,N> {
    #evaluator: ValueNode;

    constructor(evaluator: ValueNode) {
        this.#evaluator = evaluator;
    }

    get(g: Game, ctx: ActionContext) {
        return evaluate(g, ctx, this.#evaluator) as N;
    }
}

export type SuitDisplayMap = ValueMap<string, number>;
export type CardValueMap = CalculationMap<Card, number>;

export const DEFAULT_CARD_RANK_MAP = new ValueMap<string, number>({
    'ace': 0,
    'two': 1,
    'three': 2,
    'four': 3,
    'five': 4,
    'six': 5,
    'seven': 6,
    'eight': 7,
    'nine': 8,
    'ten': 9,
    'jack': 10,
    'queen': 11,
    'king': 12,
})

export const DEFAULT_CLIENT_VIEW_RANK_MAP = DEFAULT_CARD_RANK_MAP;
export const DEFAULT_CLIENT_VIEW_SUIT_MAP = new ValueMap<string, number>({
    'Clubs': 0,
    'Diamonds': 1,
    'Spades': 2,
    'Hearts': 3,
    'Jokers': 4,
});

export const DEFAULT_VALUE_MAP = new CalculationMap<Card, number>(
    {
        type: 'MAP', primary: {
            type: 'RANK', primary: {
                type: 'CTX_CARD'
            }
        },
        secondary: {
            type: 'LITERAL',
            primary: 'CARD_RANK_MAP'
        }
    }
)