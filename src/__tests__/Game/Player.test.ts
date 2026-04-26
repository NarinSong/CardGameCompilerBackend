import Player from '../../Game/Player';
import PlayerDefinition from '../../Rules/PlayerDefinition';
import GameLabels from '../../Game/GameLabels';
import GameDefinition from '../../Rules/GameDefinition';
import { PlayerType } from '../../schemas/types';

describe('Player', () => {
  let gameDefinition: GameDefinition;
  let gameLabels: GameLabels;
  let playerDefinition: PlayerDefinition;

  beforeEach(() => {
    gameDefinition = new GameDefinition();
    gameLabels = new GameLabels(gameDefinition.labelManger);
    playerDefinition = new PlayerDefinition();
  });

  describe('constructor', () => {
    it('should create a Player instance', () => {
      const player = new Player(playerDefinition, 'HUMAN', gameLabels, 0);
      expect(player).toBeDefined();
      expect(player).toBeInstanceOf(Player);
    });

    it('should set player type correctly', () => {
      const player = new Player(playerDefinition, 'HUMAN', gameLabels, 0);
      expect(player.type).toBe('HUMAN');
    });

    it('should set player id correctly', () => {
      const player = new Player(playerDefinition, 'HUMAN', gameLabels, 42);
      expect(player.id).toBe(42);
    });

    it('should accept PlayerDefinition as configuration', () => {
      const player = new Player(playerDefinition, 'AI', gameLabels, 1);
      expect(player).toBeDefined();
    });
  });

  describe('player types', () => {
    it('should support HUMAN player type', () => {
      const player = new Player(playerDefinition, 'HUMAN', gameLabels, 0);
      expect(player.type).toBe('HUMAN');
    });

    it('should support AI player type', () => {
      const player = new Player(playerDefinition, 'AI', gameLabels, 1);
      expect(player.type).toBe('AI');
    });

    it('should support ROBOT player type', () => {
      const player = new Player(playerDefinition, 'ROBOT', gameLabels, 2);
      expect(player.type).toBe('ROBOT');
    });

    it('should maintain player type throughout lifecycle', () => {
      const player = new Player(playerDefinition, 'HUMAN', gameLabels, 0);
      expect(player.type).toBe('HUMAN');
      // Access type multiple times
      expect(player.type).toBe('HUMAN');
    });
  });

  describe('player identification', () => {
    it('should maintain unique player IDs', () => {
      const player1 = new Player(playerDefinition, 'HUMAN', gameLabels, 0);
      const player2 = new Player(playerDefinition, 'AI', gameLabels, 1);
      
      expect(player1.id).not.toBe(player2.id);
    });

    it('should support ID 0', () => {
      const player = new Player(playerDefinition, 'HUMAN', gameLabels, 0);
      expect(player.id).toBe(0);
    });

    it('should support large ID values', () => {
      const player = new Player(playerDefinition, 'HUMAN', gameLabels, 999999);
      expect(player.id).toBe(999999);
    });

    it('should maintain player id throughout lifecycle', () => {
      const player = new Player(playerDefinition, 'HUMAN', gameLabels, 42);
      expect(player.id).toBe(42);
      // Access id multiple times
      expect(player.id).toBe(42);
    });
  });

  describe('player with GameLabels', () => {
    it('should accept GameLabels instance', () => {
      const player = new Player(playerDefinition, 'HUMAN', gameLabels, 0);
      expect(player).toBeDefined();
    });

    it('should work with different GameLabels instances', () => {
      const gameLabels1 = new GameLabels(gameDefinition.labelManger);
      const gameLabels2 = new GameLabels(gameDefinition.labelManger);
      
      const player1 = new Player(playerDefinition, 'HUMAN', gameLabels1, 0);
      const player2 = new Player(playerDefinition, 'AI', gameLabels2, 1);
      
      expect(player1).toBeDefined();
      expect(player2).toBeDefined();
    });
  });

  describe('player with PlayerDefinition', () => {
    it('should accept empty PlayerDefinition', () => {
      const emptyDef = new PlayerDefinition();
      const player = new Player(emptyDef, 'HUMAN', gameLabels, 0);
      expect(player).toBeDefined();
    });

    it('should handle multiple players with same definition', () => {
      const player1 = new Player(playerDefinition, 'HUMAN', gameLabels, 0);
      const player2 = new Player(playerDefinition, 'AI', gameLabels, 1);
      
      expect(player1).toBeDefined();
      expect(player2).toBeDefined();
    });
  });

  describe('player properties', () => {
    let player: Player;

    beforeEach(() => {
      player = new Player(playerDefinition, 'HUMAN', gameLabels, 5);
    });

    it('should have type property', () => {
      expect(player.type).toBeDefined();
      expect(typeof player.type).toBe('string');
    });

    it('should have id property', () => {
      expect(player.id).toBeDefined();
      expect(typeof player.id).toBe('number');
    });

    it('should have both type and id accessible', () => {
      expect(player.type).toBe('HUMAN');
      expect(player.id).toBe(5);
    });
  });

  describe('player instantiation patterns', () => {
    it('should create multiple independent player instances', () => {
      const players = [];
      for (let i = 0; i < 4; i++) {
        const type = i % 3 === 0 ? 'HUMAN' : i % 3 === 1 ? 'AI' : 'ROBOT';
        players.push(new Player(playerDefinition, type as PlayerType, gameLabels, i));
      }
      
      expect(players.length).toBe(4);
      players.forEach((player, index) => {
        expect(player.id).toBe(index);
      });
    });

    it('should handle player creation without errors', () => {
      expect(() => {
        new Player(playerDefinition, 'HUMAN', gameLabels, 0);
      }).not.toThrow();
    });
  });
});
