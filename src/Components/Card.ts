import Pile from "../Game/Pile";
import { CardArgs } from "../schemas/GameComponentArgs";
import { PileState, RANK, rank, SUIT, suit } from "../schemas/types";
import Logger from "./Logger";


/**
 * Defines the properties for a card.
 * 
 * A Card consists of its suit and rank.
 */
export default class Card {
    rank: rank;
    suit: suit;

    /**
     * Creates a card.
     * @param args - Card arguments (rank, suit).
     */
    constructor(args: CardArgs) {
        this.rank = args.rank;
        this.suit = args.suit;
    }

    /**
     * Returns the numeric rank index of a card.
     * @param card - A card whose rank should be evaluated.
     * @returns The numeric rank index of the card or -1 if rank is not found. 
     */
    static numberRank(card: Card) {
        for (let i in RANK) {
            if (card.rank == RANK[i]) return +i;
        }
        return -1;
    }

    /**
     * Creates a default deck (one card for every unique combination of rank and suit).
     * @returns A list of cards.
     */
    static defaultDeck() {
        const cards: Card[] = [];

        for (const suit of SUIT) {
            for (const rank of RANK) {
                cards.push(new Card({rank: rank, suit: suit}));
            }
        }

        return cards;
    }

    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    /**
     * Shuffles a deck of cards.
     * @param cards - The list of unshuffled cards.
     * @returns A shuffled list of cards.
     */
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

    /**
     * Creates a deck of cards based on its state. Eg. "SHUFFLED".
     * @param state - The state the pile is in.
     * @returns A shuffled deck if its state is "SHUFFLED". Else it returns an empty card array.
     */
    static fromInitialState(state: PileState) {
        // TODO: Pile states

        if (state == PileState.SHUFFLED) {
            // Assume standard 52 card deck
            return Card.shuffle(Card.defaultDeck())
        }

        return [] as Card[];
    }

    /**
     * Deal a number of cards from one pile to another.
     * @param from - The pile where the cards will be dealt from.
     * @param to - The pile that will receive the dealt cards.
     * @param number - The number of cards you would like to deal.
     */
    static dealCards(from: Pile, to: Pile, number: number) {
        let i = 0;
        while (i < number && from.cards.length) {
            const card = from.cards.pop();
            if (card)
                to.cards.push(card);
            i++;
        }
    }

    /**
     * Compares the rank of two different cards
     * @param from - The first card.
     * @param to - The second card.
     * @returns True if the first card has a higher rank, otherwise false.
     */
    static isBigger(from: Card | undefined, to: Card | undefined) {
        Logger.debug('Checking which card is bigger');
        
        if (!from || !to) return false;

        const indexA = Card.numberRank(from);
        const indexB = Card.numberRank(to);

        Logger.debug(`${from.rank} is ${indexA} vs ${to.rank} is ${indexB}`);

        return indexA > indexB;
    }
}