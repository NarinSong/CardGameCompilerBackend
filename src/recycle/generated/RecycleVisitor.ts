// Generated from src/recycle/Recycle.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { VarContext } from "./RecycleParser.js";
import { VarsContext } from "./RecycleParser.js";
import { VaroContext } from "./RecycleParser.js";
import { VarpContext } from "./RecycleParser.js";
import { VariContext } from "./RecycleParser.js";
import { VarbContext } from "./RecycleParser.js";
import { VarcContext } from "./RecycleParser.js";
import { VarcsContext } from "./RecycleParser.js";
import { VarcscContext } from "./RecycleParser.js";
import { VarcardContext } from "./RecycleParser.js";
import { GameContext } from "./RecycleParser.js";
import { DeclareContext } from "./RecycleParser.js";
import { SetupContext } from "./RecycleParser.js";
import { ScoringContext } from "./RecycleParser.js";
import { StageContext } from "./RecycleParser.js";
import { EndconditionContext } from "./RecycleParser.js";
import { MultiactionContext } from "./RecycleParser.js";
import { Multiaction2Context } from "./RecycleParser.js";
import { CondactContext } from "./RecycleParser.js";
import { AggContext } from "./RecycleParser.js";
import { LetContext } from "./RecycleParser.js";
import { ActionContext } from "./RecycleParser.js";
import { PlayercreateContext } from "./RecycleParser.js";
import { TeamcreateContext } from "./RecycleParser.js";
import { TeamsContext } from "./RecycleParser.js";
import { DeckcreateContext } from "./RecycleParser.js";
import { DeckContext } from "./RecycleParser.js";
import { AttributeContext } from "./RecycleParser.js";
import { InitpointsContext } from "./RecycleParser.js";
import { UpdatepointsContext } from "./RecycleParser.js";
import { AwardsContext } from "./RecycleParser.js";
import { SubawardContext } from "./RecycleParser.js";
import { CycleactionContext } from "./RecycleParser.js";
import { SetactionContext } from "./RecycleParser.js";
import { SetstractionContext } from "./RecycleParser.js";
import { IncactionContext } from "./RecycleParser.js";
import { DecactionContext } from "./RecycleParser.js";
import { MoveactionContext } from "./RecycleParser.js";
import { SwapactionContext } from "./RecycleParser.js";
import { CopyactionContext } from "./RecycleParser.js";
import { RemoveactionContext } from "./RecycleParser.js";
import { ShuffleactionContext } from "./RecycleParser.js";
import { TurnactionContext } from "./RecycleParser.js";
import { RepeatContext } from "./RecycleParser.js";
import { PointstorageContext } from "./RecycleParser.js";
import { CardContext } from "./RecycleParser.js";
import { MaxofContext } from "./RecycleParser.js";
import { MinofContext } from "./RecycleParser.js";
import { LocpreContext } from "./RecycleParser.js";
import { LocdescContext } from "./RecycleParser.js";
import { WhoContext } from "./RecycleParser.js";
import { WhopContext } from "./RecycleParser.js";
import { WhotContext } from "./RecycleParser.js";
import { WhodescContext } from "./RecycleParser.js";
import { OwnerContext } from "./RecycleParser.js";
import { TeampContext } from "./RecycleParser.js";
import { TypedContext } from "./RecycleParser.js";
import { CollectionContext } from "./RecycleParser.js";
import { StrcollectionContext } from "./RecycleParser.js";
import { RangeContext } from "./RecycleParser.js";
import { OtherContext } from "./RecycleParser.js";
import { CstorageContext } from "./RecycleParser.js";
import { BasecstorageContext } from "./RecycleParser.js";
import { SortofContext } from "./RecycleParser.js";
import { UnionofContext } from "./RecycleParser.js";
import { IntersectofContext } from "./RecycleParser.js";
import { DisjunctionofContext } from "./RecycleParser.js";
import { FilterContext } from "./RecycleParser.js";
import { MemstorageContext } from "./RecycleParser.js";
import { SequenceContext } from "./RecycleParser.js";
import { RunsequenceContext } from "./RecycleParser.js";
import { CstoragecollectionContext } from "./RecycleParser.js";
import { RunContext } from "./RecycleParser.js";
import { SubsetContext } from "./RecycleParser.js";
import { PartitionContext } from "./RecycleParser.js";
import { AggcsContext } from "./RecycleParser.js";
import { IndexedContext } from "./RecycleParser.js";
import { BooleanContext } from "./RecycleParser.js";
import { IntopContext } from "./RecycleParser.js";
import { AggbContext } from "./RecycleParser.js";
import { IntContext } from "./RecycleParser.js";
import { IntgrContext } from "./RecycleParser.js";
import { SumContext } from "./RecycleParser.js";
import { ScoremaxContext } from "./RecycleParser.js";
import { ScoreminContext } from "./RecycleParser.js";
import { ScoreContext } from "./RecycleParser.js";
import { AddContext } from "./RecycleParser.js";
import { MultContext } from "./RecycleParser.js";
import { SubtractContext } from "./RecycleParser.js";
import { ModContext } from "./RecycleParser.js";
import { DivideContext } from "./RecycleParser.js";
import { ExponentContext } from "./RecycleParser.js";
import { TriangularContext } from "./RecycleParser.js";
import { FibonacciContext } from "./RecycleParser.js";
import { RandomContext } from "./RecycleParser.js";
import { SizeofContext } from "./RecycleParser.js";
import { AggiContext } from "./RecycleParser.js";
import { RawstorageContext } from "./RecycleParser.js";
import { PidContext } from "./RecycleParser.js";
import { TidContext } from "./RecycleParser.js";
import { StrContext } from "./RecycleParser.js";
import { StrstorageContext } from "./RecycleParser.js";
import { CardattContext } from "./RecycleParser.js";
import { NamegrContext } from "./RecycleParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `RecycleParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface RecycleVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by `RecycleParser.var`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVar?: (ctx: VarContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.vars`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVars?: (ctx: VarsContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.varo`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVaro?: (ctx: VaroContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.varp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarp?: (ctx: VarpContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.vari`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVari?: (ctx: VariContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.varb`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarb?: (ctx: VarbContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.varc`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarc?: (ctx: VarcContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.varcs`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarcs?: (ctx: VarcsContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.varcsc`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarcsc?: (ctx: VarcscContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.varcard`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitVarcard?: (ctx: VarcardContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.game`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitGame?: (ctx: GameContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.declare`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeclare?: (ctx: DeclareContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.setup`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetup?: (ctx: SetupContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.scoring`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScoring?: (ctx: ScoringContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.stage`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStage?: (ctx: StageContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.endcondition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitEndcondition?: (ctx: EndconditionContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.multiaction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiaction?: (ctx: MultiactionContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.multiaction2`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultiaction2?: (ctx: Multiaction2Context) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.condact`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCondact?: (ctx: CondactContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.agg`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAgg?: (ctx: AggContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.let`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLet?: (ctx: LetContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.action`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAction?: (ctx: ActionContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.playercreate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPlayercreate?: (ctx: PlayercreateContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.teamcreate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTeamcreate?: (ctx: TeamcreateContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.teams`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTeams?: (ctx: TeamsContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.deckcreate`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeckcreate?: (ctx: DeckcreateContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.deck`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDeck?: (ctx: DeckContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.attribute`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAttribute?: (ctx: AttributeContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.initpoints`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInitpoints?: (ctx: InitpointsContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.updatepoints`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUpdatepoints?: (ctx: UpdatepointsContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.awards`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAwards?: (ctx: AwardsContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.subaward`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubaward?: (ctx: SubawardContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.cycleaction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCycleaction?: (ctx: CycleactionContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.setaction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetaction?: (ctx: SetactionContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.setstraction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSetstraction?: (ctx: SetstractionContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.incaction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIncaction?: (ctx: IncactionContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.decaction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecaction?: (ctx: DecactionContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.moveaction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMoveaction?: (ctx: MoveactionContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.swapaction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSwapaction?: (ctx: SwapactionContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.copyaction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCopyaction?: (ctx: CopyactionContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.removeaction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRemoveaction?: (ctx: RemoveactionContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.shuffleaction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitShuffleaction?: (ctx: ShuffleactionContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.turnaction`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTurnaction?: (ctx: TurnactionContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.repeat`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRepeat?: (ctx: RepeatContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.pointstorage`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPointstorage?: (ctx: PointstorageContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.card`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCard?: (ctx: CardContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.maxof`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMaxof?: (ctx: MaxofContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.minof`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMinof?: (ctx: MinofContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.locpre`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLocpre?: (ctx: LocpreContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.locdesc`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLocdesc?: (ctx: LocdescContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.who`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWho?: (ctx: WhoContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.whop`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhop?: (ctx: WhopContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.whot`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhot?: (ctx: WhotContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.whodesc`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitWhodesc?: (ctx: WhodescContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.owner`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOwner?: (ctx: OwnerContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.teamp`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTeamp?: (ctx: TeampContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.typed`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTyped?: (ctx: TypedContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.collection`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCollection?: (ctx: CollectionContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.strcollection`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStrcollection?: (ctx: StrcollectionContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.range`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRange?: (ctx: RangeContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.other`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitOther?: (ctx: OtherContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.cstorage`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCstorage?: (ctx: CstorageContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.basecstorage`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBasecstorage?: (ctx: BasecstorageContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.sortof`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSortof?: (ctx: SortofContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.unionof`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnionof?: (ctx: UnionofContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.intersectof`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntersectof?: (ctx: IntersectofContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.disjunctionof`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDisjunctionof?: (ctx: DisjunctionofContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.filter`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFilter?: (ctx: FilterContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.memstorage`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMemstorage?: (ctx: MemstorageContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.sequence`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSequence?: (ctx: SequenceContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.runsequence`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRunsequence?: (ctx: RunsequenceContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.cstoragecollection`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCstoragecollection?: (ctx: CstoragecollectionContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.run`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRun?: (ctx: RunContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.subset`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubset?: (ctx: SubsetContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.partition`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPartition?: (ctx: PartitionContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.aggcs`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAggcs?: (ctx: AggcsContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.indexed`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIndexed?: (ctx: IndexedContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.boolean`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBoolean?: (ctx: BooleanContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.intop`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntop?: (ctx: IntopContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.aggb`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAggb?: (ctx: AggbContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.int`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitInt?: (ctx: IntContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.intgr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIntgr?: (ctx: IntgrContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.sum`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSum?: (ctx: SumContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.scoremax`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScoremax?: (ctx: ScoremaxContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.scoremin`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScoremin?: (ctx: ScoreminContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.score`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitScore?: (ctx: ScoreContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.add`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAdd?: (ctx: AddContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.mult`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMult?: (ctx: MultContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.subtract`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSubtract?: (ctx: SubtractContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.mod`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMod?: (ctx: ModContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.divide`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDivide?: (ctx: DivideContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.exponent`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExponent?: (ctx: ExponentContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.triangular`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTriangular?: (ctx: TriangularContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.fibonacci`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFibonacci?: (ctx: FibonacciContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.random`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRandom?: (ctx: RandomContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.sizeof`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSizeof?: (ctx: SizeofContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.aggi`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAggi?: (ctx: AggiContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.rawstorage`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRawstorage?: (ctx: RawstorageContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.pid`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPid?: (ctx: PidContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.tid`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitTid?: (ctx: TidContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.str`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStr?: (ctx: StrContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.strstorage`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStrstorage?: (ctx: StrstorageContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.cardatt`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitCardatt?: (ctx: CardattContext) => Result;

	/**
	 * Visit a parse tree produced by `RecycleParser.namegr`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNamegr?: (ctx: NamegrContext) => Result;
}

