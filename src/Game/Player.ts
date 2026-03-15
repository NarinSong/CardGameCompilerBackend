import CounterDefinition from "../Rules/CounterDefinition";
import PileDefinition from "../Rules/PileDefinition";
import PlayerDefinition from "../Rules/PlayerDefinition";
import { PlayerID, PlayerType } from "../schemas/types";
import Counter from "./Counter";
import GameLabels from "./GameLabels";
import Pile from "./Pile";

/**
 * Represents a player.
 * 
 * A Player stores the player's type and unique identifier and is initialized using a PlayerDefinition that describes the player's piles and counters.
 */
export default class Player {
    type: PlayerType;
    id: PlayerID;

    /**
     * Creates a new player.
     * @param definition - Configuration for the player which includes the counters and piles belonging to the player.
     * @param type - The type of player (e.g., "HUMAN", "ROBOT", "AI").
     * @param gameLabels - The game's label manager.
     * @param id - Unique identifier assigned to the player. 
     */
    constructor(definition: PlayerDefinition, type: PlayerType, gameLabels: GameLabels, id: PlayerID) {
        this.type = type;
        this.id = id;
    }
}