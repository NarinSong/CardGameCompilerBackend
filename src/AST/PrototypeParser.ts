import Game from "../Game/Game";
import { Label } from "../Rules/LabelManager";
import Trigger from "../Rules/TriggerDefinition";
import Pickup from "../SampleGames/Pickup";

class ActionContext {
    trigger: Trigger;
    label: Label | undefined;

    constructor(trigger: Trigger, label?: Label) {
        this.trigger = trigger;
        this.label = label;
    }
}

// Represents one or more nodes that ultimately return a value
type Literal = 'LITERAL';
type BooleanOperators = 'AND' | 'OR' | 'NOT';
type ArithmaticOperators = 'PLUS' | 'TIMES' | 'DIV' | 'SUB';
// TODO: extract game info as a value type

type ValueTypes =  BooleanOperators | Literal | ArithmaticOperators;

type ValueReturn = number | Label | boolean;
type Value = ValueReturn | Value_AST;
type ValueArgs = { g: Game, c: ActionContext, node: Value_AST };

class Value_AST {
    type: ValueTypes;
    left: Value;
    right: Value | null;

    constructor(type: ValueTypes, left: Value, right?: Value) {
        this.type = type;
        this.left = left;
        this.right = right ?? null;
    }

    static evaluate(arg: ValueArgs): ValueReturn {
        const v = arg.node;

        if (v.type === 'LITERAL') {
            if (v.left instanceof Value_AST)
                throw new Error('Value declared as a literal was not a literal')
            
            return v.left;
        }
            

        if (v.type === 'AND') {
            if (!(v.left instanceof Value_AST) || !(v.right instanceof Value_AST))
                throw new Error("A literal was presented as an argument to an AND operation");
            
            arg.node = v.left;
            const val = Value_AST.evaluate(arg);

            // Short circuit evaluation
            if (!val) return false;

            arg.node = v.right;

            return Value_AST.evaluate(arg) as boolean;
        }

        // TODO: OR, NOT

        // TODO: Arithmatic operators

        // TOOD: Game feature extraction operators
        
        return true;
    }
}

class Action_AST {
    
}


const tnode = new Value_AST('LITERAL', true);
const fnode = new Value_AST('LITERAL', false);
const anode = new Value_AST('AND', tnode, fnode);
const yes = new Value_AST('AND', tnode, tnode);

const game = Pickup.createGame();
game.startGame();

// Simulate an action resolution

const t = game.currentActions[0]?.trigger;

if (!t) throw new Error("Trigger undefined");

const ctx = new ActionContext(t, 'Deck');

const v = Value_AST.evaluate({ g: game, c: ctx, node: yes });
const v2 = Value_AST.evaluate({ g: game, c: ctx, node: anode });

console.log('Should be false')
console.log(v2);
console.log('Should be true')

export default v;
