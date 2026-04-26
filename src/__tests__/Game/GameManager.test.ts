import GameManager from '../../GameManager';
import Client from '../../Client/Client';
import Room from '../../Components/Room.js';
import GameDefinition from '../../Rules/GameDefinition';

// Mock Database module to avoid mariadb import issues
jest.mock('../Components/Database', () => ({
  __esModule: true,
  default: {
    getGamesList: jest.fn(),
  },
}));

// Mock GameBuilder to avoid Database dependency
jest.mock('../Client/GameBuilder', () => ({
  buildGameFromJSON: jest.fn(),
  buildGameFromDatabase: jest.fn(),
}));

describe('GameManager', () => {
  beforeEach(() => {
    // Clear manager state before each test
    GameManager.clients = {};
    GameManager.rooms = {};
    GameManager.roomName = 1;
  });

  describe('client management', () => {
    it('should create a new client', () => {
      const client = GameManager.createClient();
      
      expect(client).toBeDefined();
      expect(client).toBeInstanceOf(Client);
    });

    it('should store created client', () => {
      const client = GameManager.createClient();
      
      expect(GameManager.clients[client.identifier]).toBe(client);
    });

    it('should create multiple clients with different identifiers', () => {
      const client1 = GameManager.createClient();
      const client2 = GameManager.createClient();
      
      expect(client1.identifier).not.toBe(client2.identifier);
      expect(GameManager.clients[client1.identifier]).toBe(client1);
      expect(GameManager.clients[client2.identifier]).toBe(client2);
    });
  });

  describe('clientFromId', () => {
    it('should retrieve a client by ID', () => {
      const client = GameManager.createClient();
      const retrieved = GameManager.clientFromId(client.identifier);
      
      expect(retrieved).toBe(client);
    });

    it('should return null for non-existent client', () => {
      const retrieved = GameManager.clientFromId(99999);
      
      expect(retrieved).toBeNull();
    });
  });

  describe('room management', () => {
    it('should create a room with valid game and client', () => {
      const client = GameManager.createClient();
      const gameId = 0; // Default game
      
      const room = GameManager.createRoom(gameId, client.identifier);
      
      expect(room).toBeDefined();
      expect(room).toBeInstanceOf(Room);
    });

    it('should return null with invalid game ID', () => {
      const client = GameManager.createClient();
      const gameId = 99999;
      
      const room = GameManager.createRoom(gameId, client.identifier);
      
      expect(room).toBeNull();
    });

    it('should return null with invalid client ID', () => {
      const gameId = 0;
      
      const room = GameManager.createRoom(gameId, 99999);
      
      expect(room).toBeNull();
    });

    it('should assign client to room', () => {
      const client = GameManager.createClient();
      const gameId = 0;
      
      const room = GameManager.createRoom(gameId, client.identifier);
      
      expect(client.room).toBe(room);
    });

    it('should store room in manager', () => {
      const client = GameManager.createClient();
      const gameId = 0;
      
      const room = GameManager.createRoom(gameId, client.identifier);
      
      expect(GameManager.rooms[room.name]).toBe(room);
    });
  });

  describe('removeClient', () => {
    it('should remove client from manager', () => {
      const client = GameManager.createClient();
      const id = client.identifier;
      
      expect(GameManager.clients[id]).toBe(client);
      
      GameManager.removeClient(id);
      
      expect(GameManager.clients[id]).toBeUndefined();
    });

    it('should handle removing non-existent client', () => {
      expect(() => {
        GameManager.removeClient(99999);
      }).not.toThrow();
    });

    it('should remove associated room when client is removed', () => {
      const client = GameManager.createClient();
      const gameId = 0;
      
      const room = GameManager.createRoom(gameId, client.identifier);
      const roomName = room.name;
      
      expect(GameManager.rooms[roomName]).toBeDefined();
      
      GameManager.removeClient(client.identifier);
      
      expect(GameManager.rooms[roomName]).toBeUndefined();
    });
  });

  describe('available games', () => {
    it('should have default game available', () => {
      expect(GameManager.availableGames[0]).toBeDefined();
    });

    it('should retrieve available game', () => {
      const game = GameManager.availableGames[0];
      
      expect(game).toBeInstanceOf(GameDefinition);
    });
  });

  describe('room naming', () => {
    it('should assign unique room names', () => {
      const client1 = GameManager.createClient();
      const client2 = GameManager.createClient();
      
      const room1 = GameManager.createRoom(0, client1.identifier);
      const room2 = GameManager.createRoom(0, client2.identifier);
      
      expect(room1.name).not.toBe(room2.name);
    });

    it('should increment room names', () => {
      const client1 = GameManager.createClient();
      const client2 = GameManager.createClient();
      
      const room1 = GameManager.createRoom(0, client1.identifier);
      const room2 = GameManager.createRoom(0, client2.identifier);
      
      expect(room2.name).toBeGreaterThan(room1.name);
    });
  });

  describe('complex scenarios', () => {
    it('should manage multiple clients and rooms', () => {
      const client1 = GameManager.createClient();
      const client2 = GameManager.createClient();
      const client3 = GameManager.createClient();
      
      const room1 = GameManager.createRoom(0, client1.identifier);
      const room2 = GameManager.createRoom(0, client2.identifier);
      
      expect(GameManager.clients[client1.identifier]).toBe(client1);
      expect(GameManager.clients[client2.identifier]).toBe(client2);
      expect(GameManager.clients[client3.identifier]).toBe(client3);
      expect(GameManager.rooms[room1.name]).toBe(room1);
      expect(GameManager.rooms[room2.name]).toBe(room2);
    });

    it('should maintain state consistency', () => {
      const client = GameManager.createClient();
      const room = GameManager.createRoom(0, client.identifier);
      
      const retrieved = GameManager.clientFromId(client.identifier);
      
      expect(retrieved.room).toBe(room);
      expect(GameManager.rooms[room.name]).toBe(room);
    });
  });
});
