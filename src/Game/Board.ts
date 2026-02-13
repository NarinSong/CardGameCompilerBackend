import BoardDefinition from "../Rules/BoardDefinition";
import CounterDefinition from "../Rules/CounterDefinition";
import PileDefinition from "../Rules/PileDefinition";
import Counter from "./Counter";
import GameLabels from "./GameLabels";
import Pile from "./Pile";

export default class Board {
    piles: Pile[];
    counters: Counter[];

    constructor(definition: BoardDefinition, gameLabels: GameLabels) {
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