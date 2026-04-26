import Counter from '../../Game/Counter';
import CounterDefinition from '../../Rules/CounterDefinition';
import GameLabels from '../../Game/GameLabels';
import GameDefinition from '../../Rules/GameDefinition';

describe('Counter', () => {
  let gameDefinition: GameDefinition;
  let gameLabels: GameLabels;
  let counterDefinition: CounterDefinition;

  beforeEach(() => {
    gameDefinition = new GameDefinition();
    gameLabels = new GameLabels(gameDefinition.labelManger);
    counterDefinition = new CounterDefinition({
      labelManager: gameDefinition.labelManger,
      label: 'score',
      number: 0
    });
  });

  describe('factory methods', () => {
    it('should create counter from CounterDefinition', () => {
      const counter = Counter.fromDefinition(counterDefinition, gameLabels);
      expect(counter).toBeDefined();
      expect(counter).toBeInstanceOf(Counter);
    });

    it('should create counter with explicit parameters', () => {
      const counter = Counter.create(10, 'health', 'FACE_UP', gameLabels, [], 'Health');
      expect(counter).toBeDefined();
      expect(counter).toBeInstanceOf(Counter);
    });

    it('should create counters with different initial values', () => {
      const counter0 = Counter.create(0, 'empty', 'FACE_UP', gameLabels, [], 'Empty');
      const counter100 = Counter.create(100, 'full', 'FACE_UP', gameLabels, [], 'Full');
      const counterNeg = Counter.create(-5, 'negative', 'FACE_UP', gameLabels, [], 'Negative');
      
      expect(counter0.value).toBe(0);
      expect(counter100.value).toBe(100);
      expect(counterNeg.value).toBe(-5);
    });
  });

  describe('counter properties', () => {
    let counter: Counter;

    beforeEach(() => {
      counter = Counter.create(50, 'health', 'FACE_UP', gameLabels, ['increment', 'decrement'], 'Health');
    });

    it('should have value property', () => {
      expect(counter.value).toBeDefined();
      expect(typeof counter.value).toBe('number');
    });

    it('should have label property', () => {
      expect(counter.label).toBeDefined();
    });

    it('should have visibility property', () => {
      expect(counter.visibility).toBe('FACE_UP');
    });

    it('should have displayName property', () => {
      expect(counter.displayName).toBe('Health');
    });

    it('should have actionRoles property', () => {
      expect(counter.actionRoles).toBeDefined();
      expect(Array.isArray(counter.actionRoles)).toBe(true);
    });
  });

  describe('counter values', () => {
    it('should support zero value', () => {
      const counter = Counter.create(0, 'zero', 'FACE_UP', gameLabels, [], 'Zero');
      expect(counter.value).toBe(0);
    });

    it('should support positive values', () => {
      const counter = Counter.create(100, 'positive', 'FACE_UP', gameLabels, [], 'Positive');
      expect(counter.value).toBe(100);
    });

    it('should support negative values', () => {
      const counter = Counter.create(-10, 'negative', 'FACE_UP', gameLabels, [], 'Negative');
      expect(counter.value).toBe(-10);
    });

    it('should support large values', () => {
      const counter = Counter.create(999999, 'large', 'FACE_UP', gameLabels, [], 'Large');
      expect(counter.value).toBe(999999);
    });
  });

  describe('counter visibility', () => {
    it('should support FACE_UP visibility', () => {
      const counter = Counter.create(10, 'visible', 'FACE_UP', gameLabels, [], 'Visible');
      expect(counter.visibility).toBe('FACE_UP');
    });

    it('should support FACE_DOWN visibility', () => {
      const counter = Counter.create(10, 'down', 'FACE_DOWN', gameLabels, [], 'Face Down');
      expect(counter.visibility).toBe('FACE_DOWN');
    });

    it('should support HIDDEN visibility', () => {
      const counter = Counter.create(10, 'hidden', 'HIDDEN', gameLabels, [], 'Hidden');
      expect(counter.visibility).toBe('HIDDEN');
    });
  });

  describe('counter action roles', () => {
    it('should accept empty action roles', () => {
      const counter = Counter.create(10, 'test', 'FACE_UP', gameLabels, [], 'Test');
      expect(counter.actionRoles).toEqual([]);
    });

    it('should accept multiple action roles', () => {
      const counter = Counter.create(10, 'test', 'FACE_UP', gameLabels, ['increment', 'decrement', 'reset'], 'Test');
      expect(counter.actionRoles.length).toBe(3);
      expect(counter.actionRoles).toContain('increment');
    });
  });

  describe('counter creation from definition', () => {
    it('should properly initialize from CounterDefinition', () => {
      const counter = Counter.fromDefinition(counterDefinition, gameLabels);
      
      expect(counter).toBeDefined();
      expect(counter.label).toBe('score');
    });

    it('should handle CounterDefinition with different values', () => {
      const def1 = new CounterDefinition({
        labelManager: gameDefinition.labelManger,
        label: 'counter1',
        number: 50
      });
      
      const def2 = new CounterDefinition({
        labelManager: gameDefinition.labelManger,
        label: 'counter2',
        number: 100
      });
      
      const counter1 = Counter.fromDefinition(def1, gameLabels);
      const counter2 = Counter.fromDefinition(def2, gameLabels);
      
      expect(counter1.value).toBe(50);
      expect(counter2.value).toBe(100);
    });
  });

  describe('counter instantiation patterns', () => {
    it('should create multiple independent counters', () => {
      const counters = [];
      for (let i = 0; i < 5; i++) {
        counters.push(Counter.create(i * 10, `counter${i}`, 'FACE_UP', gameLabels, [], `Counter ${i}`));
      }
      
      expect(counters.length).toBe(5);
      counters.forEach((counter, index) => {
        expect(counter.value).toBe(index * 10);
      });
    });

    it('should handle counter creation without errors', () => {
      expect(() => {
        Counter.create(10, 'test', 'FACE_UP', gameLabels, [], 'Test');
      }).not.toThrow();
    });
  });

  describe('counter initialization', () => {
    it('should maintain initial value', () => {
      const counter = Counter.create(42, 'test', 'FACE_UP', gameLabels, [], 'Test');
      expect(counter.value).toBe(42);
    });

    it('should maintain label through initialization', () => {
      const counter = Counter.create(10, 'myLabel', 'FACE_UP', gameLabels, [], 'My Label');
      expect(counter.label).toBe('myLabel');
    });
  });
});
