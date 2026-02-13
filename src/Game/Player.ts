import CounterDefinition from "../Rules/CounterDefinition";
import PileDefinition from "../Rules/PileDefinition";
import PlayerDefinition from "../Rules/PlayerDefinition";
import { PlayerType } from "../types";
import Counter from "./Counter";
import GameLabels from "./GameLabels";
import Pile from "./Pile";

export default class Player {
    piles: Pile[];
    counters: Counter[];
    type: PlayerType;

    constructor(definition: PlayerDefinition, type: PlayerType, gameLabels: GameLabels) {
        this.type = type;
        this.piles = [];
        this.counters = [];

        this.initializePiles(definition.piles, gameLabels);
        this.initializeCounters(definition.counters, gameLabels);
    }

    initializePiles(definition: PileDefinition[], gameLabels: GameLabels) {
        for (let def of definition) {
            this.piles.push(Pile.fromDefinition(def, gameLabels))
        }
    }

    initializeCounters(definition: CounterDefinition[], gameLabels: GameLabels) {
        for (let def of definition) {
            this.counters.push(new Counter(def, gameLabels))
        }
    }
    
}