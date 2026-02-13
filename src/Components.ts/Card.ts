import { PileState, rank, suit } from "../types";

export default class Card {
    rank: rank;
    suit: suit;

    constructor(rank: rank, suit: suit) {
        this.rank = rank;
        this.suit = suit;
    }

    
    static fromInitialState(state: PileState) {
        // TODO: Pile states

        return [] as Card[];
    }
}