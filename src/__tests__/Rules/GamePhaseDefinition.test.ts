import GamePhaseDefinition from '../../Rules/GamePhaseDefinition';
import StepDefinition from '../../Rules/StepDefinition';
import LabelManager from '../../Rules/LabelManager';

describe('GamePhaseDefinition', () => {
  let labelManager: LabelManager;

  beforeEach(() => {
    labelManager = new LabelManager();
  });

  describe('constructor', () => {
    it('should create a GamePhaseDefinition instance', () => {
      const phase = new GamePhaseDefinition(labelManager);
      expect(phase).toBeDefined();
    });

    it('should assign a label', () => {
      const phase = new GamePhaseDefinition(labelManager);
      expect(phase.label).toBeDefined();
    });

    it('should initialize with a name', () => {
      const phase = new GamePhaseDefinition(labelManager, 'setupPhase');
      expect(phase).toBeDefined();
    });

    it('should initialize with empty steps', () => {
      const phase = new GamePhaseDefinition(labelManager);
      expect(Array.isArray(phase.steps)).toBe(true);
      expect(phase.steps.length).toBe(0);
    });

    it('should initialize with provided steps', () => {
      const step1 = new StepDefinition(labelManager);
      const step2 = new StepDefinition(labelManager);
      
      const phase = new GamePhaseDefinition(labelManager, undefined, [step1, step2]);
      expect(phase.steps.length).toBe(2);
      expect(phase.steps).toContain(step1);
      expect(phase.steps).toContain(step2);
    });
  });

  describe('addStep', () => {
    it('should add a step to the phase', () => {
      const phase = new GamePhaseDefinition(labelManager);
      const step = new StepDefinition(labelManager);
      
      phase.addStep(step);
      
      expect(phase.steps).toContain(step);
    });

    it('should maintain order when adding multiple steps', () => {
      const phase = new GamePhaseDefinition(labelManager);
      const step1 = new StepDefinition(labelManager);
      const step2 = new StepDefinition(labelManager);
      const step3 = new StepDefinition(labelManager);
      
      phase.addStep(step1);
      phase.addStep(step2);
      phase.addStep(step3);
      
      expect(phase.steps[0]).toBe(step1);
      expect(phase.steps[1]).toBe(step2);
      expect(phase.steps[2]).toBe(step3);
    });
  });

  describe('steps property', () => {
    it('should allow access to steps', () => {
      const phase = new GamePhaseDefinition(labelManager);
      const step = new StepDefinition(labelManager);
      phase.addStep(step);
      
      expect(phase.steps[0]).toBe(step);
    });
  });
});

describe('StepDefinition', () => {
  let labelManager: LabelManager;

  beforeEach(() => {
    labelManager = new LabelManager();
  });

  describe('constructor', () => {
    it('should create a StepDefinition instance', () => {
      const step = new StepDefinition(labelManager);
      expect(step).toBeDefined();
    });

    it('should assign a label', () => {
      const step = new StepDefinition(labelManager);
      expect(step.label).toBeDefined();
    });

    it('should initialize with a name', () => {
      const step = new StepDefinition(labelManager, 'drawStep');
      expect(step).toBeDefined();
    });

    it('should initialize with empty actions', () => {
      const step = new StepDefinition(labelManager);
      expect(Array.isArray(step.actions)).toBe(true);
      expect(step.actions.length).toBe(0);
    });
  });

  describe('label property', () => {
    it('should have a unique label for each step', () => {
      const step1 = new StepDefinition(labelManager);
      const step2 = new StepDefinition(labelManager);
      
      expect(step1.label).not.toBe(step2.label);
    });
  });

  describe('actions property', () => {
    it('should initialize with empty actions array', () => {
      const step = new StepDefinition(labelManager);
      expect(step.actions).toEqual([]);
    });

    it('should allow actions to be added', () => {
      const step = new StepDefinition(labelManager);
      const mockAction = { /* action object */ };
      
      step.actions.push(mockAction as any);
      
      expect(step.actions).toContain(mockAction);
    });
  });
});
