import Game from "../Game/Game";
import { Label } from "../Rules/LabelManager";
import Trigger from "../Rules/TriggerDefinition";
import { BoardID, PileState, PlayerID, Visibility } from "../types";

// Represents one or more nodes that ultimately return a value
type Literal = 'LITERAL';
type Undefined = 'UNDEFINED';
type UnaryOperators = 'NOT';
type BinaryOperators = 'AND' | 'OR' |  'PLUS' | 'TIMES' | 'DIV' | 'MINUS';
type TernaryOperators = 'TERNARY';

type GameOperators = 
    { type: 'CREATE_PILE'; state: ValueNode, name: ValueNode, visibility: ValueNode, actionRole: ValueNode, displayName: ValueNode, owner: ValueNode }
    | { type: 'CLICKED_LABEL' }
// TODO: extract game info as a value type

// Game return info
type PileReturnInfo = PileState | Visibility | PlayerID | BoardID;

type ValueReturn = number | Label | boolean | PileReturnInfo;

export type ValueNode =
  { type: Undefined }
  | { type: Literal; primary: ValueReturn }
  | { type: UnaryOperators; primary: ValueNode }
  | { type: BinaryOperators; primary: ValueNode; secondary: ValueNode }
  | { type: TernaryOperators; primary: ValueNode; secondary: ValueNode; tertiary: ValueNode }
  // Game actions that return labels are also allowed
  | GameOperators
  

// Logic and handling
type GameLogicExecutors = 
    { type: 'IF', primary: ValueNode, secondary: ActionNode, tertiary?: ActionNode }
    | { type: 'SEQUENCE', primary: ActionNode[] }

// Game Actions
type GameActionExecutors = 
    { type: 'DEAL_CARDS'; primary: ValueNode, secondary: ValueNode, tertiary: ValueNode }
    | { type: 'REMOVE_PILE'; pile: ValueNode, sendTo: ValueNode }

export type ActionNode = GameActionExecutors | GameLogicExecutors;


export type ActionContext = { trigger: Trigger; label: Label | undefined }
export type AST = ValueNode | ActionNode;

// Helper functions
function executeDealCards(g: Game, c: ActionContext, node: ActionNode) {
    if (node.type !== 'DEAL_CARDS') throw new Error("Called executeDealCards with an invalid node");
    
    g.gameState.dealCards(evaluate(g, c, node.primary) as Label, evaluate(g, c, node.secondary) as Label, evaluate(g, c, node.tertiary) as number);
}

function executeCreatePile(g: Game, c: ActionContext, node: ValueNode) {
    if (node.type !== 'CREATE_PILE') throw new Error("Called executeCreatePile with an invalid node");
    
    // Note: Any of these could be "UNDEFINED" nodes, which will then be given default values
    return g.gameState.createPile({
                state: evaluate(g, c , node.state) as PileState | undefined,
                name: evaluate(g, c, node.name) as string | undefined,
                visibility: evaluate(g, c, node.visibility) as Visibility | undefined,
                actionRole: evaluate(g, c, node.actionRole) as string | undefined,
                displayName: evaluate(g, c, node.displayName) as string | undefined,
                owner: evaluate(g, c, node.owner) as number | undefined
            });
}

function executeRemovePile(g: Game, c: ActionContext, node: ActionNode) {
    if (node.type !== 'REMOVE_PILE') throw new Error("Called executeRemovePile with an invalid node");

    g.gameState.removePileByLabel(
        evaluate(g, c, node.pile) as Label,
        evaluate(g, c, node.sendTo) as Label | undefined
    )
}

export function evaluate(g: Game, c: ActionContext, node: AST): ValueReturn | undefined {
    switch (node.type) {
        // Literal
        case 'UNDEFINED': return undefined;
        case 'LITERAL': return node.primary;
        // Boolean
        case 'AND': return evaluate(g, c, node.primary) && evaluate(g, c, node.secondary);
        case 'OR': return evaluate(g, c, node.primary) || evaluate(g, c, node.secondary);
        case 'NOT': return !evaluate(g, c, node.primary);
        // Arithmetic
        case 'PLUS': return (evaluate(g, c, node.primary) as number) + (evaluate(g, c, node.secondary) as number);
        case 'TIMES': return (evaluate(g, c, node.primary) as number) * (evaluate(g, c, node.secondary) as number);
        case 'MINUS': return (evaluate(g, c, node.primary) as number) - (evaluate(g, c, node.secondary) as number);
        case 'DIV': return (evaluate(g, c, node.primary) as number) / (evaluate(g, c, node.secondary) as number);
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
    }

    //throw new Error(`Unsupported type ${node.type}`);
}

