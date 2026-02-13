import LabelManager, { Label } from "./LabelManager";

export default class CounterDefinition {
    number: number;
    label: Label;

    constructor(labelManager: LabelManager, name?: string, initialValue?: number) {
        this.number = initialValue || 0;
        this.label = labelManager.createLabel(this, name);
    }
}