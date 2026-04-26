import StepDefinition from '../../Rules/StepDefinition';
import LabelManager from '../../Rules/LabelManager';
import GameDefinition from '../../Rules/GameDefinition';
import Action from '../../Rules/ActionDefinition';

describe('StepDefinition', () => {
  let labelManager: LabelManager;
  let stepDefinition: StepDefinition;

  beforeEach(() => {
    const gameDefinition = new GameDefinition();
    labelManager = gameDefinition.labelManger;
    stepDefinition = new StepDefinition(labelManager);
  });

  describe('constructor', () => {
    it('should create a StepDefinition instance', () => {
      expect(stepDefinition).toBeDefined();
      expect(stepDefinition).toBeInstanceOf(StepDefinition);
    });

    it('should initialize actions array', () => {
      expect(stepDefinition.actions).toBeDefined();
      expect(Array.isArray(stepDefinition.actions)).toBe(true);
    });

    it('should initialize with empty actions array', () => {
      expect(stepDefinition.actions.length).toBe(0);
    });

    it('should accept optional name parameter', () => {
      const namedStep = new StepDefinition(labelManager, 'Draw Phase');
      expect(namedStep).toBeDefined();
    });

    it('should create label from LabelManager', () => {
      expect(stepDefinition.label).toBeDefined();
    });
  });

  describe('step label', () => {
    it('should have label property', () => {
      expect(stepDefinition.label).toBeDefined();
    });

    it('should create step label through LabelManager', () => {
      const step = new StepDefinition(labelManager);
      expect(step.label).toBeDefined();
    });

    it('should handle named steps', () => {
      const namedStep = new StepDefinition(labelManager, 'Begin Phase');
      expect(namedStep.label).toBeDefined();
    });

    it('should handle unnamed steps', () => {
      const unnamedStep = new StepDefinition(labelManager);
      expect(unnamedStep.label).toBeDefined();
    });
  });

  describe('actions management', () => {
    it('should have actions array property', () => {
      expect(stepDefinition.actions).toBeDefined();
      expect(Array.isArray(stepDefinition.actions)).toBe(true);
    });

    it('should start with empty actions', () => {
      expect(stepDefinition.actions.length).toBe(0);
    });

    it('should allow adding actions to the array', () => {
      expect(() => {
        stepDefinition.actions.push({} as Action);
      }).not.toThrow();
    });

    it('should maintain actions array state', () => {
      const initialLength = stepDefinition.actions.length;
      stepDefinition.actions.push({} as Action);
      expect(stepDefinition.actions.length).toBe(initialLength + 1);
    });
  });

  describe('step naming', () => {
    it('should support optional name parameter', () => {
      const step1 = new StepDefinition(labelManager);
      const step2 = new StepDefinition(labelManager, 'Step 1');
      
      expect(step1).toBeDefined();
      expect(step2).toBeDefined();
    });

    it('should handle descriptive step names', () => {
      const step = new StepDefinition(labelManager, 'Player Draw Card Step');
      expect(step).toBeDefined();
    });

    it('should handle empty string names', () => {
      const step = new StepDefinition(labelManager, '');
      expect(step).toBeDefined();
    });
  });

  describe('multiple step definitions', () => {
    it('should create multiple independent steps', () => {
      const step1 = new StepDefinition(labelManager, 'Step 1');
      const step2 = new StepDefinition(labelManager, 'Step 2');
      const step3 = new StepDefinition(labelManager, 'Step 3');
      
      expect(step1).toBeDefined();
      expect(step2).toBeDefined();
      expect(step3).toBeDefined();
    });

    it('should maintain independent action arrays', () => {
      const step1 = new StepDefinition(labelManager);
      const step2 = new StepDefinition(labelManager);
      
      step1.actions.push({} as Action);
      
      expect(step1.actions.length).toBe(1);
      expect(step2.actions.length).toBe(0);
    });
  });

  describe('step instantiation patterns', () => {
    it('should handle creation without errors', () => {
      expect(() => {
        new StepDefinition(labelManager);
      }).not.toThrow();
    });

    it('should handle named creation without errors', () => {
      expect(() => {
        new StepDefinition(labelManager, 'Test Step');
      }).not.toThrow();
    });

    it('should create steps in sequence', () => {
      const steps = [];
      for (let i = 0; i < 5; i++) {
        steps.push(new StepDefinition(labelManager, `Step ${i}`));
      }
      
      expect(steps.length).toBe(5);
      steps.forEach(step => {
        expect(step).toBeInstanceOf(StepDefinition);
      });
    });
  });

  describe('label management', () => {
    it('should work with the same LabelManager', () => {
      const step1 = new StepDefinition(labelManager, 'Step A');
      const step2 = new StepDefinition(labelManager, 'Step B');
      
      expect(step1).toBeDefined();
      expect(step2).toBeDefined();
    });

    it('should handle different LabelManager instances', () => {
      const gameDefinition2 = new GameDefinition();
      const labelManager2 = gameDefinition2.labelManger;
      
      const step1 = new StepDefinition(labelManager);
      const step2 = new StepDefinition(labelManager2);
      
      expect(step1).toBeDefined();
      expect(step2).toBeDefined();
    });
  });
});
