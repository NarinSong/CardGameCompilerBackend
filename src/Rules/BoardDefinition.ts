// This file is similar to the player pile
// It holds all of the data specific to the game that is not per-player
// Piles, counters, etc.

import CounterDefinition from "./CounterDefinition";
import PileDefinition from "./PileDefinition";

export default class BoardDefinition {
    piles: PileDefinition[];
    counters: CounterDefinition[];

    constructor() {
        this.piles = [];
        this.counters = [];
    }
}