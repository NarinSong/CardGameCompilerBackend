import Game from "../Game/Game";
import Pile from "../Game/Pile";
import { Label } from "../Rules/LabelManager";
import Trigger from "../Rules/TriggerDefinition";
import { BoardID, PileState, PlayerID, Visibility } from "../schemas/types";
import Card from "./Card";

// Using Zod schemas
import { ActionContext, ValueNode, ActionNode, AST, ValueReturn } from "../schemas/AST";

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
        case 'CTX_CARD': return c.card;
        // Game info extraction
        case 'RANK': return (evaluate(g, c, node.primary) as Card).rank;
        case 'SUIT': return (evaluate(g, c, node.primary) as Card).suit;
        // Map usage
        case 'MAP': return (g.definition.gameMeta.maps[ evaluate(g, c, node.secondary) as string ]?.get( evaluate(g, c, node.primary) ));
    }

    //throw new Error(`Unsupported type ${node.type}`);
}

