import Game from "../Game/Game.js";
import Card from "./Card.js";
import { ActionContext, ValueNode } from "../schemas/AST.js";
import { evaluate } from "./TreeParser.js";


/**
 * Defines a mapping from one value type to another.
 * 
 * A ValueMap wraps a record and provides lookup access for mapped values.
 */
export default class ValueMap<T extends string | number, N> implements ValueMap<T,N> {
    #mapping: Record<T,N>;

    /**
     * Creates a new ValueMap.
     * @param mapping - Record containing the values used for lookup.
     */
    constructor(mapping: Record<T,N>) {
        this.#mapping = mapping;
    }

    get(key: T) {
        // Note: ctx is assumed to include the target of type T
        return this.#mapping[key];
    }
}

/**
 * Defines a lazy calculation wrapper.
 * 
 * A CalculationMap stores a value node and evaluates it on demand.
 */
export class CalculationMap<T,N> {
    #evaluator: ValueNode;

    /**
     * Creates a new CalculationMap
     * @param evaluator - Value node used to compute the result.
     */
    constructor(evaluator: ValueNode) {
        this.#evaluator = evaluator;
    }

    /**
     * Evaluates the stored value node in the current game context.
     * @param g - The current game instance.
     * @param ctx - The current action context.
     * @returns The evaluated result.
     */
    get(g: Game, ctx: ActionContext) {
        return evaluate(g, ctx, this.#evaluator) as N;
    }
}

/**
 * Mapping used to convert suit names into client display names.
 */
export type SuitDisplayMap = ValueMap<string, number>;

/**
 * Calculation used to determine the numeric value of a card.
 */
export type CardValueMap = CalculationMap<Card, number>;


/**
 * Default mapping from card rank names to numeric rank values.
 */
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

/**
 * Default mapping used by the client to display rank values.
 */
export const DEFAULT_CLIENT_VIEW_RANK_MAP = DEFAULT_CARD_RANK_MAP;

/**
 * Default mapping used by the client to display suit values.
 */
export const DEFAULT_CLIENT_VIEW_SUIT_MAP = new ValueMap<string, number>({
    'Clubs': 0,
    'Diamonds': 1,
    'Spades': 2,
    'Hearts': 3,
    'Jokers': 4,
});

/**
 * Default calculation used to determine a card's numeric value.
 */
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