import BoardDefinition from "../Rules/BoardDefinition.js";
import GameLabels from "./GameLabels.js";

/**
 * Represents the game board and its runtime components.
 * 
 *  A Board is created from a BoardDefinition and contains the piles and counters that exist on the board during gameplay.
 */
export default class Board {
    /**
     * Creates a new board instance.
     * @param definition - The board definition describing the board layout.
     * @param gameLabels - The label manager used to describe game objects.
     */
    constructor(definition: BoardDefinition, gameLabels: GameLabels) {
    }
}