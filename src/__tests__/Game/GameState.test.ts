import GameState from '../../Game/GameState';
import GameDefinition from '../../Rules/GameDefinition';
import Player from '../../Game/Player';

describe('GameState', () => {
  let gameDefinition: GameDefinition;
  let gameState: GameState;

  beforeEach(() => {
    gameDefinition = new GameDefinition();
    gameState = new GameState(gameDefinition);
  });

  describe('constructor', () => {
    it('should create a GameState instance', () => {
      expect(gameState).toBeDefined();
    });

    it('should initialize gameLabels', () => {
      expect(gameState.gameLabels).toBeDefined();
    });

    it('should initialize board', () => {
      expect(gameState.board).toBeDefined();
    });

    it('should initialize players object', () => {
      expect(gameState.players).toBeDefined();
      expect(typeof gameState.players).toBe('object');
    });

    it('should initialize with zero players', () => {
      expect(gameState.numPlayers).toBe(0);
    });

    it('should initialize piles object', () => {
      expect(gameState.piles).toBeDefined();
      expect(typeof gameState.piles).toBe('object');
    });

    it('should initialize counters object', () => {
      expect(gameState.counters).toBeDefined();
      expect(typeof gameState.counters).toBe('object');
    });

    it('should initialize roles object', () => {
      expect(gameState.roles).toBeDefined();
      expect(typeof gameState.roles).toBe('object');
    });

    it('should have null currentStep initially', () => {
      expect(gameState.currentStep).toBeNull();
    });
  });

  describe('gameLabels property', () => {
    it('should expose gameLabels for label management', () => {
      expect(gameState.gameLabels.nextId).toBeDefined();
    });
  });

  describe('board property', () => {
    it('should have a valid board', () => {
      expect(gameState.board).toBeDefined();
    });

    it('should initialize board from definition', () => {
      expect(gameState.board).toBeDefined();
    });
  });

  describe('numPlayers property', () => {
    it('should start at 0', () => {
      expect(gameState.numPlayers).toBe(0);
    });

    it('should track number of players', () => {
      const playerDef = gameDefinition.player;
      const player = new Player(playerDef, 'HUMAN', gameState.gameLabels, 0);
      gameState.players[0] = player;
      gameState.numPlayers = 1;
      
      expect(gameState.numPlayers).toBe(1);
    });
  });

  describe('players management', () => {
    it('should allow adding players', () => {
      const playerDef = gameDefinition.player;
      const player = new Player(playerDef, 'HUMAN', gameState.gameLabels, 0);
      gameState.players[0] = player;
      
      expect(gameState.players[0]).toBe(player);
    });

    it('should track multiple players', () => {
      const playerDef = gameDefinition.player;
      const player1 = new Player(playerDef, 'HUMAN', gameState.gameLabels, 0);
      const player2 = new Player(playerDef, 'AI', gameState.gameLabels, 1);
      
      gameState.players[0] = player1;
      gameState.players[1] = player2;
      
      expect(gameState.players[0]).toBe(player1);
      expect(gameState.players[1]).toBe(player2);
    });

    it('should retrieve players by ID', () => {
      const playerDef = gameDefinition.player;
      const player = new Player(playerDef, 'HUMAN', gameState.gameLabels, 42);
      gameState.players[42] = player;
      
      expect(gameState.players[42]).toBe(player);
    });
  });

  describe('piles management', () => {
    it('should initialize with empty piles', () => {
      expect(Object.keys(gameState.piles).length).toBe(0);
    });

    it('should allow adding piles', () => {
      const pileEntry = {
        pile: {} as any,
        owner: 0,
      };
      gameState.piles['hand'] = pileEntry;
      
      expect(gameState.piles['hand']).toBeDefined();
    });
  });

  describe('counters management', () => {
    it('should initialize with empty counters', () => {
      expect(Object.keys(gameState.counters).length).toBe(0);
    });

    it('should allow adding counters', () => {
      const counterEntry = {
        counter: {} as any,
        owner: 0,
      };
      gameState.counters['score'] = counterEntry;
      
      expect(gameState.counters['score']).toBeDefined();
    });
  });

  describe('roles management', () => {
    it('should initialize with empty roles', () => {
      expect(Object.keys(gameState.roles).length).toBe(0);
    });

    it('should allow assigning roles to players', () => {
      gameState.roles['dealer'] = [0, 1];
      
      expect(gameState.roles['dealer']).toEqual([0, 1]);
    });

    it('should support multiple players in one role', () => {
      gameState.roles['active'] = [0, 2];
      
      expect(gameState.roles['active']).toContain(0);
      expect(gameState.roles['active']).toContain(2);
    });
  });

  describe('currentStep property', () => {
    it('should start as null', () => {
      expect(gameState.currentStep).toBeNull();
    });

    it('should allow setting current step', () => {
      const mockStep = { name: 'draw' } as any;
      gameState.currentStep = mockStep;
      
      expect(gameState.currentStep).toBe(mockStep);
    });
  });

  describe('complex state management', () => {
    it('should manage players, piles, and counters simultaneously', () => {
      const playerDef = gameDefinition.player;
      const player = new Player(playerDef, 'HUMAN', gameState.gameLabels, 0);
      
      gameState.players[0] = player;
      gameState.numPlayers = 1;
      gameState.piles['hand'] = { pile: {} as any, owner: 0 };
      gameState.counters['score'] = { counter: {} as any, owner: 0 };
      gameState.roles['active'] = [0];
      
      expect(gameState.players[0]).toBe(player);
      expect(gameState.piles['hand'].owner).toBe(0);
      expect(gameState.counters['score'].owner).toBe(0);
      expect(gameState.roles['active']).toContain(0);
    });

    it('should maintain data integrity across updates', () => {
      gameState.numPlayers = 2;
      gameState.roles['player1'] = [0];
      gameState.roles['player2'] = [1];
      
      expect(gameState.numPlayers).toBe(2);
      expect(gameState.roles['player1']).toEqual([0]);
      expect(gameState.roles['player2']).toEqual([1]);
    });
  });

  describe('board operations', () => {
    it('should have board piles, counters, and buttons', () => {
      expect(gameState.board).toBeDefined();
    });
  });
});
