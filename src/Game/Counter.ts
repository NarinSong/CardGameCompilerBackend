import CounterDefinition from "../Rules/CounterDefinition";
import { Label } from "../Rules/LabelManager";
import GameLabels from "./GameLabels";

export default class Counter {
    label: Label;
    value: number;
    
    constructor (definition: CounterDefinition, gameLabels: GameLabels) {
        this.label = definition.label;
        this.value = definition.number;

        gameLabels.registerCounter(this, this.label);
    }
}