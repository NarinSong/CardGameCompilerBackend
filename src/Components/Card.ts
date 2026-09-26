import Pile from "../Game/Pile.js";
import { CardArgs } from "../schemas/GameComponentArgs.js";
import { DeckDefinition, DEFAULT_DECK_DEFINITION, MapType, PileState } from "../schemas/types.js";
import Logger from "./Logger.js";
import { DEFAULT_CLIENT_VIEW_RANK_MAP } from "./ValueMap.js";

const DEFAULT_KEY_RANK = 'rank';
const DEFAULT_KEY_SUIT = 'suit';

/**
 * Defines the properties for a card.
 * 
 * A Card consists of its suit, rank, and unique id.
 */
export default class Card {
    id: number;
    properties: Record<string, string>;
    private static nextId: number = 1000;

    /**
     * Creates a card.
     * @param args - Card arguments (rank, suit, etc.) as a Record<string, string>.
     */
    constructor(args: CardArgs) {
        this.properties = args;
        this.id = Card.nextId++;
    }

    /**
     * Creates a deck of cards based on a deck definition.
     * @param deckDefinition - Optional deck definition to use. Defaults to the standard 52 card deck.
     * @returns A list of cards.
     */
    static defaultDeck(deckDefinition?: DeckDefinition): Card[] {
        deckDefinition ??= DEFAULT_DECK_DEFINITION;
        const cards: Card[] = [];

        for (const part of deckDefinition) {
            let partCards: Card[] = [];

            // start with an empty card
            partCards.push(new Card({}));

            for (const entry of part) {
                const multCards: Card[] = [];
                for (const val of entry.values) {
                    for (const c of partCards) {
                        const newCardArgs = {...c.properties};
                        newCardArgs[entry.name] = val;
                        multCards.push(new Card(newCardArgs));
                    }
                }

                partCards = multCards;
            }

            if (partCards.length <= 1) continue;
            cards.concat(partCards);
        }

        return cards;
    }

    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    /**
     * Shuffles a deck of cards.
     * @param cards - The list of unshuffled cards.
     * @returns A shuffled list of cards.
     */
    static shuffle(cards: Card[]): Card[] {
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

    static cardHasProperties(card: Card, properties: Record<string,string>) {
        for (const p in properties) {
            if (typeof card.properties[p] == 'undefined') return false;
            if (card.properties[p] !== properties[p]) return false;
        }

        return true;
    }

    /**
     * Creates a deck of cards based on its state. Eg. "SHUFFLED".
     * @param state - The state the pile is in.
     * @returns A shuffled deck if its state is "SHUFFLED". Else it returns an empty card array.
     */
    static fromInitialState(state: PileState, deckDefinition?: DeckDefinition): Card[] {

        if (state == PileState.SHUFFLED) {
            // Assume standard 52 card deck
            return Card.shuffle(Card.defaultDeck(deckDefinition))
        }
        if (state == PileState.SORTED) {
            return Card.defaultDeck(deckDefinition);
        }

        return [] as Card[];
    }

    /**
     * Deal a number of cards from one pile to another.
     * @param from - The pile where the cards will be dealt from.
     * @param to - The pile that will receive the dealt cards.
     * @param number - The number of cards you would like to deal.
     */
    static dealCards(from: Pile, to: Pile, number: number): void {
        let i = 0;
        while (i < number && from.cards.length) {
            const card = from.cards.shift();
            if (card)
                to.cards.unshift(card);
            i++;
        }
    }

    /**
     * Compares the rank of two different cards
     * @param from - The first card.
     * @param to - The second card.
     * @returns True if the first card has a higher rank, otherwise false.
     */
    static isBigger(from: Card | undefined, to: Card | undefined, key?: string, map?: MapType): boolean {
        Logger.debug('Checking which card is bigger');
        key ??= DEFAULT_KEY_RANK;
        map ??= DEFAULT_CLIENT_VIEW_RANK_MAP;
        
        if (!from || !to) return false;

        const indexA = map.map[from.properties[key] ?? ''] ?? -1;
        const indexB = map.map[to.properties[key] ?? '']   ?? -1;

        return indexA > indexB;
    }

    static numWithProperty(pile: Card[], value: number, key?: string, map?: MapType): number {
        key ??= DEFAULT_KEY_RANK;
        map ??= DEFAULT_CLIENT_VIEW_RANK_MAP;

        let num = 0;
        for (const card of pile) {
            if (map.map[card.properties[key] ?? ''] ?? -1 === value) num++;
        }
        return num;
    }

    /**
     * Counts the number of cards in a pile matching a given rank and suit.
     * @param pile - The pile of cards to search.
     * @param rank - The rank to match.
     * @param suit - The suit to match.
     * @returns The number of cards matching both rank and suit.
     */
    static numOfCard(pile: Card[], properties: Record<string, string>): number {
        let num = 0;

        for (const card of pile) {
            if (this.cardHasProperties(card, properties))
                num++;
        }
        return num;
    }

    /**
     * Returns the size of the largest set of cards sharing the same rank.
     * @param pile - The pile of cards to search.
     * @param suit - Optional suit filter. If provided, only cards of that suit are counted.
     * @returns The size of the largest set found.
     */
    static largestSetWithProperty(pile: Card[], property: string, properties?: Record<string,string>): number {
        // "Range" like "domain and range" - values that the property could take on
        const range: Record<string, number> = {};

        let max = 0;

        for (const card of pile) {
            const id = card.properties[property];
            if (typeof id === 'undefined') continue;
            range[id] ??= 0;

            if (!properties) range[id]+=1;
            else if (Card.cardHasProperties(card, properties)) range[id]+=1;

            if (range[id] > max) max = range[id];
        }

        return max;
    }

    /**
     * Returns the length of the longest consecutive run of ranks in a pile.
     * @param pile - The pile of cards to search.
     * @param suit - Optional suit filter. If provided, only cards of that suit are considered.
     * @returns The length of the longest consecutive run.
     */
    static largestRun(pile: Card[], property?: string, properties?: Record<string,string>, map?: Record<string, number>): number {
        const range: Record<number, boolean> = {};

        property ??= DEFAULT_KEY_RANK;
        map ??= DEFAULT_CLIENT_VIEW_RANK_MAP.map;

        for (const card of pile) {
            const id = card.properties[property];
            if (typeof id === 'undefined') continue;
            const val = map[id];
            if (typeof val === 'undefined') continue;

            if (!properties) range[val] = true;
            else if (Card.cardHasProperties(card, properties)) range[val] = true;
        }

        let longest = 0;
        let current = 0;
        for (const idx in range) {
            if (range[idx]) current++;
            else current = 0;

            if (current > longest) longest = current;
        }

        return longest;
    }

    static largestRunThatIncludes(pile: Card[], value: string, property?: string, properties?: Record<string,string>, map?: Record<string, number>): number {
        const range: Record<number, boolean> = {};

        property ??= DEFAULT_KEY_RANK;
        map ??= DEFAULT_CLIENT_VIEW_RANK_MAP.map;

        const targetValue = map[value];
        if (!targetValue) return 0;

        for (const card of pile) {
            const id = card.properties[property];
            if (typeof id === 'undefined') continue;
            const val = map[id];
            if (typeof val === 'undefined') continue;

            if (!properties) range[val] = true;
            else if (Card.cardHasProperties(card, properties)) range[val] = true;
        }

        if (!range[targetValue]) return 0;

        let current = 1;
        // Up
        for (let i = targetValue + 1; range[i]; i++) {
            current++;
        }
        // Down
        for (let i = targetValue - 1; range[i]; i--) {
            current++;
        }

        return current;
    }

    static removeCard(pile: Card[], card: Card): boolean {
        for (const c in pile) {
            if (pile[+c]?.id === card.id) {
                pile.splice(+c, 1);
                return true;
            }
        }
        
        return false;
    }

    static sortCards(pile: Card[]) {
        return pile.sort((a: Card, b: Card) => a.id - b.id);
    }
}