import Pile from "../Game/Pile.js";
import { CardArgs } from "../schemas/GameComponentArgs.js";
import { DeckDefinition, DEFAULT_DECK_DEFINITION, PileState, RANK, rank, RankIndex, SUIT, suit } from "../schemas/types.js";
import Logger from "./Logger.js";
import { CardValueMap } from "./ValueMap.js";


/**
 * Defines the properties for a card.
 * 
 * A Card consists of its suit, rank, and unique id.
 */
export default class Card {
    rank: rank;
    suit: suit;
    id: number;
    private static nextId: number = 1000;

    /**
     * Creates a card.
     * @param args - Card arguments (rank, suit).
     */
    constructor(args: CardArgs) {
        this.rank = args.rank;
        this.suit = args.suit;
        this.id = Card.nextId++;
    }

    /**
     * Returns the numeric rank index of a card.
     * @param card - A card whose rank should be evaluated.
     * @returns The numeric rank index of the card or -1 if rank is not found. 
     */
    static numberRank(card: Card): number {
        for (let i in RANK) {
            if (card.rank == RANK[i]) return +i;
        }
        return -1;
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
            for (const suit of part.suits) {
                for (const rank of part.ranks) {
                    cards.push(new Card({rank: rank, suit: suit}));
                }
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

    /**
     * Creates a deck of cards based on its state. Eg. "SHUFFLED".
     * @param state - The state the pile is in.
     * @returns A shuffled deck if its state is "SHUFFLED". Else it returns an empty card array.
     */
    static fromInitialState(state: PileState): Card[] {
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
    static dealCards(from: Pile, to: Pile, number: number): void {
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
    static isBigger(from: Card | undefined, to: Card | undefined): boolean {
        Logger.debug('Checking which card is bigger');
        
        if (!from || !to) return false;

        const indexA = Card.numberRank(from);
        const indexB = Card.numberRank(to);

        Logger.debug(`${from.rank} is ${indexA} vs ${to.rank} is ${indexB}`);

        return indexA > indexB;
    }

    /**
     * Counts the number of cards in a pile with a given rank.
     * @param pile - The pile of cards to search.
     * @param rank - The rank to count.
     * @returns The number of cards with the given rank.
     */
    static numOfRank(pile: Card[], rank: rank): number {
        let num = 0;
        for (const card of pile) {
            if (card.rank === rank) num++;
        }
        return num;
    }

    /**
     * Counts the number of cards in a pile with a given suit.
     * @param pile - The pile of cards to search.
     * @param suit - The suit to count.
     * @returns The number of cards with the given suit.
     */
    static numOfSuit(pile: Card[], suit: suit): number {
        let num = 0;
        for (const card of pile) {
            if (card.suit === suit) num++;
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
    static numOfCard(pile: Card[], rank: rank, suit: suit): number {
        let num = 0;
        for (const card of pile) {
            if (card.suit === suit && card.rank === rank) num++;
        }
        return num;
    }

    /**
     * Returns the size of the largest set of cards sharing the same rank.
     * @param pile - The pile of cards to search.
     * @param suit - Optional suit filter. If provided, only cards of that suit are counted.
     * @returns The size of the largest set found.
     */
    static largestSet(pile: Card[], suit?: suit | undefined): number {
        const ranks: Record<string, number> = {};

        let max = 0;

        for (const card of pile) {
            ranks[card.rank] ??= 0;

            if (!suit || card.suit === suit) {
                (ranks[card.rank] as number)++; 
                if (ranks[card.rank] as number > max) max = ranks[card.rank] as number;
            }
        }

        return max;
    }

    /**
     * Returns the size of the largest group of cards sharing the same suit.
     * @param pile - The pile of cards to search.
     * @param rank - Optional rank filter. If provided, only cards of that rank are counted.
     * @returns The size of the largest flush found.
     */
    static largestFlush(pile: Card[], rank?: rank | undefined): number {
        const suits: Record<string, number> = {};

        let max = 0;

        for (const card of pile) {
            suits[card.suit] ??= 0;

            if (!rank || card.rank === rank) {
                (suits[card.suit] as number)++; 
                if (suits[card.suit] as number > max) max = suits[card.suit] as number;
            }
        }

        return max;
    }

    /**
     * Returns the length of the longest consecutive run of ranks in a pile.
     * @param pile - The pile of cards to search.
     * @param suit - Optional suit filter. If provided, only cards of that suit are considered.
     * @returns The length of the longest consecutive run.
     */
    static largestRun(pile: Card[], suit?: suit | undefined): number {
        const ranks: Record<number, boolean> = {};

        for (const card of pile) {
            if (!suit || card.suit === suit) {
                // TODO: switch to using game meta's value map
                ranks[RankIndex[card.rank]] = true;
            }
        }

        let longest = 0;
        let current = 0;
        for (const idx in ranks) {
            if (ranks[idx]) current++;
            else current = 0;

            if (current > longest) longest = current;
        }

        // TODO: Ace high vs ace low

        return longest;
    }

    /**
     * Returns the length of the longest consecutive run that includes a specific rank.
     * @param pile - The pile of cards to search.
     * @param rank - Optional rank that must be included in the run.
     * @param suit - Optional suit filter. If provided, only cards of that suit are considered.
     * @returns The length of the longest run that includes the given rank, or 0 if the rank is not present.
     */
    static largestRunThatIncludes(pile: Card[], rank?: rank | undefined, suit?: suit | undefined): number {
        if (!rank) return Card.largestRun(pile, suit);
        
        const ranks: Record<number, boolean> = {};

        for (const card of pile) {
            if (!suit || card.suit === suit) {
                // TODO: switch to using game meta's value map
                ranks[RankIndex[card.rank]] = true;
            }
        }

        if (!ranks[RankIndex[rank]]) return 0;

        let current = 1;
        // Up
        for (let i = RankIndex[rank] + 1; RANK[i]; i++) {
            if (!ranks[i]) break;
            current++;
        }
        // Down
        for (let i = RankIndex[rank] - 1; RANK[i]; i--) {
            if (!ranks[i]) break;
            current++;
        }

        // TODO: Ace high vs ace low

        return current;
    }
}