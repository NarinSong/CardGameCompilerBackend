import PlayerDefinition from '../../Rules/PlayerDefinition';
import PileDefinition from '../../Rules/PileDefinition';
import CounterDefinition from '../../Rules/CounterDefinition';
import GameDefinition from '../../Rules/GameDefinition';

describe('PlayerDefinition', () => {
  let gameDefinition: GameDefinition;

  beforeEach(() => {
    gameDefinition = new GameDefinition();
  });

  describe('constructor', () => {
    it('should create a PlayerDefinition instance', () => {
      const playerDef = new PlayerDefinition();
      expect(playerDef).toBeDefined();
      expect(playerDef).toBeInstanceOf(PlayerDefinition);
    });

    it('should accept optional piles parameter', () => {
      const playerDef = new PlayerDefinition([]);
      expect(playerDef).toBeDefined();
    });

    it('should accept optional counters parameter', () => {
      const playerDef = new PlayerDefinition([], []);
      expect(playerDef).toBeDefined();
    });

    it('should accept both piles and counters parameters', () => {
      const piles: PileDefinition[] = [];
      const counters: CounterDefinition[] = [];
      const playerDef = new PlayerDefinition(piles, counters);
      expect(playerDef).toBeDefined();
    });
  });

  describe('piles property', () => {
    it('should have piles array property', () => {
      const playerDef = new PlayerDefinition();
      expect(playerDef.piles).toBeDefined();
      expect(Array.isArray(playerDef.piles)).toBe(true);
    });

    it('should initialize with empty piles array by default', () => {
      const playerDef = new PlayerDefinition();
      expect(playerDef.piles.length).toBe(0);
    });

    it('should accept piles in constructor', () => {
      const pileDef = new PileDefinition({
        labelManager: gameDefinition.labelManger,
        label: 'hand',
        initialState: 'EMPTY',
        visibility: 'FACE_UP'
      });
      const playerDef = new PlayerDefinition([pileDef]);
      expect(playerDef.piles.length).toBe(1);
    });

    it('should accept multiple piles', () => {
      const pile1 = new PileDefinition({
        labelManager: gameDefinition.labelManger,
        label: 'hand',
        initialState: 'EMPTY',
        visibility: 'FACE_UP'
      });
      const pile2 = new PileDefinition({
        labelManager: gameDefinition.labelManger,
        label: 'discard',
        initialState: 'EMPTY',
        visibility: 'FACE_UP'
      });
      const playerDef = new PlayerDefinition([pile1, pile2]);
      expect(playerDef.piles.length).toBe(2);
    });
  });

  describe('counters property', () => {
    it('should have counters array property', () => {
      const playerDef = new PlayerDefinition();
      expect(playerDef.counters).toBeDefined();
      expect(Array.isArray(playerDef.counters)).toBe(true);
    });

    it('should initialize with empty counters array by default', () => {
      const playerDef = new PlayerDefinition();
      expect(playerDef.counters.length).toBe(0);
    });

    it('should accept counters in constructor', () => {
      const counterDef = new CounterDefinition({
        labelManager: gameDefinition.labelManger,
        label: 'health',
        number: 20
      });
      const playerDef = new PlayerDefinition([], [counterDef]);
      expect(playerDef.counters.length).toBe(1);
    });

    it('should accept multiple counters', () => {
      const counter1 = new CounterDefinition({
        labelManager: gameDefinition.labelManger,
        label: 'health',
        number: 20
      });
      const counter2 = new CounterDefinition({
        labelManager: gameDefinition.labelManger,
        label: 'mana',
        number: 10
      });
      const playerDef = new PlayerDefinition([], [counter1, counter2]);
      expect(playerDef.counters.length).toBe(2);
    });
  });

  describe('empty player definition', () => {
    it('should support empty player definition', () => {
      const playerDef = new PlayerDefinition();
      expect(playerDef.piles.length).toBe(0);
      expect(playerDef.counters.length).toBe(0);
    });

    it('should support explicit empty arrays', () => {
      const playerDef = new PlayerDefinition([], []);
      expect(playerDef.piles.length).toBe(0);
      expect(playerDef.counters.length).toBe(0);
    });
  });

  describe('player definition with only piles', () => {
    it('should support piles without counters', () => {
      const pile = new PileDefinition({
        labelManager: gameDefinition.labelManger,
        label: 'hand',
        initialState: 'EMPTY',
        visibility: 'FACE_UP'
      });
      const playerDef = new PlayerDefinition([pile]);
      expect(playerDef.piles.length).toBe(1);
      expect(playerDef.counters.length).toBe(0);
    });

    it('should support multiple piles without counters', () => {
      const piles = [];
      for (let i = 0; i < 3; i++) {
        piles.push(new PileDefinition({
          labelManager: gameDefinition.labelManger,
          label: `pile${i}`,
          initialState: 'EMPTY',
          visibility: 'FACE_UP'
        }));
      }
      const playerDef = new PlayerDefinition(piles);
      expect(playerDef.piles.length).toBe(3);
      expect(playerDef.counters.length).toBe(0);
    });
  });

  describe('player definition with only counters', () => {
    it('should support counters without piles', () => {
      const counter = new CounterDefinition({
        labelManager: gameDefinition.labelManger,
        label: 'score',
        number: 0
      });
      const playerDef = new PlayerDefinition([], [counter]);
      expect(playerDef.piles.length).toBe(0);
      expect(playerDef.counters.length).toBe(1);
    });

    it('should support multiple counters without piles', () => {
      const counters = [];
      for (let i = 0; i < 3; i++) {
        counters.push(new CounterDefinition({
          labelManager: gameDefinition.labelManger,
          label: `counter${i}`,
          number: i * 10
        }));
      }
      const playerDef = new PlayerDefinition([], counters);
      expect(playerDef.piles.length).toBe(0);
      expect(playerDef.counters.length).toBe(3);
    });
  });

  describe('complex player definitions', () => {
    it('should support combination of piles and counters', () => {
      const piles = [];
      for (let i = 0; i < 2; i++) {
        piles.push(new PileDefinition({
          labelManager: gameDefinition.labelManger,
          label: `pile${i}`,
          initialState: 'EMPTY',
          visibility: 'FACE_UP'
        }));
      }

      const counters = [];
      for (let i = 0; i < 2; i++) {
        counters.push(new CounterDefinition({
          labelManager: gameDefinition.labelManger,
          label: `counter${i}`,
          number: i * 5
        }));
      }

      const playerDef = new PlayerDefinition(piles, counters);
      expect(playerDef.piles.length).toBe(2);
      expect(playerDef.counters.length).toBe(2);
    });
  });

  describe('multiple player definitions', () => {
    it('should create independent player definitions', () => {
      const player1 = new PlayerDefinition();
      const player2 = new PlayerDefinition();
      const player3 = new PlayerDefinition();
      
      expect(player1).toBeDefined();
      expect(player2).toBeDefined();
      expect(player3).toBeDefined();
    });

    it('should maintain independent piles and counters', () => {
      const player1 = new PlayerDefinition([], []);
      const player2 = new PlayerDefinition([], []);
      
      const counter = new CounterDefinition({
        labelManager: gameDefinition.labelManger,
        label: 'test',
        number: 0
      });
      
      player1.counters.push(counter);
      
      expect(player1.counters.length).toBe(1);
      expect(player2.counters.length).toBe(0);
    });
  });

  describe('player definition instantiation patterns', () => {
    it('should handle creation without errors', () => {
      expect(() => {
        new PlayerDefinition();
      }).not.toThrow();
    });

    it('should handle creation with empty arrays', () => {
      expect(() => {
        new PlayerDefinition([], []);
      }).not.toThrow();
    });

    it('should handle creation with definitions', () => {
      expect(() => {
        const pile = new PileDefinition({
          labelManager: gameDefinition.labelManger,
          label: 'hand',
          initialState: 'EMPTY',
          visibility: 'FACE_UP'
        });
        const counter = new CounterDefinition({
          labelManager: gameDefinition.labelManger,
          label: 'health',
          number: 20
        });
        new PlayerDefinition([pile], [counter]);
      }).not.toThrow();
    });
  });
});
