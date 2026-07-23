import Game from "../Game/Game.js";
import { Label, PhaseLabel, StepLabel } from "../Rules/LabelManager.js";
import { ButtonRange, ButtonType, CardSchema, LocationResolver, PileState, rank, suit, Visibility } from "../schemas/types.js";
import Card from "./Card.js";

// Using Zod schemas
import { ActionContext, ValueNode, AST } from "../schemas/AST.js";
import { ValueReturn, ValueTypeName, ValueTypeValues } from "../schemas/Blocks.js";
import { NODE_NAMES } from "../schemas/Constants.js";
import Pile from "../Game/Pile.js";
import Counter from "../Game/Counter.js";
import z from "zod";
// Helper functions

// Zod Schema transformers
function zn(value: unknown): number {
    return z.number().parse(value);
}
function zmn(value: unknown): number | undefined {
    return z.number().or(z.undefined()).parse(value);
}

function zs(value: unknown): string {
    return z.string().parse(value);
}

function zc(value: unknown): Card {
    return CardSchema.parse(value);
}

/**
 *  Evaluates an ARRAY value node and returns its computed array contents.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - ARRAY node to evaluate.
 * @returns The evaluated array.
 * @throws Error if the node is not an ARRAY node.
 */
function executeCreateArray(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.Array) throw new Error("Called executeCreateArray with an invalid node");

    const arr = [];

    for (let n of node.sequence) {
        arr.push(evaluate(g, c, n));
    }

    return arr;
}

/**
 * Evaluates a "BUTTON_RANGE" value node and returns the range object.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - BUTTON_RANGE node to evaluate.
 * @returns An object containing min, max, and increment values.
 * @throws Error if the node is not a BUTTON_RANGE node.
 */
function evaluateButtonRange(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.ButtonRange) throw new Error("Called evaluateButtonRange with an invalid node");

    const min = evaluate(g, c, node.primary) as number | undefined;
    const max = evaluate(g, c, node.secondary) as number | undefined;
    const increment = evaluate(g, c, node.tertiary) as number | undefined;

    return { min, max, increment };
}

/**
 * Evaluates an "IS_BETWEEN" value node and returns whether a value is between two others.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - IS_BETWEEN node to evaluate.
 * @returns True if the first value is between the second and third, else false.
 * @throws Error if the node is not an IS_BETWEEN node.
 */
function evaluateIsBetween(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.IsBetween) throw new Error("Called evaluateIsBetween with an invalid node");

    const one = evaluate(g, c, node.primary) as number;
    const two = evaluate(g, c, node.secondary) as number;
    const three = evaluate(g, c, node.tertiary) as number;

    return (one < two && one > three) || (one > two && one < three);
}


/**
 * Executes a "DEAL_CARDS" action node.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - DEAL_CARDS action node to execute.
 * @throws Error if the node is not a DEAL_CARDS node.
 */
function executeDealCards(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.DealCards) throw new Error("Called executeDealCards with an invalid node");
    
    g.gameState.dealCards(evaluate(g, c, node.primary) as Label, evaluate(g, c, node.secondary) as Label, evaluate(g, c, node.tertiary) as number);
}

/**
 * Executes a "CREATE_PILE" value node and returns the created pile label.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - CREATE_PILE node to execute.
 * @returns The label of the created pile.
 * @throws Error if the node is not a CREATE_PILE node.
 */
function executeCreatePile(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.CreatePile) throw new Error("Called executeCreatePile with an invalid node");
    
    // Note: Any of these could be "UNDEFINED" nodes, which will then be given default values
    return g.gameState.createPile({
                state: evaluate(g, c , node.state) as PileState | undefined,
                name: evaluate(g, c, node.name) as string | undefined,
                visibility: evaluate(g, c, node.visibility) as Visibility | undefined,
                actionRoles: evaluate(g, c, node.actionRoles) as string[] | undefined,
                displayName: evaluate(g, c, node.displayName) as string | undefined,
                owner: evaluate(g, c, node.owner) as number | undefined,
                location: evaluate(g, c, node.location) as LocationResolver | undefined,
            });
}

/**
 * Executes a "CREATE_BUTTON" value node and returns the created button label.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - CREATE_BUTTON node to execute.
 * @returns The label of the created button.
 * @throws Error if the node is not a CREATE_BUTTON node.
 */
function executeCreateButton(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.CreateButton) throw new Error("Called executeCreateButton with an invalid node");
    
    // Note: Any of these could be "UNDEFINED" nodes, which will then be given default values
    return g.gameState.createButton({
                name: evaluate(g, c, node.name) as string | undefined,
                visibility: evaluate(g, c, node.visibility) as Visibility | undefined,
                actionRoles: evaluate(g, c, node.actionRoles) as string[] | undefined,
                displayName: evaluate(g, c, node.displayName) as string | undefined,
                owner: evaluate(g, c, node.owner) as number | undefined,
                location: evaluate(g, c, node.location) as LocationResolver | undefined,
                type: evaluate(g, c, node.buttonType) as ButtonType | undefined,
                range: evaluate(g, c, node.range) as ButtonRange | undefined,
            });
}

/**
 * Executes a "CREATE_COUNTER" value node and returns the created counter label.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - CREATE_COUNTER node to execute.
 * @returns The label of the created counter.
 * @throws Error if the node is not a CREATE_COUNTER node.
 */
function executeCreateCounter(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.CreateCounter) throw new Error("Called executeCreateCounter with an invalid node");
    
    // Note: Any of these could be "UNDEFINED" nodes, which will then be given default values
    return g.gameState.createCounter({
                state: evaluate(g, c , node.state) as number | undefined,
                name: evaluate(g, c, node.name) as string | undefined,
                visibility: evaluate(g, c, node.visibility) as Visibility | undefined,
                actionRoles: evaluate(g, c, node.actionRoles) as string[] | undefined,
                displayName: evaluate(g, c, node.displayName) as string | undefined,
                owner: evaluate(g, c, node.owner) as number | undefined,
                location: evaluate(g, c, node.location) as LocationResolver | undefined,
            });
}

/**
 * Executes a "REMOVE_PILE" action node.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - REMOVE_PILE action node to execute.
 * @throws Error if the node is not a REMOVE_PILE node.
 */
function executeRemovePile(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.RemovePile) throw new Error("Called executeRemovePile with an invalid node");

    g.gameState.removePileByLabel(
        evaluate(g, c, node.pile) as Label,
        evaluate(g, c, node.sendTo) as Label | undefined
    )
}

/**
 * Executes a "REMOVE_BUTTON" action node.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - REMOVE_BUTTON action node to execute.
 * @throws Error if the node is not a REMOVE_BUTTON node.
 */
function executeRemoveButton(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.RemoveButton) throw new Error("Called executeRemoveButton with an invalid node");

    g.gameState.removeButtonByLabel(
        evaluate(g, c, node.primary) as Label,
    )
}

/**
 * Executes a "REMOVE_COUNTER" action node.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - REMOVE_COUNTER action node to execute.
 * @throws Error if the node is not a REMOVE_COUNTER node.
 */
function executeRemoveCounter(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.RemoveCounter) throw new Error("Called executeRemoveCounter with an invalid node");

    g.gameState.removeCounterByLabel(
        evaluate(g, c, node.primary) as Label,
        evaluate(g, c, node.secondary) as Label | undefined
    )
}

/**
 * Executes a "SHUFFLE_INTO" action node.
 * Moves all cards from one pile into another and shuffles the destination pile.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - SHUFFLE_INTO node to execute.
 * @returns The label of the destination pile.
 * @throws Error if the node is not a SHUFFLE_INTO node.
 */
function executeShuffleInto(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.ShuffleInto) throw new Error("Called executeShuffleInto with an invalid node");

    const fromPileLabel = zs(evaluate(g, c, node.primary));
    const toPileLabel = zs(evaluate(g, c, node.secondary));

    g.gameState.dealCards(fromPileLabel, toPileLabel, 1000000);
    g.gameState.shuffle(toPileLabel);

    return toPileLabel;
}

/**
 * Executes a "MOVE_COUNTER_VALUE" action node.
 * Moves a numeric amount from one counter to another.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - MOVE_COUNTER_VALUE node to execute.
 * @throws Error if the node is not a MOVE_COUNTER_VALUE node.
 */
function executeMoveCounterValue(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.MoveCounterValue) throw new Error("Called executeMoveCounterValue with an invalid node");

    const fromCounterLabel = zs(evaluate(g, c, node.primary)) as Label;
    const toCounterLabel = zs(evaluate(g, c, node.secondary)) as Label;
    const amount = zmn(evaluate(g, c, node.tertiary));

    const move = amount ?? 1;

    const fromCounter = g.gameState.counters[fromCounterLabel];
    const toCounter = g.gameState.counters[toCounterLabel];

    if (!fromCounter || !toCounter) return;

    fromCounter.counter.value -= move;
    toCounter.counter.value += move;
}

/**
 * Executes a "SET_COUNTER_VALUE" action node.
 * Sets the value of a counter to a given number.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - SET_COUNTER_VALUE node to execute.
 * @returns The label of the updated counter.
 * @throws Error if the node is not a SET_COUNTER_VALUE node.
 */
function executeSetCounterValue(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.SetCounterValue) throw new Error("Called executeSetCounterValue with an invalid node");

    const counterLabel = zs(evaluate(g, c, node.primary)) as Label;
    const counter = g.gameState.counters[counterLabel];
    
    if (counter) {
        counter.counter.value = (zn(evaluate(g, c, node.secondary)));
    }

    return counterLabel;
}

/**
 * Executes a "SET_RANGE" action node.
 * Sets the range of a button.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - SET_RANGE node to execute.
 * @returns The label of the updated button.
 * @throws Error if the node is not a SET_RANGE node.
 */
function executeSetRange(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.SetRange) throw new Error("Called executeSetRange with an invalid node");

    const buttonLabel = zs(evaluate(g, c, node.primary)) as Label;
    const button = g.gameState.buttons[buttonLabel];
    
    if (button) {
        button.button.range = (evaluate(g, c, node.secondary) as ButtonRange);
    }

    return buttonLabel;
}

/**
 * Executes a "SET_COUNTER_VISIBILITY" action node.
 * Sets the visibility of a counter.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - SET_COUNTER_VISIBILITY node to execute.
 * @returns The label of the updated counter.
 * @throws Error if the node is not a SET_COUNTER_VISIBILITY node.
 */
function executeSetCounterVisibility(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.SetCounterVisibility) throw new Error("Called executeSetCounterVisibility with an invalid node");

    const counterLabel = zs(evaluate(g, c, node.primary)) as Label;
    const counter = g.gameState.counters[counterLabel];
    
    if (counter) {
        counter.counter.visibility = (evaluate(g, c, node.secondary) as Visibility);
    }

    return counterLabel;
}

/**
 * Executes a "SET_BUTTON_VISIBILITY" action node.
 * Sets the visibility of a button.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - SET_BUTTON_VISIBILITY node to execute.
 * @returns The label of the updated button.
 * @throws Error if the node is not a SET_BUTTON_VISIBILITY node.
 */
function executeSetButtonVisibility(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.SetButtonVisisibility) throw new Error("Called executeSetButtonVisibility with an invalid node");

    const buttonLabel = zs(evaluate(g, c, node.primary)) as Label;
    const button = g.gameState.buttons[buttonLabel];
    
    if (button) {
        button.button.visibility = (evaluate(g, c, node.secondary) as Visibility);
    }

    return buttonLabel;
}

/**
 * Executes a "SET_PILE_VISIBILITY" action node.
 * Sets the visibility of a pile.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - SET_PILE_VISIBILITY node to execute.
 * @returns The label of the updated pile.
 * @throws Error if the node is not a SET_PILE_VISIBILITY node.
 */
function executeSetPileVisibility(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.SetPileVisibility) throw new Error("Called executeSetPileVisibility with an invalid node");

    const pileLabel = zs(evaluate(g, c, node.primary)) as Label;
    const pile = g.gameState.piles[pileLabel];
    
    if (pile) {
        pile.pile.visibility = (evaluate(g, c, node.secondary) as Visibility);
    }

    return pileLabel;
}

/**
 *  Executes a "GET_ID_FROM_ROLE" action node.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - GET_ID_FROM_ROLE action node to execute.
 * @throws Error if the node is not a GET_ID_FROM_ROLE node.
 * @returns Id of first player with that role in that index.
 */
function evaluateIdFromRole(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.GetIdFromRole) throw new Error("Called evaluateIdFromRole with an invalid node");

    return g.gameState.roles[ zs(evaluate(g, c, node.role)) ]?.at( zmn(evaluate(g, c, node.index)) ?? 0 );
}

/**
 * Executes a "PILE_OF" action node.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - PILE_OF action node to execute.
 * @throws Error if the node is not a PILE_OF node.
 * @returns The label of the matching pile, or null if none is found.
 */
function evaluatePileOf(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.PileOf) throw new Error("Called evaluatePileOf with an invalid node");

    const playerId = zn(evaluate(g, c, node.id));
    const actionRole = zs(evaluate(g, c, node.actionRole));

    for (let p in g.gameState.piles) {
        const pile = g.gameState.piles[p];
        if (pile?.owner === playerId
            && pile.pile.actionRoles.includes(actionRole)
        ) return p;
    }

    return null;
}

/**
 * Evaluates a "COUNTER_OF" value node.
 * Finds the label of a counter owned by a player with a given action role.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - COUNTER_OF node to evaluate.
 * @returns The label of the matching counter, or null if none is found.
 * @throws Error if the node is not a COUNTER_OF node.
 */
function evaluateCounterOf(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.CounterOf) throw new Error("Called evaluateCounterOf with an invalid node");

    const playerId = zn(evaluate(g, c, node.primary));
    const actionRole = zs(evaluate(g, c, node.secondary));

    for (let p in g.gameState.counters) {
        const counter = g.gameState.counters[p];
        if (counter?.owner === playerId
            && counter.counter.actionRoles.includes(actionRole)
        ) return p;
    }

    return null;
}

/**
 * Evaluates a "BUTTON_OF" value node.
 * Finds the label of a button owned by a player with a given action role.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - BUTTON_OF node to evaluate.
 * @returns The label of the matching button, or null if none is found.
 * @throws Error if the node is not a BUTTON_OF node.
 */

function evaluateButtonOf(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.ButtonOf) throw new Error("Called evaluateButtonOf with an invalid node");

    const playerId = zn(evaluate(g, c, node.primary));
    const actionRole = zs(evaluate(g, c, node.secondary));

    for (let p in g.gameState.buttons) {
        const button = g.gameState.buttons[p];
        if (button?.owner === playerId
            && button.button.actionRoles.includes(actionRole)
        ) return p;
    }

    return null;
}

/**
 * Executes a "HAS_ROLE" action node.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - HAS_ROLE action node to execute.
 * @throws Error if the node is not a HAS_ROLE node.
 * @returns True if user has a certain role, else false.
 */
function evaluateIdHasRole(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.HasRole) throw new Error("Called evaluateIdHasRole with an invalid node");

    const role = zs(evaluate(g, c, node.role));
    const playerId = zn(evaluate(g, c, node.id));

    return g.gameState.roles[role]?.includes(playerId) ?? false;
}

/**
 * Executes a "ASSIGN_ROLE" action node.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - ASSIGN_ROLE action node to execute.
 * @throws Error if the node is not a ASSIGN_ROLE node.
 * @returns True if the player was successfully added to the role, false if the role doesn't exist or the player already has it.
 */
function evaluateAssignRole(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.AssignRole) throw new Error("Called evaluateAssignRole with an invalid node");

    const role = zs(evaluate(g, c, node.role));
    const playerId = zn(evaluate(g, c, node.id));

    if (g.gameState.roles[role] && !g.gameState.roles[role].includes(playerId)) {
        g.gameState.roles[role].push(playerId);
        return true;
    }

    return false;
}

/**
 * Executes a "UNASSIGN_ROLE" action node.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - UNASSIGN_ROLE action node to execute.
 * @throws Error if the node is not a UNASSIGN_ROLE node.
 * @returns true if unassigning the role was successful, else false.
 */
function evaluateUnassignRole(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.UnassignRole) throw new Error("Called evaluateUnassignRole with an invalid node");

    const role = zs(evaluate(g, c, node.role));
    const playerId = zn(evaluate(g, c, node.id));

    if (g.gameState.roles[role]) {
        const idx = g.gameState.roles[role].indexOf(playerId);
        if (idx == -1) return false;

        delete g.gameState.roles[role][idx];
        return true;
    }

    return false;
}

/**
 * Executes a "ASSIGN_ROLE_SINGULAR" action node.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - ASSIGN_ROLE_SINGULAR action node to execute.
 * @throws Error if the node is not a ASSIGN_ROLE_SINGULAR node.
 * @returns True if successfully assigned, false if the role doesn't exist or the player already holds it.
 */
function evaluateAssignRoleSingular(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.AssignRoleSingular) throw new Error("Called evaluateAssignRoleSingular with an invalid node");

    const role = zs(evaluate(g, c, node.role));
    const playerId = zn(evaluate(g, c, node.id));

    if (g.gameState.roles[role] && !g.gameState.roles[role].includes(playerId)) {
        g.gameState.roles[role] = [playerId];
        return true;
    }

    return false;
}

/**
 * Evaluates a "NEXT_PLAYER" value node.
 * Advances the role to the next player in turn order and returns their id.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - NEXT_PLAYER node to evaluate.
 * @returns The id of the next player.
 * @throws Error if the node is not a NEXT_PLAYER node.
 */
function evaluateNextPlayer(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.NextPlayer) throw new Error("Called evaluateNextPlayer with invalid node");

    const playerCount = Object.keys(g.gameState.players).length;

    const role = zs(evaluate(g, c, node.primary));

    const currentPlayer = g.gameState.roles[role];

    let pn = currentPlayer ? currentPlayer[0] : undefined;


    // Default to first player
    if (typeof pn === 'undefined') pn = evaluateFirstPlayer(g, c, { type: NODE_NAMES.FirstPlayer } );

    // Assign next player the role
    const newPlayer = (pn + 1) % playerCount;
    g.gameState.roles[role] = [newPlayer];

    return newPlayer;
}

/**
 * Evaluates a "FIRST_PLAYER" value node.
 * Returns the id of the first player.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - FIRST_PLAYER node to evaluate.
 * @returns The id of the first player (always 0).
 * @throws Error if the node is not a FIRST_PLAYER node.
 */
function evaluateFirstPlayer(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.FirstPlayer) throw new Error("Called evaluateFirstPlayer with invalid node");

    return 0; // First player's id is always 0. TODO: allow gameMeta to change how this works
}

/*
function evaluateSmallerThan(g: Game, c: ActionContext, node: ValueNode): boolean {

    let first = evaluate(g, c, node.primary);
    let second = evaluate(g, c, node.secondary);

    const map = g.definition.gameMeta.maps['CARD_RANK_MAP'];
    if (!map) return false;

    let firstVal = map.get(first);
    let secondVal = map.get(second);

    return firstVal < secondVal;
}
*/

/**
 * Evaluates a "PILE_SET" value node.
 * Returns the size of the largest set of matching cards in a pile.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - PILE_SET node to evaluate.
 * @returns The size of the largest matching set found.
 * @throws Error if the node is not a PILE_SET node.
 */
function evaluatePileSet(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.PileSet) throw new Error("Called evaluatePileSet with invalid node");

    const pileLabel = evaluate(g, c, node.primary) as string;
    const rank = evaluate(g, c, node.secondary) as rank | undefined;
    const suit = evaluate(g, c, node.tertiary) as suit | undefined;

    const pile = g.gameLabels.getFromLabel(pileLabel) as Pile | undefined;
    if (!pile) return 0;

    if (rank && suit)
        return Card.numOfCard(pile.cards, rank, suit);

    if (rank)
        return Card.numOfRank(pile.cards, rank);
    
    return Card.largestSet(pile.cards, suit);
}

/**
 * Evaluates a "PILE_SET_OF_RANK" value node.
 * Returns whether a pile contains at least a given number of matching cards.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - PILE_SET_OF_RANK node to evaluate.
 * @returns True if the pile contains enough matching cards, else false.
 * @throws Error if the node is not a PILE_SET_OF_RANK node.
 */
function evaluatePileSetOfRank(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.PileSetOfRank) throw new Error("Called evaluatePileSetOfRank with invalid node");

    const pileLabel = evaluate(g, c, node.primary) as string;
    const number = (evaluate(g, c, node.secondary) ?? 1) as number;
    const rank = evaluate(g, c, node.tertiary) as rank | undefined;
    const suit = evaluate(g, c, node.fourth) as suit | undefined;

    const pile = g.gameLabels.getFromLabel(pileLabel) as Pile | undefined;
    if (!pile) return false;

    if (rank && suit)
        return Card.numOfCard(pile.cards, rank, suit) >= number;

    if (rank)
        return Card.numOfRank(pile.cards, rank) >= number;
    
    return Card.largestSet(pile.cards, suit) >= number;

}

/**
 * Evaluates a "PILE_FLUSH" value node.
 * Returns the size of the largest flush of matching cards in a pile.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - PILE_FLUSH node to evaluate.
 * @returns The size of the largest matching flush found.
 * @throws Error if the node is not a PILE_FLUSH node.
 */
function evaluatePileFlush(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.PileFlush) throw new Error("Called evaluatePileFlush with invalid node");

    const pileLabel = evaluate(g, c, node.primary) as string;
    const suit = evaluate(g, c, node.secondary) as suit | undefined;
    const rank = evaluate(g, c, node.tertiary) as rank | undefined;

    const pile = g.gameLabels.getFromLabel(pileLabel) as Pile | undefined;
    if (!pile) return 0;

    if (rank && suit)
        return Card.numOfCard(pile.cards, rank, suit);

    if (suit)
        return Card.numOfSuit(pile.cards, suit);
    
    return Card.largestFlush(pile.cards, rank);
}

/**
 * Evaluates a "PILE_FLUSH_OF_SUIT" value node.
 * Returns whether a pile contains at least a given number of matching suited cards.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - PILE_FLUSH_OF_SUIT node to evaluate.
 * @returns True if the pile contains enough matching suited cards, else false.
 * @throws Error if the node is not a PILE_FLUSH_OF_SUIT node.
 */
function evaluatePileFlushOfSuit(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.PileFlushOfSuit) throw new Error("Called evaluatePileFlushOfSuit with invalid node");

    const pileLabel = evaluate(g, c, node.primary) as string;
    const number = (evaluate(g, c, node.secondary) ?? 1) as number;
    const suit = evaluate(g, c, node.tertiary) as suit | undefined;
    const rank = evaluate(g, c, node.fourth) as rank | undefined;

    const pile = g.gameLabels.getFromLabel(pileLabel) as Pile | undefined;
    if (!pile) return false;

    if (rank && suit)
        return Card.numOfCard(pile.cards, rank, suit) >= number;

    if (suit)
        return Card.numOfSuit(pile.cards, suit) >= number;
    
    return Card.largestFlush(pile.cards, rank) >= number;
}

/**
 * Evaluates a "PILE_RUN" value node.
 * Returns the length of the longest consecutive run of ranks in a pile.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - PILE_RUN node to evaluate.
 * @returns The length of the longest run found.
 * @throws Error if the node is not a PILE_RUN node.
 */
function evaluatePileRun(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.PileRun) throw new Error("Called evaluatePileRun with invalid node");

    const pileLabel = zs(evaluate(g, c, node.primary));
    const suit = evaluate(g, c, node.secondary) as suit | undefined;

    const pile = g.gameLabels.getFromLabel(pileLabel) as Pile | undefined;
    if (!pile) return 0;

    return Card.largestRun(pile.cards, suit);

}

/**
 * Evaluates a "PILE_RUN_FROM" value node.
 * Returns whether a pile contains a consecutive run of at least a given length including a specific rank.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - PILE_RUN_FROM node to evaluate.
 * @returns True if a long enough run including the given rank exists, else false.
 * @throws Error if the node is not a PILE_RUN_FROM node.
 */
function evaluatePileRunFrom(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.PileRunFrom) throw new Error("Called evaluatePileRunFrom with invalid node");

    const pileLabel = zs(evaluate(g, c, node.primary));
    const number = zn(evaluate(g, c, node.secondary) ?? 1);
    const rank = evaluate(g, c, node.tertiary) as rank | undefined;
    const suit = evaluate(g, c, node.fourth) as suit | undefined;

    const pile = g.gameLabels.getFromLabel(pileLabel) as Pile | undefined;
    if (!pile) return false;

    return Card.largestRunThatIncludes(pile.cards, rank, suit) >= number;
}

/**
 * Executes a "UPDATE_VARIABLE" value node.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - UPDATE_VARIABLE value node to execute.
 * @throws Error if the node is not a UPDATE_VARIABLE node.
 * @returns The value if successfully assigned.
 */
function executeUpdateVariable(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.UpdateVariable) throw new Error("Called executeUpdateVariable with invalid node");

    const name = zs(evaluate(g, c, node.name));
    const type = zs(node.variableType) as ValueTypeName;

    // TODO: Value's type can't be checked statically in the AST, so we have to check here that it matches 'type' given above

    const value = evaluate(g, c, node.value);

    g.gameState.setVariable(type, name, value)

    return value;
}

/**
 * Executes a "SET_PHASE" action node.
 * Moves the game state to the specified phase.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - SET_PHASE node to execute.
 * @throws Error if the node is not a SET_PHASE node.
 */
function executeSetPhase(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.SetPhase) throw new Error("Called executeSetPhase with invalid node");
    
    const phaseLabel: PhaseLabel = zs(evaluate(g, c, node.primary));

    g.gameState.moveToPhase(phaseLabel);
}

/**
 * Executes a "SET_STEP" action node.
 * Moves the game state to the specified step.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - SET_STEP node to execute.
 * @throws Error if the node is not a SET_STEP node.
 */
function executeSetStep(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.SetStep) throw new Error("Called executeSetStep with invalid node");
    
    const stepLabel: StepLabel = zs(evaluate(g, c, node.primary));

    g.gameState.moveToStep(stepLabel);
}

/**
 * Executes a "WIN" action node.
 * Marks a player as having won the game.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - WIN node to execute.
 * @throws Error if the node is not a WIN node.
 * @todo implement game ending logic.
 */
function executeWin(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.Win) throw new Error("Called executeWin with invalid node");

    const player = evaluate(g, c, node.primary);
    const score = evaluate(g, c, node.secondary);
    const endGame = evaluate(g, c, node.tertiary);

    // TODO: end the game
}

/**
 * Executes a "LOSE" action node.
 * Marks a player as having lost the game.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - LOSE node to execute.
 * @throws Error if the node is not a LOSE node.
 * @todo implement game ending logic.
 */
function executeLose(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.Lose) throw new Error("Called executeLose with invalid node");

    const player = evaluate(g, c, node.primary);
    const score = evaluate(g, c, node.secondary);
    const endGame = evaluate(g, c, node.tertiary);

    // TODO: end the game
}

// Note: calls to evaluate should *always* be wrapped in a try-catch :)
/**
 * Evaluates an AST node within the current game and action context.
 * 
 * Depending on the node type, this function could:
 * - return a computed value.
 * - execute a game action with side effects.
 * - return undefined for nodes that do not produce a value.
 * 
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - AST node to evaluate.
 * @returns The evaluated value or undefined if the node does not produce a value.
 * @throws errors when values aren't what they're expected to be
 */
export function evaluate(g: Game, c: ActionContext, node: AST): ValueReturn {
    switch (node.type) {
        // Literal
        case NODE_NAMES.Undefined: return undefined;
        case NODE_NAMES.Literal: return node.primary;
        case NODE_NAMES.Array: return executeCreateArray(g, c, node);
        // Boolean
        case NODE_NAMES.And: return evaluate(g, c, node.primary) && evaluate(g, c, node.secondary);
        case NODE_NAMES.Or: return evaluate(g, c, node.primary) || evaluate(g, c, node.secondary);
        case NODE_NAMES.Not: return !evaluate(g, c, node.primary);
        case NODE_NAMES.LessThan: return zn(evaluate(g, c, node.primary)) < zn(evaluate(g, c, node.secondary));
        case NODE_NAMES.GreaterThan: return zn(evaluate(g, c, node.primary)) > zn(evaluate(g, c, node.secondary));
        case NODE_NAMES.Equal: return zn(evaluate(g, c, node.primary)) == zn(evaluate(g, c, node.secondary));
        // Arithmetic
        case NODE_NAMES.Plus: return zn(evaluate(g, c, node.primary)) + zn(evaluate(g, c, node.secondary));
        case NODE_NAMES.Times: return zn(evaluate(g, c, node.primary)) * zn(evaluate(g, c, node.secondary));
        case NODE_NAMES.Minus: return zn(evaluate(g, c, node.primary)) - zn(evaluate(g, c, node.secondary));
        case NODE_NAMES.Div: return zn(evaluate(g, c, node.primary)) / zn(evaluate(g, c, node.secondary));
        // Strings
        case NODE_NAMES.StringEq: return zs(evaluate(g, c, node.primary)) == zs(evaluate(g, c, node.secondary));
        // Location
        case NODE_NAMES.Location: return { type: 'exact', location: { x: zn(evaluate(g, c, node.primary)), y: zn(evaluate(g, c, node.secondary)) } };
        case NODE_NAMES.RelativeLocation: return { type: 'relative', location: zs(evaluate(g, c, node.primary)) };
        // Button Range
        case NODE_NAMES.ButtonRange: return evaluateButtonRange(g, c, node);
        // Ternary
        case NODE_NAMES.Ternary: return evaluate(g, c, node.primary) ? evaluate(g, c, node.secondary) : evaluate(g, c, node.tertiary);
        case NODE_NAMES.IsBetween: return evaluateIsBetween(g, c, node);
        // Game Logic
        case NODE_NAMES.If: if (evaluate(g, c, node.primary)) { evaluate(g, c, node.secondary) } else if (node.tertiary) { evaluate(g, c, node.tertiary) }; return;
        case NODE_NAMES.Sequence: for (let action of node.primary) { evaluate(g, c, action); } return;
        case NODE_NAMES.While: while (evaluate(g,c,node.primary)) {evaluate(g,c,node.secondary)}; return;
        //case 'FOR_EACH': executeForEach(g, c, node); return;
        // Game Actions
        case NODE_NAMES.DealCards: executeDealCards(g, c, node); return;
        case NODE_NAMES.CreatePile: return executeCreatePile(g, c, node);
        case NODE_NAMES.CreateButton: return executeCreateButton(g, c, node);
        case NODE_NAMES.CreateCounter: return executeCreateCounter(g, c, node);
        case NODE_NAMES.RemovePile: executeRemovePile(g, c, node); return;
        case NODE_NAMES.RemoveButton: executeRemoveButton(g, c, node); return;
        case NODE_NAMES.RemoveCounter: executeRemoveCounter(g, c, node); return;
        case NODE_NAMES.ShuffleInto: return executeShuffleInto(g, c, node);
        case NODE_NAMES.MoveCounterValue: executeMoveCounterValue(g, c, node); return;
        case NODE_NAMES.SetCounterValue: return executeSetCounterValue(g, c, node);
        case NODE_NAMES.SetRange: return executeSetRange(g, c, node);
        case NODE_NAMES.SetCounterVisibility: return executeSetCounterVisibility(g, c, node);
        case NODE_NAMES.SetButtonVisisibility: return executeSetButtonVisibility(g, c, node);
        case NODE_NAMES.SetPileVisibility: return executeSetPileVisibility(g, c, node);
        // Action context
        case NODE_NAMES.ClickedLabel: return c.label;
        case NODE_NAMES.CtxCard: return c.card;
        case NODE_NAMES.CtxPlayer: return c.player;
        case NODE_NAMES.ButtonValue: return c.buttonValue;
        // Users and roles
        case NODE_NAMES.GetIdFromRole: return evaluateIdFromRole(g, c, node);
        case NODE_NAMES.PileOf: return evaluatePileOf(g, c, node);
        case NODE_NAMES.CounterOf: return evaluateCounterOf(g, c, node);
        case NODE_NAMES.ButtonOf: return evaluateButtonOf(g, c, node);
        case NODE_NAMES.HasRole: return evaluateIdHasRole(g, c, node);
        case NODE_NAMES.AssignRole: return evaluateAssignRole(g, c, node);
        case NODE_NAMES.UnassignRole: return evaluateUnassignRole(g, c, node);
        case NODE_NAMES.AssignRoleSingular: return evaluateAssignRoleSingular(g, c, node);
        case NODE_NAMES.NextPlayer: return evaluateNextPlayer(g, c, node);
        case NODE_NAMES.FirstPlayer: return evaluateFirstPlayer(g, c, node);
        // Game info extraction
        case NODE_NAMES.Rank: return zc(evaluate(g, c, node.primary)).rank;
        case NODE_NAMES.Suit: return zc(evaluate(g, c, node.primary)).suit;
        case NODE_NAMES.NumCardsInPile: return (g.gameState.piles[zs(evaluate(g, c, node.primary))])?.pile.cards.length;
        case NODE_NAMES.ValueOf: return g.gameState.counters[zs(evaluate(g, c, node.primary))]?.counter.value;
        case NODE_NAMES.CardOfPile: return (g.gameState.piles[zs(evaluate(g, c, node.primary))])?.pile.cards[zmn(evaluate(g, c, node.secondary)) ?? 0];
        // Pile Evaluation
        case NODE_NAMES.PileSet: return evaluatePileSet(g, c, node);
        case NODE_NAMES.PileSetOfRank: return evaluatePileSetOfRank(g, c, node);
        case NODE_NAMES.PileFlush: return evaluatePileFlush(g, c, node);
        case NODE_NAMES.PileFlushOfSuit: return evaluatePileFlushOfSuit(g, c, node);
        case NODE_NAMES.PileRun: return evaluatePileRun(g, c, node);
        case NODE_NAMES.PileRunFrom: return evaluatePileRunFrom(g, c, node);
        // Map usage
        case NODE_NAMES.Map: return (g.definition.gameMeta.maps[ zs(evaluate(g, c, node.secondary)) ]?.get( evaluate(g, c, node.primary) ));
        case NODE_NAMES.UpdateVariable: return executeUpdateVariable(g, c, node);
        case NODE_NAMES.GetVariable: return g.gameState.getVariable(zs(node.variableType) as ValueTypeName, zs(evaluate(g, c, node.name) ));
        // Phase and Step Logic
        case NODE_NAMES.SetPhase: executeSetPhase(g, c, node); return;
        case NODE_NAMES.SetStep: executeSetStep(g, c, node); return;
        // Game ending
        case NODE_NAMES.Win: executeWin(g, c, node); return;
        case NODE_NAMES.Lose: executeLose(g, c, node); return;
    }

    //throw new Error(`Unsupported type ${node.type}`);
}

