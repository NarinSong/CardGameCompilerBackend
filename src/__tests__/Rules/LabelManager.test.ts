import LabelManager from '../../Rules/LabelManager';
import PileDefinition from '../../Rules/PileDefinition';
import CounterDefinition from '../../Rules/CounterDefinition';
import GamePhaseDefinition from '../../Rules/GamePhaseDefinition';
import StepDefinition from '../../Rules/StepDefinition';

describe('LabelManager', () => {
  let labelManager: LabelManager;

  beforeEach(() => {
    labelManager = new LabelManager();
  });

  describe('constructor', () => {
    it('should create a LabelManager instance', () => {
      expect(labelManager).toBeDefined();
      expect(labelManager['labels']).toEqual({});
      expect(labelManager['stepLabels']).toEqual({});
      expect(labelManager['phaseLabels']).toEqual({});
    });
  });

  describe('nextId', () => {
    it('should generate incrementing IDs', () => {
      const id1 = labelManager['nextId'];
      const id2 = labelManager['nextId'];
      
      expect(Number(id2)).toBeGreaterThan(Number(id1));
    });

    it('should return string IDs', () => {
      const id = labelManager['nextId'];
      expect(typeof id).toBe('string');
    });
  });

  describe('createLabel', () => {
    it('should create a label for a game object', () => {
      const pileDefinition = new PileDefinition({ labelManager });
      const label = labelManager.createLabel(pileDefinition);
      
      expect(label).toBeDefined();
      expect(typeof label).toBe('string');
    });

    it('should use custom name if provided', () => {
      const pileDefinition = new PileDefinition({ labelManager });
      const customLabel = 'myPile';
      const label = labelManager.createLabel(pileDefinition, customLabel);
      
      expect(label).toBe(customLabel);
    });

    it('should generate auto label if custom name already exists', () => {
      const pile1 = new PileDefinition({ labelManager });
      const pile2 = new PileDefinition({ labelManager });
      
      labelManager.createLabel(pile1, 'sameName');
      const label2 = labelManager.createLabel(pile2, 'sameName');
      
      expect(label2).not.toBe('sameName');
    });

    it('should store the object under the label', () => {
      const pileDefinition = new PileDefinition({ labelManager });
      const label = labelManager.createLabel(pileDefinition, 'testPile');
      
      expect(labelManager.getFromLabel(label)).toBe(pileDefinition);
    });
  });

  describe('createPhaseLabel', () => {
    it('should create a label for a game phase', () => {
      const phase = new GamePhaseDefinition(labelManager);
      const label = labelManager.createPhaseLabel(phase);
      
      expect(label).toBeDefined();
      expect(labelManager.getPhaseFromLabel(label)).toBe(phase);
    });

    it('should use custom name if provided', () => {
      const phase = new GamePhaseDefinition(labelManager);
      const customLabel = 'setup';
      const label = labelManager.createPhaseLabel(phase, customLabel);
      
      expect(label).toBe(customLabel);
    });
  });

  describe('createStepLabel', () => {
    it('should create a label for a game step', () => {
      const step = new StepDefinition(labelManager);
      const label = labelManager.createStepLabel(step);
      
      expect(label).toBeDefined();
      expect(labelManager.getStepFromLabel(label)).toBe(step);
    });

    it('should use custom name if provided', () => {
      const step = new StepDefinition(labelManager);
      const customLabel = 'drawPhase';
      const label = labelManager.createStepLabel(step, customLabel);
      
      expect(label).toBe(customLabel);
    });
  });

  describe('getFromLabel', () => {
    it('should return the object for a valid label', () => {
      const pileDefinition = new PileDefinition({ labelManager });
      const label = labelManager.createLabel(pileDefinition, 'deck');
      
      expect(labelManager.getFromLabel(label)).toBe(pileDefinition);
    });

    it('should return undefined for non-existent label', () => {
      expect(labelManager.getFromLabel('nonexistent')).toBeUndefined();
    });
  });

  describe('getPhaseFromLabel', () => {
    it('should return the phase for a valid label', () => {
      const phase = new GamePhaseDefinition(labelManager);
      const label = labelManager.createPhaseLabel(phase, 'setupPhase');
      
      expect(labelManager.getPhaseFromLabel(label)).toBe(phase);
    });

    it('should return undefined for non-existent phase label', () => {
      expect(labelManager.getPhaseFromLabel('nonexistent')).toBeUndefined();
    });
  });

  describe('getStepFromLabel', () => {
    it('should return the step for a valid label', () => {
      const step = new StepDefinition(labelManager);
      const label = labelManager.createStepLabel(step, 'drawStep');
      
      expect(labelManager.getStepFromLabel(label)).toBe(step);
    });

    it('should return undefined for non-existent step label', () => {
      expect(labelManager.getStepFromLabel('nonexistent')).toBeUndefined();
    });
  });

  describe('multiple labels', () => {
    it('should manage multiple object labels independently', () => {
      const pile1 = new PileDefinition({ labelManager });
      const pile2 = new PileDefinition({ labelManager });
      
      const label1 = labelManager.createLabel(pile1, 'hand');
      const label2 = labelManager.createLabel(pile2, 'deck');
      
      expect(labelManager.getFromLabel(label1)).toBe(pile1);
      expect(labelManager.getFromLabel(label2)).toBe(pile2);
      expect(labelManager.getFromLabel(label1)).not.toBe(pile2);
    });

    it('should manage phases and steps separately', () => {
      const phase = new GamePhaseDefinition(labelManager);
      const step = new StepDefinition(labelManager);
      
      const phaseLabel = labelManager.createPhaseLabel(phase, 'phase1');
      const stepLabel = labelManager.createStepLabel(step, 'step1');
      
      expect(labelManager.getPhaseFromLabel(phaseLabel)).toBe(phase);
      expect(labelManager.getStepFromLabel(stepLabel)).toBe(step);
    });
  });
});
