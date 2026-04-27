import Game from "../Game/Game.js";
import { Label } from "../Rules/LabelManager.js";
import { PileState, Visibility } from "../schemas/types.js";
import Card from "./Card.js";

// Using Zod schemas
import { ActionContext, ValueNode, ActionNode, AST, ValueReturn } from "../schemas/AST.js";
import Player from "../Game/Player.js";

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
    if (node.type !== 'ARRAY') throw new Error("Called executeCreateArray with an invalid node");

    const arr = [];

    for (let n of node.sequence) {
        arr.push(evaluate(g, c, n));
    }

    return arr;
}

/**
 * Executes a "DEAL_CARDS" action node.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - DEAL_CARDS action node to execute.
 * @throws Error if the node is not a DEAL_CARDS node.
 */
function executeDealCards(g: Game, c: ActionContext, node: ActionNode) {
    if (node.type !== 'DEAL_CARDS') throw new Error("Called executeDealCards with an invalid node");
    
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
    if (node.type !== 'CREATE_PILE') throw new Error("Called executeCreatePile with an invalid node");
    
    // Note: Any of these could be "UNDEFINED" nodes, which will then be given default values
    return g.gameState.createPile({
                state: evaluate(g, c , node.state) as PileState | undefined,
                name: evaluate(g, c, node.name) as string | undefined,
                visibility: evaluate(g, c, node.visibility) as Visibility | undefined,
                actionRoles: evaluate(g, c, node.actionRoles) as string[] | undefined,
                displayName: evaluate(g, c, node.displayName) as string | undefined,
                owner: evaluate(g, c, node.owner) as number | undefined
            });
}

/**
 * Executes a "REMOVE_PILE" action node.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - REMOVE_PILE action node to execute.
 * @throws Error if the node is not a REMOVE_PILE node.
 */
function executeRemovePile(g: Game, c: ActionContext, node: ActionNode) {
    if (node.type !== 'REMOVE_PILE') throw new Error("Called executeRemovePile with an invalid node");

    g.gameState.removePileByLabel(
        evaluate(g, c, node.pile) as Label,
        evaluate(g, c, node.sendTo) as Label | undefined
    )
}

/**
 *  Executes a "GET_ID_FROM_ROLE" action node.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - GET_ID_FROM_ROLE action node to execute.
 * @throws Error if the node is not a GET_ID_FROM_ROLE node.
 * @returns Id of first player with that role in that index.
 */
function evaluateIdFromRole(g: Game, c: ActionContext, node: ActionNode) {
    if (node.type !== 'GET_ID_FROM_ROLE') throw new Error("Called evaluateIdFromRole with an invalid node");

    return g.gameState.roles[ evaluate(g, c, node.role ) ]?.at( evaluate(g, c, node.index ) ?? 0 );
}

/**
 * Executes a "PILE_OF" action node.
 * @param g - The current game instance.
 * @param c - The current action context.
 * @param node - PILE_OF action node to execute.
 * @throws Error if the node is not a PILE_OF node.
 * @returns The label of the matching pile, or null if none is found.
 */
function evaluatePileOf(g: Game, c: ActionContext, node: ActionNode) {
    if (node.type !== 'PILE_OF') throw new Error("Called evaluatePileOf with an invalid node");

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
function evaluateIdHasRole(g: Game, c: ActionContext, node: ActionNode) {
    if (node.type !== 'HAS_ROLE') throw new Error("Called evaluateIdHasRole with an invalid node");

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
function evaluateAssignRole(g: Game, c: ActionContext, node: ActionNode) {
    if (node.type !== 'ASSIGN_ROLE') throw new Error("Called evaluateAssignRole with an invalid node");

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
function evaluateUnassignRole(g: Game, c: ActionContext, node: ActionNode) {
    if (node.type !== 'UNASSIGN_ROLE') throw new Error("Called evaluateUnassignRole with an invalid node");

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
function evaluateAssignRoleSingular(g: Game, c: ActionContext, node: ActionNode) {
    if (node.type !== 'ASSIGN_ROLE_SINGULAR') throw new Error("Called evaluateAssignRoleSingular with an invalid node");

    const role = evaluate(g, c, node.role) as string;
    const playerId = evaluate(g, c, node.id) as number;

    if (g.gameState.roles[role] && !g.gameState.roles[role].includes(playerId)) {
        g.gameState.roles[role] = [playerId];
        return true;
    }

    return false;
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
export function evaluate(g: Game, c: ActionContext, node: AST): ValueReturn | undefined {
    switch (node.type) {
        // Literal
        case 'UNDEFINED': return undefined;
        case 'LITERAL': return node.primary;
        case 'ARRAY': return executeCreateArray(g, c, node);
        // Boolean
        case 'AND': return evaluate(g, c, node.primary) && evaluate(g, c, node.secondary);
        case 'OR': return evaluate(g, c, node.primary) || evaluate(g, c, node.secondary);
        case 'NOT': return !evaluate(g, c, node.primary);
        // Arithmetic
        case 'PLUS': return (evaluate(g, c, node.primary) as number) + (evaluate(g, c, node.secondary) as number);
        case 'TIMES': return (evaluate(g, c, node.primary) as number) * (evaluate(g, c, node.secondary) as number);
        case 'MINUS': return (evaluate(g, c, node.primary) as number) - (evaluate(g, c, node.secondary) as number);
        case 'DIV': return (evaluate(g, c, node.primary) as number) / (evaluate(g, c, node.secondary) as number);
        // Strings
        case 'STRING_EQ': return (evaluate(g, c, node.primary) as string) == (evaluate(g, c, node.secondary) as string);
        // Ternary
        case 'TERNARY': return evaluate(g, c, node.primary) ? evaluate(g, c, node.secondary) : evaluate(g, c, node.tertiary);
        // Game Logic
        case 'IF': if (evaluate(g, c, node.primary)) { evaluate(g, c, node.secondary) } else if (node.tertiary) { evaluate(g, c, node.tertiary) }; return;
        case 'SEQUENCE': for (let action of node.primary) { evaluate(g, c, action); } return;
        // Game Actions
        case 'DEAL_CARDS': executeDealCards(g, c, node); return;
        case 'CREATE_PILE': return executeCreatePile(g, c, node);
        case 'REMOVE_PILE': executeRemovePile(g, c, node); return;
        case 'CLICKED_LABEL': return c.label;
        // Action context
        case 'CTX_CARD': return c.card;
        case 'CTX_ID': return c.id;
        // Users and roles
        case 'GET_ID_FROM_ROLE': return evaluateIdFromRole(g, c, node);
        case 'PILE_OF': return evaluatePileOf(g, c, node);
        case 'HAS_ROLE': return evaluateIdHasRole(g, c, node);
        case 'ASSIGN_ROLE': return evaluateAssignRole(g, c, node);
        case 'UNASSIGN_ROLE': return evaluateUnassignRole(g, c, node);
        case 'ASSIGN_ROLE_SINGULAR': return evaluateAssignRoleSingular(g, c, node);
        // Game info extraction
        case 'RANK': return (evaluate(g, c, node.primary) as Card).rank;
        case 'SUIT': return (evaluate(g, c, node.primary) as Card).suit;
        // Map usage
        case 'MAP': return (g.definition.gameMeta.maps[ evaluate(g, c, node.secondary) as string ]?.get( evaluate(g, c, node.primary) ));
    }

    //throw new Error(`Unsupported type ${node.type}`);
}

