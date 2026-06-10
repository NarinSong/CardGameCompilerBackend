// This file will take in the client payload and turn it into the "ClientGameDefinition" expected by GameBuilder

import { ValueNode } from "../schemas/AST";
import { BlockNode, ClientBuiltBlocksSchema, ClientNode, validateNode } from "../schemas/BuiltBlocks";
import ClientGameDefinition from "../schemas/ClientGameDefinition";
import { GameDefinitionNode, GameDefinitionPhase, GameDefinitionStep } from "../schemas/GameDefinitionArgs";

function nonLiteralBlockNodeToAst(blockNode: BlockNode): GameDefinitionNode {
    switch (blockNode.block) {
        // TODO: add block kinds here based on "Blocks.ts"
        case 'DEAL_CARDS':
        case 'CREATE_PILE':
        case 'IF':
        case 'REMOVE_PILE':
            throw new Error('Not yet implemented');
    }
}

function blockNodeToAst(blockNode: ClientNode | null | undefined): null | GameDefinitionNode {
    if (!blockNode) return null;

    switch (blockNode.kind) {
        case 'block':
            return nonLiteralBlockNodeToAst(blockNode);
            break;
        case 'literal':
            const literal: ValueNode = {
                type: 'Literal',
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

function buildClientGameDefinitionFromblocks(json: unknown): ClientGameDefinition {
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

                const gameAction = {
                    trigger: action.trigger,
                    filter: blockNodeToAst(action.filter),
                    result: blockNodeToAst(action.result)
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