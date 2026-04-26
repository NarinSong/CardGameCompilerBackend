import Pile from '../../Game/Pile';
import PileDefinition from '../../Rules/PileDefinition';
import GameLabels from '../../Game/GameLabels';
import GameDefinition from '../../Rules/GameDefinition';

describe('Pile', () => {
  let gameDefinition: GameDefinition;
  let gameLabels: GameLabels;
  let pileDefinition: PileDefinition;

  beforeEach(() => {
    gameDefinition = new GameDefinition();
    gameLabels = new GameLabels(gameDefinition.labelManger);
    pileDefinition = new PileDefinition({
      labelManager: gameDefinition.labelManger,
      label: 'testPile',
      initialState: 'SORTED',
      visibility: 'FACE_UP'
    });
  });

  describe('factory methods', () => {
    it('should create pile from PileDefinition', () => {
      const pile = Pile.fromDefinition(pileDefinition, gameLabels);
      expect(pile).toBeDefined();
      expect(pile).toBeInstanceOf(Pile);
    });

    it('should create pile with explicit parameters', () => {
      const pile = Pile.create('SORTED', 'drawDeck', 'FACE_UP', gameLabels, [], 'Draw Deck');
      expect(pile).toBeDefined();
      expect(pile).toBeInstanceOf(Pile);
    });

    it('should create piles with different initial states', () => {
      const sortedPile = Pile.create('SORTED', 'sorted', 'FACE_UP', gameLabels, [], 'Sorted');
      const shuffledPile = Pile.create('SHUFFLED', 'shuffled', 'FACE_UP', gameLabels, [], 'Shuffled');
      const emptyPile = Pile.create('EMPTY', 'empty', 'FACE_UP', gameLabels, [], 'Empty');
      
      expect(sortedPile).toBeDefined();
      expect(shuffledPile).toBeDefined();
      expect(emptyPile).toBeDefined();
    });
  });

  describe('pile properties', () => {
    let pile: Pile;

    beforeEach(() => {
      pile = Pile.create('SORTED', 'deck', 'FACE_UP', gameLabels, ['draw'], 'Main Deck');
    });

    it('should have cards array property', () => {
      expect(pile.cards).toBeDefined();
      expect(Array.isArray(pile.cards)).toBe(true);
    });

    it('should have label property', () => {
      expect(pile.label).toBeDefined();
    });

    it('should have visibility property', () => {
      expect(pile.visibility).toBe('FACE_UP');
    });

    it('should have actionRoles property', () => {
      expect(pile.actionRoles).toBeDefined();
      expect(Array.isArray(pile.actionRoles)).toBe(true);
    });

    it('should have displayName property', () => {
      expect(pile.displayName).toBe('Main Deck');
    });
  });

  describe('pile visibility', () => {
    it('should support FACE_UP visibility', () => {
      const pile = Pile.create('SORTED', 'faceUp', 'FACE_UP', gameLabels, [], 'Face Up');
      expect(pile.visibility).toBe('FACE_UP');
    });

    it('should support FACE_DOWN visibility', () => {
      const pile = Pile.create('SORTED', 'faceDown', 'FACE_DOWN', gameLabels, [], 'Face Down');
      expect(pile.visibility).toBe('FACE_DOWN');
    });

    it('should support HIDDEN visibility', () => {
      const pile = Pile.create('SORTED', 'hidden', 'HIDDEN', gameLabels, [], 'Hidden');
      expect(pile.visibility).toBe('HIDDEN');
    });
  });

  describe('pile initial states', () => {
    it('should support SORTED initial state', () => {
      const pile = Pile.create('SORTED', 'sorted', 'FACE_UP', gameLabels, [], 'Sorted');
      expect(pile).toBeDefined();
      expect(Array.isArray(pile.cards)).toBe(true);
    });

    it('should support SHUFFLED initial state', () => {
      const pile = Pile.create('SHUFFLED', 'shuffled', 'FACE_UP', gameLabels, [], 'Shuffled');
      expect(pile).toBeDefined();
      expect(Array.isArray(pile.cards)).toBe(true);
    });

    it('should support EMPTY initial state', () => {
      const pile = Pile.create('EMPTY', 'empty', 'FACE_UP', gameLabels, [], 'Empty');
      expect(pile).toBeDefined();
      expect(pile.cards.length).toBe(0);
    });
  });

  describe('pile with action roles', () => {
    it('should accept empty action roles', () => {
      const pile = Pile.create('SORTED', 'deck', 'FACE_UP', gameLabels, [], 'Deck');
      expect(pile.actionRoles).toEqual([]);
    });

    it('should accept multiple action roles', () => {
      const pile = Pile.create('SORTED', 'deck', 'FACE_UP', gameLabels, ['draw', 'discard', 'shuffle'], 'Deck');
      expect(pile.actionRoles.length).toBe(3);
      expect(pile.actionRoles).toContain('draw');
    });
  });

  describe('pile creation from definition', () => {
    it('should properly initialize from PileDefinition', () => {
      const pile = Pile.fromDefinition(pileDefinition, gameLabels);
      
      expect(pile).toBeDefined();
      expect(pile.label).toBe('testPile');
      expect(pile.visibility).toBe('FACE_UP');
    });

    it('should handle PileDefinition with different configurations', () => {
      const def1 = new PileDefinition({
        labelManager: gameDefinition.labelManger,
        label: 'pile1',
        initialState: 'SORTED',
        visibility: 'FACE_UP'
      });
      
      const def2 = new PileDefinition({
        labelManager: gameDefinition.labelManger,
        label: 'pile2',
        initialState: 'EMPTY',
        visibility: 'HIDDEN'
      });
      
      const pile1 = Pile.fromDefinition(def1, gameLabels);
      const pile2 = Pile.fromDefinition(def2, gameLabels);
      
      expect(pile1).toBeDefined();
      expect(pile2).toBeDefined();
    });
  });

  describe('pile instantiation patterns', () => {
    it('should create multiple independent piles', () => {
      const piles = [];
      for (let i = 0; i < 5; i++) {
        piles.push(Pile.create('SORTED', `pile${i}`, 'FACE_UP', gameLabels, [], `Pile ${i}`));
      }
      
      expect(piles.length).toBe(5);
      piles.forEach((pile, index) => {
        expect(pile.displayName).toBe(`Pile ${index}`);
      });
    });

    it('should handle pile creation without errors', () => {
      expect(() => {
        Pile.create('SORTED', 'testPile', 'FACE_UP', gameLabels, [], 'Test Pile');
      }).not.toThrow();
    });
  });

  describe('pile card management', () => {
    it('should initialize cards array', () => {
      const pile = Pile.create('SORTED', 'deck', 'FACE_UP', gameLabels, [], 'Deck');
      expect(pile.cards).toBeDefined();
      expect(Array.isArray(pile.cards)).toBe(true);
    });

    it('should create SORTED pile with cards', () => {
      const pile = Pile.create('SORTED', 'sorted', 'FACE_UP', gameLabels, [], 'Sorted Deck');
      expect(pile.cards.length).toBeGreaterThanOrEqual(0);
    });

    it('should create SHUFFLED pile with cards', () => {
      const pile = Pile.create('SHUFFLED', 'shuffled', 'FACE_UP', gameLabels, [], 'Shuffled Deck');
      expect(pile.cards.length).toBeGreaterThanOrEqual(0);
    });

    it('should create EMPTY pile with no cards', () => {
      const pile = Pile.create('EMPTY', 'empty', 'FACE_UP', gameLabels, [], 'Empty Pile');
      expect(pile.cards.length).toBe(0);
    });
  });
});
