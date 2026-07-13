// This file will take in the client payload and turn it into the "ClientGameDefinition" expected by GameBuilder

import { ValueNode } from "../schemas/AST.js";
import { BLOCKS } from "../schemas/Blocks.js";
import { ArrayNode, BlockNode, ClientBuiltBlocksSchema, ClientNode, SequenceNode, validateNode, VariableNode } from "../schemas/BuiltBlocks.js";
import ClientGameDefinition from "../schemas/ClientGameDefinition.js";
import { GameDefinitionNode, GameDefinitionPhase, GameDefinitionStep } from "../schemas/GameDefinitionArgs.js";

const UndefinedAST: GameDefinitionNode = { type: 'UNDEFINED' };

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

export function safeBuildClientGameDefinitionFormBlocks(json: unknown): ClientGameDefinition | null {
    try {
        return buildClientGameDefinitionFromblocks(json);
    } catch (error) {}

    return null;
}

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