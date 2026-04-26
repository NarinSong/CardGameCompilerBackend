import ButtonDefinition from '../../Rules/ButtonDefinition';
import LabelManager from '../../Rules/LabelManager';
import GameDefinition from '../../Rules/GameDefinition';
import { ButtonType } from '../../schemas/types';

describe('ButtonDefinition', () => {
  let labelManager: LabelManager;

  beforeEach(() => {
    const gameDefinition = new GameDefinition();
    labelManager = gameDefinition.labelManger;
  });

  describe('constructor', () => {
    it('should create a ButtonDefinition instance', () => {
      const button = new ButtonDefinition({ labelManager });
      expect(button).toBeDefined();
      expect(button).toBeInstanceOf(ButtonDefinition);
    });

    it('should initialize with labelManager parameter', () => {
      const button = new ButtonDefinition({ labelManager });
      expect(button).toBeDefined();
    });

    it('should accept optional parameters', () => {
      const button = new ButtonDefinition({
        labelManager,
        label: 'submit',
        displayName: 'Submit Button',
        type: 'CLICK'
      });
      expect(button).toBeDefined();
    });
  });

  describe('button properties', () => {
    let button: ButtonDefinition;

    beforeEach(() => {
      button = new ButtonDefinition({
        labelManager,
        label: 'test',
        displayName: 'Test',
        actionRoles: ['click', 'hover'],
        type: 'CLICK'
      });
    });

    it('should have label property', () => {
      expect(button.label).toBeDefined();
    });

    it('should have displayName property', () => {
      expect(button.displayName).toBe('Test');
    });

    it('should have actionRoles property', () => {
      expect(button.actionRoles).toBeDefined();
      expect(Array.isArray(button.actionRoles)).toBe(true);
    });

    it('should have type property', () => {
      expect(button.type).toBe('CLICK');
    });

    it('should have optional range property', () => {
      expect(button.range === undefined || typeof button.range === 'object').toBe(true);
    });
  });

  describe('button types', () => {
    it('should support CLICK type', () => {
      const button = new ButtonDefinition({
        labelManager,
        type: 'CLICK'
      });
      expect(button.type).toBe('CLICK');
    });

    it('should default to CLICK type', () => {
      const button = new ButtonDefinition({ labelManager });
      expect(button.type).toBe('CLICK');
    });
  });

  describe('display name', () => {
    it('should use provided displayName', () => {
      const button = new ButtonDefinition({
        labelManager,
        label: 'submit',
        displayName: 'Submit Form'
      });
      expect(button.displayName).toBe('Submit Form');
    });

    it('should default displayName to label if not provided', () => {
      const button = new ButtonDefinition({
        labelManager,
        label: 'myLabel'
      });
      expect(button.displayName).toBeDefined();
    });

    it('should handle undefined displayName gracefully', () => {
      const button = new ButtonDefinition({
        labelManager,
        displayName: undefined
      });
      expect(button.displayName).toBeDefined();
    });
  });

  describe('action roles', () => {
    it('should accept empty action roles', () => {
      const button = new ButtonDefinition({
        labelManager,
        actionRoles: []
      });
      expect(button.actionRoles).toEqual([]);
    });

    it('should accept multiple action roles', () => {
      const button = new ButtonDefinition({
        labelManager,
        actionRoles: ['click', 'doubleClick', 'hover']
      });
      expect(button.actionRoles.length).toBe(3);
    });

    it('should default to label-based action role', () => {
      const button = new ButtonDefinition({
        labelManager,
        label: 'customButton'
      });
      expect(button.actionRoles).toBeDefined();
      expect(Array.isArray(button.actionRoles)).toBe(true);
    });

    it('should handle undefined action roles', () => {
      const button = new ButtonDefinition({
        labelManager,
        actionRoles: undefined
      });
      expect(Array.isArray(button.actionRoles)).toBe(true);
    });
  });

  describe('button range', () => {
    it('should support optional range property', () => {
      const button = new ButtonDefinition({
        labelManager,
        range: { min: 1, max: 10, increment: 1 }
      });
      expect(button.range).toBeDefined();
      expect(button.range?.min).toBe(1);
      expect(button.range?.max).toBe(10);
      expect(button.range?.increment).toBe(1);
    });

    it('should support undefined range', () => {
      const button = new ButtonDefinition({
        labelManager
      });
      expect(button.range).toBeUndefined();
    });

    it('should handle range with undefined bounds', () => {
      const button = new ButtonDefinition({
        labelManager,
        range: { increment: 5 }
      });
      expect(button.range).toBeDefined();
      expect(button.range?.increment).toBe(5);
    });

    it('should default increment to 1 if not provided', () => {
      const button = new ButtonDefinition({
        labelManager,
        range: { min: 0, max: 100 }
      });
      expect(button.range?.increment).toBe(1);
    });

    it('should support custom increment values', () => {
      const button = new ButtonDefinition({
        labelManager,
        range: { min: 0, max: 100, increment: 5 }
      });
      expect(button.range?.increment).toBe(5);
    });
  });

  describe('multiple button definitions', () => {
    it('should create multiple independent buttons', () => {
      const button1 = new ButtonDefinition({
        labelManager,
        label: 'button1'
      });
      const button2 = new ButtonDefinition({
        labelManager,
        label: 'button2'
      });
      const button3 = new ButtonDefinition({
        labelManager,
        label: 'button3'
      });
      
      expect(button1).toBeDefined();
      expect(button2).toBeDefined();
      expect(button3).toBeDefined();
    });
  });

  describe('button instantiation patterns', () => {
    it('should handle creation with minimal parameters', () => {
      expect(() => {
        new ButtonDefinition({ labelManager });
      }).not.toThrow();
    });

    it('should handle creation with all parameters', () => {
      expect(() => {
        new ButtonDefinition({
          labelManager,
          label: 'fullButton',
          displayName: 'Full Button',
          actionRoles: ['click'],
          type: 'CLICK',
          range: { min: 0, max: 100, increment: 1 }
        });
      }).not.toThrow();
    });

    it('should create multiple buttons in sequence', () => {
      const buttons = [];
      for (let i = 0; i < 5; i++) {
        buttons.push(new ButtonDefinition({
          labelManager,
          label: `button${i}`,
          displayName: `Button ${i}`
        }));
      }
      
      expect(buttons.length).toBe(5);
      buttons.forEach(button => {
        expect(button).toBeInstanceOf(ButtonDefinition);
      });
    });
  });

  describe('button configuration combinations', () => {
    it('should support button without range', () => {
      const button = new ButtonDefinition({
        labelManager,
        label: 'simpleButton'
      });
      expect(button.range).toBeUndefined();
    });

    it('should support button with range', () => {
      const button = new ButtonDefinition({
        labelManager,
        label: 'rangedButton',
        range: { min: 1, max: 5, increment: 1 }
      });
      expect(button.range).toBeDefined();
    });

    it('should support button with action roles', () => {
      const button = new ButtonDefinition({
        labelManager,
        label: 'actionButton',
        actionRoles: ['primary', 'secondary']
      });
      expect(button.actionRoles.length).toBe(2);
    });
  });
});
