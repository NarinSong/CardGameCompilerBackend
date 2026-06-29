import { describe, it, expect } from "vitest";
import Card from "./Card.js";
import Pile from "../Game/Pile.js";
import { PileState, RANK, SUIT } from "../schemas/types.js";

describe("Card.numberRank", () => {
    it("returns the correct index for a known rank", () => {
        const card = new Card({rank: "Two", suit:"Clubs"});
        expect(Card.numberRank(card)).toBe(1);
    });

    //it("returns -1 if rank isnt found", () => {
    //    const card = new Card({rank: "adawdawd", suit:"Clubs"});
    //    expect(Card.numberRank(card)).toBe(-1);
    //});
});


describe("Card.defaultDeck", () => {
    it("creates one card for every rank/suit combination", () => {
        const deck = Card.defaultDeck();

        expect(deck.length).toBe(RANK.length * SUIT.length);
    });

    it("contains unique rank/suit combinations", () => {
        const deck = Card.defaultDeck();
        const unique = new Set(deck.map(c => `${c.suit}-${c.rank}`));

        expect(unique.size).toBe(RANK.length * SUIT.length);
    });
});

describe("Card.isBigger", () => {
    it("returns true if the first card has a higher rank", () => {
        const card1 = new Card({rank: "King", suit: "Clubs"});
        const card2 = new Card({rank: "Two", suit: "Clubs"});

        expect(Card.isBigger(card1, card2)).toBe(true);
    });

    it("returns false if the second card has a higher rank", () => {
        const card1 = new Card({rank: "Two", suit: "Clubs"});
        const card2 = new Card({rank: "King", suit: "Clubs"});

        expect(Card.isBigger(card1, card2)).toBe(false);
    });

    it("returns false if either card is undefined", () => {
        const card = new Card({rank: "King", suit: "Clubs"});

        expect(Card.isBigger(undefined, card)).toBe(false);
        expect(Card.isBigger(card, undefined)).toBe(false);
    });
});

describe("Card.fromInitialState", () => {
    it("returns a shuffled default deck for SHUFFLED state", () => {
    	const cards = Card.fromInitialState(PileState.SHUFFLED);

    	expect(cards.length).toBe(RANK.length * SUIT.length);
    });

    it("returns an empty array for non-SHUFFLED states", () => {
        const cards = Card.fromInitialState("EMPTY" as PileState);
        expect(cards.length).toBe(0);
    });
});

describe("Card.dealCards", () => {
    it("moves the correct number of cards from one pile to another", () => {
        const from = { cards: Card.defaultDeck() } as any;
        const to   = { cards: [] as Card[] } as any;

        Card.dealCards(from, to, 5);

        expect(from.cards.length).toBe(RANK.length * SUIT.length - 5);
        expect(to.cards.length).toBe(5);
    });

    it("deals all remaining cards if it exceeds pile size", () => {
        const from = { cards: [new Card({rank: "Ace", suit: "Clubs"})] } as any;
        const to   = { cards: [] as Card[] } as any;

        Card.dealCards(from, to, 5);

        expect(from.cards.length).toBe(0);
        expect(to.cards.length).toBe(1);
    });

    it("deals nothing if the source pile is empty", () => {
        const from = { cards: [] as Card[] };
        const to   = { cards: [] as Card[] };

        Card.dealCards(from as any, to as any, 5);

        expect(to.cards.length).toBe(0);
    });
});