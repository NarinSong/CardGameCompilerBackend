import Game from "../Game/Game.js";
import Card from "./Card.js";
import { ActionContext, ValueNode } from "../schemas/AST.js";
import { evaluate } from "./TreeParser.js";
import { rank, suit } from "../schemas/types.js";


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

    /**
     * Looks up a value in the map by key.
     * @param key - The key to look up.
     * @returns The mapped value, or undefined if the key is not found.
     */
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
export const DEFAULT_CARD_RANK_MAP = new ValueMap<rank, number>({
    'Ace': 0,
    'Two': 1,
    'Three': 2,
    'Four': 3,
    'Five': 4,
    'Six': 5,
    'Seven': 6,
    'Eight': 7,
    'Nine': 8,
    'Ten': 9,
    'Jack': 10,
    'Queen': 11,
    'King': 12,
})

/**
 * Default mapping used by the client to display rank values.
 */
export const DEFAULT_CLIENT_VIEW_RANK_MAP = DEFAULT_CARD_RANK_MAP;

/**
 * Default mapping used by the client to display suit values.
 */
export const DEFAULT_CLIENT_VIEW_SUIT_MAP = new ValueMap<suit, number>({
    'Clubs': 0,
    'Diamonds': 1,
    'Spades': 2,
    'Hearts': 3,
    'Jokers': 4,
    'Trumps': 5,
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