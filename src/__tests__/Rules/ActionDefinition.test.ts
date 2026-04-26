import Action from '../../Rules/ActionDefinition';
import { TriggerType } from '../../schemas/types';

describe('ActionDefinition (Action)', () => {
  describe('constructor', () => {
    it('should create an action with trigger, filter, and result', () => {
      const trigger = { type: TriggerType.CLICK, target: 'play' };
      const filter = { type: 'LITERAL' as const, primary: true };
      const result = { type: 'SEQUENCE' as const, primary: [] };
      
      const action = new Action(trigger, filter, result);
      
      expect(action).toBeDefined();
      expect(action.trigger).toBe(trigger);
      expect(action.filter).toBe(filter);
      expect(action.result).toBe(result);
    });

    it('should create an AUTO trigger action', () => {
      const trigger = { type: TriggerType.AUTO };
      const filter = { type: 'LITERAL' as const, primary: true };
      const result = { type: 'SEQUENCE' as const, primary: [] };
      
      const action = new Action(trigger, filter, result);
      
      expect(action.trigger.type).toBe(TriggerType.AUTO);
    });

    it('should create a CLICK trigger action', () => {
      const trigger = { type: TriggerType.CLICK, target: 'attack' };
      const filter = null;
      const result = { type: 'SEQUENCE' as const, primary: [] };
      
      const action = new Action(trigger, filter, result);
      
      expect(action.trigger.type).toBe(TriggerType.CLICK);
      expect((action.trigger as any).target).toBe('attack');
    });

    it('should set default filter (true literal) when filter is null', () => {
      const trigger = { type: TriggerType.AUTO };
      const result = { type: 'SEQUENCE' as const, primary: [] };
      
      const action = new Action(trigger, null, result);
      
      expect(action.filter.type).toBe('LITERAL');
      expect(action.filter.primary).toBe(true);
    });
  });

  describe('properties', () => {
    let action: Action;

    beforeEach(() => {
      const trigger = { type: TriggerType.CLICK, target: 'select' };
      const filter = { type: 'LITERAL' as const, primary: true };
      const result = { type: 'SEQUENCE' as const, primary: [] };
      
      action = new Action(trigger, filter, result);
    });

    it('should have trigger property', () => {
      expect(action.trigger).toBeDefined();
    });

    it('should have filter property', () => {
      expect(action.filter).toBeDefined();
    });

    it('should have result property', () => {
      expect(action.result).toBeDefined();
    });
  });

  describe('different trigger types', () => {
    it('should support AUTO trigger type', () => {
      const trigger = { type: TriggerType.AUTO };
      const action = new Action(trigger, null, { type: 'SEQUENCE' as const, primary: [] });
      
      expect(action.trigger.type).toBe(TriggerType.AUTO);
    });

    it('should support CLICK trigger type with target', () => {
      const trigger = { type: TriggerType.CLICK, target: 'draw' };
      const action = new Action(trigger, null, { type: 'SEQUENCE' as const, primary: [] });
      
      expect(action.trigger.type).toBe(TriggerType.CLICK);
    });
  });

  describe('filter scenarios', () => {
    it('should accept explicit filter', () => {
      const trigger = { type: TriggerType.AUTO };
      const filter = { type: 'LITERAL' as const, primary: false };
      const action = new Action(trigger, filter, { type: 'SEQUENCE' as const, primary: [] });
      
      expect(action.filter.primary).toBe(false);
    });

    it('should default to true when filter is null', () => {
      const trigger = { type: TriggerType.AUTO };
      const action = new Action(trigger, null, { type: 'SEQUENCE' as const, primary: [] });
      
      expect(action.filter.primary).toBe(true);
    });
  });

  describe('result scenarios', () => {
    it('should accept SEQUENCE result', () => {
      const trigger = { type: TriggerType.AUTO };
      const result = { type: 'SEQUENCE' as const, primary: [] };
      const action = new Action(trigger, null, result);
      
      expect(action.result.type).toBe('SEQUENCE');
    });

    it('should accept IF result', () => {
      const trigger = { type: TriggerType.AUTO };
      const result = { 
        type: 'IF' as const, 
        primary: { type: 'LITERAL' as const, primary: true },
        secondary: { type: 'SEQUENCE' as const, primary: [] }
      };
      const action = new Action(trigger, null, result);
      
      expect(action.result.type).toBe('IF');
    });
  });
});
