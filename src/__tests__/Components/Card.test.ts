import Card from '../../Components/Card';
import { rank, suit, RANK, SUIT } from '../../schemas/types';

describe('Card', () => {
  describe('constructor', () => {
    it('should create a card with correct rank and suit', () => {
      const card = new Card({ rank: 'Ace' as rank, suit: 'Hearts' as suit });
      expect(card.rank).toBe('Ace');
      expect(card.suit).toBe('Hearts');
    });

    it('should create different cards with different values', () => {
      const card1 = new Card({ rank: 'King' as rank, suit: 'Spades' as suit });
      const card2 = new Card({ rank: 'Two' as rank, suit: 'Diamonds' as suit });

      expect(card1.rank).toBe('King');
      expect(card1.suit).toBe('Spades');
      expect(card2.rank).toBe('Two');
      expect(card2.suit).toBe('Diamonds');
    });
  });

  describe('numberRank', () => {
    it('should return the correct numeric index for a rank', () => {
      const card = new Card({ rank: 'Ace' as rank, suit: 'Hearts' as suit });
      const rankIndex = Card.numberRank(card);
      expect(rankIndex).toBeGreaterThanOrEqual(0);
      expect(rankIndex).toBe(0); // Ace is the first rank
    });

    it('should return -1 for invalid rank', () => {
      const card = new Card({ rank: 'Invalid' as rank, suit: 'Hearts' as suit });
      const rankIndex = Card.numberRank(card);
      expect(rankIndex).toBe(-1);
    });

    it('should return consistent numeric indices for different cards', () => {
      const aceOfHearts = new Card({ rank: 'Ace' as rank, suit: 'Hearts' as suit });
      const aceOfSpades = new Card({ rank: 'Ace' as rank, suit: 'Spades' as suit });

      const aceHeartIndex = Card.numberRank(aceOfHearts);
      const aceSpadeIndex = Card.numberRank(aceOfSpades);

      expect(aceHeartIndex).toBe(aceSpadeIndex);
    });
  });

  describe('defaultDeck', () => {
    it('should create a deck with 52 cards', () => {
      const deck = Card.defaultDeck();
      expect(deck.length).toBe(52);
    });

    it('should create cards with valid ranks and suits', () => {
      const deck = Card.defaultDeck();
      deck.forEach(card => {
        expect(card.rank).toBeDefined();
        expect(card.suit).toBeDefined();
      });
    });

    it('should have all unique rank-suit combinations', () => {
      const deck = Card.defaultDeck();
      const combinations = new Set(
        deck.map(card => `${card.rank}-${card.suit}`)
      );
      expect(combinations.size).toBe(52);
    });
  });
});
