export default class LabelManager {
    labels: Label[];
    #nextId: number;

    constructor() {
        this.labels = [] as Label[];
        this.#nextId = 1000;
    }

    createLabel(name?: string) {
        this.labels.push(new Label(name || ''+this.#nextId, this));
    }

    getFromLabel(l: Label) {
        return this.labels.filter((value: Label) => {return value === l;})[0] || null;
    }

    get nextId() {
        return ++this.#nextId;
    }
}

export class Label {
    name: string;
    uid: number;
    item: any;

    constructor(name: string, manager: LabelManager) {
        this.name = name;
        this.uid = manager.nextId;
    }

    setItem(item: any) {
        this.item = item;
    }
}