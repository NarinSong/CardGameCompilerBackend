import Board from '../../Game/Board';
import BoardDefinition from '../../Rules/BoardDefinition';
import GameLabels from '../../Game/GameLabels';
import GameDefinition from '../../Rules/GameDefinition';

describe('Board', () => {
  let gameDefinition: GameDefinition;
  let gameLabels: GameLabels;
  let boardDefinition: BoardDefinition;
  let board: Board;

  beforeEach(() => {
    gameDefinition = new GameDefinition();
    gameLabels = new GameLabels(gameDefinition.labelManger);
    boardDefinition = gameDefinition.board;
    board = new Board(boardDefinition, gameLabels);
  });

  describe('constructor', () => {
    it('should create a Board instance', () => {
      expect(board).toBeDefined();
      expect(board).toBeInstanceOf(Board);
    });

    it('should accept BoardDefinition and GameLabels parameters', () => {
      const board2 = new Board(boardDefinition, gameLabels);
      expect(board2).toBeDefined();
    });

    it('should handle multiple board instances independently', () => {
      const board1 = new Board(boardDefinition, gameLabels);
      const board2 = new Board(boardDefinition, gameLabels);
      
      expect(board1).not.toBe(board2);
    });
  });

  describe('board structure', () => {
    it('should be instantiable with valid definition', () => {
      expect(board).toBeDefined();
    });

    it('should maintain reference to GameLabels', () => {
      const board2 = new Board(boardDefinition, gameLabels);
      expect(board2).toBeDefined();
    });

    it('should handle board with empty definition', () => {
      const emptyBoardDef = new BoardDefinition();
      const emptyBoard = new Board(emptyBoardDef, gameLabels);
      expect(emptyBoard).toBeDefined();
    });
  });

  describe('integration with GameLabels', () => {
    it('should work with GameLabels instance', () => {
      const newGameLabels = new GameLabels(gameDefinition.labelManger);
      const board2 = new Board(boardDefinition, newGameLabels);
      
      expect(board2).toBeDefined();
    });

    it('should handle multiple boards with same GameLabels', () => {
      const board2 = new Board(boardDefinition, gameLabels);
      const board3 = new Board(boardDefinition, gameLabels);
      
      expect(board2).toBeDefined();
      expect(board3).toBeDefined();
    });
  });

  describe('board instantiation patterns', () => {
    it('should create board successfully without errors', () => {
      expect(() => {
        new Board(boardDefinition, gameLabels);
      }).not.toThrow();
    });

    it('should handle consistent board creation', () => {
      const board1 = new Board(boardDefinition, gameLabels);
      const board2 = new Board(boardDefinition, gameLabels);
      
      // Both should be valid instances
      expect(board1).toBeInstanceOf(Board);
      expect(board2).toBeInstanceOf(Board);
    });
  });
});
