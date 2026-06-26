import Game from "../Game/Game.js";
import { Label, PhaseLabel, StepLabel } from "../Rules/LabelManager.js";
import { ButtonRange, ButtonType, LocationResolver, PileState, Visibility } from "../schemas/types.js";
import Card from "./Card.js";

// Using Zod schemas
import { ActionContext, ValueNode, AST } from "../schemas/AST.js";
import { ValueReturn } from "../schemas/Blocks.js";
import { NODE_NAMES } from "../schemas/Constants.js";
import Pile from "../Game/Pile.js";
import Counter from "../Game/Counter.js";
// Helper functions
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

function evaluateButtonRange(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.ButtonRange) throw new Error("Called evaluateButtonRange with an invalid node");

    const min = evaluate(g, c, node.primary) as number | undefined;
    const max = evaluate(g, c, node.secondary) as number | undefined;
    const increment = evaluate(g, c, node.tertiary) as number | undefined;

    return { min, max, increment };
}

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

function executeShuffleInto(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.ShuffleInto) throw new Error("Called executeShuffleInto with an invalid node");

    const fromPileLabel = evaluate(g, c, node.primary) as Label;
    const toPileLabel = evaluate(g, c, node.secondary) as Label;

    g.gameState.dealCards(fromPileLabel, toPileLabel, 1000000);
    g.gameState.shuffle(toPileLabel);

    return toPileLabel;
}

function executeMoveCounterValue(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.MoveCounterValue) throw new Error("Called executeMoveCounterValue with an invalid node");

    const fromCounterLabel = evaluate(g, c, node.primary) as Label;
    const toCounterLabel = evaluate(g, c, node.secondary) as Label;
    const amount = evaluate(g, c, node.tertiary) as number | undefined;

    const move = amount ?? 1;

    const fromCounter = g.gameState.counters[fromCounterLabel];
    const toCounter = g.gameState.counters[toCounterLabel];

    if (!fromCounter || !toCounter) return;

    fromCounter.counter.value -= move;
    toCounter.counter.value += move;
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

    return g.gameState.roles[ evaluate(g, c, node.role ) as string ]?.at( evaluate(g, c, node.index ) as number ?? 0 );
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

    const playerId = evaluate(g, c, node.id) as number;
    const actionRole = evaluate(g, c, node.actionRole) as string;

    for (let p in g.gameState.piles) {
        const pile = g.gameState.piles[p];
        if (pile?.owner === playerId
            && pile.pile.actionRoles.includes(actionRole)
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

    const role = evaluate(g, c, node.role) as string;
    const playerId = evaluate(g, c, node.id) as number;

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

    const role = evaluate(g, c, node.role) as string;
    const playerId = evaluate(g, c, node.id) as number;

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

    const role = evaluate(g, c, node.role) as string;
    const playerId = evaluate(g, c, node.id) as number;

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

    const role = evaluate(g, c, node.role) as string;
    const playerId = evaluate(g, c, node.id) as number;

    if (g.gameState.roles[role] && !g.gameState.roles[role].includes(playerId)) {
        g.gameState.roles[role] = [playerId];
        return true;
    }

    return false;
}

function evaluateNextPlayer(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.NextPlayer) throw new Error("Called evaluateNextPlayer with invalid node");

    const playerCount = Object.keys(g.gameState.players).length;

    const role = evaluate(g, c, node.primary) as string;

    const currentPlayer = g.gameState.roles[role];

    let pn = currentPlayer ? currentPlayer[0] : undefined;


    // Default to first player
    if (typeof pn === 'undefined') pn = evaluateFirstPlayer(g, c, { type: NODE_NAMES.FirstPlayer } );

    // Assign next player the role
    const newPlayer = (pn + 1) % playerCount;
    g.gameState.roles[role] = [newPlayer];

    return newPlayer;
}

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
 * Executes a "ADD_VARIABLE" value node.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - ADD_VARIABLE value node to execute.
 * @throws Error if the node is not a ADD_VARIABLE node.
 * @returns The value if successfully assigned.
 */
function executeAddVariable(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.AddVariable) throw new Error("Called executeAddVariable with invalid node");

    const name = evaluate(g, c, node.name) as string;
    const value = evaluate(g, c, node.value) as number;

    if (name in g.definition.gameMeta.variables) return null;

    g.definition.gameMeta.variables[name] = value;

    return value;
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

    const name = evaluate(g, c, node.name) as string;
    const value = evaluate(g, c, node.value) as number;

    if (!(name in g.definition.gameMeta.variables)) return null;

    g.definition.gameMeta.variables[name] = value;

    return value;
}

function executeSetPhase(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.SetPhase) throw new Error("Called executeSetPhase with invalid node");
    
    const phaseLabel: PhaseLabel = evaluate(g, c, node.primary) as string;

    g.gameState.moveToPhase(phaseLabel);
}


function executeSetStep(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.SetStep) throw new Error("Called executeSetStep with invalid node");
    
    const stepLabel: StepLabel = evaluate(g, c, node.primary) as string;

    g.gameState.moveToStep(stepLabel);
}


function executeWin(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== NODE_NAMES.Win) throw new Error("Called executeWin with invalid node");

    const player = evaluate(g, c, node.primary);
    const score = evaluate(g, c, node.secondary);
    const endGame = evaluate(g, c, node.tertiary);

    // TODO: end the game
}

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
        case NODE_NAMES.LessThan: return (evaluate(g, c, node.primary) as number) < (evaluate(g, c, node.secondary) as number);
        case NODE_NAMES.GreaterThan: return (evaluate(g, c, node.primary) as number) > (evaluate(g, c, node.secondary) as number);
        case NODE_NAMES.Equal: return (evaluate(g, c, node.primary) as number) == (evaluate(g, c, node.secondary) as number);
        // Arithmetic
        case NODE_NAMES.Plus: return (evaluate(g, c, node.primary) as number) + (evaluate(g, c, node.secondary) as number);
        case NODE_NAMES.Times: return (evaluate(g, c, node.primary) as number) * (evaluate(g, c, node.secondary) as number);
        case NODE_NAMES.Minus: return (evaluate(g, c, node.primary) as number) - (evaluate(g, c, node.secondary) as number);
        case NODE_NAMES.Div: return (evaluate(g, c, node.primary) as number) / (evaluate(g, c, node.secondary) as number);
        // Strings
        case NODE_NAMES.StringEq: return (evaluate(g, c, node.primary) as string) == (evaluate(g, c, node.secondary) as string);
        // Location
        case NODE_NAMES.Location: return { type: 'exact', location: { x: evaluate(g, c, node.primary) as number, y: evaluate(g, c, node.secondary) as number } };
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
        case NODE_NAMES.ShuffleInto: return executeShuffleInto(g, c, node);
        case NODE_NAMES.MoveCounterValue: executeMoveCounterValue(g, c, node); return;
        // Action context
        case NODE_NAMES.ClickedLabel: return c.label;
        case NODE_NAMES.CtxCard: return c.card;
        case NODE_NAMES.CtxId: return c.id;
        // Users and roles
        case NODE_NAMES.GetIdFromRole: return evaluateIdFromRole(g, c, node);
        case NODE_NAMES.PileOf: return evaluatePileOf(g, c, node);
        case NODE_NAMES.HasRole: return evaluateIdHasRole(g, c, node);
        case NODE_NAMES.AssignRole: return evaluateAssignRole(g, c, node);
        case NODE_NAMES.UnassignRole: return evaluateUnassignRole(g, c, node);
        case NODE_NAMES.AssignRoleSingular: return evaluateAssignRoleSingular(g, c, node);
        case NODE_NAMES.NextPlayer: return evaluateNextPlayer(g, c, node);
        case NODE_NAMES.FirstPlayer: return evaluateFirstPlayer(g, c, node);
        // Game info extraction
        case NODE_NAMES.Rank: return (evaluate(g, c, node.primary) as Card).rank;
        case NODE_NAMES.Suit: return (evaluate(g, c, node.primary) as Card).suit;
        case NODE_NAMES.NumCardsInPile: return (evaluate(g, c, node.primary) as Pile).cards.length;
        case NODE_NAMES.ValueOf: return (evaluate(g, c, node.primary) as Counter).value;
        // Map usage
        case NODE_NAMES.Map: return (g.definition.gameMeta.maps[ evaluate(g, c, node.secondary) as string ]?.get( evaluate(g, c, node.primary) ));
        case NODE_NAMES.AddVariable: return executeAddVariable(g, c, node);
        case NODE_NAMES.UpdateVariable: return executeUpdateVariable(g, c, node);
        case NODE_NAMES.GetVariable: return g.definition.gameMeta.variables[evaluate(g, c, node.name) as string];
        // Phase and Step Logic
        case NODE_NAMES.SetPhase: executeSetPhase(g, c, node); return;
        case NODE_NAMES.SetStep: executeSetStep(g, c, node); return;
        // Game ending
        case NODE_NAMES.Win: executeWin(g, c, node); return;
        case NODE_NAMES.Lose: executeLose(g, c, node); return;
    }

    //throw new Error(`Unsupported type ${node.type}`);
}

