// This file will take in the client payload and turn it into the "ClientGameDefinition" expected by GameBuilder

import { ValueNode } from "../schemas/AST.js";
import { BLOCKS } from "../schemas/Blocks.js";
import { ArrayNode, BlockNode, ClientBuiltBlocksSchema, ClientNode, SequenceNode, validateNode, VariableNode } from "../schemas/BuiltBlocks.js";
import ClientGameDefinition from "../schemas/ClientGameDefinition.js";
import { GameDefinitionNode, GameDefinitionPhase, GameDefinitionStep } from "../schemas/GameDefinitionArgs.js";

/**
 * Default AST node used as a placeholder for missing or undefined arguments.
 */
const UndefinedAST: GameDefinitionNode = { type: 'UNDEFINED' };

/**
 * Converts a BlockNode to a GameDefinitionNode AST node.
 * Maps each argument in the block to its AST equivalent, and fills in
 * UNDEFINED nodes for any missing optional arguments.
 * @param blockNode - The block node to convert.
 * @returns The resulting AST node.
 */
function nonLiteralBlockNodeToAst(blockNode: BlockNode): GameDefinitionNode {
    const node: any = {
        type: blockNode.block
    };


    for (const i of Object.keys(blockNode.args)) {
        const arg = blockNode.args[i];

        node[i] = blockNodeToAst(arg) ?? UndefinedAST;
    }


    // Fill in defaults (so client doens't have to)
    const block = BLOCKS[blockNode.block];

    for (const arg of block.arguments) {
        const name = arg.name;

        if (!node[name])
            node[name] = UndefinedAST;
    }

    return node;
}

/**
 * Converts a VariableNode to a GameDefinitionNode AST node.
 * Handles both GET_VARIABLE and UPDATE_VARIABLE block types.
 * @param blockNode - The variable node to convert.
 * @returns The resulting AST node.
 */
function variableNodeToAst(blockNode: VariableNode): GameDefinitionNode {
    const node: any = {
        type: blockNode.block
    };

    node.variableType = blockNode.variableType;
    node.name = blockNodeToAst(blockNode.args.name) ?? UndefinedAST;

    if (blockNode.block === 'UPDATE_VARIABLE')
        node.value = blockNodeToAst(blockNode.args.value) ?? UndefinedAST;

    return node;
}

/**
 * Converts a SequenceNode into a SEQUENCE AST node.
 * Each child block in the sequence is recursively converted.
 * @param blockNode - The sequence node to convert.
 * @returns A SEQUENCE AST node containing the converted child nodes.
 */
function sequenceNodeToAst(blockNode: SequenceNode): GameDefinitionNode {
    const node: ValueNode = {
        type: 'SEQUENCE',
        primary: []
    };

    for (const block of blockNode.blocks) {
        const child = blockNodeToAst(block);
        if (!child) continue;
        node.primary.push(child);
    }

    return node;
}

/**
 * Converts an ArrayNode into an ARRAY AST node.
 * Each element in the array is recursively converted.
 * @param blockNode - The array node to convert.
 * @returns An ARRAY AST node containing the converted elements.
 */
function arrayNodeToAst(blockNode: ArrayNode): GameDefinitionNode {
    const node: ValueNode = {
        type: "ARRAY",
        sequence: []
    };

    for (const block of blockNode.value) {
        const child = blockNodeToAst(block);
        if (!child) continue;
        node.sequence.push(child);
    }

    return node;
}

/**
 * Main dispatcher that converts any ClientNode to its AST equivalent.
 * Routes to the appropriate helper based on the node's kind.
 * COMMENT blocks are ignored and return null.
 * @param blockNode - The client node to convert, or null/undefined.
 * @returns The resulting AST node, or null if the node is null, undefined, or a COMMENT.
 */
function blockNodeToAst(blockNode: ClientNode | null | undefined): null | GameDefinitionNode {
    if (!blockNode) return null;

    switch (blockNode.kind) {
        case 'block':
            if (blockNode.block === "COMMENT") return null;
            return nonLiteralBlockNodeToAst(blockNode);
        case 'sequence':
            return sequenceNodeToAst(blockNode);
        case 'array':
            return arrayNodeToAst(blockNode);
        case 'variable':
            return variableNodeToAst(blockNode);
        case 'literal':
            const literal: ValueNode = {
                type: 'LITERAL',
                primary: blockNode.value
            };
            return literal;
    }
}

/**
 * Safely builds a ClientGameDefinition from a client block editor payload.
 * Wraps buildClientGameDefinitionFromBlocks in a try-catch.
 * @param json - The raw JSON payload from the client.
 * @returns The built ClientGameDefinition, or null if parsing or conversion fails.
 * @todo fix typo in function name: "Form" should be "From"
 */
export function safeBuildClientGameDefinitionFormBlocks(json: unknown): ClientGameDefinition | null {
    try {
        return buildClientGameDefinitionFromblocks(json);
    } catch (error) {}

    return null;
}

/**
 * Builds a ClientGameDefinition from a client block editor payload.
 * Validates the JSON, converts each action's filter and result blocks to AST nodes,
 * and assembles the full phase/step/action structure.
 * @param json - The raw JSON payload from the client.
 * @returns The built ClientGameDefinition.
 * @throws ZodError if the JSON fails schema validation.
 * @todo fix inconsistent casing in function name: "blocks" should be "Blocks"
 */
export function buildClientGameDefinitionFromblocks(json: unknown): ClientGameDefinition {
    const checkJson = ClientBuiltBlocksSchema.safeParse(json);
    if (!checkJson.success) throw checkJson.error;

    // Validate all nodes
    const phases = checkJson.data.phases;

    const clientGamePhases: GameDefinitionPhase[] = [];

    for (const phaseName in phases) {
        const phase = phases[phaseName];
        if (!phase) continue;

        const gamePhase: GameDefinitionPhase = {
            name: phase.name,
            steps: [],
        };
        clientGamePhases.push(gamePhase);

        for (const stepName in phase.steps) {
            const step = phase.steps[stepName];
            if (!step) continue;

            const gameStep: GameDefinitionStep = {
                name: step.name,
                actions: []
            };
            gamePhase.steps.push(gameStep);

            for (const actionName in step.actions) {
                const action = step.actions[actionName];
                if (!action) continue;

                validateNode(action.result);
                if (action.filter) validateNode(action.filter);

                const filter = blockNodeToAst(action.filter);
                const result = blockNodeToAst(action.result);

                if (!result) continue;
                
                const gameAction = {
                    trigger: action.trigger,
                    filter: filter,
                    result: result
                }

                gameStep.actions.push(gameAction);
            }
        }
    }


    return {
        gameMeta: checkJson.data.gameMeta,
        playerDefinition: checkJson.data.playerDefinition,
        boardDefinition: checkJson.data.boardDefinition,
        phases: clientGamePhases
    }
}