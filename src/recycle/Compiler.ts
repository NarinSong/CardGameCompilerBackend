// The goal of this file is to take in .rcy RECYCLEd CARDSTOCK files and output CGC Blocks (the same that we receive from the client)
// With that, we can store the resulting blocks JSON in the database, which users can then retrieve and edit in the block editor

import { RecognitionException, Recognizer, CharStreams, CommonTokenStream, BailErrorStrategy, DiagnosticErrorListener } from "antlr4ts";


import { RecycleLexer } from "./generated/RecycleLexer.js";
import { GameContext, RecycleParser } from "./generated/RecycleParser.js";

import { ClientBuiltBlocks } from "../schemas/BuiltBlocks.js";
import { ASTBuilder } from "./Visitor.js";

// Full disclosure: This file was created using AI assistance

interface CompilerError {
    line: number;
    column: number;
    message: string;
}

export interface CompileResult {
    success: boolean;
    output?: ClientBuiltBlocks;
    diagnostics?: CompilerError[];
}

export type ParseResult = {
    success: true;
    output: GameContext;
} | {
    success: false;
    diagnostics: CompilerError[];
}

export class RecycleCompiler {
    /**
     * Compiles RECYCLE source code into a CGC built-blocks definition.
     *
     * Pipeline:
     *   RECYCLE Source
     *          ↓
     *      ANTLR Lexer
     *          ↓
     *      ANTLR Parser
     *          ↓
     *      Parse Tree
     *          ↓
     *      RECYCLE AST
     *          ↓
     *   Semantic Analysis
     *          ↓
     *     CGC Block Builder
     *          ↓
     *   ClientBuiltBlocks
     */
    public compile(source: string): CompileResult {
        const lexer = new RecycleLexer(CharStreams.fromString(source));
        const tokens = new CommonTokenStream(lexer);
        const parser = new RecycleParser(tokens);


        const parseResult = this.parse(parser, lexer);

        if (!parseResult.success) {
            return {
                success: false,
                diagnostics: parseResult.diagnostics
            }
        }

        const parseTree = parseResult.output;

        const ast = new ASTBuilder().visitGame(parseTree);

        // TODO: Implement SemanticAnalyzer.
        //new SemanticAnalyzer().analyze(ast);

        // TODO: Implement CGCBuilder.
        //const blocks = new CGCBuilder().build(ast);

        throw new Error("Incomplete implementation error - please finish implementing the compiler :)");

        /*
        return {
            success: true,
            output: blocks,
        }
        */
    }

    private parse(parser: RecycleParser, lexer: RecycleLexer): ParseResult {
        lexer.removeErrorListeners();
        parser.removeErrorListeners();

        const errorListener = new RecycleErrorListener();

        lexer.addErrorListener(errorListener);
        parser.addErrorListener(errorListener);

        parser.errorHandler = new BailErrorStrategy();

        const parseTree = parser.game();

        if (errorListener.hasErrors()) {
            return {
                success: false,
                diagnostics: errorListener.errors
            };
        }

        return {
            success: true,
            output: parseTree,
        }
    }
}

class RecycleErrorListener extends DiagnosticErrorListener {
    readonly errors: CompilerError[] = [];

    override syntaxError<T>(
        recognizer: Recognizer<T, any>,
        offendingSymbol: T | undefined,
        line: number,
        charPositionInLine: number,
        msg: string,
        e: RecognitionException | undefined
    ): void {
        this.errors.push({
            line,
            column: charPositionInLine,
            message: msg,
        });
    }

    hasErrors() {
        return this.errors.length > 0;
    }
}