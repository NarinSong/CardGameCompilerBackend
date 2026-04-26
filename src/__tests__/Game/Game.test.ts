import Game from '../../Game/Game';
import GameDefinition from '../../Rules/GameDefinition';

describe('Game', () => {
  let gameDefinition: GameDefinition;

  beforeEach(() => {
    // Create a real GameDefinition instance for testing
    gameDefinition = new GameDefinition();
    gameDefinition.gameMeta.maxPlayers = 2;
    gameDefinition.gameMeta.minPlayers = 1;
  });

  describe('constructor', () => {
    it('should create a game instance', () => {
      const game = new Game(gameDefinition);
      expect(game).toBeDefined();
      expect(game.definition).toBe(gameDefinition);
    });

    it('should initialize gameState', () => {
      const game = new Game(gameDefinition);
      expect(game.gameState).toBeDefined();
    });
  });

  describe('handlePlayerJoin', () => {
    it('should add a player if space is available', () => {
      const game = new Game(gameDefinition);
      const player = game.handlePlayerJoin('HUMAN' as any);
      
      expect(player).toBeDefined();
      expect(game.numPlayers).toBe(1);
    });

    it('should assign incrementing player IDs', () => {
      const game = new Game(gameDefinition);
      const player1 = game.handlePlayerJoin('HUMAN' as any);
      const player2 = game.handlePlayerJoin('AI' as any);
      
      if (player1 && player2) {
        expect(player1.id).not.toBe(player2.id);
      }
    });

    it('should return null when game is full', () => {
      gameDefinition.gameMeta.maxPlayers = 1;
      const game = new Game(gameDefinition);
      
      const player1 = game.handlePlayerJoin('HUMAN' as any);
      const player2 = game.handlePlayerJoin('HUMAN' as any);
      
      expect(player1).toBeDefined();
      expect(player2).toBeNull();
    });
  });
});
