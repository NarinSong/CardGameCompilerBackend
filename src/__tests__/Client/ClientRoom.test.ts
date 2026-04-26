import Client from '../../Client/Client';
import Room from '../../Components/Room';
import GameDefinition from '../../Rules/GameDefinition';

describe('Client', () => {
  describe('constructor', () => {
    it('should create a client instance', () => {
      const client = new Client();
      expect(client).toBeDefined();
    });

    it('should assign a unique identifier', () => {
      const client1 = new Client();
      const client2 = new Client();
      
      expect(client1.identifier).not.toBe(client2.identifier);
    });

    it('should have numeric identifier', () => {
      const client = new Client();
      expect(typeof client.identifier).toBe('number');
    });
  });

  describe('properties', () => {
    let client: Client;

    beforeEach(() => {
      client = new Client();
    });

    it('should have identifier property', () => {
      expect(client.identifier).toBeDefined();
    });

    it('should have room property initialized to null', () => {
      expect(client.room).toBeNull();
    });

    it('should allow setting room', () => {
      const mockRoom = { name: 'test-room' } as any;
      client.room = mockRoom;
      
      expect(client.room).toBe(mockRoom);
    });
  });

  describe('unique identifiers', () => {
    it('should increment identifiers', () => {
      const client1 = new Client();
      const client2 = new Client();
      const client3 = new Client();
      
      expect(client2.identifier).toBeGreaterThan(client1.identifier);
      expect(client3.identifier).toBeGreaterThan(client2.identifier);
    });

    it('should maintain unique IDs across multiple instances', () => {
      const clients = Array.from({ length: 5 }, () => new Client());
      const ids = clients.map(c => c.identifier);
      const uniqueIds = new Set(ids);
      
      expect(uniqueIds.size).toBe(5);
    });
  });

  describe('room association', () => {
    let client: Client;

    beforeEach(() => {
      client = new Client();
    });

    it('should start with no room', () => {
      expect(client.room).toBeNull();
    });

    it('should allow joining a room', () => {
      const mockRoom = { 
        name: 'game-1',
        game: {},
        clients: [client.identifier]
      } as any;
      
      client.room = mockRoom;
      
      expect(client.room).toBe(mockRoom);
    });

    it('should allow leaving a room', () => {
      const mockRoom = { name: 'game-1' } as any;
      client.room = mockRoom;
      
      expect(client.room).not.toBeNull();
      
      client.room = null;
      
      expect(client.room).toBeNull();
    });
  });
});

describe('Room', () => {
  let gameDefinition: GameDefinition;

  beforeEach(() => {
    gameDefinition = new GameDefinition();
  });

  describe('constructor', () => {
    it('should create a room instance', () => {
      const game = gameDefinition.createGame();
      const room = new Room(game, 1, 'test-room');
      
      expect(room).toBeDefined();
    });

    it('should store the game instance', () => {
      const game = gameDefinition.createGame();
      const room = new Room(game, 1, 'test-room');
      
      expect(room.game).toBe(game);
    });

    it('should store the room name', () => {
      const game = gameDefinition.createGame();
      const room = new Room(game, 1, 'my-game');
      
      expect(room.name).toBe('my-game');
    });

    it('should initialize with first client', () => {
      const game = gameDefinition.createGame();
      const clientId = 123;
      const room = new Room(game, clientId, 'test-room');
      
      expect(room.clients).toContain(clientId);
    });
  });

  describe('properties', () => {
    let room: Room;

    beforeEach(() => {
      const game = gameDefinition.createGame();
      room = new Room(game, 1, 'test-room');
    });

    it('should have game property', () => {
      expect(room.game).toBeDefined();
    });

    it('should have clients array', () => {
      expect(Array.isArray(room.clients)).toBe(true);
    });

    it('should have name property', () => {
      expect(room.name).toBeDefined();
    });
  });

  describe('client management', () => {
    let room: Room;

    beforeEach(() => {
      const game = gameDefinition.createGame();
      room = new Room(game, 1, 'test-room');
    });

    it('should start with one client', () => {
      expect(room.clients.length).toBeGreaterThan(0);
    });

    it('should allow adding clients', () => {
      const initialCount = room.clients.length;
      room.clients.push(2);
      
      expect(room.clients.length).toBe(initialCount + 1);
    });

    it('should track multiple clients', () => {
      room.clients.push(2);
      room.clients.push(3);
      
      expect(room.clients).toContain(1);
      expect(room.clients).toContain(2);
      expect(room.clients).toContain(3);
    });
  });

  describe('game initialization', () => {
    it('should initialize game with a player on creation', () => {
      const game = gameDefinition.createGame();
      const room = new Room(game, 1, 'test-room');
      
      // Room constructor should call handlePlayerJoin and startGame
      expect(room.game.numPlayers).toBeGreaterThan(0);
    });
  });

  describe('emitGameState', () => {
    it('should emit game state without throwing', () => {
      const game = gameDefinition.createGame();
      const room = new Room(game, 1, 'test-room');
      
      expect(() => {
        room.emitGameState();
      }).not.toThrow();
    });
  });

  describe('handlePlayerClick', () => {
    it('should handle player click without throwing', () => {
      const game = gameDefinition.createGame();
      const room = new Room(game, 1, 'test-room');
      
      expect(() => {
        room.handlePlayerClick('deck');
      }).not.toThrow();
    });
  });

  describe('room identification', () => {
    it('should have unique names for different rooms', () => {
      const game1 = gameDefinition.createGame();
      const game2 = gameDefinition.createGame();
      
      const room1 = new Room(game1, 1, 'room-1');
      const room2 = new Room(game2, 2, 'room-2');
      
      expect(room1.name).not.toBe(room2.name);
    });

    it('should be retrievable by name', () => {
      const game = gameDefinition.createGame();
      const roomName = 'special-game';
      const room = new Room(game, 1, roomName);
      
      expect(room.name).toBe(roomName);
    });
  });

  describe('complex scenarios', () => {
    it('should manage multiple players in one room', () => {
      const game = gameDefinition.createGame();
      const room = new Room(game, 1, 'multiplayer-game');
      
      room.clients.push(2);
      room.clients.push(3);
      
      expect(room.clients.length).toBe(3);
      expect(room.clients).toEqual([1, 2, 3]);
    });

    it('should maintain game state', () => {
      const game = gameDefinition.createGame();
      const room = new Room(game, 1, 'test-room');
      
      const gameStateBefore = room.game.gameState;
      room.emitGameState();
      const gameStateAfter = room.game.gameState;
      
      expect(gameStateBefore).toBe(gameStateAfter);
    });
  });
});
