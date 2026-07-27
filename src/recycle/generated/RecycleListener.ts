// Generated from src/recycle/Recycle.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `RecycleParser`.
 */
export interface RecycleListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `RecycleParser.var`.
	 * @param ctx the parse tree
	 */
	enterVar?: (ctx: VarContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.var`.
	 * @param ctx the parse tree
	 */
	exitVar?: (ctx: VarContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.vars`.
	 * @param ctx the parse tree
	 */
	enterVars?: (ctx: VarsContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.vars`.
	 * @param ctx the parse tree
	 */
	exitVars?: (ctx: VarsContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.varo`.
	 * @param ctx the parse tree
	 */
	enterVaro?: (ctx: VaroContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.varo`.
	 * @param ctx the parse tree
	 */
	exitVaro?: (ctx: VaroContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.varp`.
	 * @param ctx the parse tree
	 */
	enterVarp?: (ctx: VarpContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.varp`.
	 * @param ctx the parse tree
	 */
	exitVarp?: (ctx: VarpContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.vari`.
	 * @param ctx the parse tree
	 */
	enterVari?: (ctx: VariContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.vari`.
	 * @param ctx the parse tree
	 */
	exitVari?: (ctx: VariContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.varb`.
	 * @param ctx the parse tree
	 */
	enterVarb?: (ctx: VarbContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.varb`.
	 * @param ctx the parse tree
	 */
	exitVarb?: (ctx: VarbContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.varc`.
	 * @param ctx the parse tree
	 */
	enterVarc?: (ctx: VarcContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.varc`.
	 * @param ctx the parse tree
	 */
	exitVarc?: (ctx: VarcContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.varcs`.
	 * @param ctx the parse tree
	 */
	enterVarcs?: (ctx: VarcsContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.varcs`.
	 * @param ctx the parse tree
	 */
	exitVarcs?: (ctx: VarcsContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.varcsc`.
	 * @param ctx the parse tree
	 */
	enterVarcsc?: (ctx: VarcscContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.varcsc`.
	 * @param ctx the parse tree
	 */
	exitVarcsc?: (ctx: VarcscContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.varcard`.
	 * @param ctx the parse tree
	 */
	enterVarcard?: (ctx: VarcardContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.varcard`.
	 * @param ctx the parse tree
	 */
	exitVarcard?: (ctx: VarcardContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.game`.
	 * @param ctx the parse tree
	 */
	enterGame?: (ctx: GameContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.game`.
	 * @param ctx the parse tree
	 */
	exitGame?: (ctx: GameContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.declare`.
	 * @param ctx the parse tree
	 */
	enterDeclare?: (ctx: DeclareContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.declare`.
	 * @param ctx the parse tree
	 */
	exitDeclare?: (ctx: DeclareContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.setup`.
	 * @param ctx the parse tree
	 */
	enterSetup?: (ctx: SetupContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.setup`.
	 * @param ctx the parse tree
	 */
	exitSetup?: (ctx: SetupContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.scoring`.
	 * @param ctx the parse tree
	 */
	enterScoring?: (ctx: ScoringContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.scoring`.
	 * @param ctx the parse tree
	 */
	exitScoring?: (ctx: ScoringContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.stage`.
	 * @param ctx the parse tree
	 */
	enterStage?: (ctx: StageContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.stage`.
	 * @param ctx the parse tree
	 */
	exitStage?: (ctx: StageContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.endcondition`.
	 * @param ctx the parse tree
	 */
	enterEndcondition?: (ctx: EndconditionContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.endcondition`.
	 * @param ctx the parse tree
	 */
	exitEndcondition?: (ctx: EndconditionContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.multiaction`.
	 * @param ctx the parse tree
	 */
	enterMultiaction?: (ctx: MultiactionContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.multiaction`.
	 * @param ctx the parse tree
	 */
	exitMultiaction?: (ctx: MultiactionContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.multiaction2`.
	 * @param ctx the parse tree
	 */
	enterMultiaction2?: (ctx: Multiaction2Context) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.multiaction2`.
	 * @param ctx the parse tree
	 */
	exitMultiaction2?: (ctx: Multiaction2Context) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.condact`.
	 * @param ctx the parse tree
	 */
	enterCondact?: (ctx: CondactContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.condact`.
	 * @param ctx the parse tree
	 */
	exitCondact?: (ctx: CondactContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.agg`.
	 * @param ctx the parse tree
	 */
	enterAgg?: (ctx: AggContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.agg`.
	 * @param ctx the parse tree
	 */
	exitAgg?: (ctx: AggContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.let`.
	 * @param ctx the parse tree
	 */
	enterLet?: (ctx: LetContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.let`.
	 * @param ctx the parse tree
	 */
	exitLet?: (ctx: LetContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.action`.
	 * @param ctx the parse tree
	 */
	enterAction?: (ctx: ActionContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.action`.
	 * @param ctx the parse tree
	 */
	exitAction?: (ctx: ActionContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.playercreate`.
	 * @param ctx the parse tree
	 */
	enterPlayercreate?: (ctx: PlayercreateContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.playercreate`.
	 * @param ctx the parse tree
	 */
	exitPlayercreate?: (ctx: PlayercreateContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.teamcreate`.
	 * @param ctx the parse tree
	 */
	enterTeamcreate?: (ctx: TeamcreateContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.teamcreate`.
	 * @param ctx the parse tree
	 */
	exitTeamcreate?: (ctx: TeamcreateContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.teams`.
	 * @param ctx the parse tree
	 */
	enterTeams?: (ctx: TeamsContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.teams`.
	 * @param ctx the parse tree
	 */
	exitTeams?: (ctx: TeamsContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.deckcreate`.
	 * @param ctx the parse tree
	 */
	enterDeckcreate?: (ctx: DeckcreateContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.deckcreate`.
	 * @param ctx the parse tree
	 */
	exitDeckcreate?: (ctx: DeckcreateContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.deck`.
	 * @param ctx the parse tree
	 */
	enterDeck?: (ctx: DeckContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.deck`.
	 * @param ctx the parse tree
	 */
	exitDeck?: (ctx: DeckContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.attribute`.
	 * @param ctx the parse tree
	 */
	enterAttribute?: (ctx: AttributeContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.attribute`.
	 * @param ctx the parse tree
	 */
	exitAttribute?: (ctx: AttributeContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.initpoints`.
	 * @param ctx the parse tree
	 */
	enterInitpoints?: (ctx: InitpointsContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.initpoints`.
	 * @param ctx the parse tree
	 */
	exitInitpoints?: (ctx: InitpointsContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.updatepoints`.
	 * @param ctx the parse tree
	 */
	enterUpdatepoints?: (ctx: UpdatepointsContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.updatepoints`.
	 * @param ctx the parse tree
	 */
	exitUpdatepoints?: (ctx: UpdatepointsContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.awards`.
	 * @param ctx the parse tree
	 */
	enterAwards?: (ctx: AwardsContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.awards`.
	 * @param ctx the parse tree
	 */
	exitAwards?: (ctx: AwardsContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.subaward`.
	 * @param ctx the parse tree
	 */
	enterSubaward?: (ctx: SubawardContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.subaward`.
	 * @param ctx the parse tree
	 */
	exitSubaward?: (ctx: SubawardContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.cycleaction`.
	 * @param ctx the parse tree
	 */
	enterCycleaction?: (ctx: CycleactionContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.cycleaction`.
	 * @param ctx the parse tree
	 */
	exitCycleaction?: (ctx: CycleactionContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.setaction`.
	 * @param ctx the parse tree
	 */
	enterSetaction?: (ctx: SetactionContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.setaction`.
	 * @param ctx the parse tree
	 */
	exitSetaction?: (ctx: SetactionContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.setstraction`.
	 * @param ctx the parse tree
	 */
	enterSetstraction?: (ctx: SetstractionContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.setstraction`.
	 * @param ctx the parse tree
	 */
	exitSetstraction?: (ctx: SetstractionContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.incaction`.
	 * @param ctx the parse tree
	 */
	enterIncaction?: (ctx: IncactionContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.incaction`.
	 * @param ctx the parse tree
	 */
	exitIncaction?: (ctx: IncactionContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.decaction`.
	 * @param ctx the parse tree
	 */
	enterDecaction?: (ctx: DecactionContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.decaction`.
	 * @param ctx the parse tree
	 */
	exitDecaction?: (ctx: DecactionContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.moveaction`.
	 * @param ctx the parse tree
	 */
	enterMoveaction?: (ctx: MoveactionContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.moveaction`.
	 * @param ctx the parse tree
	 */
	exitMoveaction?: (ctx: MoveactionContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.swapaction`.
	 * @param ctx the parse tree
	 */
	enterSwapaction?: (ctx: SwapactionContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.swapaction`.
	 * @param ctx the parse tree
	 */
	exitSwapaction?: (ctx: SwapactionContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.copyaction`.
	 * @param ctx the parse tree
	 */
	enterCopyaction?: (ctx: CopyactionContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.copyaction`.
	 * @param ctx the parse tree
	 */
	exitCopyaction?: (ctx: CopyactionContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.removeaction`.
	 * @param ctx the parse tree
	 */
	enterRemoveaction?: (ctx: RemoveactionContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.removeaction`.
	 * @param ctx the parse tree
	 */
	exitRemoveaction?: (ctx: RemoveactionContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.shuffleaction`.
	 * @param ctx the parse tree
	 */
	enterShuffleaction?: (ctx: ShuffleactionContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.shuffleaction`.
	 * @param ctx the parse tree
	 */
	exitShuffleaction?: (ctx: ShuffleactionContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.turnaction`.
	 * @param ctx the parse tree
	 */
	enterTurnaction?: (ctx: TurnactionContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.turnaction`.
	 * @param ctx the parse tree
	 */
	exitTurnaction?: (ctx: TurnactionContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.repeat`.
	 * @param ctx the parse tree
	 */
	enterRepeat?: (ctx: RepeatContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.repeat`.
	 * @param ctx the parse tree
	 */
	exitRepeat?: (ctx: RepeatContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.pointstorage`.
	 * @param ctx the parse tree
	 */
	enterPointstorage?: (ctx: PointstorageContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.pointstorage`.
	 * @param ctx the parse tree
	 */
	exitPointstorage?: (ctx: PointstorageContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.card`.
	 * @param ctx the parse tree
	 */
	enterCard?: (ctx: CardContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.card`.
	 * @param ctx the parse tree
	 */
	exitCard?: (ctx: CardContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.maxof`.
	 * @param ctx the parse tree
	 */
	enterMaxof?: (ctx: MaxofContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.maxof`.
	 * @param ctx the parse tree
	 */
	exitMaxof?: (ctx: MaxofContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.minof`.
	 * @param ctx the parse tree
	 */
	enterMinof?: (ctx: MinofContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.minof`.
	 * @param ctx the parse tree
	 */
	exitMinof?: (ctx: MinofContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.locpre`.
	 * @param ctx the parse tree
	 */
	enterLocpre?: (ctx: LocpreContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.locpre`.
	 * @param ctx the parse tree
	 */
	exitLocpre?: (ctx: LocpreContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.locdesc`.
	 * @param ctx the parse tree
	 */
	enterLocdesc?: (ctx: LocdescContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.locdesc`.
	 * @param ctx the parse tree
	 */
	exitLocdesc?: (ctx: LocdescContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.who`.
	 * @param ctx the parse tree
	 */
	enterWho?: (ctx: WhoContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.who`.
	 * @param ctx the parse tree
	 */
	exitWho?: (ctx: WhoContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.whop`.
	 * @param ctx the parse tree
	 */
	enterWhop?: (ctx: WhopContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.whop`.
	 * @param ctx the parse tree
	 */
	exitWhop?: (ctx: WhopContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.whot`.
	 * @param ctx the parse tree
	 */
	enterWhot?: (ctx: WhotContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.whot`.
	 * @param ctx the parse tree
	 */
	exitWhot?: (ctx: WhotContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.whodesc`.
	 * @param ctx the parse tree
	 */
	enterWhodesc?: (ctx: WhodescContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.whodesc`.
	 * @param ctx the parse tree
	 */
	exitWhodesc?: (ctx: WhodescContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.owner`.
	 * @param ctx the parse tree
	 */
	enterOwner?: (ctx: OwnerContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.owner`.
	 * @param ctx the parse tree
	 */
	exitOwner?: (ctx: OwnerContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.teamp`.
	 * @param ctx the parse tree
	 */
	enterTeamp?: (ctx: TeampContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.teamp`.
	 * @param ctx the parse tree
	 */
	exitTeamp?: (ctx: TeampContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.typed`.
	 * @param ctx the parse tree
	 */
	enterTyped?: (ctx: TypedContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.typed`.
	 * @param ctx the parse tree
	 */
	exitTyped?: (ctx: TypedContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.collection`.
	 * @param ctx the parse tree
	 */
	enterCollection?: (ctx: CollectionContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.collection`.
	 * @param ctx the parse tree
	 */
	exitCollection?: (ctx: CollectionContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.strcollection`.
	 * @param ctx the parse tree
	 */
	enterStrcollection?: (ctx: StrcollectionContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.strcollection`.
	 * @param ctx the parse tree
	 */
	exitStrcollection?: (ctx: StrcollectionContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.range`.
	 * @param ctx the parse tree
	 */
	enterRange?: (ctx: RangeContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.range`.
	 * @param ctx the parse tree
	 */
	exitRange?: (ctx: RangeContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.other`.
	 * @param ctx the parse tree
	 */
	enterOther?: (ctx: OtherContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.other`.
	 * @param ctx the parse tree
	 */
	exitOther?: (ctx: OtherContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.cstorage`.
	 * @param ctx the parse tree
	 */
	enterCstorage?: (ctx: CstorageContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.cstorage`.
	 * @param ctx the parse tree
	 */
	exitCstorage?: (ctx: CstorageContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.basecstorage`.
	 * @param ctx the parse tree
	 */
	enterBasecstorage?: (ctx: BasecstorageContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.basecstorage`.
	 * @param ctx the parse tree
	 */
	exitBasecstorage?: (ctx: BasecstorageContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.sortof`.
	 * @param ctx the parse tree
	 */
	enterSortof?: (ctx: SortofContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.sortof`.
	 * @param ctx the parse tree
	 */
	exitSortof?: (ctx: SortofContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.unionof`.
	 * @param ctx the parse tree
	 */
	enterUnionof?: (ctx: UnionofContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.unionof`.
	 * @param ctx the parse tree
	 */
	exitUnionof?: (ctx: UnionofContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.intersectof`.
	 * @param ctx the parse tree
	 */
	enterIntersectof?: (ctx: IntersectofContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.intersectof`.
	 * @param ctx the parse tree
	 */
	exitIntersectof?: (ctx: IntersectofContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.disjunctionof`.
	 * @param ctx the parse tree
	 */
	enterDisjunctionof?: (ctx: DisjunctionofContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.disjunctionof`.
	 * @param ctx the parse tree
	 */
	exitDisjunctionof?: (ctx: DisjunctionofContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.filter`.
	 * @param ctx the parse tree
	 */
	enterFilter?: (ctx: FilterContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.filter`.
	 * @param ctx the parse tree
	 */
	exitFilter?: (ctx: FilterContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.memstorage`.
	 * @param ctx the parse tree
	 */
	enterMemstorage?: (ctx: MemstorageContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.memstorage`.
	 * @param ctx the parse tree
	 */
	exitMemstorage?: (ctx: MemstorageContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.sequence`.
	 * @param ctx the parse tree
	 */
	enterSequence?: (ctx: SequenceContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.sequence`.
	 * @param ctx the parse tree
	 */
	exitSequence?: (ctx: SequenceContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.runsequence`.
	 * @param ctx the parse tree
	 */
	enterRunsequence?: (ctx: RunsequenceContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.runsequence`.
	 * @param ctx the parse tree
	 */
	exitRunsequence?: (ctx: RunsequenceContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.cstoragecollection`.
	 * @param ctx the parse tree
	 */
	enterCstoragecollection?: (ctx: CstoragecollectionContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.cstoragecollection`.
	 * @param ctx the parse tree
	 */
	exitCstoragecollection?: (ctx: CstoragecollectionContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.run`.
	 * @param ctx the parse tree
	 */
	enterRun?: (ctx: RunContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.run`.
	 * @param ctx the parse tree
	 */
	exitRun?: (ctx: RunContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.subset`.
	 * @param ctx the parse tree
	 */
	enterSubset?: (ctx: SubsetContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.subset`.
	 * @param ctx the parse tree
	 */
	exitSubset?: (ctx: SubsetContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.partition`.
	 * @param ctx the parse tree
	 */
	enterPartition?: (ctx: PartitionContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.partition`.
	 * @param ctx the parse tree
	 */
	exitPartition?: (ctx: PartitionContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.aggcs`.
	 * @param ctx the parse tree
	 */
	enterAggcs?: (ctx: AggcsContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.aggcs`.
	 * @param ctx the parse tree
	 */
	exitAggcs?: (ctx: AggcsContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.indexed`.
	 * @param ctx the parse tree
	 */
	enterIndexed?: (ctx: IndexedContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.indexed`.
	 * @param ctx the parse tree
	 */
	exitIndexed?: (ctx: IndexedContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.boolean`.
	 * @param ctx the parse tree
	 */
	enterBoolean?: (ctx: BooleanContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.boolean`.
	 * @param ctx the parse tree
	 */
	exitBoolean?: (ctx: BooleanContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.intop`.
	 * @param ctx the parse tree
	 */
	enterIntop?: (ctx: IntopContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.intop`.
	 * @param ctx the parse tree
	 */
	exitIntop?: (ctx: IntopContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.aggb`.
	 * @param ctx the parse tree
	 */
	enterAggb?: (ctx: AggbContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.aggb`.
	 * @param ctx the parse tree
	 */
	exitAggb?: (ctx: AggbContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.int`.
	 * @param ctx the parse tree
	 */
	enterInt?: (ctx: IntContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.int`.
	 * @param ctx the parse tree
	 */
	exitInt?: (ctx: IntContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.intgr`.
	 * @param ctx the parse tree
	 */
	enterIntgr?: (ctx: IntgrContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.intgr`.
	 * @param ctx the parse tree
	 */
	exitIntgr?: (ctx: IntgrContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.sum`.
	 * @param ctx the parse tree
	 */
	enterSum?: (ctx: SumContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.sum`.
	 * @param ctx the parse tree
	 */
	exitSum?: (ctx: SumContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.scoremax`.
	 * @param ctx the parse tree
	 */
	enterScoremax?: (ctx: ScoremaxContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.scoremax`.
	 * @param ctx the parse tree
	 */
	exitScoremax?: (ctx: ScoremaxContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.scoremin`.
	 * @param ctx the parse tree
	 */
	enterScoremin?: (ctx: ScoreminContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.scoremin`.
	 * @param ctx the parse tree
	 */
	exitScoremin?: (ctx: ScoreminContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.score`.
	 * @param ctx the parse tree
	 */
	enterScore?: (ctx: ScoreContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.score`.
	 * @param ctx the parse tree
	 */
	exitScore?: (ctx: ScoreContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.add`.
	 * @param ctx the parse tree
	 */
	enterAdd?: (ctx: AddContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.add`.
	 * @param ctx the parse tree
	 */
	exitAdd?: (ctx: AddContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.mult`.
	 * @param ctx the parse tree
	 */
	enterMult?: (ctx: MultContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.mult`.
	 * @param ctx the parse tree
	 */
	exitMult?: (ctx: MultContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.subtract`.
	 * @param ctx the parse tree
	 */
	enterSubtract?: (ctx: SubtractContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.subtract`.
	 * @param ctx the parse tree
	 */
	exitSubtract?: (ctx: SubtractContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.mod`.
	 * @param ctx the parse tree
	 */
	enterMod?: (ctx: ModContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.mod`.
	 * @param ctx the parse tree
	 */
	exitMod?: (ctx: ModContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.divide`.
	 * @param ctx the parse tree
	 */
	enterDivide?: (ctx: DivideContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.divide`.
	 * @param ctx the parse tree
	 */
	exitDivide?: (ctx: DivideContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.exponent`.
	 * @param ctx the parse tree
	 */
	enterExponent?: (ctx: ExponentContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.exponent`.
	 * @param ctx the parse tree
	 */
	exitExponent?: (ctx: ExponentContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.triangular`.
	 * @param ctx the parse tree
	 */
	enterTriangular?: (ctx: TriangularContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.triangular`.
	 * @param ctx the parse tree
	 */
	exitTriangular?: (ctx: TriangularContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.fibonacci`.
	 * @param ctx the parse tree
	 */
	enterFibonacci?: (ctx: FibonacciContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.fibonacci`.
	 * @param ctx the parse tree
	 */
	exitFibonacci?: (ctx: FibonacciContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.random`.
	 * @param ctx the parse tree
	 */
	enterRandom?: (ctx: RandomContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.random`.
	 * @param ctx the parse tree
	 */
	exitRandom?: (ctx: RandomContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.sizeof`.
	 * @param ctx the parse tree
	 */
	enterSizeof?: (ctx: SizeofContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.sizeof`.
	 * @param ctx the parse tree
	 */
	exitSizeof?: (ctx: SizeofContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.aggi`.
	 * @param ctx the parse tree
	 */
	enterAggi?: (ctx: AggiContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.aggi`.
	 * @param ctx the parse tree
	 */
	exitAggi?: (ctx: AggiContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.rawstorage`.
	 * @param ctx the parse tree
	 */
	enterRawstorage?: (ctx: RawstorageContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.rawstorage`.
	 * @param ctx the parse tree
	 */
	exitRawstorage?: (ctx: RawstorageContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.pid`.
	 * @param ctx the parse tree
	 */
	enterPid?: (ctx: PidContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.pid`.
	 * @param ctx the parse tree
	 */
	exitPid?: (ctx: PidContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.tid`.
	 * @param ctx the parse tree
	 */
	enterTid?: (ctx: TidContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.tid`.
	 * @param ctx the parse tree
	 */
	exitTid?: (ctx: TidContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.str`.
	 * @param ctx the parse tree
	 */
	enterStr?: (ctx: StrContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.str`.
	 * @param ctx the parse tree
	 */
	exitStr?: (ctx: StrContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.strstorage`.
	 * @param ctx the parse tree
	 */
	enterStrstorage?: (ctx: StrstorageContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.strstorage`.
	 * @param ctx the parse tree
	 */
	exitStrstorage?: (ctx: StrstorageContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.cardatt`.
	 * @param ctx the parse tree
	 */
	enterCardatt?: (ctx: CardattContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.cardatt`.
	 * @param ctx the parse tree
	 */
	exitCardatt?: (ctx: CardattContext) => void;

	/**
	 * Enter a parse tree produced by `RecycleParser.namegr`.
	 * @param ctx the parse tree
	 */
	enterNamegr?: (ctx: NamegrContext) => void;
	/**
	 * Exit a parse tree produced by `RecycleParser.namegr`.
	 * @param ctx the parse tree
	 */
	exitNamegr?: (ctx: NamegrContext) => void;
}

