import Counter from '../../Game/Counter';
import Button from '../../Game/Button';
import Player from '../../Game/Player';
import CounterDefinition from '../../Rules/CounterDefinition';
import ButtonDefinition from '../../Rules/ButtonDefinition';
import PlayerDefinition from '../../Rules/PlayerDefinition';
import GameLabels from '../../Game/GameLabels';
import GameDefinition from '../../Rules/GameDefinition';

describe('Counter', () => {
  let gameDefinition: GameDefinition;
  let gameLabels: GameLabels;

  beforeEach(() => {
    gameDefinition = new GameDefinition();
    gameLabels = new GameLabels(gameDefinition.labelManger);
  });

  describe('factory methods', () => {
    it('should create a counter from definition', () => {
      const counterDef = new CounterDefinition({ labelManager: gameDefinition.labelManger, label: 'score' });
      const counter = Counter.fromDefinition(counterDef, gameLabels);
      
      expect(counter).toBeDefined();
      expect(counter.label).toBe('score');
    });

    it('should create a counter with initial state', () => {
      const counter = Counter.create(10, 'health', 'FACE_UP', gameLabels, [], 'Health');
      
      expect(counter.value).toBe(10);
      expect(counter.label).toBe('health');
    });
  });

  describe('properties', () => {
    let counter: Counter;

    beforeEach(() => {
      counter = Counter.create(5, 'points', 'FACE_UP', gameLabels, [], 'Points');
    });

    it('should have value property', () => {
      expect(counter.value).toBe(5);
    });

    it('should have label property', () => {
      expect(counter.label).toBe('points');
    });

    it('should have visibility property', () => {
      expect(counter.visibility).toBe('FACE_UP');
    });

    it('should have displayName property', () => {
      expect(counter.displayName).toBe('Points');
    });

    it('should have actionRoles property', () => {
      expect(Array.isArray(counter.actionRoles)).toBe(true);
    });
  });

  describe('value manipulation', () => {
    it('should allow reading value', () => {
      const counter = Counter.create(0, 'test', 'FACE_UP', gameLabels, [], 'Test');
      expect(counter.value).toBe(0);
    });

    it('should start with initial value', () => {
      const counter = Counter.create(100, 'health', 'FACE_UP', gameLabels, [], 'Health');
      expect(counter.value).toBe(100);
    });
  });
});

describe('Button', () => {
  let gameDefinition: GameDefinition;
  let gameLabels: GameLabels;

  beforeEach(() => {
    gameDefinition = new GameDefinition();
    gameLabels = new GameLabels(gameDefinition.labelManger);
  });

  describe('factory methods', () => {
    it('should create a button from definition', () => {
      const buttonDef = new ButtonDefinition({ 
        labelManager: gameDefinition.labelManger,
        label: 'submit',
        type: 'CLICK',
      });
      const button = Button.fromDefinition(buttonDef, gameLabels);
      
      expect(button).toBeDefined();
      expect(button.label).toBe('submit');
    });

    it('should create a button with specific properties', () => {
      const button = Button.create('draw', gameLabels, [], 'Draw Card', 'CLICK');
      
      expect(button.label).toBe('draw');
      expect(button.type).toBe('CLICK');
      expect(button.displayName).toBe('Draw Card');
    });
  });

  describe('properties', () => {
    let button: Button;

    beforeEach(() => {
      button = Button.create('play', gameLabels, [], 'Play Card', 'CLICK');
    });

    it('should have label property', () => {
      expect(button.label).toBe('play');
    });

    it('should have type property', () => {
      expect(button.type).toBe('CLICK');
    });

    it('should have displayName property', () => {
      expect(button.displayName).toBe('Play Card');
    });

    it('should have actionRoles property', () => {
      expect(Array.isArray(button.actionRoles)).toBe(true);
    });

    it('should have range property (optional, can be undefined)', () => {
      // Range can be undefined if not provided in factory
      expect(button.range === undefined || typeof button.range === 'object').toBe(true);
    });
  });
});

describe('Player', () => {
  let gameDefinition: GameDefinition;
  let gameLabels: GameLabels;

  beforeEach(() => {
    gameDefinition = new GameDefinition();
    gameLabels = new GameLabels(gameDefinition.labelManger);
  });

  describe('constructor', () => {
    it('should create a player instance', () => {
      const playerDef = new PlayerDefinition();
      const player = new Player(playerDef, 'HUMAN', gameLabels, 0);
      
      expect(player).toBeDefined();
    });

    it('should assign player type', () => {
      const playerDef = new PlayerDefinition();
      const player = new Player(playerDef, 'HUMAN', gameLabels, 1);
      
      expect(player.type).toBe('HUMAN');
    });

    it('should assign player ID', () => {
      const playerDef = new PlayerDefinition();
      const player = new Player(playerDef, 'AI', gameLabels, 42);
      
      expect(player.id).toBe(42);
    });
  });

  describe('properties', () => {
    let player: Player;

    beforeEach(() => {
      const playerDef = new PlayerDefinition();
      player = new Player(playerDef, 'HUMAN', gameLabels, 5);
    });

    it('should expose type property', () => {
      expect(player.type).toBe('HUMAN');
    });

    it('should expose id property', () => {
      expect(player.id).toBe(5);
    });
  });

  describe('different player types', () => {
    it('should create HUMAN players', () => {
      const playerDef = new PlayerDefinition();
      const player = new Player(playerDef, 'HUMAN', gameLabels, 0);
      expect(player.type).toBe('HUMAN');
    });

    it('should create AI players', () => {
      const playerDef = new PlayerDefinition();
      const player = new Player(playerDef, 'AI', gameLabels, 1);
      expect(player.type).toBe('AI');
    });

    it('should create ROBOT players', () => {
      const playerDef = new PlayerDefinition();
      const player = new Player(playerDef, 'ROBOT', gameLabels, 2);
      expect(player.type).toBe('ROBOT');
    });
  });

  describe('different player IDs', () => {
    it('should maintain unique IDs', () => {
      const playerDef = new PlayerDefinition();
      const player1 = new Player(playerDef, 'HUMAN', gameLabels, 0);
      const player2 = new Player(playerDef, 'AI', gameLabels, 1);
      
      expect(player1.id).not.toBe(player2.id);
    });
  });
});
