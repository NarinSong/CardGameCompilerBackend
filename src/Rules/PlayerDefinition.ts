// Specific to each game, the PlayerDefintion determines what properties
//      each player can have. Piles of cards, counters, etc.

import CounterDefinition from "./CounterDefinition.js";
import PileDefinition from "./PileDefinition.js";

/**
 * Defines the piles and counters associated with a player.
 * 
 * A PlayerDefinition contains the list of piles and counters associated with the player. 
 */
export default class PlayerDefinition {
    piles: PileDefinition[];
    counters: CounterDefinition[];

    /**
     * Creates a new player definition.
     * @param piles - Optional list of piles belonging to the player.
     * @param counters - Optional list of counters belonging to the player.
     */
    constructor(piles?: PileDefinition[], counters?: CounterDefinition[]) {
        this.piles = piles || [];
        this.counters = counters || [];
    }
}