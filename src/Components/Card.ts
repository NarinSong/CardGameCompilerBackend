import Pile from "../Game/Pile";
import { PileState, RANK, rank, SUIT, suit } from "../types";
import Logger from "./Logger";

export default class Card {
    rank: rank;
    suit: suit;

    constructor(rank: rank, suit: suit) {
        this.rank = rank;
        this.suit = suit;
    }

    static numberRank(card: Card) {
        for (let i in RANK) {
            if (card.rank == RANK[i]) return +i;
        }
        return -1;
    }

    static defaultDeck() {
        const cards: Card[] = [];

        for (const suit of SUIT) {
            for (const rank of RANK) {
                cards.push(new Card(rank, suit));
            }
        }

        return cards;
    }

    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    static shuffle(cards: Card[]) {
        // Fully random array shuffle
        // Unbiased Fisher-Yates shuffle
        let currentIndex = cards.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [cards[currentIndex], cards[randomIndex]] = [
            cards[randomIndex] as Card, cards[currentIndex] as Card];
        }

        return cards;
    }

    
    static fromInitialState(state: PileState) {
        // TODO: Pile states

        if (state == PileState.SHUFFLED) {
            // Assume standard 52 card deck
            return Card.shuffle(Card.defaultDeck())
        }

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

    static isBigger(from: Card | undefined, to: Card | undefined) {
        Logger.debug('Checking which card is bigger');
        
        if (!from || !to) return false;

        const indexA = Card.numberRank(from);
        const indexB = Card.numberRank(to);

        Logger.debug(`${from.rank} is ${indexA} vs ${to.rank} is ${indexB}`);

        return indexA > indexB;
    }
}