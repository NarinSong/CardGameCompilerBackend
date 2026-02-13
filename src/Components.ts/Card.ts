import Pile from "../Game/Pile";
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

    static dealCards(from: Pile, to: Pile, number: number) {
        let i = 0;
        while (i < number && from.cards.length) {
            const card = from.cards.pop();
            if (card)
                to.cards.push(card);
            i++;
        }
    }
}