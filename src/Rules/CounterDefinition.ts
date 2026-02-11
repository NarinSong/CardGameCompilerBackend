import { Label } from "./LabelManager";

export default class CounterDefinition {
    number: number;
    label: Label;

    constructor(label: Label, initialValue?: number) {
        this.number = initialValue || 0;
        this.label = label;
    }
}