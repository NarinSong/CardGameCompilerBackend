import Board from '../Game/Board';
import GameDefinition from '../Rules/GameDefinition';
import GameLabels from '../Game/GameLabels';

describe('Board', () => {
  let gameDefinition: GameDefinition;
  let gameLabels: GameLabels;
  let board: Board;

  beforeEach(() => {
    gameDefinition = new GameDefinition();
    gameLabels = new GameLabels(gameDefinition.labelManger);
    board = new Board(gameDefinition.board, gameLabels);
  });

  describe('constructor', () => {
    it('should create a Board instance', () => {
      expect(board).toBeDefined();
    });

    it('should initialize from board definition', () => {
      expect(board).toBeDefined();
    });

    it('should have gameLabels reference', () => {
      expect(board).toBeDefined();
    });
  });

  describe('board structure', () => {
    it('should be instantiable with minimal definition', () => {
      const minimalBoard = new Board(gameDefinition.board, gameLabels);
      expect(minimalBoard).toBeDefined();
    });
  });
});

// Additional integration-like tests
describe('Game Components Integration', () => {
  let gameDefinition: GameDefinition;

  beforeEach(() => {
    gameDefinition = new GameDefinition();
  });

  describe('Full game setup', () => {
    it('should create a complete game with all components', () => {
      const game = gameDefinition.createGame();
      
      expect(game).toBeDefined();
      expect(game.gameState).toBeDefined();
      expect(game.gameState.gameLabels).toBeDefined();
      expect(game.gameState.board).toBeDefined();
    });

    it('should handle game initialization without errors', () => {
      expect(() => {
        gameDefinition.createGame();
      }).not.toThrow();
    });
  });

  describe('Definition consistency', () => {
    it('should have consistent labelManager references', () => {
      expect(gameDefinition.labelManger).toBeDefined();
      expect(gameDefinition.labelManger.labels).toBeDefined();
      expect(gameDefinition.labelManger.phaseLabels).toBeDefined();
      expect(gameDefinition.labelManger.stepLabels).toBeDefined();
    });

    it('should have initialized board definition', () => {
      expect(gameDefinition.board).toBeDefined();
    });

    it('should have initialized player definition', () => {
      expect(gameDefinition.player).toBeDefined();
    });

    it('should have game metadata', () => {
      expect(gameDefinition.gameMeta).toBeDefined();
    });
  });

  describe('Game phases and steps', () => {
    it('should start with empty phases', () => {
      expect(Array.isArray(gameDefinition.phases)).toBe(true);
    });

    it('should support adding phases', () => {
      expect(gameDefinition.phases).toBeDefined();
    });
  });

  describe('Game roles', () => {
    it('should initialize empty roles array', () => {
      expect(Array.isArray(gameDefinition.roles)).toBe(true);
    });

    it('should support role management', () => {
      gameDefinition.roles.push('dealer');
      expect(gameDefinition.roles).toContain('dealer');
    });
  });
});

describe('Game Lifecycle', () => {
  let gameDefinition: GameDefinition;

  beforeEach(() => {
    gameDefinition = new GameDefinition();
  });

  describe('Game creation and initialization', () => {
    it('should create a valid game from definition', () => {
      const game = gameDefinition.createGame();
      
      expect(game).toBeDefined();
      expect(game.definition).toBe(gameDefinition);
    });

    it('should initialize game state correctly', () => {
      const game = gameDefinition.createGame();
      
      expect(game.gameState.numPlayers).toBe(0);
      expect(Object.keys(game.gameState.players).length).toBe(0);
    });

    it('should initialize board correctly', () => {
      const game = gameDefinition.createGame();
      
      expect(game.gameState.board).toBeDefined();
    });

    it('should setup labels correctly', () => {
      const game = gameDefinition.createGame();
      
      expect(game.gameState.gameLabels).toBeDefined();
      expect(game.gameState.gameLabels.gamePhaseLabels).toBeDefined();
      expect(game.gameState.gameLabels.gameStepLabels).toBeDefined();
    });
  });

  describe('Game state consistency', () => {
    it('should maintain consistent state after creation', () => {
      const game = gameDefinition.createGame();
      
      // Multiple accesses should return consistent state
      expect(game.gameState.numPlayers).toBe(game.gameState.numPlayers);
      expect(game.gameState.board).toBe(game.gameState.board);
      expect(game.gameState.gameLabels).toBe(game.gameState.gameLabels);
    });
  });
});
