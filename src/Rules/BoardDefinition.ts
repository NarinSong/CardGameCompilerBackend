// This file is similar to the player pile
// It holds all of the data specific to the game that is not per-player
// Piles, counters, etc.

import ButtonDefinition from "./ButtonDefinition.js";
import CounterDefinition from "./CounterDefinition.js";
import PileDefinition from "./PileDefinition.js";


/**
 * Defines the piles and counters that make up the game board.
 * 
 *  A BoardDefinition contains the piles and counters associated with the game board itself rather than with an individual player.
 */
export default class BoardDefinition {
    piles: PileDefinition[];
    counters: CounterDefinition[];
    buttons: ButtonDefinition[];

    /**
     * Creates a new board definition.
     */
    constructor() {
        this.piles = [];
        this.counters = [];
        this.buttons = [];
    }
}