// Specific to each game, the PlayerDefintion determines what properties
//      each player can have. Piles of cards, counters, etc.

import CounterDefinition from "./CounterDefinition";
import PileDefinition from "./PileDefinition";

export default class PlayerDefinition {
    piles: PileDefinition[];
    counters: CounterDefinition[];

    constructor(piles?: PileDefinition[], counters?: CounterDefinition[]) {
        this.piles = piles || [];
        this.counters = counters || [];
    }
}