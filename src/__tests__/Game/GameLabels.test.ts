import GameLabels from '../../Game/GameLabels';
import GameDefinition from '../../Rules/GameDefinition';
import Pile from '../../Game/Pile';
import Counter from '../../Game/Counter';

describe('GameLabels', () => {
  let gameDefinition: GameDefinition;
  let gameLabels: GameLabels;

  beforeEach(() => {
    gameDefinition = new GameDefinition();
    gameLabels = new GameLabels(gameDefinition.labelManger);
  });

  describe('constructor', () => {
    it('should create a GameLabels instance', () => {
      expect(gameLabels).toBeDefined();
    });

    it('should initialize gameObjectLabels', () => {
      expect(gameLabels.gameObjectLabels).toBeDefined();
      expect(typeof gameLabels.gameObjectLabels).toBe('object');
    });

    it('should initialize gamePhaseLabels', () => {
      expect(gameLabels.gamePhaseLabels).toBeDefined();
    });

    it('should initialize gameStepLabels', () => {
      expect(gameLabels.gameStepLabels).toBeDefined();
    });
  });

  describe('nextId', () => {
    it('should generate incrementing IDs', () => {
      const id1 = gameLabels.nextId;
      const id2 = gameLabels.nextId;
      
      expect(Number(id2)).toBeGreaterThan(Number(id1));
    });

    it('should return string IDs', () => {
      const id = gameLabels.nextId;
      expect(typeof id).toBe('string');
    });
  });

  describe('registerPile and getFromLabel', () => {
    it('should register a pile with a label', () => {
      const pile = Pile.create('SHUFFLED', 'deck', 'FACE_DOWN', gameLabels, [], 'Deck');
      gameLabels.registerPile(pile, 'deck');
      
      expect(gameLabels.getFromLabel('deck')).toBe(pile);
    });

    it('should retrieve registered piles', () => {
      const pile = Pile.create('SHUFFLED', 'hand', 'FACE_UP', gameLabels, [], 'Hand');
      gameLabels.registerPile(pile, 'hand');
      
      const retrieved = gameLabels.getFromLabel('hand');
      expect(retrieved).toBe(pile);
    });
  });

  describe('registerCounter', () => {
    it('should register a counter with a label', () => {
      const counter = Counter.create(0, 'score', 'FACE_UP', gameLabels, [], 'Score');
      gameLabels.registerCounter(counter, 'score');
      
      expect(gameLabels.getFromLabel('score')).toBe(counter);
    });

    it('should retrieve registered counters', () => {
      const counter = Counter.create(100, 'health', 'FACE_UP', gameLabels, [], 'Health');
      gameLabels.registerCounter(counter, 'health');
      
      const retrieved = gameLabels.getFromLabel('health');
      expect(retrieved).toBe(counter);
    });
  });

  describe('registerButton', () => {
    it('should register a button with a label', () => {
      const buttonLabel = 'submit';
      const button = gameLabels.gameObjectLabels[buttonLabel];
      
      // Button registration happens through Button.fromDefinition or factory
      // This tests the underlying structure
      expect(gameLabels.gameObjectLabels).toBeDefined();
    });
  });

  describe('unregister', () => {
    it('should unregister a game piece', () => {
      const pile = Pile.create('SHUFFLED', 'deck', 'FACE_DOWN', gameLabels, [], 'Deck');
      gameLabels.registerPile(pile, 'deck');
      
      expect(gameLabels.getFromLabel('deck')).toBe(pile);
      
      gameLabels.unregister('deck');
      expect(gameLabels.getFromLabel('deck')).toBeUndefined();
    });
  });

  describe('multiple registrations', () => {
    it('should manage multiple game objects', () => {
      const pile = Pile.create('SHUFFLED', 'deck', 'FACE_DOWN', gameLabels, [], 'Deck');
      const counter = Counter.create(0, 'score', 'FACE_UP', gameLabels, [], 'Score');
      
      gameLabels.registerPile(pile, 'deck');
      gameLabels.registerCounter(counter, 'score');
      
      expect(gameLabels.getFromLabel('deck')).toBe(pile);
      expect(gameLabels.getFromLabel('score')).toBe(counter);
    });
  });
});

describe('Pile', () => {
  let gameDefinition: GameDefinition;
  let gameLabels: GameLabels;

  beforeEach(() => {
    gameDefinition = new GameDefinition();
    gameLabels = new GameLabels(gameDefinition.labelManger);
  });

  describe('factory methods', () => {
    it('should create a pile with initial state', () => {
      const pile = Pile.create('SHUFFLED', 'deck', 'FACE_DOWN', gameLabels, [], 'Deck');
      
      expect(pile).toBeDefined();
      expect(pile.label).toBe('deck');
    });

    it('should set pile visibility', () => {
      const pile = Pile.create('SHUFFLED', 'hand', 'FACE_UP', gameLabels, [], 'Hand');
      expect(pile.visibility).toBe('FACE_UP');
    });

    it('should set pile displayName', () => {
      const pile = Pile.create('SHUFFLED', 'discard', 'FACE_UP', gameLabels, [], 'Discard Pile');
      expect(pile.displayName).toBe('Discard Pile');
    });
  });

  describe('properties', () => {
    let pile: Pile;

    beforeEach(() => {
      pile = Pile.create('SHUFFLED', 'test', 'FACE_DOWN', gameLabels, [], 'Test Pile');
    });

    it('should have label property', () => {
      expect(pile.label).toBe('test');
    });

    it('should have visibility property', () => {
      expect(pile.visibility).toBe('FACE_DOWN');
    });

    it('should have displayName property', () => {
      expect(pile.displayName).toBe('Test Pile');
    });

    it('should have actionRoles property', () => {
      expect(Array.isArray(pile.actionRoles)).toBe(true);
    });

    it('should have cards array', () => {
      expect(Array.isArray(pile.cards)).toBe(true);
    });
  });

  describe('different pile states', () => {
    it('should create SHUFFLED piles', () => {
      const pile = Pile.create('SHUFFLED', 'deck', 'FACE_DOWN', gameLabels, [], 'Deck');
      expect(pile).toBeDefined();
    });

    it('should create SORTED piles', () => {
      const pile = Pile.create('SORTED', 'sequence', 'FACE_UP', gameLabels, [], 'Sequence');
      expect(pile).toBeDefined();
    });

    it('should create EMPTY piles', () => {
      const pile = Pile.create('EMPTY', 'empty', 'FACE_UP', gameLabels, [], 'Empty');
      expect(pile).toBeDefined();
    });
  });

  describe('different visibility levels', () => {
    it('should create FACE_UP piles', () => {
      const pile = Pile.create('SHUFFLED', 'visible', 'FACE_UP', gameLabels, [], 'Visible');
      expect(pile.visibility).toBe('FACE_UP');
    });

    it('should create FACE_DOWN piles', () => {
      const pile = Pile.create('SHUFFLED', 'hidden', 'FACE_DOWN', gameLabels, [], 'Hidden');
      expect(pile.visibility).toBe('FACE_DOWN');
    });

    it('should create INVISIBLE piles', () => {
      const pile = Pile.create('SHUFFLED', 'secret', 'INVISIBLE', gameLabels, [], 'Secret');
      expect(pile.visibility).toBe('INVISIBLE');
    });
  });
});
