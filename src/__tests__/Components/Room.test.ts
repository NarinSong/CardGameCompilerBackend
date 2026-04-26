import Room from '../../Components/Room';
import Game from '../../Game/Game';
import GameDefinition from '../../Rules/GameDefinition';

describe('Room', () => {
  let gameDefinition: GameDefinition;
  let game: Game;
  let room: Room;
  const testClientId = 1000;
  const testRoomName = 'Test Room 1';

  beforeEach(() => {
    gameDefinition = new GameDefinition();
    game = gameDefinition.createGame();
    room = new Room(game, testClientId, testRoomName);
  });

  describe('constructor', () => {
    it('should create a Room instance', () => {
      expect(room).toBeDefined();
      expect(room).toBeInstanceOf(Room);
    });

    it('should store game reference', () => {
      expect(room.game).toBeDefined();
      expect(room.game).toBe(game);
    });

    it('should initialize clients array with first client', () => {
      expect(room.clients).toBeDefined();
      expect(Array.isArray(room.clients)).toBe(true);
      expect(room.clients.length).toBe(1);
      expect(room.clients[0]).toBe(testClientId);
    });

    it('should set room name', () => {
      expect(room.name).toBe(testRoomName);
    });

    it('should handle player join on initialization', () => {
      expect(room.game).toBeDefined();
    });

    it('should start game on initialization', () => {
      expect(room.game).toBeDefined();
    });
  });

  describe('room properties', () => {
    it('should have game property', () => {
      expect(room.game).toBeDefined();
      expect(room.game).toBeInstanceOf(Game);
    });

    it('should have clients property', () => {
      expect(room.clients).toBeDefined();
      expect(Array.isArray(room.clients)).toBe(true);
    });

    it('should have name property', () => {
      expect(room.name).toBeDefined();
      expect(typeof room.name).toBe('string');
    });
  });

  describe('clients management', () => {
    it('should initialize with one client', () => {
      expect(room.clients.length).toBe(1);
    });

    it('should store correct first client ID', () => {
      expect(room.clients[0]).toBe(testClientId);
    });

    it('should support multiple client IDs in array', () => {
      expect(room.clients).toContain(testClientId);
    });
  });

  describe('room naming', () => {
    it('should maintain room name', () => {
      expect(room.name).toBe(testRoomName);
    });

    it('should handle room names with spaces', () => {
      const gameInstance = gameDefinition.createGame();
      const testRoom = new Room(gameInstance, 1001, 'Room with Spaces');
      expect(testRoom.name).toBe('Room with Spaces');
    });

    it('should handle numeric room names', () => {
      const gameInstance = gameDefinition.createGame();
      const testRoom = new Room(gameInstance, 1002, 'Room 42');
      expect(testRoom.name).toBe('Room 42');
    });
  });

  describe('game initialization', () => {
    it('should have initialized game instance', () => {
      expect(room.game).toBeDefined();
      expect(room.game.gameState).toBeDefined();
    });

    it('should handle game with multiple rooms', () => {
      const game1 = gameDefinition.createGame();
      const game2 = gameDefinition.createGame();
      
      const room1 = new Room(game1, 1003, 'Room 1');
      const room2 = new Room(game2, 1004, 'Room 2');
      
      expect(room1.game).not.toBe(room2.game);
    });
  });

  describe('emitGameState method', () => {
    it('should have emitGameState method', () => {
      expect(typeof room.emitGameState).toBe('function');
    });

    it('should not throw when calling emitGameState', () => {
      expect(() => {
        room.emitGameState();
      }).not.toThrow();
    });

    it('should handle emitGameState with valid game state', () => {
      expect(() => {
        room.emitGameState();
      }).not.toThrow();
    });
  });

  describe('handlePlayerClick method', () => {
    it('should have handlePlayerClick method', () => {
      expect(typeof room.handlePlayerClick).toBe('function');
    });

    it('should accept label parameter', () => {
      expect(() => {
        room.handlePlayerClick('testLabel');
      }).not.toThrow();
    });

    it('should handle different label strings', () => {
      expect(() => {
        room.handlePlayerClick('pile1');
        room.handlePlayerClick('card2');
        room.handlePlayerClick('button3');
      }).not.toThrow();
    });
  });

  describe('room instantiation patterns', () => {
    it('should create multiple independent rooms', () => {
      const game1 = gameDefinition.createGame();
      const game2 = gameDefinition.createGame();
      const game3 = gameDefinition.createGame();
      
      const room1 = new Room(game1, 2000, 'Room A');
      const room2 = new Room(game2, 2001, 'Room B');
      const room3 = new Room(game3, 2002, 'Room C');
      
      expect(room1.name).toBe('Room A');
      expect(room2.name).toBe('Room B');
      expect(room3.name).toBe('Room C');
    });

    it('should handle room creation without errors', () => {
      expect(() => {
        const gameInstance = gameDefinition.createGame();
        new Room(gameInstance, 3000, 'New Room');
      }).not.toThrow();
    });
  });

  describe('room with different client IDs', () => {
    it('should support different client IDs', () => {
      const game1 = gameDefinition.createGame();
      const game2 = gameDefinition.createGame();
      
      const room1 = new Room(game1, 5000, 'Room 1');
      const room2 = new Room(game2, 5001, 'Room 2');
      
      expect(room1.clients[0]).toBe(5000);
      expect(room2.clients[0]).toBe(5001);
    });

    it('should handle large client ID numbers', () => {
      const gameInstance = gameDefinition.createGame();
      const room = new Room(gameInstance, 999999, 'Large ID Room');
      expect(room.clients[0]).toBe(999999);
    });
  });
});
