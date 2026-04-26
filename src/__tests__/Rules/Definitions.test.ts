import PileDefinition from '../../Rules/PileDefinition';
import CounterDefinition from '../../Rules/CounterDefinition';
import ButtonDefinition from '../../Rules/ButtonDefinition';
import PlayerDefinition from '../../Rules/PlayerDefinition';
import BoardDefinition from '../../Rules/BoardDefinition';
import LabelManager from '../../Rules/LabelManager';

describe('Definitions', () => {
  let labelManager: LabelManager;

  beforeEach(() => {
    labelManager = new LabelManager();
  });

  describe('PileDefinition', () => {
    it('should create a PileDefinition instance', () => {
      const pileDef = new PileDefinition({ labelManager });
      expect(pileDef).toBeDefined();
    });

    it('should have a label property', () => {
      const pileDef = new PileDefinition({ labelManager, label: 'deck' });
      expect(pileDef.label).toBe('deck');
    });

    it('should have initialState property', () => {
      const pileDef = new PileDefinition({ labelManager });
      expect(pileDef.initialState).toBeDefined();
    });

    it('should have visibility property', () => {
      const pileDef = new PileDefinition({ labelManager });
      expect(pileDef.visibility).toBeDefined();
    });

    it('should have displayName property', () => {
      const pileDef = new PileDefinition({ labelManager });
      expect(pileDef.displayName).toBeDefined();
    });

    it('should have actionRoles property', () => {
      const pileDef = new PileDefinition({ labelManager });
      expect(pileDef.actionRoles).toBeDefined();
    });
  });

  describe('CounterDefinition', () => {
    it('should create a CounterDefinition instance', () => {
      const counterDef = new CounterDefinition({ labelManager });
      expect(counterDef).toBeDefined();
    });

    it('should have label property', () => {
      const counterDef = new CounterDefinition({ labelManager, label: 'score' });
      expect(counterDef.label).toBe('score');
    });

    it('should have number property', () => {
      const counterDef = new CounterDefinition({ labelManager });
      expect(counterDef.number).toBeDefined();
    });

    it('should have visibility property', () => {
      const counterDef = new CounterDefinition({ labelManager });
      expect(counterDef.visibility).toBeDefined();
    });

    it('should have displayName property', () => {
      const counterDef = new CounterDefinition({ labelManager });
      expect(counterDef.displayName).toBeDefined();
    });

    it('should have actionRoles property', () => {
      const counterDef = new CounterDefinition({ labelManager });
      expect(counterDef.actionRoles).toBeDefined();
    });
  });

  describe('ButtonDefinition', () => {
    it('should create a ButtonDefinition instance', () => {
      const buttonDef = new ButtonDefinition({ labelManager });
      expect(buttonDef).toBeDefined();
    });

    it('should have label property', () => {
      const buttonDef = new ButtonDefinition({ labelManager, label: 'submit' });
      expect(buttonDef.label).toBe('submit');
    });

    it('should have type property', () => {
      const buttonDef = new ButtonDefinition({ labelManager });
      expect(buttonDef.type).toBeDefined();
    });

    it('should have displayName property', () => {
      const buttonDef = new ButtonDefinition({ labelManager });
      expect(buttonDef.displayName).toBeDefined();
    });

    it('should have actionRoles property', () => {
      const buttonDef = new ButtonDefinition({ labelManager });
      expect(buttonDef.actionRoles).toBeDefined();
    });

    it('should have range property (optional)', () => {
      const buttonDef = new ButtonDefinition({ labelManager });
      // Range can be undefined if not provided
      expect(buttonDef.range === undefined || typeof buttonDef.range === 'object').toBe(true);
    });
  });

  describe('PlayerDefinition', () => {
    it('should create a PlayerDefinition instance', () => {
      const playerDef = new PlayerDefinition();
      expect(playerDef).toBeDefined();
    });

    it('should have piles array', () => {
      const playerDef = new PlayerDefinition();
      expect(Array.isArray(playerDef.piles)).toBe(true);
    });

    it('should have counters array', () => {
      const playerDef = new PlayerDefinition();
      expect(Array.isArray(playerDef.counters)).toBe(true);
    });

    // Note: PlayerDefinition only has piles and counters, not buttons

    it('should initialize with provided piles and counters', () => {
      const pileDef = new PileDefinition({ labelManager });
      const counterDef = new CounterDefinition({ labelManager });
      
      const playerDef = new PlayerDefinition([pileDef], [counterDef]);
      
      expect(playerDef.piles).toContain(pileDef);
      expect(playerDef.counters).toContain(counterDef);
    });
  });

  describe('BoardDefinition', () => {
    it('should create a BoardDefinition instance', () => {
      const boardDef = new BoardDefinition();
      expect(boardDef).toBeDefined();
    });

    it('should have piles array', () => {
      const boardDef = new BoardDefinition();
      expect(Array.isArray(boardDef.piles)).toBe(true);
    });

    it('should have counters array', () => {
      const boardDef = new BoardDefinition();
      expect(Array.isArray(boardDef.counters)).toBe(true);
    });

    it('should have buttons array', () => {
      const boardDef = new BoardDefinition();
      expect(Array.isArray(boardDef.buttons)).toBe(true);
    });

    it('should start with empty arrays', () => {
      const boardDef = new BoardDefinition();
      expect(boardDef.piles.length).toBe(0);
      expect(boardDef.counters.length).toBe(0);
      expect(boardDef.buttons.length).toBe(0);
    });
  });
});
