import GamePhaseDefinition from "../Rules/GamePhaseDefinition.js";
import LabelManager, { Label, StepLabel } from "../Rules/LabelManager.js";
import StepDefinition from "../Rules/StepDefinition.js";
import Button from "./Button.js";
import Counter from "./Counter.js";
import Pile from "./Pile.js";

/**
 * Runtime game objects that can be referenced by a label.
 */
export type GamePiece = Pile | Counter | Button;

/**
 * Manages labels for objects, phases, and steps in the game.
 * 
 * GameLabels stores the label mappings used to look up piles, counters, phases, and steps during gameplay.
 */
export default class GameLabels {
    gameObjectLabels: Record<Label, GamePiece>;
    gamePhaseLabels: Record<Label, GamePhaseDefinition>;
    gameStepLabels: Record<Label, StepDefinition>;
    #nextId: number;

    /**
     * Creates a new GameLabels instance.
     * @param definition - The label manager used to initialize phase and step labels.
     */
    constructor(definition: LabelManager) {
        this.gameObjectLabels = {}; // Will be initialized as we go with the piles and counters
        this.gamePhaseLabels = definition.phaseLabels; // TODO: deep clone
        this.gameStepLabels = definition.stepLabels; // TODO: deep clone
        this.#nextId = +definition.nextId;
    }

    /**
     * Stores a pile and its label.
     * @param pile - The pile object.
     * @param label - The label of the pile.
     */
    registerPile(pile: Pile, label: Label) {
        this.gameObjectLabels[label] = pile;
    }

    /**
     * Stores a counter and its label.
     * @param counter - The counter object.
     * @param label - The label of the counter.
     */
    registerCounter(counter: Counter, label: Label) {
        this.gameObjectLabels[label] = counter;
    }

    registerButton(button: Button, label: Label) {
        this.gameObjectLabels[label] = button;
    }

    /**
     * Removes a registered game object label.
     * @param label - The label to remove.
     */
    unregister(label: Label) {
        delete this.gameObjectLabels[label];
    }

    /**
     * Returns the game object associated with a label.
     * @param label - Label of the object.
     * @returns The game object associated with the label.
     */
    getFromLabel(label: Label) {
        return this.gameObjectLabels[label];
    }

    /**
     * Returns the step associated with a label.
     * @param label - Label of the step.
     * @returns The step associated with the label.
     */
    getStepFromLabel(label: StepLabel) {
        return this.gameStepLabels[label];
    }

    /**
     * Generates the next unique label identifier.
     */
    get nextId() {
        return '' + (++this.#nextId);
    }

    // TODO: get by label
}