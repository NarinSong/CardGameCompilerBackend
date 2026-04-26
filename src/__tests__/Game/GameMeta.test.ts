import GameMeta from '../../Rules/GameMeta';
import ValueMap from '../../Components/ValueMap';

describe('GameMeta', () => {
  describe('constructor', () => {
    it('should create a GameMeta instance with defaults', () => {
      const gameMeta = new GameMeta();
      expect(gameMeta).toBeDefined();
    });

    it('should initialize with provided arguments', () => {
      const gameMeta = new GameMeta({
        minPlayers: 2,
        maxPlayers: 4,
      });
      expect(gameMeta['minPlayers']).toBe(2);
      expect(gameMeta['maxPlayers']).toBe(4);
    });
  });

  describe('minPlayers', () => {
    it('should get minPlayers value', () => {
      const gameMeta = new GameMeta({ minPlayers: 2 });
      expect(gameMeta.minPlayers).toBe(2);
    });

    it('should set minPlayers value', () => {
      const gameMeta = new GameMeta();
      gameMeta.minPlayers = 3;
      expect(gameMeta.minPlayers).toBe(3);
    });

    it('should validate minPlayers is not greater than maxPlayers', () => {
      const gameMeta = new GameMeta({ maxPlayers: 4 });
      gameMeta.minPlayers = 3;
      expect(gameMeta.minPlayers).toBe(3);
    });
  });

  describe('maxPlayers', () => {
    it('should get maxPlayers value', () => {
      const gameMeta = new GameMeta({ maxPlayers: 4 });
      expect(gameMeta.maxPlayers).toBe(4);
    });

    it('should set maxPlayers value', () => {
      const gameMeta = new GameMeta();
      gameMeta.maxPlayers = 6;
      expect(gameMeta.maxPlayers).toBe(6);
    });

    it('should auto-update minPlayers if maxPlayers becomes less', () => {
      const gameMeta = new GameMeta({ minPlayers: 3, maxPlayers: 5 });
      gameMeta.maxPlayers = 2;
      
      // minPlayers should be synced to not exceed maxPlayers
      expect(gameMeta.minPlayers).toBeLessThanOrEqual(2);
    });
  });

  describe('maps property', () => {
    it('should have maps object', () => {
      const gameMeta = new GameMeta();
      expect(gameMeta.maps).toBeDefined();
    });
  });

  describe('cardValueMap property', () => {
    it('should have cardValueMap', () => {
      const gameMeta = new GameMeta();
      expect(gameMeta.cardValueMap).toBeDefined();
    });
  });

  describe('clientSuitMap property', () => {
    it('should have clientSuitMap', () => {
      const gameMeta = new GameMeta();
      expect(gameMeta.clientSuitMap).toBeDefined();
    });
  });

  describe('clientRankMap property', () => {
    it('should have clientRankMap', () => {
      const gameMeta = new GameMeta();
      expect(gameMeta.clientRankMap).toBeDefined();
    });
  });
});
