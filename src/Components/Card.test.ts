import { describe, it, expect } from "vitest";
import Card from "./Card.js";
import Pile from "../Game/Pile.js";
import { PileState, Visibility } from "../schemas/types.js";

describe("Card.numberRank", () => {
    it("returns the correct index for a known rank", () => {
        const card = new Card({rank: "Two", suit:"Clubs"});
        expect(Card.numberRank(card)).toBe(1);
    });

    it("returns -1 if rank isnt found", () => {
        const card = new Card({rank: "adawdawd", suit:"Clubs"});
        expect(Card.numberRank(card)).toBe(-1);
    });
});


describe("Card.defaultDeck", () => {
    it("returns 52 cards", () => {
        expect(Card.defaultDeck().length).toBe(52);
    });

    it("contains unique rank/suit combinations", () => {
        const deck = Card.defaultDeck();
        const unique = new Set(deck.map(c => `${c.suit}-${c.rank}`));
        expect(unique.size).toBe(52);
    });
});

describe("Card.isBigger", () => {
    it("returns true if first card has a higher rank", () => {
        const card1 = new Card({rank:"King", suit:"Clubs"}); 
        const card2 = new Card({rank:"One", suit:"Clubs"}); 
        expect(Card.isBigger(card1, card2)).toBe(true);
    });

    it("returns false if second card has a higher rank", () => {
        const card1 = new Card({rank:"One", suit:"Clubs"}); 
        const card2 = new Card({rank:"King", suit:"Clubs"}); 
        expect(Card.isBigger(card1, card2)).toBe(false);
    });
    
    it("returns false if one of the cards is undefined", () => {
        const card1 = new Card({rank:"odwadadadwadne", suit:"Clubs"}); 
        const card2 = new Card({rank:"King", suit:"Clubs"}) 
        expect(Card.isBigger(card1, card2)).toBe(false);
    });

});

describe("Card.fromInitialState", () => {
    it("returns 52 shuffled cards for SHUFFLED state", () => {
        const cards = Card.fromInitialState(PileState.SHUFFLED);
        expect(cards.length).toBe(52);
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

        expect(from.cards.length).toBe(47);
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