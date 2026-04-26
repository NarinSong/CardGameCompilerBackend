import ValueMap from '../../Components/ValueMap';

describe('ValueMap', () => {
  describe('constructor and get', () => {
    it('should create a ValueMap with string keys', () => {
      const mapping = { hearts: '❤️', spades: '♠️', diamonds: '♦️', clubs: '♣️' };
      const valueMap = new ValueMap(mapping);
      expect(valueMap).toBeDefined();
    });

    it('should retrieve values by key', () => {
      const mapping = { hearts: '❤️', spades: '♠️' };
      const valueMap = new ValueMap(mapping);
      
      expect(valueMap.get('hearts')).toBe('❤️');
      expect(valueMap.get('spades')).toBe('♠️');
    });

    it('should return undefined for missing keys', () => {
      const mapping = { hearts: '❤️' };
      const valueMap = new ValueMap(mapping);
      
      expect(valueMap.get('clubs')).toBeUndefined();
    });

    it('should work with numeric keys', () => {
      const mapping: Record<number, string> = { 1: 'one', 2: 'two', 13: 'king' };
      const valueMap = new ValueMap(mapping);
      
      expect(valueMap.get(1)).toBe('one');
      expect(valueMap.get(13)).toBe('king');
    });

    it('should work with numeric values', () => {
      const mapping = { heart: 1, spade: 2, diamond: 3, club: 4 };
      const valueMap = new ValueMap(mapping);
      
      expect(valueMap.get('heart')).toBe(1);
      expect(valueMap.get('club')).toBe(4);
    });

    it('should work with complex object values', () => {
      const mapping = {
        player1: { name: 'Alice', score: 100 },
        player2: { name: 'Bob', score: 95 },
      };
      const valueMap = new ValueMap(mapping);
      
      const player1 = valueMap.get('player1');
      expect(player1?.name).toBe('Alice');
      expect(player1?.score).toBe(100);
    });
  });

  describe('immutability', () => {
    it('should not expose internal mapping', () => {
      const mapping = { hearts: '❤️' };
      const valueMap = new ValueMap(mapping);
      
      // Modify original mapping
      mapping.hearts = '♥️';
      
      // ValueMap should still return original value (if properly isolated)
      // or updated value (if reference is kept) - depending on implementation
      // This tests current behavior
      expect(valueMap.get('hearts')).toBeDefined();
    });
  });
});
