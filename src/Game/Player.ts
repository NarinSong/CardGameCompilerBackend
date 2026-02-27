import CounterDefinition from "../Rules/CounterDefinition";
import PileDefinition from "../Rules/PileDefinition";
import PlayerDefinition from "../Rules/PlayerDefinition";
import { PlayerID, PlayerType } from "../types";
import Counter from "./Counter";
import GameLabels from "./GameLabels";
import Pile from "./Pile";

export default class Player {
    type: PlayerType;
    id: PlayerID;

    constructor(definition: PlayerDefinition, type: PlayerType, gameLabels: GameLabels, id: PlayerID) {
        this.type = type;
        this.id = id;
    }
}