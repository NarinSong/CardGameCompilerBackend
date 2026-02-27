import Game from "../Game/Game";
import Action from "../Rules/ActionDefinition";
import { Label } from "../Rules/LabelManager";
import Trigger from "../Rules/TriggerDefinition";
import { BoardID, PileState, PlayerID, Visibility } from "../types";

// Represents one or more nodes that ultimately return a value
type Literal = 'LITERAL';
type Undefined = 'UNDEFINED';
type UnaryOperators = 'NOT';
type BinaryOperators = 'AND' | 'OR' |  'PLUS' | 'TIMES' | 'DIV' | 'MINUS';
type TernaryOperators = 'TERNARY';
// TODO: extract game info as a value type

// Game return info
type PileReturnInfo = PileState | Visibility | PlayerID | BoardID;

type ValueReturn = number | Label | boolean | PileReturnInfo;

type ValueNode =
  { type: Undefined }
  | { type: Literal; primary: ValueReturn }
  | { type: UnaryOperators; primary: ValueNode }
  | { type: BinaryOperators; primary: ValueNode; secondary: ValueNode }
  | { type: TernaryOperators; primary: ValueNode; secondary: ValueNode; tertiary: ValueNode }


// Logic and handling
type GameLogicExecutors = 
    { type: 'IF', primary: ValueNode, secondary: ActionNode, tertiary?: ActionNode }
    | { type: 'SEQUENCE', primary: ActionNode[] }

// Game Actions
type GameActionExecutors = 
    { type: 'DEAL_CARDS'; primary: ValueNode, secondary: ValueNode, tertiary: ValueNode }
    | { type: 'CREATE_PILE'; state: ValueNode, name: ValueNode, visibility: ValueNode, actionRole: ValueNode, displayName: ValueNode, owner: ValueNode }

type ActionNode = GameActionExecutors | GameLogicExecutors;

type ActionContext = { trigger: Trigger; label: Label | undefined }

// Helper functions
function executeDealCards(g: Game, c: ActionContext, node: ActionNode) {
    if (node.type !== 'DEAL_CARDS') throw new Error("Called executeDealCards with an invalid node");
    
    g.gameState.dealCards(evaluate(g, c, node.primary) as Label, evaluate(g, c, node.secondary) as Label, evaluate(g, c, node.tertiary) as number);
}

function executeCreatePile(g: Game, c: ActionContext, node: ActionNode) {
    if (node.type !== 'CREATE_PILE') throw new Error("Called executeCreatePile with an invalid node");
    
    // Note: Any of these could be "UNDEFINED" nodes, which will then be given default values
    return g.gameState.createPile({
                state: evaluate(g, c , node.state) as PileState,
                name: evaluate(g, c, node.name) as string,
                visibility: evaluate(g, c, node.visibility) as Visibility,
                actionRole: evaluate(g, c, node.actionRole) as string,
                displayName: evaluate(g, c, node.displayName) as string,
                owner: evaluate(g, c, node.owner) as number
            });
}

function evaluate(g: Game, c: ActionContext, node: ValueNode | ActionNode): ValueReturn | undefined {
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
    }

    //throw new Error(`Unsupported type ${node.type}`);
}

