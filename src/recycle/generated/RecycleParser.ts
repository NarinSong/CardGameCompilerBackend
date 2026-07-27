// Generated from src/recycle/Recycle.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { RecycleListener } from "./RecycleListener.js";
import { RecycleVisitor } from "./RecycleVisitor.js";


export class RecycleParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly T__22 = 23;
	public static readonly T__23 = 24;
	public static readonly T__24 = 25;
	public static readonly T__25 = 26;
	public static readonly T__26 = 27;
	public static readonly T__27 = 28;
	public static readonly T__28 = 29;
	public static readonly T__29 = 30;
	public static readonly T__30 = 31;
	public static readonly T__31 = 32;
	public static readonly T__32 = 33;
	public static readonly T__33 = 34;
	public static readonly T__34 = 35;
	public static readonly T__35 = 36;
	public static readonly T__36 = 37;
	public static readonly T__37 = 38;
	public static readonly T__38 = 39;
	public static readonly T__39 = 40;
	public static readonly T__40 = 41;
	public static readonly T__41 = 42;
	public static readonly T__42 = 43;
	public static readonly T__43 = 44;
	public static readonly T__44 = 45;
	public static readonly T__45 = 46;
	public static readonly T__46 = 47;
	public static readonly T__47 = 48;
	public static readonly T__48 = 49;
	public static readonly T__49 = 50;
	public static readonly T__50 = 51;
	public static readonly T__51 = 52;
	public static readonly T__52 = 53;
	public static readonly T__53 = 54;
	public static readonly T__54 = 55;
	public static readonly T__55 = 56;
	public static readonly T__56 = 57;
	public static readonly T__57 = 58;
	public static readonly T__58 = 59;
	public static readonly T__59 = 60;
	public static readonly T__60 = 61;
	public static readonly T__61 = 62;
	public static readonly T__62 = 63;
	public static readonly T__63 = 64;
	public static readonly T__64 = 65;
	public static readonly T__65 = 66;
	public static readonly T__66 = 67;
	public static readonly T__67 = 68;
	public static readonly T__68 = 69;
	public static readonly T__69 = 70;
	public static readonly T__70 = 71;
	public static readonly T__71 = 72;
	public static readonly T__72 = 73;
	public static readonly T__73 = 74;
	public static readonly T__74 = 75;
	public static readonly T__75 = 76;
	public static readonly T__76 = 77;
	public static readonly T__77 = 78;
	public static readonly T__78 = 79;
	public static readonly T__79 = 80;
	public static readonly T__80 = 81;
	public static readonly T__81 = 82;
	public static readonly T__82 = 83;
	public static readonly T__83 = 84;
	public static readonly BOOLOP = 85;
	public static readonly COMPOP = 86;
	public static readonly EQOP = 87;
	public static readonly UNOP = 88;
	public static readonly INTNUM = 89;
	public static readonly LETT = 90;
	public static readonly OPEN = 91;
	public static readonly CLOSE = 92;
	public static readonly WS = 93;
	public static readonly ANY = 94;
	public static readonly RULE_var = 0;
	public static readonly RULE_vars = 1;
	public static readonly RULE_varo = 2;
	public static readonly RULE_varp = 3;
	public static readonly RULE_vari = 4;
	public static readonly RULE_varb = 5;
	public static readonly RULE_varc = 6;
	public static readonly RULE_varcs = 7;
	public static readonly RULE_varcsc = 8;
	public static readonly RULE_varcard = 9;
	public static readonly RULE_game = 10;
	public static readonly RULE_declare = 11;
	public static readonly RULE_setup = 12;
	public static readonly RULE_scoring = 13;
	public static readonly RULE_stage = 14;
	public static readonly RULE_endcondition = 15;
	public static readonly RULE_multiaction = 16;
	public static readonly RULE_multiaction2 = 17;
	public static readonly RULE_condact = 18;
	public static readonly RULE_agg = 19;
	public static readonly RULE_let = 20;
	public static readonly RULE_action = 21;
	public static readonly RULE_playercreate = 22;
	public static readonly RULE_teamcreate = 23;
	public static readonly RULE_teams = 24;
	public static readonly RULE_deckcreate = 25;
	public static readonly RULE_deck = 26;
	public static readonly RULE_attribute = 27;
	public static readonly RULE_initpoints = 28;
	public static readonly RULE_updatepoints = 29;
	public static readonly RULE_awards = 30;
	public static readonly RULE_subaward = 31;
	public static readonly RULE_cycleaction = 32;
	public static readonly RULE_setaction = 33;
	public static readonly RULE_setstraction = 34;
	public static readonly RULE_incaction = 35;
	public static readonly RULE_decaction = 36;
	public static readonly RULE_moveaction = 37;
	public static readonly RULE_swapaction = 38;
	public static readonly RULE_copyaction = 39;
	public static readonly RULE_removeaction = 40;
	public static readonly RULE_shuffleaction = 41;
	public static readonly RULE_turnaction = 42;
	public static readonly RULE_repeat = 43;
	public static readonly RULE_pointstorage = 44;
	public static readonly RULE_card = 45;
	public static readonly RULE_maxof = 46;
	public static readonly RULE_minof = 47;
	public static readonly RULE_locpre = 48;
	public static readonly RULE_locdesc = 49;
	public static readonly RULE_who = 50;
	public static readonly RULE_whop = 51;
	public static readonly RULE_whot = 52;
	public static readonly RULE_whodesc = 53;
	public static readonly RULE_owner = 54;
	public static readonly RULE_teamp = 55;
	public static readonly RULE_typed = 56;
	public static readonly RULE_collection = 57;
	public static readonly RULE_strcollection = 58;
	public static readonly RULE_range = 59;
	public static readonly RULE_other = 60;
	public static readonly RULE_cstorage = 61;
	public static readonly RULE_basecstorage = 62;
	public static readonly RULE_sortof = 63;
	public static readonly RULE_unionof = 64;
	public static readonly RULE_intersectof = 65;
	public static readonly RULE_disjunctionof = 66;
	public static readonly RULE_filter = 67;
	public static readonly RULE_memstorage = 68;
	public static readonly RULE_sequence = 69;
	public static readonly RULE_runsequence = 70;
	public static readonly RULE_cstoragecollection = 71;
	public static readonly RULE_run = 72;
	public static readonly RULE_subset = 73;
	public static readonly RULE_partition = 74;
	public static readonly RULE_aggcs = 75;
	public static readonly RULE_indexed = 76;
	public static readonly RULE_boolean = 77;
	public static readonly RULE_intop = 78;
	public static readonly RULE_aggb = 79;
	public static readonly RULE_int = 80;
	public static readonly RULE_intgr = 81;
	public static readonly RULE_sum = 82;
	public static readonly RULE_scoremax = 83;
	public static readonly RULE_scoremin = 84;
	public static readonly RULE_score = 85;
	public static readonly RULE_add = 86;
	public static readonly RULE_mult = 87;
	public static readonly RULE_subtract = 88;
	public static readonly RULE_mod = 89;
	public static readonly RULE_divide = 90;
	public static readonly RULE_exponent = 91;
	public static readonly RULE_triangular = 92;
	public static readonly RULE_fibonacci = 93;
	public static readonly RULE_random = 94;
	public static readonly RULE_sizeof = 95;
	public static readonly RULE_aggi = 96;
	public static readonly RULE_rawstorage = 97;
	public static readonly RULE_pid = 98;
	public static readonly RULE_tid = 99;
	public static readonly RULE_str = 100;
	public static readonly RULE_strstorage = 101;
	public static readonly RULE_cardatt = 102;
	public static readonly RULE_namegr = 103;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"var", "vars", "varo", "varp", "vari", "varb", "varc", "varcs", "varcsc", 
		"varcard", "game", "declare", "setup", "scoring", "stage", "endcondition", 
		"multiaction", "multiaction2", "condact", "agg", "let", "action", "playercreate", 
		"teamcreate", "teams", "deckcreate", "deck", "attribute", "initpoints", 
		"updatepoints", "awards", "subaward", "cycleaction", "setaction", "setstraction", 
		"incaction", "decaction", "moveaction", "swapaction", "copyaction", "removeaction", 
		"shuffleaction", "turnaction", "repeat", "pointstorage", "card", "maxof", 
		"minof", "locpre", "locdesc", "who", "whop", "whot", "whodesc", "owner", 
		"teamp", "typed", "collection", "strcollection", "range", "other", "cstorage", 
		"basecstorage", "sortof", "unionof", "intersectof", "disjunctionof", "filter", 
		"memstorage", "sequence", "runsequence", "cstoragecollection", "run", 
		"subset", "partition", "aggcs", "indexed", "boolean", "intop", "aggb", 
		"int", "intgr", "sum", "scoremax", "scoremin", "score", "add", "mult", 
		"subtract", "mod", "divide", "exponent", "triangular", "fibonacci", "random", 
		"sizeof", "aggi", "rawstorage", "pid", "tid", "str", "strstorage", "cardatt", 
		"namegr",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'''", "'game'", "'declare'", "'setup'", "'scoring'", "'min'", 
		"'max'", "'stage'", "'player'", "'team'", "'simultaneous'", "'once'", 
		"'end'", "'choice'", "'do'", "'any'", "'all'", "'let'", "'create'", "'players'", 
		"'teams'", "','", "'deck'", "'set'", "'update'", "':'", "'cycle'", "'next'", 
		"'current'", "'inc'", "'dec'", "'move'", "'swap'", "'remember'", "'forget'", 
		"'shuffle'", "'faro'", "'turn'", "'pass'", "'repeat'", "'points'", "'top'", 
		"'bottom'", "'using'", "'vloc'", "'iloc'", "'hloc'", "'oloc'", "'mem'", 
		"'previous'", "'owner'", "'range'", "'..'", "'other'", "'sort'", "'union'", 
		"'intersect'", "'disjunction'", "'filter'", "'run'", "'runs'", "'largest'", 
		"'subsets'", "'partition'", "'indexed'", "'sum'", "'scoremax'", "'scoremin'", 
		"'score'", "'+'", "'*'", "'-'", "'%'", "'//'", "'^'", "'tri'", "'fib'", 
		"'random'", "'size'", "'sto'", "'pid'", "'tid'", "'str'", "'cardatt'", 
		undefined, undefined, undefined, "'not'", undefined, undefined, "'('", 
		"')'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, "BOOLOP", "COMPOP", "EQOP", "UNOP", "INTNUM", "LETT", "OPEN", 
		"CLOSE", "WS", "ANY",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(RecycleParser._LITERAL_NAMES, RecycleParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return RecycleParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Recycle.g4"; }

	// @Override
	public get ruleNames(): string[] { return RecycleParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return RecycleParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(RecycleParser._ATN, this);
	}
	// @RuleVersion(0)
	public var(): VarContext {
		let _localctx: VarContext = new VarContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, RecycleParser.RULE_var);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 208;
			this.match(RecycleParser.T__0);
			this.state = 209;
			this.namegr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public vars(): VarsContext {
		let _localctx: VarsContext = new VarsContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, RecycleParser.RULE_vars);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 211;
			this.match(RecycleParser.T__0);
			this.state = 212;
			this.namegr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public varo(): VaroContext {
		let _localctx: VaroContext = new VaroContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, RecycleParser.RULE_varo);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 214;
			this.match(RecycleParser.T__0);
			this.state = 215;
			this.namegr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public varp(): VarpContext {
		let _localctx: VarpContext = new VarpContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, RecycleParser.RULE_varp);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 217;
			this.match(RecycleParser.T__0);
			this.state = 218;
			this.namegr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public vari(): VariContext {
		let _localctx: VariContext = new VariContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, RecycleParser.RULE_vari);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 220;
			this.match(RecycleParser.T__0);
			this.state = 221;
			this.namegr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public varb(): VarbContext {
		let _localctx: VarbContext = new VarbContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, RecycleParser.RULE_varb);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 223;
			this.match(RecycleParser.T__0);
			this.state = 224;
			this.namegr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public varc(): VarcContext {
		let _localctx: VarcContext = new VarcContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, RecycleParser.RULE_varc);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 226;
			this.match(RecycleParser.T__0);
			this.state = 227;
			this.namegr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public varcs(): VarcsContext {
		let _localctx: VarcsContext = new VarcsContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, RecycleParser.RULE_varcs);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 229;
			this.match(RecycleParser.T__0);
			this.state = 230;
			this.namegr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public varcsc(): VarcscContext {
		let _localctx: VarcscContext = new VarcscContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, RecycleParser.RULE_varcsc);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 232;
			this.match(RecycleParser.T__0);
			this.state = 233;
			this.namegr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public varcard(): VarcardContext {
		let _localctx: VarcardContext = new VarcardContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, RecycleParser.RULE_varcard);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 235;
			this.match(RecycleParser.T__0);
			this.state = 236;
			this.namegr();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public game(): GameContext {
		let _localctx: GameContext = new GameContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, RecycleParser.RULE_game);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 238;
			this.match(RecycleParser.OPEN);
			this.state = 239;
			this.match(RecycleParser.T__1);
			this.state = 243;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 240;
					this.declare();
					}
					}
				}
				this.state = 245;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 0, this._ctx);
			}
			this.state = 246;
			this.setup();
			this.state = 249;
			this._errHandler.sync(this);
			_alt = 1 + 1;
			do {
				switch (_alt) {
				case 1 + 1:
					{
					this.state = 249;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
					case 1:
						{
						this.state = 247;
						this.multiaction();
						}
						break;

					case 2:
						{
						this.state = 248;
						this.stage();
						}
						break;
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 251;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 2, this._ctx);
			} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 253;
			this.scoring();
			this.state = 254;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public declare(): DeclareContext {
		let _localctx: DeclareContext = new DeclareContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, RecycleParser.RULE_declare);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 256;
			this.match(RecycleParser.OPEN);
			this.state = 257;
			this.match(RecycleParser.T__2);
			this.state = 258;
			this.typed();
			this.state = 259;
			this.var();
			this.state = 260;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public setup(): SetupContext {
		let _localctx: SetupContext = new SetupContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, RecycleParser.RULE_setup);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 262;
			this.match(RecycleParser.OPEN);
			this.state = 263;
			this.match(RecycleParser.T__3);
			this.state = 264;
			this.playercreate();
			this.state = 266;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
			case 1:
				{
				this.state = 265;
				this.teamcreate();
				}
				break;
			}
			this.state = 275;
			this._errHandler.sync(this);
			_alt = 1 + 1;
			do {
				switch (_alt) {
				case 1 + 1:
					{
					{
					this.state = 268;
					this.match(RecycleParser.OPEN);
					this.state = 271;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case RecycleParser.T__18:
						{
						this.state = 269;
						this.deckcreate();
						}
						break;
					case RecycleParser.T__39:
						{
						this.state = 270;
						this.repeat();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 273;
					this.match(RecycleParser.CLOSE);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 277;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 5, this._ctx);
			} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 279;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public scoring(): ScoringContext {
		let _localctx: ScoringContext = new ScoringContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, RecycleParser.RULE_scoring);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 281;
			this.match(RecycleParser.OPEN);
			this.state = 282;
			this.match(RecycleParser.T__4);
			this.state = 283;
			_la = this._input.LA(1);
			if (!(_la === RecycleParser.T__5 || _la === RecycleParser.T__6)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 284;
			this.int();
			this.state = 285;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stage(): StageContext {
		let _localctx: StageContext = new StageContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, RecycleParser.RULE_stage);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 287;
			this.match(RecycleParser.OPEN);
			this.state = 288;
			this.match(RecycleParser.T__7);
			this.state = 289;
			_la = this._input.LA(1);
			if (!(_la === RecycleParser.T__8 || _la === RecycleParser.T__9)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 293;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RecycleParser.OPEN:
				{
				this.state = 290;
				this.endcondition();
				}
				break;
			case RecycleParser.T__10:
				{
				this.state = 291;
				this.match(RecycleParser.T__10);
				}
				break;
			case RecycleParser.T__11:
				{
				this.state = 292;
				this.match(RecycleParser.T__11);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 297;
			this._errHandler.sync(this);
			_alt = 1 + 1;
			do {
				switch (_alt) {
				case 1 + 1:
					{
					this.state = 297;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 7, this._ctx) ) {
					case 1:
						{
						this.state = 295;
						this.multiaction();
						}
						break;

					case 2:
						{
						this.state = 296;
						this.stage();
						}
						break;
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 299;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 8, this._ctx);
			} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 301;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public endcondition(): EndconditionContext {
		let _localctx: EndconditionContext = new EndconditionContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, RecycleParser.RULE_endcondition);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 303;
			this.match(RecycleParser.OPEN);
			this.state = 304;
			this.match(RecycleParser.T__12);
			this.state = 305;
			this.boolean();
			this.state = 306;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public multiaction(): MultiactionContext {
		let _localctx: MultiactionContext = new MultiactionContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, RecycleParser.RULE_multiaction);
		try {
			let _alt: number;
			this.state = 332;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 11, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 308;
				this.match(RecycleParser.OPEN);
				this.state = 309;
				this.match(RecycleParser.T__13);
				this.state = 310;
				this.match(RecycleParser.OPEN);
				this.state = 312;
				this._errHandler.sync(this);
				_alt = 1 + 1;
				do {
					switch (_alt) {
					case 1 + 1:
						{
						{
						this.state = 311;
						this.condact();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 314;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 9, this._ctx);
				} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
				this.state = 316;
				this.match(RecycleParser.CLOSE);
				this.state = 317;
				this.match(RecycleParser.CLOSE);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 319;
				this.match(RecycleParser.OPEN);
				this.state = 320;
				this.match(RecycleParser.T__14);
				this.state = 321;
				this.match(RecycleParser.OPEN);
				this.state = 323;
				this._errHandler.sync(this);
				_alt = 1 + 1;
				do {
					switch (_alt) {
					case 1 + 1:
						{
						{
						this.state = 322;
						this.condact();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 325;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 10, this._ctx);
				} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
				this.state = 327;
				this.match(RecycleParser.CLOSE);
				this.state = 328;
				this.match(RecycleParser.CLOSE);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 330;
				this.agg();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 331;
				this.let();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public multiaction2(): Multiaction2Context {
		let _localctx: Multiaction2Context = new Multiaction2Context(this._ctx, this.state);
		this.enterRule(_localctx, 34, RecycleParser.RULE_multiaction2);
		try {
			let _alt: number;
			this.state = 347;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 13, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 334;
				this.match(RecycleParser.OPEN);
				this.state = 335;
				this.match(RecycleParser.T__14);
				this.state = 336;
				this.match(RecycleParser.OPEN);
				this.state = 338;
				this._errHandler.sync(this);
				_alt = 1 + 1;
				do {
					switch (_alt) {
					case 1 + 1:
						{
						{
						this.state = 337;
						this.condact();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 340;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 12, this._ctx);
				} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
				this.state = 342;
				this.match(RecycleParser.CLOSE);
				this.state = 343;
				this.match(RecycleParser.CLOSE);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 345;
				this.agg();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 346;
				this.let();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public condact(): CondactContext {
		let _localctx: CondactContext = new CondactContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, RecycleParser.RULE_condact);
		try {
			this.state = 361;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 349;
				this.match(RecycleParser.OPEN);
				this.state = 350;
				this.boolean();
				this.state = 351;
				this.multiaction2();
				this.state = 352;
				this.match(RecycleParser.CLOSE);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 354;
				this.multiaction2();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 355;
				this.match(RecycleParser.OPEN);
				this.state = 356;
				this.boolean();
				this.state = 357;
				this.action();
				this.state = 358;
				this.match(RecycleParser.CLOSE);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 360;
				this.action();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public agg(): AggContext {
		let _localctx: AggContext = new AggContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, RecycleParser.RULE_agg);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 363;
			this.match(RecycleParser.OPEN);
			this.state = 364;
			_la = this._input.LA(1);
			if (!(_la === RecycleParser.T__15 || _la === RecycleParser.T__16)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 365;
			this.collection();
			this.state = 366;
			this.var();
			this.state = 367;
			this.condact();
			this.state = 368;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public let(): LetContext {
		let _localctx: LetContext = new LetContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, RecycleParser.RULE_let);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 370;
			this.match(RecycleParser.OPEN);
			this.state = 371;
			this.match(RecycleParser.T__17);
			this.state = 372;
			this.typed();
			this.state = 373;
			this.var();
			this.state = 377;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 15, this._ctx) ) {
			case 1:
				{
				this.state = 374;
				this.multiaction();
				}
				break;

			case 2:
				{
				this.state = 375;
				this.action();
				}
				break;

			case 3:
				{
				this.state = 376;
				this.condact();
				}
				break;
			}
			this.state = 379;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public action(): ActionContext {
		let _localctx: ActionContext = new ActionContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, RecycleParser.RULE_action);
		try {
			this.state = 403;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 17, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 381;
				this.match(RecycleParser.OPEN);
				this.state = 398;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 16, this._ctx) ) {
				case 1:
					{
					this.state = 382;
					this.initpoints();
					}
					break;

				case 2:
					{
					this.state = 383;
					this.teamcreate();
					}
					break;

				case 3:
					{
					this.state = 384;
					this.deckcreate();
					}
					break;

				case 4:
					{
					this.state = 385;
					this.cycleaction();
					}
					break;

				case 5:
					{
					this.state = 386;
					this.setaction();
					}
					break;

				case 6:
					{
					this.state = 387;
					this.moveaction();
					}
					break;

				case 7:
					{
					this.state = 388;
					this.copyaction();
					}
					break;

				case 8:
					{
					this.state = 389;
					this.swapaction();
					}
					break;

				case 9:
					{
					this.state = 390;
					this.updatepoints();
					}
					break;

				case 10:
					{
					this.state = 391;
					this.incaction();
					}
					break;

				case 11:
					{
					this.state = 392;
					this.setstraction();
					}
					break;

				case 12:
					{
					this.state = 393;
					this.decaction();
					}
					break;

				case 13:
					{
					this.state = 394;
					this.removeaction();
					}
					break;

				case 14:
					{
					this.state = 395;
					this.turnaction();
					}
					break;

				case 15:
					{
					this.state = 396;
					this.shuffleaction();
					}
					break;

				case 16:
					{
					this.state = 397;
					this.repeat();
					}
					break;
				}
				this.state = 400;
				this.match(RecycleParser.CLOSE);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 402;
				this.agg();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public playercreate(): PlayercreateContext {
		let _localctx: PlayercreateContext = new PlayercreateContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, RecycleParser.RULE_playercreate);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 405;
			this.match(RecycleParser.OPEN);
			this.state = 406;
			this.match(RecycleParser.T__18);
			this.state = 407;
			this.match(RecycleParser.T__19);
			this.state = 408;
			this.int();
			this.state = 409;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public teamcreate(): TeamcreateContext {
		let _localctx: TeamcreateContext = new TeamcreateContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, RecycleParser.RULE_teamcreate);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 411;
			this.match(RecycleParser.OPEN);
			this.state = 412;
			this.match(RecycleParser.T__18);
			this.state = 413;
			this.match(RecycleParser.T__20);
			this.state = 415;
			this._errHandler.sync(this);
			_alt = 1 + 1;
			do {
				switch (_alt) {
				case 1 + 1:
					{
					{
					this.state = 414;
					this.teams();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 417;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 18, this._ctx);
			} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 419;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public teams(): TeamsContext {
		let _localctx: TeamsContext = new TeamsContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, RecycleParser.RULE_teams);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 421;
			this.match(RecycleParser.OPEN);
			this.state = 426;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 19, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 422;
					this.match(RecycleParser.INTNUM);
					this.state = 423;
					this.match(RecycleParser.T__21);
					}
					}
				}
				this.state = 428;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 19, this._ctx);
			}
			this.state = 429;
			this.match(RecycleParser.INTNUM);
			this.state = 433;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 20, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 430;
					this.teams();
					}
					}
				}
				this.state = 435;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 20, this._ctx);
			}
			this.state = 436;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public deckcreate(): DeckcreateContext {
		let _localctx: DeckcreateContext = new DeckcreateContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, RecycleParser.RULE_deckcreate);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 438;
			this.match(RecycleParser.T__18);
			this.state = 439;
			this.match(RecycleParser.T__22);
			this.state = 441;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 21, this._ctx) ) {
			case 1:
				{
				this.state = 440;
				this.str();
				}
				break;
			}
			this.state = 443;
			this.cstorage();
			this.state = 444;
			this.deck();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public deck(): DeckContext {
		let _localctx: DeckContext = new DeckContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, RecycleParser.RULE_deck);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 446;
			this.match(RecycleParser.OPEN);
			this.state = 447;
			this.match(RecycleParser.T__22);
			this.state = 449;
			this._errHandler.sync(this);
			_alt = 1 + 1;
			do {
				switch (_alt) {
				case 1 + 1:
					{
					{
					this.state = 448;
					this.attribute();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 451;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 22, this._ctx);
			} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 453;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public attribute(): AttributeContext {
		let _localctx: AttributeContext = new AttributeContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, RecycleParser.RULE_attribute);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 455;
			this.match(RecycleParser.OPEN);
			this.state = 461;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 23, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 456;
					this.namegr();
					this.state = 457;
					this.match(RecycleParser.T__21);
					}
					}
				}
				this.state = 463;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 23, this._ctx);
			}
			this.state = 464;
			this.namegr();
			this.state = 468;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 24, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 465;
					this.attribute();
					}
					}
				}
				this.state = 470;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 24, this._ctx);
			}
			this.state = 471;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public initpoints(): InitpointsContext {
		let _localctx: InitpointsContext = new InitpointsContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, RecycleParser.RULE_initpoints);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 473;
			this.match(RecycleParser.T__23);
			this.state = 474;
			this.pointstorage();
			this.state = 475;
			this.match(RecycleParser.OPEN);
			this.state = 477;
			this._errHandler.sync(this);
			_alt = 1 + 1;
			do {
				switch (_alt) {
				case 1 + 1:
					{
					{
					this.state = 476;
					this.awards();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 479;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 25, this._ctx);
			} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 481;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public updatepoints(): UpdatepointsContext {
		let _localctx: UpdatepointsContext = new UpdatepointsContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, RecycleParser.RULE_updatepoints);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 483;
			this.match(RecycleParser.T__24);
			this.state = 484;
			this.pointstorage();
			this.state = 485;
			this.match(RecycleParser.OPEN);
			this.state = 487;
			this._errHandler.sync(this);
			_alt = 1 + 1;
			do {
				switch (_alt) {
				case 1 + 1:
					{
					{
					this.state = 486;
					this.awards();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 489;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 26, this._ctx);
			} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 491;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public awards(): AwardsContext {
		let _localctx: AwardsContext = new AwardsContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, RecycleParser.RULE_awards);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 493;
			this.match(RecycleParser.OPEN);
			this.state = 495;
			this._errHandler.sync(this);
			_alt = 1 + 1;
			do {
				switch (_alt) {
				case 1 + 1:
					{
					{
					this.state = 494;
					this.subaward();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 497;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 27, this._ctx);
			} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 499;
			this.int();
			this.state = 500;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subaward(): SubawardContext {
		let _localctx: SubawardContext = new SubawardContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, RecycleParser.RULE_subaward);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 502;
			this.match(RecycleParser.OPEN);
			this.state = 503;
			this.str();
			this.state = 504;
			this.match(RecycleParser.T__25);
			this.state = 505;
			this.str();
			this.state = 506;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public cycleaction(): CycleactionContext {
		let _localctx: CycleactionContext = new CycleactionContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, RecycleParser.RULE_cycleaction);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 508;
			this.match(RecycleParser.T__26);
			this.state = 509;
			_la = this._input.LA(1);
			if (!(_la === RecycleParser.T__27 || _la === RecycleParser.T__28)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 512;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RecycleParser.OPEN:
				{
				this.state = 510;
				this.whop();
				}
				break;
			case RecycleParser.T__0:
				{
				this.state = 511;
				this.varp();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public setaction(): SetactionContext {
		let _localctx: SetactionContext = new SetactionContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, RecycleParser.RULE_setaction);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 514;
			this.match(RecycleParser.T__23);
			this.state = 515;
			this.rawstorage();
			this.state = 516;
			this.int();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public setstraction(): SetstractionContext {
		let _localctx: SetstractionContext = new SetstractionContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, RecycleParser.RULE_setstraction);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 518;
			this.match(RecycleParser.T__23);
			this.state = 519;
			this.strstorage();
			this.state = 520;
			this.str();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public incaction(): IncactionContext {
		let _localctx: IncactionContext = new IncactionContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, RecycleParser.RULE_incaction);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 522;
			this.match(RecycleParser.T__29);
			this.state = 523;
			this.rawstorage();
			this.state = 525;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === RecycleParser.T__0 || _la === RecycleParser.INTNUM || _la === RecycleParser.OPEN) {
				{
				this.state = 524;
				this.int();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public decaction(): DecactionContext {
		let _localctx: DecactionContext = new DecactionContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, RecycleParser.RULE_decaction);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 527;
			this.match(RecycleParser.T__30);
			this.state = 528;
			this.rawstorage();
			this.state = 530;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === RecycleParser.T__0 || _la === RecycleParser.INTNUM || _la === RecycleParser.OPEN) {
				{
				this.state = 529;
				this.int();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public moveaction(): MoveactionContext {
		let _localctx: MoveactionContext = new MoveactionContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, RecycleParser.RULE_moveaction);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 532;
			this.match(RecycleParser.T__31);
			this.state = 533;
			this.card();
			this.state = 534;
			this.card();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public swapaction(): SwapactionContext {
		let _localctx: SwapactionContext = new SwapactionContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, RecycleParser.RULE_swapaction);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 536;
			this.match(RecycleParser.T__32);
			this.state = 543;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 31, this._ctx) ) {
			case 1:
				{
				{
				this.state = 537;
				this.card();
				this.state = 538;
				this.card();
				}
				}
				break;

			case 2:
				{
				{
				this.state = 540;
				this.basecstorage();
				this.state = 541;
				this.basecstorage();
				}
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public copyaction(): CopyactionContext {
		let _localctx: CopyactionContext = new CopyactionContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, RecycleParser.RULE_copyaction);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 545;
			this.match(RecycleParser.T__33);
			this.state = 546;
			this.card();
			this.state = 547;
			this.card();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public removeaction(): RemoveactionContext {
		let _localctx: RemoveactionContext = new RemoveactionContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, RecycleParser.RULE_removeaction);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 549;
			this.match(RecycleParser.T__34);
			this.state = 550;
			this.card();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public shuffleaction(): ShuffleactionContext {
		let _localctx: ShuffleactionContext = new ShuffleactionContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, RecycleParser.RULE_shuffleaction);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 552;
			this.match(RecycleParser.T__35);
			this.state = 558;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RecycleParser.T__0:
			case RecycleParser.OPEN:
				{
				this.state = 553;
				this.cstorage();
				}
				break;
			case RecycleParser.T__36:
				{
				this.state = 554;
				this.match(RecycleParser.T__36);
				this.state = 555;
				this.cstorage();
				this.state = 556;
				this.cstorage();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public turnaction(): TurnactionContext {
		let _localctx: TurnactionContext = new TurnactionContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, RecycleParser.RULE_turnaction);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 560;
			this.match(RecycleParser.T__37);
			this.state = 561;
			this.match(RecycleParser.T__38);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public repeat(): RepeatContext {
		let _localctx: RepeatContext = new RepeatContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, RecycleParser.RULE_repeat);
		try {
			this.state = 576;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 34, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 563;
				this.match(RecycleParser.T__39);
				this.state = 564;
				this.int();
				this.state = 565;
				this.action();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 567;
				this.match(RecycleParser.T__39);
				this.state = 568;
				this.match(RecycleParser.T__16);
				this.state = 569;
				this.match(RecycleParser.OPEN);
				this.state = 572;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case RecycleParser.T__31:
					{
					this.state = 570;
					this.moveaction();
					}
					break;
				case RecycleParser.T__34:
					{
					this.state = 571;
					this.removeaction();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 574;
				this.match(RecycleParser.CLOSE);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public pointstorage(): PointstorageContext {
		let _localctx: PointstorageContext = new PointstorageContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, RecycleParser.RULE_pointstorage);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 578;
			this.match(RecycleParser.OPEN);
			this.state = 582;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RecycleParser.T__0:
				{
				this.state = 579;
				this.varo();
				}
				break;
			case RecycleParser.T__1:
				{
				this.state = 580;
				this.match(RecycleParser.T__1);
				}
				break;
			case RecycleParser.OPEN:
				{
				this.state = 581;
				this.who();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 584;
			this.match(RecycleParser.T__40);
			this.state = 585;
			this.str();
			this.state = 586;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public card(): CardContext {
		let _localctx: CardContext = new CardContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, RecycleParser.RULE_card);
		try {
			this.state = 600;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 588;
				this.varcard();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 589;
				this.maxof();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 590;
				this.minof();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 591;
				this.match(RecycleParser.OPEN);
				this.state = 595;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case RecycleParser.T__41:
					{
					this.state = 592;
					this.match(RecycleParser.T__41);
					}
					break;
				case RecycleParser.T__42:
					{
					this.state = 593;
					this.match(RecycleParser.T__42);
					}
					break;
				case RecycleParser.T__0:
				case RecycleParser.INTNUM:
				case RecycleParser.OPEN:
					{
					this.state = 594;
					this.int();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 597;
				this.cstorage();
				this.state = 598;
				this.match(RecycleParser.CLOSE);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public maxof(): MaxofContext {
		let _localctx: MaxofContext = new MaxofContext(this._ctx, this.state);
		this.enterRule(_localctx, 92, RecycleParser.RULE_maxof);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 602;
			this.match(RecycleParser.OPEN);
			this.state = 603;
			this.match(RecycleParser.T__6);
			this.state = 604;
			this.cstorage();
			this.state = 605;
			this.match(RecycleParser.T__43);
			this.state = 606;
			this.pointstorage();
			this.state = 607;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public minof(): MinofContext {
		let _localctx: MinofContext = new MinofContext(this._ctx, this.state);
		this.enterRule(_localctx, 94, RecycleParser.RULE_minof);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 609;
			this.match(RecycleParser.OPEN);
			this.state = 610;
			this.match(RecycleParser.T__5);
			this.state = 611;
			this.cstorage();
			this.state = 612;
			this.match(RecycleParser.T__43);
			this.state = 613;
			this.pointstorage();
			this.state = 614;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public locpre(): LocpreContext {
		let _localctx: LocpreContext = new LocpreContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, RecycleParser.RULE_locpre);
		try {
			this.state = 619;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RecycleParser.T__1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 616;
				this.match(RecycleParser.T__1);
				}
				break;
			case RecycleParser.T__0:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 617;
				this.varp();
				}
				break;
			case RecycleParser.OPEN:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 618;
				this.whop();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public locdesc(): LocdescContext {
		let _localctx: LocdescContext = new LocdescContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, RecycleParser.RULE_locdesc);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 621;
			_la = this._input.LA(1);
			if (!(((((_la - 45)) & ~0x1F) === 0 && ((1 << (_la - 45)) & ((1 << (RecycleParser.T__44 - 45)) | (1 << (RecycleParser.T__45 - 45)) | (1 << (RecycleParser.T__46 - 45)) | (1 << (RecycleParser.T__47 - 45)) | (1 << (RecycleParser.T__48 - 45)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public who(): WhoContext {
		let _localctx: WhoContext = new WhoContext(this._ctx, this.state);
		this.enterRule(_localctx, 100, RecycleParser.RULE_who);
		try {
			this.state = 625;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 623;
				this.whot();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 624;
				this.whop();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public whop(): WhopContext {
		let _localctx: WhopContext = new WhopContext(this._ctx, this.state);
		this.enterRule(_localctx, 102, RecycleParser.RULE_whop);
		try {
			this.state = 633;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 40, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 627;
				this.match(RecycleParser.OPEN);
				this.state = 628;
				this.whodesc();
				this.state = 629;
				this.match(RecycleParser.T__8);
				this.state = 630;
				this.match(RecycleParser.CLOSE);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 632;
				this.owner();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public whot(): WhotContext {
		let _localctx: WhotContext = new WhotContext(this._ctx, this.state);
		this.enterRule(_localctx, 104, RecycleParser.RULE_whot);
		try {
			this.state = 641;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 41, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 635;
				this.match(RecycleParser.OPEN);
				this.state = 636;
				this.whodesc();
				this.state = 637;
				this.match(RecycleParser.T__9);
				this.state = 638;
				this.match(RecycleParser.CLOSE);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 640;
				this.teamp();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public whodesc(): WhodescContext {
		let _localctx: WhodescContext = new WhodescContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, RecycleParser.RULE_whodesc);
		try {
			this.state = 647;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RecycleParser.T__0:
			case RecycleParser.INTNUM:
			case RecycleParser.OPEN:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 643;
				this.int();
				}
				break;
			case RecycleParser.T__49:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 644;
				this.match(RecycleParser.T__49);
				}
				break;
			case RecycleParser.T__27:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 645;
				this.match(RecycleParser.T__27);
				}
				break;
			case RecycleParser.T__28:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 646;
				this.match(RecycleParser.T__28);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public owner(): OwnerContext {
		let _localctx: OwnerContext = new OwnerContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, RecycleParser.RULE_owner);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 649;
			this.match(RecycleParser.OPEN);
			this.state = 650;
			this.match(RecycleParser.T__50);
			this.state = 651;
			this.card();
			this.state = 652;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public teamp(): TeampContext {
		let _localctx: TeampContext = new TeampContext(this._ctx, this.state);
		this.enterRule(_localctx, 110, RecycleParser.RULE_teamp);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 654;
			this.match(RecycleParser.OPEN);
			this.state = 655;
			this.match(RecycleParser.T__9);
			this.state = 658;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RecycleParser.T__0:
				{
				this.state = 656;
				this.varp();
				}
				break;
			case RecycleParser.OPEN:
				{
				this.state = 657;
				this.whop();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 660;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typed(): TypedContext {
		let _localctx: TypedContext = new TypedContext(this._ctx, this.state);
		this.enterRule(_localctx, 112, RecycleParser.RULE_typed);
		try {
			this.state = 666;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 44, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 662;
				this.int();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 663;
				this.boolean();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 664;
				this.str();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 665;
				this.collection();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public collection(): CollectionContext {
		let _localctx: CollectionContext = new CollectionContext(this._ctx, this.state);
		this.enterRule(_localctx, 114, RecycleParser.RULE_collection);
		try {
			this.state = 678;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 45, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 668;
				this.varc();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 669;
				this.filter();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 670;
				this.cstorage();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 671;
				this.strcollection();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 672;
				this.cstoragecollection();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 673;
				this.match(RecycleParser.T__8);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 674;
				this.match(RecycleParser.T__9);
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 675;
				this.whot();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 676;
				this.other();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 677;
				this.range();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public strcollection(): StrcollectionContext {
		let _localctx: StrcollectionContext = new StrcollectionContext(this._ctx, this.state);
		this.enterRule(_localctx, 116, RecycleParser.RULE_strcollection);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 680;
			this.match(RecycleParser.OPEN);
			this.state = 686;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 46, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 681;
					this.namegr();
					this.state = 682;
					this.match(RecycleParser.T__21);
					}
					}
				}
				this.state = 688;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 46, this._ctx);
			}
			this.state = 689;
			this.namegr();
			this.state = 690;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public range(): RangeContext {
		let _localctx: RangeContext = new RangeContext(this._ctx, this.state);
		this.enterRule(_localctx, 118, RecycleParser.RULE_range);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 692;
			this.match(RecycleParser.OPEN);
			this.state = 693;
			this.match(RecycleParser.T__51);
			this.state = 694;
			this.int();
			this.state = 695;
			this.match(RecycleParser.T__52);
			this.state = 696;
			this.int();
			this.state = 697;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public other(): OtherContext {
		let _localctx: OtherContext = new OtherContext(this._ctx, this.state);
		this.enterRule(_localctx, 120, RecycleParser.RULE_other);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 699;
			this.match(RecycleParser.OPEN);
			this.state = 700;
			this.match(RecycleParser.T__53);
			this.state = 701;
			_la = this._input.LA(1);
			if (!(_la === RecycleParser.T__8 || _la === RecycleParser.T__9)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 702;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public cstorage(): CstorageContext {
		let _localctx: CstorageContext = new CstorageContext(this._ctx, this.state);
		this.enterRule(_localctx, 122, RecycleParser.RULE_cstorage);
		try {
			this.state = 714;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 47, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 704;
				this.varcs();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 705;
				this.unionof();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 706;
				this.intersectof();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 707;
				this.disjunctionof();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 708;
				this.sortof();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 709;
				this.filter();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 710;
				this.basecstorage();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 711;
				this.memstorage();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 712;
				this.sequence();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 713;
				this.runsequence();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public basecstorage(): BasecstorageContext {
		let _localctx: BasecstorageContext = new BasecstorageContext(this._ctx, this.state);
		this.enterRule(_localctx, 124, RecycleParser.RULE_basecstorage);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 716;
			this.match(RecycleParser.OPEN);
			this.state = 717;
			this.locpre();
			this.state = 718;
			this.locdesc();
			this.state = 719;
			this.str();
			this.state = 721;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === RecycleParser.T__0 || _la === RecycleParser.INTNUM || _la === RecycleParser.OPEN) {
				{
				this.state = 720;
				this.int();
				}
			}

			this.state = 723;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sortof(): SortofContext {
		let _localctx: SortofContext = new SortofContext(this._ctx, this.state);
		this.enterRule(_localctx, 126, RecycleParser.RULE_sortof);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 725;
			this.match(RecycleParser.OPEN);
			this.state = 726;
			this.match(RecycleParser.T__54);
			this.state = 727;
			this.cstorage();
			this.state = 728;
			this.match(RecycleParser.T__43);
			this.state = 729;
			this.pointstorage();
			this.state = 730;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public unionof(): UnionofContext {
		let _localctx: UnionofContext = new UnionofContext(this._ctx, this.state);
		this.enterRule(_localctx, 128, RecycleParser.RULE_unionof);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 732;
			this.match(RecycleParser.OPEN);
			this.state = 733;
			this.match(RecycleParser.T__55);
			this.state = 740;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 50, this._ctx) ) {
			case 1:
				{
				this.state = 734;
				this.aggcs();
				}
				break;

			case 2:
				{
				this.state = 736;
				this._errHandler.sync(this);
				_alt = 1 + 1;
				do {
					switch (_alt) {
					case 1 + 1:
						{
						{
						this.state = 735;
						this.cstorage();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 738;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 49, this._ctx);
				} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			}
			this.state = 742;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public intersectof(): IntersectofContext {
		let _localctx: IntersectofContext = new IntersectofContext(this._ctx, this.state);
		this.enterRule(_localctx, 130, RecycleParser.RULE_intersectof);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 744;
			this.match(RecycleParser.OPEN);
			this.state = 745;
			this.match(RecycleParser.T__56);
			this.state = 752;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 52, this._ctx) ) {
			case 1:
				{
				this.state = 746;
				this.aggcs();
				}
				break;

			case 2:
				{
				this.state = 748;
				this._errHandler.sync(this);
				_alt = 1 + 1;
				do {
					switch (_alt) {
					case 1 + 1:
						{
						{
						this.state = 747;
						this.cstorage();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 750;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 51, this._ctx);
				} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			}
			this.state = 754;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public disjunctionof(): DisjunctionofContext {
		let _localctx: DisjunctionofContext = new DisjunctionofContext(this._ctx, this.state);
		this.enterRule(_localctx, 132, RecycleParser.RULE_disjunctionof);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 756;
			this.match(RecycleParser.OPEN);
			this.state = 757;
			this.match(RecycleParser.T__57);
			this.state = 764;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 54, this._ctx) ) {
			case 1:
				{
				this.state = 758;
				this.aggcs();
				}
				break;

			case 2:
				{
				this.state = 760;
				this._errHandler.sync(this);
				_alt = 1 + 1;
				do {
					switch (_alt) {
					case 1 + 1:
						{
						{
						this.state = 759;
						this.cstorage();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 762;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 53, this._ctx);
				} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			}
			this.state = 766;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public filter(): FilterContext {
		let _localctx: FilterContext = new FilterContext(this._ctx, this.state);
		this.enterRule(_localctx, 134, RecycleParser.RULE_filter);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 768;
			this.match(RecycleParser.OPEN);
			this.state = 769;
			this.match(RecycleParser.T__58);
			this.state = 770;
			this.collection();
			this.state = 771;
			this.var();
			this.state = 772;
			this.boolean();
			this.state = 773;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public memstorage(): MemstorageContext {
		let _localctx: MemstorageContext = new MemstorageContext(this._ctx, this.state);
		this.enterRule(_localctx, 136, RecycleParser.RULE_memstorage);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 775;
			this.match(RecycleParser.OPEN);
			this.state = 779;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RecycleParser.T__41:
				{
				this.state = 776;
				this.match(RecycleParser.T__41);
				}
				break;
			case RecycleParser.T__42:
				{
				this.state = 777;
				this.match(RecycleParser.T__42);
				}
				break;
			case RecycleParser.T__0:
			case RecycleParser.INTNUM:
			case RecycleParser.OPEN:
				{
				this.state = 778;
				this.int();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 781;
			this.cstoragecollection();
			this.state = 782;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sequence(): SequenceContext {
		let _localctx: SequenceContext = new SequenceContext(this._ctx, this.state);
		this.enterRule(_localctx, 138, RecycleParser.RULE_sequence);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 784;
			this.match(RecycleParser.OPEN);
			this.state = 785;
			_la = this._input.LA(1);
			if (!(_la === RecycleParser.T__41 || _la === RecycleParser.T__42)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 786;
			this.int();
			this.state = 787;
			this.cstorage();
			this.state = 788;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public runsequence(): RunsequenceContext {
		let _localctx: RunsequenceContext = new RunsequenceContext(this._ctx, this.state);
		this.enterRule(_localctx, 140, RecycleParser.RULE_runsequence);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 790;
			this.match(RecycleParser.OPEN);
			this.state = 791;
			this.match(RecycleParser.T__59);
			this.state = 792;
			_la = this._input.LA(1);
			if (!(_la === RecycleParser.T__41 || _la === RecycleParser.T__42)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 793;
			this.int();
			this.state = 794;
			this.cstorage();
			this.state = 795;
			this.match(RecycleParser.T__43);
			this.state = 796;
			this.pointstorage();
			this.state = 797;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public cstoragecollection(): CstoragecollectionContext {
		let _localctx: CstoragecollectionContext = new CstoragecollectionContext(this._ctx, this.state);
		this.enterRule(_localctx, 142, RecycleParser.RULE_cstoragecollection);
		try {
			this.state = 805;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 56, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 799;
				this.partition();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 800;
				this.subset();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 801;
				this.run();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 802;
				this.aggcs();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 803;
				this.varcsc();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 804;
				this.indexed();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public run(): RunContext {
		let _localctx: RunContext = new RunContext(this._ctx, this.state);
		this.enterRule(_localctx, 144, RecycleParser.RULE_run);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 807;
			this.match(RecycleParser.OPEN);
			this.state = 808;
			this.match(RecycleParser.T__60);
			this.state = 809;
			_la = this._input.LA(1);
			if (!(_la === RecycleParser.T__16 || _la === RecycleParser.T__61)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 810;
			this.int();
			this.state = 811;
			this.cstorage();
			this.state = 812;
			this.match(RecycleParser.T__43);
			this.state = 813;
			this.pointstorage();
			this.state = 814;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subset(): SubsetContext {
		let _localctx: SubsetContext = new SubsetContext(this._ctx, this.state);
		this.enterRule(_localctx, 146, RecycleParser.RULE_subset);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 816;
			this.match(RecycleParser.OPEN);
			this.state = 817;
			this.match(RecycleParser.T__62);
			this.state = 818;
			this.cstorage();
			this.state = 822;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === RecycleParser.COMPOP || _la === RecycleParser.EQOP) {
				{
				this.state = 819;
				this.intop();
				this.state = 820;
				this.int();
				}
			}

			this.state = 824;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public partition(): PartitionContext {
		let _localctx: PartitionContext = new PartitionContext(this._ctx, this.state);
		this.enterRule(_localctx, 148, RecycleParser.RULE_partition);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 826;
			this.match(RecycleParser.OPEN);
			this.state = 827;
			this.match(RecycleParser.T__63);
			this.state = 828;
			this.str();
			this.state = 835;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 59, this._ctx) ) {
			case 1:
				{
				this.state = 829;
				this.aggcs();
				}
				break;

			case 2:
				{
				this.state = 831;
				this._errHandler.sync(this);
				_alt = 1 + 1;
				do {
					switch (_alt) {
					case 1 + 1:
						{
						{
						this.state = 830;
						this.cstorage();
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 833;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 58, this._ctx);
				} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			}
			this.state = 837;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public aggcs(): AggcsContext {
		let _localctx: AggcsContext = new AggcsContext(this._ctx, this.state);
		this.enterRule(_localctx, 150, RecycleParser.RULE_aggcs);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 839;
			this.match(RecycleParser.OPEN);
			this.state = 840;
			this.match(RecycleParser.T__16);
			this.state = 841;
			this.collection();
			this.state = 842;
			this.var();
			this.state = 843;
			this.cstorage();
			this.state = 844;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public indexed(): IndexedContext {
		let _localctx: IndexedContext = new IndexedContext(this._ctx, this.state);
		this.enterRule(_localctx, 152, RecycleParser.RULE_indexed);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 846;
			this.match(RecycleParser.OPEN);
			this.state = 847;
			this.match(RecycleParser.T__64);
			this.state = 848;
			this.locpre();
			this.state = 849;
			this.locdesc();
			this.state = 850;
			this.str();
			this.state = 851;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public boolean(): BooleanContext {
		let _localctx: BooleanContext = new BooleanContext(this._ctx, this.state);
		this.enterRule(_localctx, 154, RecycleParser.RULE_boolean);
		try {
			let _alt: number;
			this.state = 888;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 62, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 853;
				this.match(RecycleParser.OPEN);
				this.state = 883;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 61, this._ctx) ) {
				case 1:
					{
					this.state = 854;
					this.match(RecycleParser.BOOLOP);
					this.state = 855;
					this.boolean();
					this.state = 857;
					this._errHandler.sync(this);
					_alt = 1 + 1;
					do {
						switch (_alt) {
						case 1 + 1:
							{
							{
							this.state = 856;
							this.boolean();
							}
							}
							break;
						default:
							throw new NoViableAltException(this);
						}
						this.state = 859;
						this._errHandler.sync(this);
						_alt = this.interpreter.adaptivePredict(this._input, 60, this._ctx);
					} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
					}
					break;

				case 2:
					{
					this.state = 861;
					this.intop();
					this.state = 862;
					this.int();
					this.state = 863;
					this.int();
					}
					break;

				case 3:
					{
					this.state = 865;
					this.match(RecycleParser.EQOP);
					this.state = 866;
					this.str();
					this.state = 867;
					this.str();
					}
					break;

				case 4:
					{
					this.state = 869;
					this.match(RecycleParser.EQOP);
					this.state = 870;
					this.card();
					this.state = 871;
					this.card();
					}
					break;

				case 5:
					{
					this.state = 873;
					this.match(RecycleParser.UNOP);
					this.state = 874;
					this.boolean();
					}
					break;

				case 6:
					{
					this.state = 875;
					this.match(RecycleParser.EQOP);
					this.state = 876;
					this.whop();
					this.state = 877;
					this.whop();
					}
					break;

				case 7:
					{
					this.state = 879;
					this.match(RecycleParser.EQOP);
					this.state = 880;
					this.whot();
					this.state = 881;
					this.whot();
					}
					break;
				}
				this.state = 885;
				this.match(RecycleParser.CLOSE);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 887;
				this.aggb();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public intop(): IntopContext {
		let _localctx: IntopContext = new IntopContext(this._ctx, this.state);
		this.enterRule(_localctx, 156, RecycleParser.RULE_intop);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 890;
			_la = this._input.LA(1);
			if (!(_la === RecycleParser.COMPOP || _la === RecycleParser.EQOP)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public aggb(): AggbContext {
		let _localctx: AggbContext = new AggbContext(this._ctx, this.state);
		this.enterRule(_localctx, 158, RecycleParser.RULE_aggb);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 892;
			this.match(RecycleParser.OPEN);
			this.state = 893;
			_la = this._input.LA(1);
			if (!(_la === RecycleParser.T__15 || _la === RecycleParser.T__16)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 894;
			this.collection();
			this.state = 895;
			this.var();
			this.state = 896;
			this.boolean();
			this.state = 897;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public int(): IntContext {
		let _localctx: IntContext = new IntContext(this._ctx, this.state);
		this.enterRule(_localctx, 160, RecycleParser.RULE_int);
		try {
			this.state = 919;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 63, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 899;
				this.vari();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 900;
				this.sizeof();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 901;
				this.mult();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 902;
				this.subtract();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 903;
				this.mod();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 904;
				this.add();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 905;
				this.divide();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 906;
				this.exponent();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 907;
				this.triangular();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 908;
				this.fibonacci();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 909;
				this.random();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 910;
				this.sum();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 911;
				this.rawstorage();
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 912;
				this.score();
				}
				break;

			case 15:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 913;
				this.pid();
				}
				break;

			case 16:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 914;
				this.tid();
				}
				break;

			case 17:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 915;
				this.aggi();
				}
				break;

			case 18:
				this.enterOuterAlt(_localctx, 18);
				{
				this.state = 916;
				this.scoremax();
				}
				break;

			case 19:
				this.enterOuterAlt(_localctx, 19);
				{
				this.state = 917;
				this.scoremin();
				}
				break;

			case 20:
				this.enterOuterAlt(_localctx, 20);
				{
				this.state = 918;
				this.intgr();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public intgr(): IntgrContext {
		let _localctx: IntgrContext = new IntgrContext(this._ctx, this.state);
		this.enterRule(_localctx, 162, RecycleParser.RULE_intgr);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 922;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 921;
					this.match(RecycleParser.INTNUM);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 924;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 64, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sum(): SumContext {
		let _localctx: SumContext = new SumContext(this._ctx, this.state);
		this.enterRule(_localctx, 164, RecycleParser.RULE_sum);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 926;
			this.match(RecycleParser.OPEN);
			this.state = 927;
			this.match(RecycleParser.T__65);
			this.state = 928;
			this.cstorage();
			this.state = 929;
			this.match(RecycleParser.T__43);
			this.state = 930;
			this.pointstorage();
			this.state = 931;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public scoremax(): ScoremaxContext {
		let _localctx: ScoremaxContext = new ScoremaxContext(this._ctx, this.state);
		this.enterRule(_localctx, 166, RecycleParser.RULE_scoremax);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 933;
			this.match(RecycleParser.OPEN);
			this.state = 934;
			this.match(RecycleParser.T__66);
			this.state = 935;
			this.cstorage();
			this.state = 936;
			this.match(RecycleParser.T__43);
			this.state = 937;
			this.pointstorage();
			this.state = 938;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public scoremin(): ScoreminContext {
		let _localctx: ScoreminContext = new ScoreminContext(this._ctx, this.state);
		this.enterRule(_localctx, 168, RecycleParser.RULE_scoremin);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 940;
			this.match(RecycleParser.OPEN);
			this.state = 941;
			this.match(RecycleParser.T__67);
			this.state = 942;
			this.cstorage();
			this.state = 943;
			this.match(RecycleParser.T__43);
			this.state = 944;
			this.pointstorage();
			this.state = 945;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public score(): ScoreContext {
		let _localctx: ScoreContext = new ScoreContext(this._ctx, this.state);
		this.enterRule(_localctx, 170, RecycleParser.RULE_score);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 947;
			this.match(RecycleParser.OPEN);
			this.state = 948;
			this.match(RecycleParser.T__68);
			this.state = 949;
			this.card();
			this.state = 950;
			this.match(RecycleParser.T__43);
			this.state = 951;
			this.pointstorage();
			this.state = 952;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public add(): AddContext {
		let _localctx: AddContext = new AddContext(this._ctx, this.state);
		this.enterRule(_localctx, 172, RecycleParser.RULE_add);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 954;
			this.match(RecycleParser.OPEN);
			this.state = 955;
			this.match(RecycleParser.T__69);
			this.state = 956;
			this.int();
			this.state = 958;
			this._errHandler.sync(this);
			_alt = 1 + 1;
			do {
				switch (_alt) {
				case 1 + 1:
					{
					{
					this.state = 957;
					this.int();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 960;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 65, this._ctx);
			} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 962;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public mult(): MultContext {
		let _localctx: MultContext = new MultContext(this._ctx, this.state);
		this.enterRule(_localctx, 174, RecycleParser.RULE_mult);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 964;
			this.match(RecycleParser.OPEN);
			this.state = 965;
			this.match(RecycleParser.T__70);
			this.state = 966;
			this.int();
			this.state = 968;
			this._errHandler.sync(this);
			_alt = 1 + 1;
			do {
				switch (_alt) {
				case 1 + 1:
					{
					{
					this.state = 967;
					this.int();
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 970;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 66, this._ctx);
			} while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
			this.state = 972;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public subtract(): SubtractContext {
		let _localctx: SubtractContext = new SubtractContext(this._ctx, this.state);
		this.enterRule(_localctx, 176, RecycleParser.RULE_subtract);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 974;
			this.match(RecycleParser.OPEN);
			this.state = 975;
			this.match(RecycleParser.T__71);
			this.state = 976;
			this.int();
			this.state = 977;
			this.int();
			this.state = 978;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public mod(): ModContext {
		let _localctx: ModContext = new ModContext(this._ctx, this.state);
		this.enterRule(_localctx, 178, RecycleParser.RULE_mod);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 980;
			this.match(RecycleParser.OPEN);
			this.state = 981;
			this.match(RecycleParser.T__72);
			this.state = 982;
			this.int();
			this.state = 983;
			this.int();
			this.state = 984;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public divide(): DivideContext {
		let _localctx: DivideContext = new DivideContext(this._ctx, this.state);
		this.enterRule(_localctx, 180, RecycleParser.RULE_divide);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 986;
			this.match(RecycleParser.OPEN);
			this.state = 987;
			this.match(RecycleParser.T__73);
			this.state = 988;
			this.int();
			this.state = 989;
			this.int();
			this.state = 990;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public exponent(): ExponentContext {
		let _localctx: ExponentContext = new ExponentContext(this._ctx, this.state);
		this.enterRule(_localctx, 182, RecycleParser.RULE_exponent);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 992;
			this.match(RecycleParser.OPEN);
			this.state = 993;
			this.match(RecycleParser.T__74);
			this.state = 994;
			this.int();
			this.state = 995;
			this.int();
			this.state = 996;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public triangular(): TriangularContext {
		let _localctx: TriangularContext = new TriangularContext(this._ctx, this.state);
		this.enterRule(_localctx, 184, RecycleParser.RULE_triangular);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 998;
			this.match(RecycleParser.OPEN);
			this.state = 999;
			this.match(RecycleParser.T__75);
			this.state = 1000;
			this.int();
			this.state = 1001;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fibonacci(): FibonacciContext {
		let _localctx: FibonacciContext = new FibonacciContext(this._ctx, this.state);
		this.enterRule(_localctx, 186, RecycleParser.RULE_fibonacci);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1003;
			this.match(RecycleParser.OPEN);
			this.state = 1004;
			this.match(RecycleParser.T__76);
			this.state = 1005;
			this.int();
			this.state = 1006;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public random(): RandomContext {
		let _localctx: RandomContext = new RandomContext(this._ctx, this.state);
		this.enterRule(_localctx, 188, RecycleParser.RULE_random);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1008;
			this.match(RecycleParser.OPEN);
			this.state = 1009;
			this.match(RecycleParser.T__77);
			this.state = 1010;
			this.int();
			this.state = 1013;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === RecycleParser.T__52) {
				{
				this.state = 1011;
				this.match(RecycleParser.T__52);
				this.state = 1012;
				this.int();
				}
			}

			this.state = 1015;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public sizeof(): SizeofContext {
		let _localctx: SizeofContext = new SizeofContext(this._ctx, this.state);
		this.enterRule(_localctx, 190, RecycleParser.RULE_sizeof);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1017;
			this.match(RecycleParser.OPEN);
			this.state = 1018;
			this.match(RecycleParser.T__78);
			this.state = 1019;
			this.collection();
			this.state = 1020;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public aggi(): AggiContext {
		let _localctx: AggiContext = new AggiContext(this._ctx, this.state);
		this.enterRule(_localctx, 192, RecycleParser.RULE_aggi);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1022;
			this.match(RecycleParser.OPEN);
			this.state = 1023;
			this.match(RecycleParser.T__16);
			this.state = 1024;
			this.collection();
			this.state = 1025;
			this.var();
			this.state = 1026;
			this.rawstorage();
			this.state = 1027;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public rawstorage(): RawstorageContext {
		let _localctx: RawstorageContext = new RawstorageContext(this._ctx, this.state);
		this.enterRule(_localctx, 194, RecycleParser.RULE_rawstorage);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1029;
			this.match(RecycleParser.OPEN);
			this.state = 1033;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RecycleParser.T__0:
				{
				this.state = 1030;
				this.varo();
				}
				break;
			case RecycleParser.T__1:
				{
				this.state = 1031;
				this.match(RecycleParser.T__1);
				}
				break;
			case RecycleParser.OPEN:
				{
				this.state = 1032;
				this.who();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 1035;
			this.match(RecycleParser.T__79);
			this.state = 1036;
			this.str();
			this.state = 1037;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public pid(): PidContext {
		let _localctx: PidContext = new PidContext(this._ctx, this.state);
		this.enterRule(_localctx, 196, RecycleParser.RULE_pid);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1039;
			this.match(RecycleParser.OPEN);
			this.state = 1040;
			this.match(RecycleParser.T__80);
			this.state = 1041;
			this.whop();
			this.state = 1042;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public tid(): TidContext {
		let _localctx: TidContext = new TidContext(this._ctx, this.state);
		this.enterRule(_localctx, 198, RecycleParser.RULE_tid);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1044;
			this.match(RecycleParser.OPEN);
			this.state = 1045;
			this.match(RecycleParser.T__81);
			this.state = 1046;
			this.whot();
			this.state = 1047;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public str(): StrContext {
		let _localctx: StrContext = new StrContext(this._ctx, this.state);
		this.enterRule(_localctx, 200, RecycleParser.RULE_str);
		try {
			this.state = 1053;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 69, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1049;
				this.namegr();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1050;
				this.strstorage();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1051;
				this.vars();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1052;
				this.cardatt();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public strstorage(): StrstorageContext {
		let _localctx: StrstorageContext = new StrstorageContext(this._ctx, this.state);
		this.enterRule(_localctx, 202, RecycleParser.RULE_strstorage);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1055;
			this.match(RecycleParser.OPEN);
			this.state = 1059;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case RecycleParser.T__0:
				{
				this.state = 1056;
				this.varo();
				}
				break;
			case RecycleParser.T__1:
				{
				this.state = 1057;
				this.match(RecycleParser.T__1);
				}
				break;
			case RecycleParser.OPEN:
				{
				this.state = 1058;
				this.who();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 1061;
			this.match(RecycleParser.T__82);
			this.state = 1062;
			this.str();
			this.state = 1063;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public cardatt(): CardattContext {
		let _localctx: CardattContext = new CardattContext(this._ctx, this.state);
		this.enterRule(_localctx, 204, RecycleParser.RULE_cardatt);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1065;
			this.match(RecycleParser.OPEN);
			this.state = 1066;
			this.match(RecycleParser.T__83);
			this.state = 1067;
			this.str();
			this.state = 1068;
			this.card();
			this.state = 1069;
			this.match(RecycleParser.CLOSE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public namegr(): NamegrContext {
		let _localctx: NamegrContext = new NamegrContext(this._ctx, this.state);
		this.enterRule(_localctx, 206, RecycleParser.RULE_namegr);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1072;
			this._errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					this.state = 1071;
					this.match(RecycleParser.LETT);
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				this.state = 1074;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 71, this._ctx);
			} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	private static readonly _serializedATNSegments: number = 2;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03`\u0437\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
		"\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044" +
		"\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04" +
		"F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04N\tN\x04" +
		"O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x04U\tU\x04V\tV\x04W\tW\x04" +
		"X\tX\x04Y\tY\x04Z\tZ\x04[\t[\x04\\\t\\\x04]\t]\x04^\t^\x04_\t_\x04`\t" +
		"`\x04a\ta\x04b\tb\x04c\tc\x04d\td\x04e\te\x04f\tf\x04g\tg\x04h\th\x04" +
		"i\ti\x03\x02\x03\x02\x03\x02\x03\x03\x03\x03\x03\x03\x03\x04\x03\x04\x03" +
		"\x04\x03\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03" +
		"\x07\x03\b\x03\b\x03\b\x03\t\x03\t\x03\t\x03\n\x03\n\x03\n\x03\v\x03\v" +
		"\x03\v\x03\f\x03\f\x03\f\x07\f\xF4\n\f\f\f\x0E\f\xF7\v\f\x03\f\x03\f\x03" +
		"\f\x06\f\xFC\n\f\r\f\x0E\f\xFD\x03\f\x03\f\x03\f\x03\r\x03\r\x03\r\x03" +
		"\r\x03\r\x03\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\u010D\n\x0E\x03" +
		"\x0E\x03\x0E\x03\x0E\x05\x0E\u0112\n\x0E\x03\x0E\x03\x0E\x06\x0E\u0116" +
		"\n\x0E\r\x0E\x0E\x0E\u0117\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x03" +
		"\x0F\x03\x0F\x03\x0F\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x03\x10\x05" +
		"\x10\u0128\n\x10\x03\x10\x03\x10\x06\x10\u012C\n\x10\r\x10\x0E\x10\u012D" +
		"\x03\x10\x03\x10\x03\x11\x03\x11\x03\x11\x03\x11\x03\x11\x03\x12\x03\x12" +
		"\x03\x12\x03\x12\x06\x12\u013B\n\x12\r\x12\x0E\x12\u013C\x03\x12\x03\x12" +
		"\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x06\x12\u0146\n\x12\r\x12\x0E" +
		"\x12\u0147\x03\x12\x03\x12\x03\x12\x03\x12\x03\x12\x05\x12\u014F\n\x12" +
		"\x03\x13\x03\x13\x03\x13\x03\x13\x06\x13\u0155\n\x13\r\x13\x0E\x13\u0156" +
		"\x03\x13\x03\x13\x03\x13\x03\x13\x03\x13\x05\x13\u015E\n\x13\x03\x14\x03" +
		"\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03\x14\x03" +
		"\x14\x03\x14\x05\x14\u016C\n\x14\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15" +
		"\x03\x15\x03\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16\x03\x16" +
		"\x05\x16\u017C\n\x16\x03\x16\x03\x16\x03\x17\x03\x17\x03\x17\x03\x17\x03" +
		"\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03\x17\x03" +
		"\x17\x03\x17\x03\x17\x03\x17\x05\x17\u0191\n\x17\x03\x17\x03\x17\x03\x17" +
		"\x05\x17\u0196\n\x17\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03\x18\x03" +
		"\x19\x03\x19\x03\x19\x03\x19\x06\x19\u01A2\n\x19\r\x19\x0E\x19\u01A3\x03" +
		"\x19\x03\x19\x03\x1A\x03\x1A\x03\x1A\x07\x1A\u01AB\n\x1A\f\x1A\x0E\x1A" +
		"\u01AE\v\x1A\x03\x1A\x03\x1A\x07\x1A\u01B2\n\x1A\f\x1A\x0E\x1A\u01B5\v" +
		"\x1A\x03\x1A\x03\x1A\x03\x1B\x03\x1B\x03\x1B\x05\x1B\u01BC\n\x1B\x03\x1B" +
		"\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1C\x06\x1C\u01C4\n\x1C\r\x1C\x0E" +
		"\x1C\u01C5\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x07\x1D\u01CE" +
		"\n\x1D\f\x1D\x0E\x1D\u01D1\v\x1D\x03\x1D\x03\x1D\x07\x1D\u01D5\n\x1D\f" +
		"\x1D\x0E\x1D\u01D8\v\x1D\x03\x1D\x03\x1D\x03\x1E\x03\x1E\x03\x1E\x03\x1E" +
		"\x06\x1E\u01E0\n\x1E\r\x1E\x0E\x1E\u01E1\x03\x1E\x03\x1E\x03\x1F\x03\x1F" +
		"\x03\x1F\x03\x1F\x06\x1F\u01EA\n\x1F\r\x1F\x0E\x1F\u01EB\x03\x1F\x03\x1F" +
		"\x03 \x03 \x06 \u01F2\n \r \x0E \u01F3\x03 \x03 \x03 \x03!\x03!\x03!\x03" +
		"!\x03!\x03!\x03\"\x03\"\x03\"\x03\"\x05\"\u0203\n\"\x03#\x03#\x03#\x03" +
		"#\x03$\x03$\x03$\x03$\x03%\x03%\x03%\x05%\u0210\n%\x03&\x03&\x03&\x05" +
		"&\u0215\n&\x03\'\x03\'\x03\'\x03\'\x03(\x03(\x03(\x03(\x03(\x03(\x03(" +
		"\x05(\u0222\n(\x03)\x03)\x03)\x03)\x03*\x03*\x03*\x03+\x03+\x03+\x03+" +
		"\x03+\x03+\x05+\u0231\n+\x03,\x03,\x03,\x03-\x03-\x03-\x03-\x03-\x03-" +
		"\x03-\x03-\x03-\x05-\u023F\n-\x03-\x03-\x05-\u0243\n-\x03.\x03.\x03.\x03" +
		".\x05.\u0249\n.\x03.\x03.\x03.\x03.\x03/\x03/\x03/\x03/\x03/\x03/\x03" +
		"/\x05/\u0256\n/\x03/\x03/\x03/\x05/\u025B\n/\x030\x030\x030\x030\x030" +
		"\x030\x030\x031\x031\x031\x031\x031\x031\x031\x032\x032\x032\x052\u026E" +
		"\n2\x033\x033\x034\x034\x054\u0274\n4\x035\x035\x035\x035\x035\x035\x05" +
		"5\u027C\n5\x036\x036\x036\x036\x036\x036\x056\u0284\n6\x037\x037\x037" +
		"\x037\x057\u028A\n7\x038\x038\x038\x038\x038\x039\x039\x039\x039\x059" +
		"\u0295\n9\x039\x039\x03:\x03:\x03:\x03:\x05:\u029D\n:\x03;\x03;\x03;\x03" +
		";\x03;\x03;\x03;\x03;\x03;\x03;\x05;\u02A9\n;\x03<\x03<\x03<\x03<\x07" +
		"<\u02AF\n<\f<\x0E<\u02B2\v<\x03<\x03<\x03<\x03=\x03=\x03=\x03=\x03=\x03" +
		"=\x03=\x03>\x03>\x03>\x03>\x03>\x03?\x03?\x03?\x03?\x03?\x03?\x03?\x03" +
		"?\x03?\x03?\x05?\u02CD\n?\x03@\x03@\x03@\x03@\x03@\x05@\u02D4\n@\x03@" +
		"\x03@\x03A\x03A\x03A\x03A\x03A\x03A\x03A\x03B\x03B\x03B\x03B\x06B\u02E3" +
		"\nB\rB\x0EB\u02E4\x05B\u02E7\nB\x03B\x03B\x03C\x03C\x03C\x03C\x06C\u02EF" +
		"\nC\rC\x0EC\u02F0\x05C\u02F3\nC\x03C\x03C\x03D\x03D\x03D\x03D\x06D\u02FB" +
		"\nD\rD\x0ED\u02FC\x05D\u02FF\nD\x03D\x03D\x03E\x03E\x03E\x03E\x03E\x03" +
		"E\x03E\x03F\x03F\x03F\x03F\x05F\u030E\nF\x03F\x03F\x03F\x03G\x03G\x03" +
		"G\x03G\x03G\x03G\x03H\x03H\x03H\x03H\x03H\x03H\x03H\x03H\x03H\x03I\x03" +
		"I\x03I\x03I\x03I\x03I\x05I\u0328\nI\x03J\x03J\x03J\x03J\x03J\x03J\x03" +
		"J\x03J\x03J\x03K\x03K\x03K\x03K\x03K\x03K\x05K\u0339\nK\x03K\x03K\x03" +
		"L\x03L\x03L\x03L\x03L\x06L\u0342\nL\rL\x0EL\u0343\x05L\u0346\nL\x03L\x03" +
		"L\x03M\x03M\x03M\x03M\x03M\x03M\x03M\x03N\x03N\x03N\x03N\x03N\x03N\x03" +
		"N\x03O\x03O\x03O\x03O\x06O\u035C\nO\rO\x0EO\u035D\x03O\x03O\x03O\x03O" +
		"\x03O\x03O\x03O\x03O\x03O\x03O\x03O\x03O\x03O\x03O\x03O\x03O\x03O\x03" +
		"O\x03O\x03O\x03O\x03O\x05O\u0376\nO\x03O\x03O\x03O\x05O\u037B\nO\x03P" +
		"\x03P\x03Q\x03Q\x03Q\x03Q\x03Q\x03Q\x03Q\x03R\x03R\x03R\x03R\x03R\x03" +
		"R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03R\x03" +
		"R\x05R\u039A\nR\x03S\x06S\u039D\nS\rS\x0ES\u039E\x03T\x03T\x03T\x03T\x03" +
		"T\x03T\x03T\x03U\x03U\x03U\x03U\x03U\x03U\x03U\x03V\x03V\x03V\x03V\x03" +
		"V\x03V\x03V\x03W\x03W\x03W\x03W\x03W\x03W\x03W\x03X\x03X\x03X\x03X\x06" +
		"X\u03C1\nX\rX\x0EX\u03C2\x03X\x03X\x03Y\x03Y\x03Y\x03Y\x06Y\u03CB\nY\r" +
		"Y\x0EY\u03CC\x03Y\x03Y\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03[\x03[\x03[\x03" +
		"[\x03[\x03[\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x03]\x03]\x03]\x03]\x03" +
		"]\x03]\x03^\x03^\x03^\x03^\x03^\x03_\x03_\x03_\x03_\x03_\x03`\x03`\x03" +
		"`\x03`\x03`\x05`\u03F8\n`\x03`\x03`\x03a\x03a\x03a\x03a\x03a\x03b\x03" +
		"b\x03b\x03b\x03b\x03b\x03b\x03c\x03c\x03c\x03c\x05c\u040C\nc\x03c\x03" +
		"c\x03c\x03c\x03d\x03d\x03d\x03d\x03d\x03e\x03e\x03e\x03e\x03e\x03f\x03" +
		"f\x03f\x03f\x05f\u0420\nf\x03g\x03g\x03g\x03g\x05g\u0426\ng\x03g\x03g" +
		"\x03g\x03g\x03h\x03h\x03h\x03h\x03h\x03h\x03i\x06i\u0433\ni\ri\x0Ei\u0434" +
		"\x03i\x1A\xF5\xFD\u0117\u012D\u013C\u0147\u0156\u01A3\u01AC\u01B3\u01C5" +
		"\u01CF\u01D6\u01E1\u01EB\u01F3\u02B0\u02E4\u02F0\u02FC\u0343\u035D\u03C2" +
		"\u03CC\x02\x02j\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10" +
		"\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02\"\x02" +
		"$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02<\x02>\x02" +
		"@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02P\x02R\x02T\x02V\x02X\x02Z\x02" +
		"\\\x02^\x02`\x02b\x02d\x02f\x02h\x02j\x02l\x02n\x02p\x02r\x02t\x02v\x02" +
		"x\x02z\x02|\x02~\x02\x80\x02\x82\x02\x84\x02\x86\x02\x88\x02\x8A\x02\x8C" +
		"\x02\x8E\x02\x90\x02\x92\x02\x94\x02\x96\x02\x98\x02\x9A\x02\x9C\x02\x9E" +
		"\x02\xA0\x02\xA2\x02\xA4\x02\xA6\x02\xA8\x02\xAA\x02\xAC\x02\xAE\x02\xB0" +
		"\x02\xB2\x02\xB4\x02\xB6\x02\xB8\x02\xBA\x02\xBC\x02\xBE\x02\xC0\x02\xC2" +
		"\x02\xC4\x02\xC6\x02\xC8\x02\xCA\x02\xCC\x02\xCE\x02\xD0\x02\x02\n\x03" +
		"\x02\b\t\x03\x02\v\f\x03\x02\x12\x13\x03\x02\x1E\x1F\x03\x02/3\x03\x02" +
		",-\x04\x02\x13\x13@@\x03\x02XY\x02\u0464\x02\xD2\x03\x02\x02\x02\x04\xD5" +
		"\x03\x02\x02\x02\x06\xD8\x03\x02\x02\x02\b\xDB\x03\x02\x02\x02\n\xDE\x03" +
		"\x02\x02\x02\f\xE1\x03\x02\x02\x02\x0E\xE4\x03\x02\x02\x02\x10\xE7\x03" +
		"\x02\x02\x02\x12\xEA\x03\x02\x02\x02\x14\xED\x03\x02\x02\x02\x16\xF0\x03" +
		"\x02\x02\x02\x18\u0102\x03\x02\x02\x02\x1A\u0108\x03\x02\x02\x02\x1C\u011B" +
		"\x03\x02\x02\x02\x1E\u0121\x03\x02\x02\x02 \u0131\x03\x02\x02\x02\"\u014E" +
		"\x03\x02\x02\x02$\u015D\x03\x02\x02\x02&\u016B\x03\x02\x02\x02(\u016D" +
		"\x03\x02\x02\x02*\u0174\x03\x02\x02\x02,\u0195\x03\x02\x02\x02.\u0197" +
		"\x03\x02\x02\x020\u019D\x03\x02\x02\x022\u01A7\x03\x02\x02\x024\u01B8" +
		"\x03\x02\x02\x026\u01C0\x03\x02\x02\x028\u01C9\x03\x02\x02\x02:\u01DB" +
		"\x03\x02\x02\x02<\u01E5\x03\x02\x02\x02>\u01EF\x03\x02\x02\x02@\u01F8" +
		"\x03\x02\x02\x02B\u01FE\x03\x02\x02\x02D\u0204\x03\x02\x02\x02F\u0208" +
		"\x03\x02\x02\x02H\u020C\x03\x02\x02\x02J\u0211\x03\x02\x02\x02L\u0216" +
		"\x03\x02\x02\x02N\u021A\x03\x02\x02\x02P\u0223\x03\x02\x02\x02R\u0227" +
		"\x03\x02\x02\x02T\u022A\x03\x02\x02\x02V\u0232\x03\x02\x02\x02X\u0242" +
		"\x03\x02\x02\x02Z\u0244\x03\x02\x02\x02\\\u025A\x03\x02\x02\x02^\u025C" +
		"\x03\x02\x02\x02`\u0263\x03\x02\x02\x02b\u026D\x03\x02\x02\x02d\u026F" +
		"\x03\x02\x02\x02f\u0273\x03\x02\x02\x02h\u027B\x03\x02\x02\x02j\u0283" +
		"\x03\x02\x02\x02l\u0289\x03\x02\x02\x02n\u028B\x03\x02\x02\x02p\u0290" +
		"\x03\x02\x02\x02r\u029C\x03\x02\x02\x02t\u02A8\x03\x02\x02\x02v\u02AA" +
		"\x03\x02\x02\x02x\u02B6\x03\x02\x02\x02z\u02BD\x03\x02\x02\x02|\u02CC" +
		"\x03\x02\x02\x02~\u02CE\x03\x02\x02\x02\x80\u02D7\x03\x02\x02\x02\x82" +
		"\u02DE\x03\x02\x02\x02\x84\u02EA\x03\x02\x02\x02\x86\u02F6\x03\x02\x02" +
		"\x02\x88\u0302\x03\x02\x02\x02\x8A\u0309\x03\x02\x02\x02\x8C\u0312\x03" +
		"\x02\x02\x02\x8E\u0318\x03\x02\x02\x02\x90\u0327\x03\x02\x02\x02\x92\u0329" +
		"\x03\x02\x02\x02\x94\u0332\x03\x02\x02\x02\x96\u033C\x03\x02\x02\x02\x98" +
		"\u0349\x03\x02\x02\x02\x9A\u0350\x03\x02\x02\x02\x9C\u037A\x03\x02\x02" +
		"\x02\x9E\u037C\x03\x02\x02\x02\xA0\u037E\x03\x02\x02\x02\xA2\u0399\x03" +
		"\x02\x02\x02\xA4\u039C\x03\x02\x02\x02\xA6\u03A0\x03\x02\x02\x02\xA8\u03A7" +
		"\x03\x02\x02\x02\xAA\u03AE\x03\x02\x02\x02\xAC\u03B5\x03\x02\x02\x02\xAE" +
		"\u03BC\x03\x02\x02\x02\xB0\u03C6\x03\x02\x02\x02\xB2\u03D0\x03\x02\x02" +
		"\x02\xB4\u03D6\x03\x02\x02\x02\xB6\u03DC\x03\x02\x02\x02\xB8\u03E2\x03" +
		"\x02\x02\x02\xBA\u03E8\x03\x02\x02\x02\xBC\u03ED\x03\x02\x02\x02\xBE\u03F2" +
		"\x03\x02\x02\x02\xC0\u03FB\x03\x02\x02\x02\xC2\u0400\x03\x02\x02\x02\xC4" +
		"\u0407\x03\x02\x02\x02\xC6\u0411\x03\x02\x02\x02\xC8\u0416\x03\x02\x02" +
		"\x02\xCA\u041F\x03\x02\x02\x02\xCC\u0421\x03\x02\x02\x02\xCE\u042B\x03" +
		"\x02\x02\x02\xD0\u0432\x03\x02\x02\x02\xD2\xD3\x07\x03\x02\x02\xD3\xD4" +
		"\x05\xD0i\x02\xD4\x03\x03\x02\x02\x02\xD5\xD6\x07\x03\x02\x02\xD6\xD7" +
		"\x05\xD0i\x02\xD7\x05\x03\x02\x02\x02\xD8\xD9\x07\x03\x02\x02\xD9\xDA" +
		"\x05\xD0i\x02\xDA\x07\x03\x02\x02\x02\xDB\xDC\x07\x03\x02\x02\xDC\xDD" +
		"\x05\xD0i\x02\xDD\t\x03\x02\x02\x02\xDE\xDF\x07\x03\x02\x02\xDF\xE0\x05" +
		"\xD0i\x02\xE0\v\x03\x02\x02\x02\xE1\xE2\x07\x03\x02\x02\xE2\xE3\x05\xD0" +
		"i\x02\xE3\r\x03\x02\x02\x02\xE4\xE5\x07\x03\x02\x02\xE5\xE6\x05\xD0i\x02" +
		"\xE6\x0F\x03\x02\x02\x02\xE7\xE8\x07\x03\x02\x02\xE8\xE9\x05\xD0i\x02" +
		"\xE9\x11\x03\x02\x02\x02\xEA\xEB\x07\x03\x02\x02\xEB\xEC\x05\xD0i\x02" +
		"\xEC\x13\x03\x02\x02\x02\xED\xEE\x07\x03\x02\x02\xEE\xEF\x05\xD0i\x02" +
		"\xEF\x15\x03\x02\x02\x02\xF0\xF1\x07]\x02\x02\xF1\xF5\x07\x04\x02\x02" +
		"\xF2\xF4\x05\x18\r\x02\xF3\xF2\x03\x02\x02\x02\xF4\xF7\x03\x02\x02\x02" +
		"\xF5\xF6\x03\x02\x02\x02\xF5\xF3\x03\x02\x02\x02\xF6\xF8\x03\x02\x02\x02" +
		"\xF7\xF5\x03\x02\x02\x02\xF8\xFB\x05\x1A\x0E\x02\xF9\xFC\x05\"\x12\x02" +
		"\xFA\xFC\x05\x1E\x10\x02\xFB\xF9\x03\x02\x02\x02\xFB\xFA\x03\x02\x02\x02" +
		"\xFC\xFD\x03\x02\x02\x02\xFD\xFE\x03\x02\x02\x02\xFD\xFB\x03\x02\x02\x02" +
		"\xFE\xFF\x03\x02\x02\x02\xFF\u0100\x05\x1C\x0F\x02\u0100\u0101\x07^\x02" +
		"\x02\u0101\x17\x03\x02\x02\x02\u0102\u0103\x07]\x02\x02\u0103\u0104\x07" +
		"\x05\x02\x02\u0104\u0105\x05r:\x02\u0105\u0106\x05\x02\x02\x02\u0106\u0107" +
		"\x07^\x02\x02\u0107\x19\x03\x02\x02\x02\u0108\u0109\x07]\x02\x02\u0109" +
		"\u010A\x07\x06\x02\x02\u010A\u010C\x05.\x18\x02\u010B\u010D\x050\x19\x02" +
		"\u010C\u010B\x03\x02\x02\x02\u010C\u010D\x03\x02\x02\x02\u010D\u0115\x03" +
		"\x02\x02\x02\u010E\u0111\x07]\x02\x02\u010F\u0112\x054\x1B\x02\u0110\u0112" +
		"\x05X-\x02\u0111\u010F\x03\x02\x02\x02\u0111\u0110\x03\x02\x02\x02\u0112" +
		"\u0113\x03\x02\x02\x02\u0113\u0114\x07^\x02\x02\u0114\u0116\x03\x02\x02" +
		"\x02\u0115\u010E\x03\x02\x02\x02\u0116\u0117\x03\x02\x02\x02\u0117\u0118" +
		"\x03\x02\x02\x02\u0117\u0115\x03\x02\x02\x02\u0118\u0119\x03\x02\x02\x02" +
		"\u0119\u011A\x07^\x02\x02\u011A\x1B\x03\x02\x02\x02\u011B\u011C\x07]\x02" +
		"\x02\u011C\u011D\x07\x07\x02\x02\u011D\u011E\t\x02\x02\x02\u011E\u011F" +
		"\x05\xA2R\x02\u011F\u0120\x07^\x02\x02\u0120\x1D\x03\x02\x02\x02\u0121" +
		"\u0122\x07]\x02\x02\u0122\u0123\x07\n\x02\x02\u0123\u0127\t\x03\x02\x02" +
		"\u0124\u0128\x05 \x11\x02\u0125\u0128\x07\r\x02\x02\u0126\u0128\x07\x0E" +
		"\x02\x02\u0127\u0124\x03\x02\x02\x02\u0127\u0125\x03\x02\x02\x02\u0127" +
		"\u0126\x03\x02\x02\x02\u0128\u012B\x03\x02\x02\x02\u0129\u012C\x05\"\x12" +
		"\x02\u012A\u012C\x05\x1E\x10\x02\u012B\u0129\x03\x02\x02\x02\u012B\u012A" +
		"\x03\x02\x02\x02\u012C\u012D\x03\x02\x02\x02\u012D\u012E\x03\x02\x02\x02" +
		"\u012D\u012B\x03\x02\x02\x02\u012E\u012F\x03\x02\x02\x02\u012F\u0130\x07" +
		"^\x02\x02\u0130\x1F\x03\x02\x02\x02\u0131\u0132\x07]\x02\x02\u0132\u0133" +
		"\x07\x0F\x02\x02\u0133\u0134\x05\x9CO\x02\u0134\u0135\x07^\x02\x02\u0135" +
		"!\x03\x02\x02\x02\u0136\u0137\x07]\x02\x02\u0137\u0138\x07\x10\x02\x02" +
		"\u0138\u013A\x07]\x02\x02\u0139\u013B\x05&\x14\x02\u013A\u0139\x03\x02" +
		"\x02\x02\u013B\u013C\x03\x02\x02\x02\u013C\u013D\x03\x02\x02\x02\u013C" +
		"\u013A\x03\x02\x02\x02\u013D\u013E\x03\x02\x02\x02\u013E\u013F\x07^\x02" +
		"\x02\u013F\u0140\x07^\x02\x02\u0140\u014F\x03\x02\x02\x02\u0141\u0142" +
		"\x07]\x02\x02\u0142\u0143\x07\x11\x02\x02\u0143\u0145\x07]\x02\x02\u0144" +
		"\u0146\x05&\x14\x02\u0145\u0144\x03\x02\x02\x02\u0146\u0147\x03\x02\x02" +
		"\x02\u0147\u0148\x03\x02\x02\x02\u0147\u0145\x03\x02\x02\x02\u0148\u0149" +
		"\x03\x02\x02\x02\u0149\u014A\x07^\x02\x02\u014A\u014B\x07^\x02\x02\u014B" +
		"\u014F\x03\x02\x02\x02\u014C\u014F\x05(\x15\x02\u014D\u014F\x05*\x16\x02" +
		"\u014E\u0136\x03\x02\x02\x02\u014E\u0141\x03\x02\x02\x02\u014E\u014C\x03" +
		"\x02\x02\x02\u014E\u014D\x03\x02\x02\x02\u014F#\x03\x02\x02\x02\u0150" +
		"\u0151\x07]\x02\x02\u0151\u0152\x07\x11\x02\x02\u0152\u0154\x07]\x02\x02" +
		"\u0153\u0155\x05&\x14\x02\u0154\u0153\x03\x02\x02\x02\u0155\u0156\x03" +
		"\x02\x02\x02\u0156\u0157\x03\x02\x02\x02\u0156\u0154\x03\x02\x02\x02\u0157" +
		"\u0158\x03\x02\x02\x02\u0158\u0159\x07^\x02\x02\u0159\u015A\x07^\x02\x02" +
		"\u015A\u015E\x03\x02\x02\x02\u015B\u015E\x05(\x15\x02\u015C\u015E\x05" +
		"*\x16\x02\u015D\u0150\x03\x02\x02\x02\u015D\u015B\x03\x02\x02\x02\u015D" +
		"\u015C\x03\x02\x02\x02\u015E%\x03\x02\x02\x02\u015F\u0160\x07]\x02\x02" +
		"\u0160\u0161\x05\x9CO\x02\u0161\u0162\x05$\x13\x02\u0162\u0163\x07^\x02" +
		"\x02\u0163\u016C\x03\x02\x02\x02\u0164\u016C\x05$\x13\x02\u0165\u0166" +
		"\x07]\x02\x02\u0166\u0167\x05\x9CO\x02\u0167\u0168\x05,\x17\x02\u0168" +
		"\u0169\x07^\x02\x02\u0169\u016C\x03\x02\x02\x02\u016A\u016C\x05,\x17\x02" +
		"\u016B\u015F\x03\x02\x02\x02\u016B\u0164\x03\x02\x02\x02\u016B\u0165\x03" +
		"\x02\x02\x02\u016B\u016A\x03\x02\x02\x02\u016C\'\x03\x02\x02\x02\u016D" +
		"\u016E\x07]\x02\x02\u016E\u016F\t\x04\x02\x02\u016F\u0170\x05t;\x02\u0170" +
		"\u0171\x05\x02\x02\x02\u0171\u0172\x05&\x14\x02\u0172\u0173\x07^\x02\x02" +
		"\u0173)\x03\x02\x02\x02\u0174\u0175\x07]\x02\x02\u0175\u0176\x07\x14\x02" +
		"\x02\u0176\u0177\x05r:\x02\u0177\u017B\x05\x02\x02\x02\u0178\u017C\x05" +
		"\"\x12\x02\u0179\u017C\x05,\x17\x02\u017A\u017C\x05&\x14\x02\u017B\u0178" +
		"\x03\x02\x02\x02\u017B\u0179\x03\x02\x02\x02\u017B\u017A\x03\x02\x02\x02" +
		"\u017C\u017D\x03\x02\x02\x02\u017D\u017E\x07^\x02\x02\u017E+\x03\x02\x02" +
		"\x02\u017F\u0190\x07]\x02\x02\u0180\u0191\x05:\x1E\x02\u0181\u0191\x05" +
		"0\x19\x02\u0182\u0191\x054\x1B\x02\u0183\u0191\x05B\"\x02\u0184\u0191" +
		"\x05D#\x02\u0185\u0191\x05L\'\x02\u0186\u0191\x05P)\x02\u0187\u0191\x05" +
		"N(\x02\u0188\u0191\x05<\x1F\x02\u0189\u0191\x05H%\x02\u018A\u0191\x05" +
		"F$\x02\u018B\u0191\x05J&\x02\u018C\u0191\x05R*\x02\u018D\u0191\x05V,\x02" +
		"\u018E\u0191\x05T+\x02\u018F\u0191\x05X-\x02\u0190\u0180\x03\x02\x02\x02" +
		"\u0190\u0181\x03\x02\x02\x02\u0190\u0182\x03\x02\x02\x02\u0190\u0183\x03" +
		"\x02\x02\x02\u0190\u0184\x03\x02\x02\x02\u0190\u0185\x03\x02\x02\x02\u0190" +
		"\u0186\x03\x02\x02\x02\u0190\u0187\x03\x02\x02\x02\u0190\u0188\x03\x02" +
		"\x02\x02\u0190\u0189\x03\x02\x02\x02\u0190\u018A\x03\x02\x02\x02\u0190" +
		"\u018B\x03\x02\x02\x02\u0190\u018C\x03\x02\x02\x02\u0190\u018D\x03\x02" +
		"\x02\x02\u0190\u018E\x03\x02\x02\x02\u0190\u018F\x03\x02\x02\x02\u0191" +
		"\u0192\x03\x02\x02\x02\u0192\u0193\x07^\x02\x02\u0193\u0196\x03\x02\x02" +
		"\x02\u0194\u0196\x05(\x15\x02\u0195\u017F\x03\x02\x02\x02\u0195\u0194" +
		"\x03\x02\x02\x02\u0196-\x03\x02\x02\x02\u0197\u0198\x07]\x02\x02\u0198" +
		"\u0199\x07\x15\x02\x02\u0199\u019A\x07\x16\x02\x02\u019A\u019B\x05\xA2" +
		"R\x02\u019B\u019C\x07^\x02\x02\u019C/\x03\x02\x02\x02\u019D\u019E\x07" +
		"]\x02\x02\u019E\u019F\x07\x15\x02\x02\u019F\u01A1\x07\x17\x02\x02\u01A0" +
		"\u01A2\x052\x1A\x02\u01A1\u01A0\x03\x02\x02\x02\u01A2\u01A3\x03\x02\x02" +
		"\x02\u01A3\u01A4\x03\x02\x02\x02\u01A3\u01A1\x03\x02\x02\x02\u01A4\u01A5" +
		"\x03\x02\x02\x02\u01A5\u01A6\x07^\x02\x02\u01A61\x03\x02\x02\x02\u01A7" +
		"\u01AC\x07]\x02\x02\u01A8\u01A9\x07[\x02\x02\u01A9\u01AB\x07\x18\x02\x02" +
		"\u01AA\u01A8\x03\x02\x02\x02\u01AB\u01AE\x03\x02\x02\x02\u01AC\u01AD\x03" +
		"\x02\x02\x02\u01AC\u01AA\x03\x02\x02\x02\u01AD\u01AF\x03\x02\x02\x02\u01AE" +
		"\u01AC\x03\x02\x02\x02\u01AF\u01B3\x07[\x02\x02\u01B0\u01B2\x052\x1A\x02" +
		"\u01B1\u01B0\x03\x02\x02\x02\u01B2\u01B5\x03\x02\x02\x02\u01B3\u01B4\x03" +
		"\x02\x02\x02\u01B3\u01B1\x03\x02\x02\x02\u01B4\u01B6\x03\x02\x02\x02\u01B5" +
		"\u01B3\x03\x02\x02\x02\u01B6\u01B7\x07^\x02\x02\u01B73\x03\x02\x02\x02" +
		"\u01B8\u01B9\x07\x15\x02\x02\u01B9\u01BB\x07\x19\x02\x02\u01BA\u01BC\x05" +
		"\xCAf\x02\u01BB\u01BA\x03\x02\x02\x02\u01BB\u01BC\x03\x02\x02\x02\u01BC" +
		"\u01BD\x03\x02\x02\x02\u01BD\u01BE\x05|?\x02\u01BE\u01BF\x056\x1C\x02" +
		"\u01BF5\x03\x02\x02\x02\u01C0\u01C1\x07]\x02\x02\u01C1\u01C3\x07\x19\x02" +
		"\x02\u01C2\u01C4\x058\x1D\x02\u01C3\u01C2\x03\x02\x02\x02\u01C4\u01C5" +
		"\x03\x02\x02\x02\u01C5\u01C6\x03\x02\x02\x02\u01C5\u01C3\x03\x02\x02\x02" +
		"\u01C6\u01C7\x03\x02\x02\x02\u01C7\u01C8\x07^\x02\x02\u01C87\x03\x02\x02" +
		"\x02\u01C9\u01CF\x07]\x02\x02\u01CA\u01CB\x05\xD0i\x02\u01CB\u01CC\x07" +
		"\x18\x02\x02\u01CC\u01CE\x03\x02\x02\x02\u01CD\u01CA\x03\x02\x02\x02\u01CE" +
		"\u01D1\x03\x02\x02\x02\u01CF\u01D0\x03\x02\x02\x02\u01CF\u01CD\x03\x02" +
		"\x02\x02\u01D0\u01D2\x03\x02\x02\x02\u01D1\u01CF\x03\x02\x02\x02\u01D2" +
		"\u01D6\x05\xD0i\x02\u01D3\u01D5\x058\x1D\x02\u01D4\u01D3\x03\x02\x02\x02" +
		"\u01D5\u01D8\x03\x02\x02\x02\u01D6\u01D7\x03\x02\x02\x02\u01D6\u01D4\x03" +
		"\x02";
	private static readonly _serializedATNSegment1: string =
		"\x02\x02\u01D7\u01D9\x03\x02\x02\x02\u01D8\u01D6\x03\x02\x02\x02\u01D9" +
		"\u01DA\x07^\x02\x02\u01DA9\x03\x02\x02\x02\u01DB\u01DC\x07\x1A\x02\x02" +
		"\u01DC\u01DD\x05Z.\x02\u01DD\u01DF\x07]\x02\x02\u01DE\u01E0\x05> \x02" +
		"\u01DF\u01DE\x03\x02\x02\x02\u01E0\u01E1\x03\x02\x02\x02\u01E1\u01E2\x03" +
		"\x02\x02\x02\u01E1\u01DF\x03\x02\x02\x02\u01E2\u01E3\x03\x02\x02\x02\u01E3" +
		"\u01E4\x07^\x02\x02\u01E4;\x03\x02\x02\x02\u01E5\u01E6\x07\x1B\x02\x02" +
		"\u01E6\u01E7\x05Z.\x02\u01E7\u01E9\x07]\x02\x02\u01E8\u01EA\x05> \x02" +
		"\u01E9\u01E8\x03\x02\x02\x02\u01EA\u01EB\x03\x02\x02\x02\u01EB\u01EC\x03" +
		"\x02\x02\x02\u01EB\u01E9\x03\x02\x02\x02\u01EC\u01ED\x03\x02\x02\x02\u01ED" +
		"\u01EE\x07^\x02\x02\u01EE=\x03\x02\x02\x02\u01EF\u01F1\x07]\x02\x02\u01F0" +
		"\u01F2\x05@!\x02\u01F1\u01F0\x03\x02\x02\x02\u01F2\u01F3\x03\x02\x02\x02" +
		"\u01F3\u01F4\x03\x02\x02\x02\u01F3\u01F1\x03\x02\x02\x02\u01F4\u01F5\x03" +
		"\x02\x02\x02\u01F5\u01F6\x05\xA2R\x02\u01F6\u01F7\x07^\x02\x02\u01F7?" +
		"\x03\x02\x02\x02\u01F8\u01F9\x07]\x02\x02\u01F9\u01FA\x05\xCAf\x02\u01FA" +
		"\u01FB\x07\x1C\x02\x02\u01FB\u01FC\x05\xCAf\x02\u01FC\u01FD\x07^\x02\x02" +
		"\u01FDA\x03\x02\x02\x02\u01FE\u01FF\x07\x1D\x02\x02\u01FF\u0202\t\x05" +
		"\x02\x02\u0200\u0203\x05h5\x02\u0201\u0203\x05\b\x05\x02\u0202\u0200\x03" +
		"\x02\x02\x02\u0202\u0201\x03\x02\x02\x02\u0203C\x03\x02\x02\x02\u0204" +
		"\u0205\x07\x1A\x02\x02\u0205\u0206\x05\xC4c\x02\u0206\u0207\x05\xA2R\x02" +
		"\u0207E\x03\x02\x02\x02\u0208\u0209\x07\x1A\x02\x02\u0209\u020A\x05\xCC" +
		"g\x02\u020A\u020B\x05\xCAf\x02\u020BG\x03\x02\x02\x02\u020C\u020D\x07" +
		" \x02\x02\u020D\u020F\x05\xC4c\x02\u020E\u0210\x05\xA2R\x02\u020F\u020E" +
		"\x03\x02\x02\x02\u020F\u0210\x03\x02\x02\x02\u0210I\x03\x02\x02\x02\u0211" +
		"\u0212\x07!\x02\x02\u0212\u0214\x05\xC4c\x02\u0213\u0215\x05\xA2R\x02" +
		"\u0214\u0213\x03\x02\x02\x02\u0214\u0215\x03\x02\x02\x02\u0215K\x03\x02" +
		"\x02\x02\u0216\u0217\x07\"\x02\x02\u0217\u0218\x05\\/\x02\u0218\u0219" +
		"\x05\\/\x02\u0219M\x03\x02\x02\x02\u021A\u0221\x07#\x02\x02\u021B\u021C" +
		"\x05\\/\x02\u021C\u021D\x05\\/\x02\u021D\u0222\x03\x02\x02\x02\u021E\u021F" +
		"\x05~@\x02\u021F\u0220\x05~@\x02\u0220\u0222\x03\x02\x02\x02\u0221\u021B" +
		"\x03\x02\x02\x02\u0221\u021E\x03\x02\x02\x02\u0222O\x03\x02\x02\x02\u0223" +
		"\u0224\x07$\x02\x02\u0224\u0225\x05\\/\x02\u0225\u0226\x05\\/\x02\u0226" +
		"Q\x03\x02\x02\x02\u0227\u0228\x07%\x02\x02\u0228\u0229\x05\\/\x02\u0229" +
		"S\x03\x02\x02\x02\u022A\u0230\x07&\x02\x02\u022B\u0231\x05|?\x02\u022C" +
		"\u022D\x07\'\x02\x02\u022D\u022E\x05|?\x02\u022E\u022F\x05|?\x02\u022F" +
		"\u0231\x03\x02\x02\x02\u0230\u022B\x03\x02\x02\x02\u0230\u022C\x03\x02" +
		"\x02\x02\u0231U\x03\x02\x02\x02\u0232\u0233\x07(\x02\x02\u0233\u0234\x07" +
		")\x02\x02\u0234W\x03\x02\x02\x02\u0235\u0236\x07*\x02\x02\u0236\u0237" +
		"\x05\xA2R\x02\u0237\u0238\x05,\x17\x02\u0238\u0243\x03\x02\x02\x02\u0239" +
		"\u023A\x07*\x02\x02\u023A\u023B\x07\x13\x02\x02\u023B\u023E\x07]\x02\x02" +
		"\u023C\u023F\x05L\'\x02\u023D\u023F\x05R*\x02\u023E\u023C\x03\x02\x02" +
		"\x02\u023E\u023D\x03\x02\x02\x02\u023F\u0240\x03\x02\x02\x02\u0240\u0241" +
		"\x07^\x02\x02\u0241\u0243\x03\x02\x02\x02\u0242\u0235\x03\x02\x02\x02" +
		"\u0242\u0239\x03\x02\x02\x02\u0243Y\x03\x02\x02\x02\u0244\u0248\x07]\x02" +
		"\x02\u0245\u0249\x05\x06\x04\x02\u0246\u0249\x07\x04\x02\x02\u0247\u0249" +
		"\x05f4\x02\u0248\u0245\x03\x02\x02\x02\u0248\u0246\x03\x02\x02\x02\u0248" +
		"\u0247\x03\x02\x02\x02\u0249\u024A\x03\x02\x02\x02\u024A\u024B\x07+\x02" +
		"\x02\u024B\u024C\x05\xCAf\x02\u024C\u024D\x07^\x02\x02\u024D[\x03\x02" +
		"\x02\x02\u024E\u025B\x05\x14\v\x02\u024F\u025B\x05^0\x02\u0250\u025B\x05" +
		"`1\x02\u0251\u0255\x07]\x02\x02\u0252\u0256\x07,\x02\x02\u0253\u0256\x07" +
		"-\x02\x02\u0254\u0256\x05\xA2R\x02\u0255\u0252\x03\x02\x02\x02\u0255\u0253" +
		"\x03\x02\x02\x02\u0255\u0254\x03\x02\x02\x02\u0256\u0257\x03\x02\x02\x02" +
		"\u0257\u0258\x05|?\x02\u0258\u0259\x07^\x02\x02\u0259\u025B\x03\x02\x02" +
		"\x02\u025A\u024E\x03\x02\x02\x02\u025A\u024F\x03\x02\x02\x02\u025A\u0250" +
		"\x03\x02\x02\x02\u025A\u0251\x03\x02\x02\x02\u025B]\x03\x02\x02\x02\u025C" +
		"\u025D\x07]\x02\x02\u025D\u025E\x07\t\x02\x02\u025E\u025F\x05|?\x02\u025F" +
		"\u0260\x07.\x02\x02\u0260\u0261\x05Z.\x02\u0261\u0262\x07^\x02\x02\u0262" +
		"_\x03\x02\x02\x02\u0263\u0264\x07]\x02\x02\u0264\u0265\x07\b\x02\x02\u0265" +
		"\u0266\x05|?\x02\u0266\u0267\x07.\x02\x02\u0267\u0268\x05Z.\x02\u0268" +
		"\u0269\x07^\x02\x02\u0269a\x03\x02\x02\x02\u026A\u026E\x07\x04\x02\x02" +
		"\u026B\u026E\x05\b\x05\x02\u026C\u026E\x05h5\x02\u026D\u026A\x03\x02\x02" +
		"\x02\u026D\u026B\x03\x02\x02\x02\u026D\u026C\x03\x02\x02\x02\u026Ec\x03" +
		"\x02\x02\x02\u026F\u0270\t\x06\x02\x02\u0270e\x03\x02\x02\x02\u0271\u0274" +
		"\x05j6\x02\u0272\u0274\x05h5\x02\u0273\u0271\x03\x02\x02\x02\u0273\u0272" +
		"\x03\x02\x02\x02\u0274g\x03\x02\x02\x02\u0275\u0276\x07]\x02\x02\u0276" +
		"\u0277\x05l7\x02\u0277\u0278\x07\v\x02\x02\u0278\u0279\x07^\x02\x02\u0279" +
		"\u027C\x03\x02\x02\x02\u027A\u027C\x05n8\x02\u027B\u0275\x03\x02\x02\x02" +
		"\u027B\u027A\x03\x02\x02\x02\u027Ci\x03\x02\x02\x02\u027D\u027E\x07]\x02" +
		"\x02\u027E\u027F\x05l7\x02\u027F\u0280\x07\f\x02\x02\u0280\u0281\x07^" +
		"\x02\x02\u0281\u0284\x03\x02\x02\x02\u0282\u0284\x05p9\x02\u0283\u027D" +
		"\x03\x02\x02\x02\u0283\u0282\x03\x02\x02\x02\u0284k\x03\x02\x02\x02\u0285" +
		"\u028A\x05\xA2R\x02\u0286\u028A\x074\x02\x02\u0287\u028A\x07\x1E\x02\x02" +
		"\u0288\u028A\x07\x1F\x02\x02\u0289\u0285\x03\x02\x02\x02\u0289\u0286\x03" +
		"\x02\x02\x02\u0289\u0287\x03\x02\x02\x02\u0289\u0288\x03\x02\x02\x02\u028A" +
		"m\x03\x02\x02\x02\u028B\u028C\x07]\x02\x02\u028C\u028D\x075\x02\x02\u028D" +
		"\u028E\x05\\/\x02\u028E\u028F\x07^\x02\x02\u028Fo\x03\x02\x02\x02\u0290" +
		"\u0291\x07]\x02\x02\u0291\u0294\x07\f\x02\x02\u0292\u0295\x05\b\x05\x02" +
		"\u0293\u0295\x05h5\x02\u0294\u0292\x03\x02\x02\x02\u0294\u0293\x03\x02" +
		"\x02\x02\u0295\u0296\x03\x02\x02\x02\u0296\u0297\x07^\x02\x02\u0297q\x03" +
		"\x02\x02\x02\u0298\u029D\x05\xA2R\x02\u0299\u029D\x05\x9CO\x02\u029A\u029D" +
		"\x05\xCAf\x02\u029B\u029D\x05t;\x02\u029C\u0298\x03\x02\x02\x02\u029C" +
		"\u0299\x03\x02\x02\x02\u029C\u029A\x03\x02\x02\x02\u029C\u029B\x03\x02" +
		"\x02\x02\u029Ds\x03\x02\x02\x02\u029E\u02A9\x05\x0E\b\x02\u029F\u02A9" +
		"\x05\x88E\x02\u02A0\u02A9\x05|?\x02\u02A1\u02A9\x05v<\x02\u02A2\u02A9" +
		"\x05\x90I\x02\u02A3\u02A9\x07\v\x02\x02\u02A4\u02A9\x07\f\x02\x02\u02A5" +
		"\u02A9\x05j6\x02\u02A6\u02A9\x05z>\x02\u02A7\u02A9\x05x=\x02\u02A8\u029E" +
		"\x03\x02\x02\x02\u02A8\u029F\x03\x02\x02\x02\u02A8\u02A0\x03\x02\x02\x02" +
		"\u02A8\u02A1\x03\x02\x02\x02\u02A8\u02A2\x03\x02\x02\x02\u02A8\u02A3\x03" +
		"\x02\x02\x02\u02A8\u02A4\x03\x02\x02\x02\u02A8\u02A5\x03\x02\x02\x02\u02A8" +
		"\u02A6\x03\x02\x02\x02\u02A8\u02A7\x03\x02\x02\x02\u02A9u\x03\x02\x02" +
		"\x02\u02AA\u02B0\x07]\x02\x02\u02AB\u02AC\x05\xD0i\x02\u02AC\u02AD\x07" +
		"\x18\x02\x02\u02AD\u02AF\x03\x02\x02\x02\u02AE\u02AB\x03\x02\x02\x02\u02AF" +
		"\u02B2\x03\x02\x02\x02\u02B0\u02B1\x03\x02\x02\x02\u02B0\u02AE\x03\x02" +
		"\x02\x02\u02B1\u02B3\x03\x02\x02\x02\u02B2\u02B0\x03\x02\x02\x02\u02B3" +
		"\u02B4\x05\xD0i\x02\u02B4\u02B5\x07^\x02\x02\u02B5w\x03\x02\x02\x02\u02B6" +
		"\u02B7\x07]\x02\x02\u02B7\u02B8\x076\x02\x02\u02B8\u02B9\x05\xA2R\x02" +
		"\u02B9\u02BA\x077\x02\x02\u02BA\u02BB\x05\xA2R\x02\u02BB\u02BC\x07^\x02" +
		"\x02\u02BCy\x03\x02\x02\x02\u02BD\u02BE\x07]\x02\x02\u02BE\u02BF\x078" +
		"\x02\x02\u02BF\u02C0\t\x03\x02\x02\u02C0\u02C1\x07^\x02\x02\u02C1{\x03" +
		"\x02\x02\x02\u02C2\u02CD\x05\x10\t\x02\u02C3\u02CD\x05\x82B\x02\u02C4" +
		"\u02CD\x05\x84C\x02\u02C5\u02CD\x05\x86D\x02\u02C6\u02CD\x05\x80A\x02" +
		"\u02C7\u02CD\x05\x88E\x02\u02C8\u02CD\x05~@\x02\u02C9\u02CD\x05\x8AF\x02" +
		"\u02CA\u02CD\x05\x8CG\x02\u02CB\u02CD\x05\x8EH\x02\u02CC\u02C2\x03\x02" +
		"\x02\x02\u02CC\u02C3\x03\x02\x02\x02\u02CC\u02C4\x03\x02\x02\x02\u02CC" +
		"\u02C5\x03\x02\x02\x02\u02CC\u02C6\x03\x02\x02\x02\u02CC\u02C7\x03\x02" +
		"\x02\x02\u02CC\u02C8\x03\x02\x02\x02\u02CC\u02C9\x03\x02\x02\x02\u02CC" +
		"\u02CA\x03\x02\x02\x02\u02CC\u02CB\x03\x02\x02\x02\u02CD}\x03\x02\x02" +
		"\x02\u02CE\u02CF\x07]\x02\x02\u02CF\u02D0\x05b2\x02\u02D0\u02D1\x05d3" +
		"\x02\u02D1\u02D3\x05\xCAf\x02\u02D2\u02D4\x05\xA2R\x02\u02D3\u02D2\x03" +
		"\x02\x02\x02\u02D3\u02D4\x03\x02\x02\x02\u02D4\u02D5\x03\x02\x02\x02\u02D5" +
		"\u02D6\x07^\x02\x02\u02D6\x7F\x03\x02\x02\x02\u02D7\u02D8\x07]\x02\x02" +
		"\u02D8\u02D9\x079\x02\x02\u02D9\u02DA\x05|?\x02\u02DA\u02DB\x07.\x02\x02" +
		"\u02DB\u02DC\x05Z.\x02\u02DC\u02DD\x07^\x02\x02\u02DD\x81\x03\x02\x02" +
		"\x02\u02DE\u02DF\x07]\x02\x02\u02DF\u02E6\x07:\x02\x02\u02E0\u02E7\x05" +
		"\x98M\x02\u02E1\u02E3\x05|?\x02\u02E2\u02E1\x03\x02\x02\x02\u02E3\u02E4" +
		"\x03\x02\x02\x02\u02E4\u02E5\x03\x02\x02\x02\u02E4\u02E2\x03\x02\x02\x02" +
		"\u02E5\u02E7\x03\x02\x02\x02\u02E6\u02E0\x03\x02\x02\x02\u02E6\u02E2\x03" +
		"\x02\x02\x02\u02E7\u02E8\x03\x02\x02\x02\u02E8\u02E9\x07^\x02\x02\u02E9" +
		"\x83\x03\x02\x02\x02\u02EA\u02EB\x07]\x02\x02\u02EB\u02F2\x07;\x02\x02" +
		"\u02EC\u02F3\x05\x98M\x02\u02ED\u02EF\x05|?\x02\u02EE\u02ED\x03\x02\x02" +
		"\x02\u02EF\u02F0\x03\x02\x02\x02\u02F0\u02F1\x03\x02\x02\x02\u02F0\u02EE" +
		"\x03\x02\x02\x02\u02F1\u02F3\x03\x02\x02\x02\u02F2\u02EC\x03\x02\x02\x02" +
		"\u02F2\u02EE\x03\x02\x02\x02\u02F3\u02F4\x03\x02\x02\x02\u02F4\u02F5\x07" +
		"^\x02\x02\u02F5\x85\x03\x02\x02\x02\u02F6\u02F7\x07]\x02\x02\u02F7\u02FE" +
		"\x07<\x02\x02\u02F8\u02FF\x05\x98M\x02\u02F9\u02FB\x05|?\x02\u02FA\u02F9" +
		"\x03\x02\x02\x02\u02FB\u02FC\x03\x02\x02\x02\u02FC\u02FD\x03\x02\x02\x02" +
		"\u02FC\u02FA\x03\x02\x02\x02\u02FD\u02FF\x03\x02\x02\x02\u02FE\u02F8\x03" +
		"\x02\x02\x02\u02FE\u02FA\x03\x02\x02\x02\u02FF\u0300\x03\x02\x02\x02\u0300" +
		"\u0301\x07^\x02\x02\u0301\x87\x03\x02\x02\x02\u0302\u0303\x07]\x02\x02" +
		"\u0303\u0304\x07=\x02\x02\u0304\u0305\x05t;\x02\u0305\u0306\x05\x02\x02" +
		"\x02\u0306\u0307\x05\x9CO\x02\u0307\u0308\x07^\x02\x02\u0308\x89\x03\x02" +
		"\x02\x02\u0309\u030D\x07]\x02\x02\u030A\u030E\x07,\x02\x02\u030B\u030E" +
		"\x07-\x02\x02\u030C\u030E\x05\xA2R\x02\u030D\u030A\x03\x02\x02\x02\u030D" +
		"\u030B\x03\x02\x02\x02\u030D\u030C\x03\x02\x02\x02\u030E\u030F\x03\x02" +
		"\x02\x02\u030F\u0310\x05\x90I\x02\u0310\u0311\x07^\x02\x02\u0311\x8B\x03" +
		"\x02\x02\x02\u0312\u0313\x07]\x02\x02\u0313\u0314\t\x07\x02\x02\u0314" +
		"\u0315\x05\xA2R\x02\u0315\u0316\x05|?\x02\u0316\u0317\x07^\x02\x02\u0317" +
		"\x8D\x03\x02\x02\x02\u0318\u0319\x07]\x02\x02\u0319\u031A\x07>\x02\x02" +
		"\u031A\u031B\t\x07\x02\x02\u031B\u031C\x05\xA2R\x02\u031C\u031D\x05|?" +
		"\x02\u031D\u031E\x07.\x02\x02\u031E\u031F\x05Z.\x02\u031F\u0320\x07^\x02" +
		"\x02\u0320\x8F\x03\x02\x02\x02\u0321\u0328\x05\x96L\x02\u0322\u0328\x05" +
		"\x94K\x02\u0323\u0328\x05\x92J\x02\u0324\u0328\x05\x98M\x02\u0325\u0328" +
		"\x05\x12\n\x02\u0326\u0328\x05\x9AN\x02\u0327\u0321\x03\x02\x02\x02\u0327" +
		"\u0322\x03\x02\x02\x02\u0327\u0323\x03\x02\x02\x02\u0327\u0324\x03\x02" +
		"\x02\x02\u0327\u0325\x03\x02\x02\x02\u0327\u0326\x03\x02\x02\x02\u0328" +
		"\x91\x03\x02\x02\x02\u0329\u032A\x07]\x02\x02\u032A\u032B\x07?\x02\x02" +
		"\u032B\u032C\t\b\x02\x02\u032C\u032D\x05\xA2R\x02\u032D\u032E\x05|?\x02" +
		"\u032E\u032F\x07.\x02\x02\u032F\u0330\x05Z.\x02\u0330\u0331\x07^\x02\x02" +
		"\u0331\x93\x03\x02\x02\x02\u0332\u0333\x07]\x02\x02\u0333\u0334\x07A\x02" +
		"\x02\u0334\u0338\x05|?\x02\u0335\u0336\x05\x9EP\x02\u0336\u0337\x05\xA2" +
		"R\x02\u0337\u0339\x03\x02\x02\x02\u0338\u0335\x03\x02\x02\x02\u0338\u0339" +
		"\x03\x02\x02\x02\u0339\u033A\x03\x02\x02\x02\u033A\u033B\x07^\x02\x02" +
		"\u033B\x95\x03\x02\x02\x02\u033C\u033D\x07]\x02\x02\u033D\u033E\x07B\x02" +
		"\x02\u033E\u0345\x05\xCAf\x02\u033F\u0346\x05\x98M\x02\u0340\u0342\x05" +
		"|?\x02\u0341\u0340\x03\x02\x02\x02\u0342\u0343\x03\x02\x02\x02\u0343\u0344" +
		"\x03\x02\x02\x02\u0343\u0341\x03\x02\x02\x02\u0344\u0346\x03\x02\x02\x02" +
		"\u0345\u033F\x03\x02\x02\x02\u0345\u0341\x03\x02\x02\x02\u0346\u0347\x03" +
		"\x02\x02\x02\u0347\u0348\x07^\x02\x02\u0348\x97\x03\x02\x02\x02\u0349" +
		"\u034A\x07]\x02\x02\u034A\u034B\x07\x13\x02\x02\u034B\u034C\x05t;\x02" +
		"\u034C\u034D\x05\x02\x02\x02\u034D\u034E\x05|?\x02\u034E\u034F\x07^\x02" +
		"\x02\u034F\x99\x03\x02\x02\x02\u0350\u0351\x07]\x02\x02\u0351\u0352\x07" +
		"C\x02\x02\u0352\u0353\x05b2\x02\u0353\u0354\x05d3\x02\u0354\u0355\x05" +
		"\xCAf\x02\u0355\u0356\x07^\x02\x02\u0356\x9B\x03\x02\x02\x02\u0357\u0375" +
		"\x07]\x02\x02\u0358\u0359\x07W\x02\x02\u0359\u035B\x05\x9CO\x02\u035A" +
		"\u035C\x05\x9CO\x02\u035B\u035A\x03\x02\x02\x02\u035C\u035D\x03\x02\x02" +
		"\x02\u035D\u035E\x03\x02\x02\x02\u035D\u035B\x03\x02\x02\x02\u035E\u0376" +
		"\x03\x02\x02\x02\u035F\u0360\x05\x9EP\x02\u0360\u0361\x05\xA2R\x02\u0361" +
		"\u0362\x05\xA2R\x02\u0362\u0376\x03\x02\x02\x02\u0363\u0364\x07Y\x02\x02" +
		"\u0364\u0365\x05\xCAf\x02\u0365\u0366\x05\xCAf\x02\u0366\u0376\x03\x02" +
		"\x02\x02\u0367\u0368\x07Y\x02\x02\u0368\u0369\x05\\/\x02\u0369\u036A\x05" +
		"\\/\x02\u036A\u0376\x03\x02\x02\x02\u036B\u036C\x07Z\x02\x02\u036C\u0376" +
		"\x05\x9CO\x02\u036D\u036E\x07Y\x02\x02\u036E\u036F\x05h5\x02\u036F\u0370" +
		"\x05h5\x02\u0370\u0376\x03\x02\x02\x02\u0371\u0372\x07Y\x02\x02\u0372" +
		"\u0373\x05j6\x02\u0373\u0374\x05j6\x02\u0374\u0376\x03\x02\x02\x02\u0375" +
		"\u0358\x03\x02\x02\x02\u0375\u035F\x03\x02\x02\x02\u0375\u0363\x03\x02" +
		"\x02\x02\u0375\u0367\x03\x02\x02\x02\u0375\u036B\x03\x02\x02\x02\u0375" +
		"\u036D\x03\x02\x02\x02\u0375\u0371\x03\x02\x02\x02\u0376\u0377\x03\x02" +
		"\x02\x02\u0377\u0378\x07^\x02\x02\u0378\u037B\x03\x02\x02\x02\u0379\u037B" +
		"\x05\xA0Q\x02\u037A\u0357\x03\x02\x02\x02\u037A\u0379\x03\x02\x02\x02" +
		"\u037B\x9D\x03\x02\x02\x02\u037C\u037D\t\t\x02\x02\u037D\x9F\x03\x02\x02" +
		"\x02\u037E\u037F\x07]\x02\x02\u037F\u0380\t\x04\x02\x02\u0380\u0381\x05" +
		"t;\x02\u0381\u0382\x05\x02\x02\x02\u0382\u0383\x05\x9CO\x02\u0383\u0384" +
		"\x07^\x02\x02\u0384\xA1\x03\x02\x02\x02\u0385\u039A\x05\n\x06\x02\u0386" +
		"\u039A\x05\xC0a\x02\u0387\u039A\x05\xB0Y\x02\u0388\u039A\x05\xB2Z\x02" +
		"\u0389\u039A\x05\xB4[\x02\u038A\u039A\x05\xAEX\x02\u038B\u039A\x05\xB6" +
		"\\\x02\u038C\u039A\x05\xB8]\x02\u038D\u039A\x05\xBA^\x02\u038E\u039A\x05" +
		"\xBC_\x02\u038F\u039A\x05\xBE`\x02\u0390\u039A\x05\xA6T\x02\u0391\u039A" +
		"\x05\xC4c\x02\u0392\u039A\x05\xACW\x02\u0393\u039A\x05\xC6d\x02\u0394" +
		"\u039A\x05\xC8e\x02\u0395\u039A\x05\xC2b\x02\u0396\u039A\x05\xA8U\x02" +
		"\u0397\u039A\x05\xAAV\x02\u0398\u039A\x05\xA4S\x02\u0399\u0385\x03\x02" +
		"\x02\x02\u0399\u0386\x03\x02\x02\x02\u0399\u0387\x03\x02\x02\x02\u0399" +
		"\u0388\x03\x02\x02\x02\u0399\u0389\x03\x02\x02\x02\u0399\u038A\x03\x02" +
		"\x02\x02\u0399\u038B\x03\x02\x02\x02\u0399\u038C\x03\x02\x02\x02\u0399" +
		"\u038D\x03\x02\x02\x02\u0399\u038E\x03\x02\x02\x02\u0399\u038F\x03\x02" +
		"\x02\x02\u0399\u0390\x03\x02\x02\x02\u0399\u0391\x03\x02\x02\x02\u0399" +
		"\u0392\x03\x02\x02\x02\u0399\u0393\x03\x02\x02\x02\u0399\u0394\x03\x02" +
		"\x02\x02\u0399\u0395\x03\x02\x02\x02\u0399\u0396\x03\x02\x02\x02\u0399" +
		"\u0397\x03\x02\x02\x02\u0399\u0398\x03\x02\x02\x02\u039A\xA3\x03\x02\x02" +
		"\x02\u039B\u039D\x07[\x02\x02\u039C\u039B\x03\x02\x02\x02\u039D\u039E" +
		"\x03\x02\x02\x02\u039E\u039C\x03\x02\x02\x02\u039E\u039F\x03\x02\x02\x02" +
		"\u039F\xA5\x03\x02\x02\x02\u03A0\u03A1\x07]\x02\x02\u03A1\u03A2\x07D\x02" +
		"\x02\u03A2\u03A3\x05|?\x02\u03A3\u03A4\x07.\x02\x02\u03A4\u03A5\x05Z." +
		"\x02\u03A5\u03A6\x07^\x02\x02\u03A6\xA7\x03\x02\x02\x02\u03A7\u03A8\x07" +
		"]\x02\x02\u03A8\u03A9\x07E\x02\x02\u03A9\u03AA\x05|?\x02\u03AA\u03AB\x07" +
		".\x02\x02\u03AB\u03AC\x05Z.\x02\u03AC\u03AD\x07^\x02\x02\u03AD\xA9\x03" +
		"\x02\x02\x02\u03AE\u03AF\x07]\x02\x02\u03AF\u03B0\x07F\x02\x02\u03B0\u03B1" +
		"\x05|?\x02\u03B1\u03B2\x07.\x02\x02\u03B2\u03B3\x05Z.\x02\u03B3\u03B4" +
		"\x07^\x02\x02\u03B4\xAB\x03\x02\x02\x02\u03B5\u03B6\x07]\x02\x02\u03B6" +
		"\u03B7\x07G\x02\x02\u03B7\u03B8\x05\\/\x02\u03B8\u03B9\x07.\x02\x02\u03B9" +
		"\u03BA\x05Z.\x02\u03BA\u03BB\x07^\x02\x02\u03BB\xAD\x03\x02\x02\x02\u03BC" +
		"\u03BD\x07]\x02\x02\u03BD\u03BE\x07H\x02\x02\u03BE\u03C0\x05\xA2R\x02" +
		"\u03BF\u03C1\x05\xA2R\x02\u03C0\u03BF\x03\x02\x02\x02\u03C1\u03C2\x03" +
		"\x02\x02\x02\u03C2\u03C3\x03\x02\x02\x02\u03C2\u03C0\x03\x02\x02\x02\u03C3" +
		"\u03C4\x03\x02\x02\x02\u03C4\u03C5\x07^\x02\x02\u03C5\xAF\x03\x02\x02" +
		"\x02\u03C6\u03C7\x07]\x02\x02\u03C7\u03C8\x07I\x02\x02\u03C8\u03CA\x05" +
		"\xA2R\x02\u03C9\u03CB\x05\xA2R\x02\u03CA\u03C9\x03\x02\x02\x02\u03CB\u03CC" +
		"\x03\x02\x02\x02\u03CC\u03CD\x03\x02\x02\x02\u03CC\u03CA\x03\x02\x02\x02" +
		"\u03CD\u03CE\x03\x02\x02\x02\u03CE\u03CF\x07^\x02\x02\u03CF\xB1\x03\x02" +
		"\x02\x02\u03D0\u03D1\x07]\x02\x02\u03D1\u03D2\x07J\x02\x02\u03D2\u03D3" +
		"\x05\xA2R\x02\u03D3\u03D4\x05\xA2R\x02\u03D4\u03D5\x07^\x02\x02\u03D5" +
		"\xB3\x03\x02\x02\x02\u03D6\u03D7\x07]\x02\x02\u03D7\u03D8\x07K\x02\x02" +
		"\u03D8\u03D9\x05\xA2R\x02\u03D9\u03DA\x05\xA2R\x02\u03DA\u03DB\x07^\x02" +
		"\x02\u03DB\xB5\x03\x02\x02\x02\u03DC\u03DD\x07]\x02\x02\u03DD\u03DE\x07" +
		"L\x02\x02\u03DE\u03DF\x05\xA2R\x02\u03DF\u03E0\x05\xA2R\x02\u03E0\u03E1" +
		"\x07^\x02\x02\u03E1\xB7\x03\x02\x02\x02\u03E2\u03E3\x07]\x02\x02\u03E3" +
		"\u03E4\x07M\x02\x02\u03E4\u03E5\x05\xA2R\x02\u03E5\u03E6\x05\xA2R\x02" +
		"\u03E6\u03E7\x07^\x02\x02\u03E7\xB9\x03\x02\x02\x02\u03E8\u03E9\x07]\x02" +
		"\x02\u03E9\u03EA\x07N\x02\x02\u03EA\u03EB\x05\xA2R\x02\u03EB\u03EC\x07" +
		"^\x02\x02\u03EC\xBB\x03\x02\x02\x02\u03ED\u03EE\x07]\x02\x02\u03EE\u03EF" +
		"\x07O\x02\x02\u03EF\u03F0\x05\xA2R\x02\u03F0\u03F1\x07^\x02\x02\u03F1" +
		"\xBD\x03\x02\x02\x02\u03F2\u03F3\x07]\x02\x02\u03F3\u03F4\x07P\x02\x02" +
		"\u03F4\u03F7\x05\xA2R\x02\u03F5\u03F6\x077\x02\x02\u03F6\u03F8\x05\xA2" +
		"R\x02\u03F7\u03F5\x03\x02\x02\x02\u03F7\u03F8\x03\x02\x02\x02\u03F8\u03F9" +
		"\x03\x02\x02\x02\u03F9\u03FA\x07^\x02\x02\u03FA\xBF\x03\x02\x02\x02\u03FB" +
		"\u03FC\x07]\x02\x02\u03FC\u03FD\x07Q\x02\x02\u03FD\u03FE\x05t;\x02\u03FE" +
		"\u03FF\x07^\x02\x02\u03FF\xC1\x03\x02\x02\x02\u0400\u0401\x07]\x02\x02" +
		"\u0401\u0402\x07\x13\x02\x02\u0402\u0403\x05t;\x02\u0403\u0404\x05\x02" +
		"\x02\x02\u0404\u0405\x05\xC4c\x02\u0405\u0406\x07^\x02\x02\u0406\xC3\x03" +
		"\x02\x02\x02\u0407\u040B\x07]\x02\x02\u0408\u040C\x05\x06\x04\x02\u0409" +
		"\u040C\x07\x04\x02\x02\u040A\u040C\x05f4\x02\u040B\u0408\x03\x02\x02\x02" +
		"\u040B\u0409\x03\x02\x02\x02\u040B\u040A\x03\x02\x02\x02\u040C\u040D\x03" +
		"\x02\x02\x02\u040D\u040E\x07R\x02\x02\u040E\u040F\x05\xCAf\x02\u040F\u0410" +
		"\x07^\x02\x02\u0410\xC5\x03\x02\x02\x02\u0411\u0412\x07]\x02\x02\u0412" +
		"\u0413\x07S\x02\x02\u0413\u0414\x05h5\x02\u0414\u0415\x07^\x02\x02\u0415" +
		"\xC7\x03\x02\x02\x02\u0416\u0417\x07]\x02\x02\u0417\u0418\x07T\x02\x02" +
		"\u0418\u0419\x05j6\x02\u0419\u041A\x07^\x02\x02\u041A\xC9\x03\x02\x02" +
		"\x02\u041B\u0420\x05\xD0i\x02\u041C\u0420\x05\xCCg\x02\u041D\u0420\x05" +
		"\x04\x03\x02\u041E\u0420\x05\xCEh\x02\u041F\u041B\x03\x02\x02\x02\u041F" +
		"\u041C\x03\x02\x02\x02\u041F\u041D\x03\x02\x02\x02\u041F\u041E\x03\x02" +
		"\x02\x02\u0420\xCB\x03\x02\x02\x02\u0421\u0425\x07]\x02\x02\u0422\u0426" +
		"\x05\x06\x04\x02\u0423\u0426\x07\x04\x02\x02\u0424\u0426\x05f4\x02\u0425" +
		"\u0422\x03\x02\x02\x02\u0425\u0423\x03\x02\x02\x02\u0425\u0424\x03\x02" +
		"\x02\x02\u0426\u0427\x03\x02\x02\x02\u0427\u0428\x07U\x02\x02\u0428\u0429" +
		"\x05\xCAf\x02\u0429\u042A\x07^\x02\x02\u042A\xCD\x03\x02\x02\x02\u042B" +
		"\u042C\x07]\x02\x02\u042C\u042D\x07V\x02\x02\u042D\u042E\x05\xCAf\x02" +
		"\u042E\u042F\x05\\/\x02\u042F\u0430\x07^\x02\x02\u0430\xCF\x03\x02\x02" +
		"\x02\u0431\u0433\x07\\\x02\x02\u0432\u0431\x03\x02\x02\x02\u0433\u0434" +
		"\x03\x02\x02\x02\u0434\u0432\x03\x02\x02\x02\u0434\u0435\x03\x02\x02\x02" +
		"\u0435\xD1\x03\x02\x02\x02J\xF5\xFB\xFD\u010C\u0111\u0117\u0127\u012B" +
		"\u012D\u013C\u0147\u014E\u0156\u015D\u016B\u017B\u0190\u0195\u01A3\u01AC" +
		"\u01B3\u01BB\u01C5\u01CF\u01D6\u01E1\u01EB\u01F3\u0202\u020F\u0214\u0221" +
		"\u0230\u023E\u0242\u0248\u0255\u025A\u026D\u0273\u027B\u0283\u0289\u0294" +
		"\u029C\u02A8\u02B0\u02CC\u02D3\u02E4\u02E6\u02F0\u02F2\u02FC\u02FE\u030D" +
		"\u0327\u0338\u0343\u0345\u035D\u0375\u037A\u0399\u039E\u03C2\u03CC\u03F7" +
		"\u040B\u041F\u0425\u0434";
	public static readonly _serializedATN: string = Utils.join(
		[
			RecycleParser._serializedATNSegment0,
			RecycleParser._serializedATNSegment1,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!RecycleParser.__ATN) {
			RecycleParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(RecycleParser._serializedATN));
		}

		return RecycleParser.__ATN;
	}

}

export class VarContext extends ParserRuleContext {
	public namegr(): NamegrContext {
		return this.getRuleContext(0, NamegrContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_var; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterVar) {
			listener.enterVar(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitVar) {
			listener.exitVar(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitVar) {
			return visitor.visitVar(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarsContext extends ParserRuleContext {
	public namegr(): NamegrContext {
		return this.getRuleContext(0, NamegrContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_vars; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterVars) {
			listener.enterVars(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitVars) {
			listener.exitVars(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitVars) {
			return visitor.visitVars(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VaroContext extends ParserRuleContext {
	public namegr(): NamegrContext {
		return this.getRuleContext(0, NamegrContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_varo; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterVaro) {
			listener.enterVaro(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitVaro) {
			listener.exitVaro(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitVaro) {
			return visitor.visitVaro(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarpContext extends ParserRuleContext {
	public namegr(): NamegrContext {
		return this.getRuleContext(0, NamegrContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_varp; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterVarp) {
			listener.enterVarp(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitVarp) {
			listener.exitVarp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitVarp) {
			return visitor.visitVarp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariContext extends ParserRuleContext {
	public namegr(): NamegrContext {
		return this.getRuleContext(0, NamegrContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_vari; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterVari) {
			listener.enterVari(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitVari) {
			listener.exitVari(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitVari) {
			return visitor.visitVari(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarbContext extends ParserRuleContext {
	public namegr(): NamegrContext {
		return this.getRuleContext(0, NamegrContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_varb; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterVarb) {
			listener.enterVarb(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitVarb) {
			listener.exitVarb(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitVarb) {
			return visitor.visitVarb(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarcContext extends ParserRuleContext {
	public namegr(): NamegrContext {
		return this.getRuleContext(0, NamegrContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_varc; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterVarc) {
			listener.enterVarc(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitVarc) {
			listener.exitVarc(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitVarc) {
			return visitor.visitVarc(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarcsContext extends ParserRuleContext {
	public namegr(): NamegrContext {
		return this.getRuleContext(0, NamegrContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_varcs; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterVarcs) {
			listener.enterVarcs(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitVarcs) {
			listener.exitVarcs(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitVarcs) {
			return visitor.visitVarcs(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarcscContext extends ParserRuleContext {
	public namegr(): NamegrContext {
		return this.getRuleContext(0, NamegrContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_varcsc; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterVarcsc) {
			listener.enterVarcsc(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitVarcsc) {
			listener.exitVarcsc(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitVarcsc) {
			return visitor.visitVarcsc(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VarcardContext extends ParserRuleContext {
	public namegr(): NamegrContext {
		return this.getRuleContext(0, NamegrContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_varcard; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterVarcard) {
			listener.enterVarcard(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitVarcard) {
			listener.exitVarcard(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitVarcard) {
			return visitor.visitVarcard(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GameContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public setup(): SetupContext {
		return this.getRuleContext(0, SetupContext);
	}
	public scoring(): ScoringContext {
		return this.getRuleContext(0, ScoringContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public declare(): DeclareContext[];
	public declare(i: number): DeclareContext;
	public declare(i?: number): DeclareContext | DeclareContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DeclareContext);
		} else {
			return this.getRuleContext(i, DeclareContext);
		}
	}
	public multiaction(): MultiactionContext[];
	public multiaction(i: number): MultiactionContext;
	public multiaction(i?: number): MultiactionContext | MultiactionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MultiactionContext);
		} else {
			return this.getRuleContext(i, MultiactionContext);
		}
	}
	public stage(): StageContext[];
	public stage(i: number): StageContext;
	public stage(i?: number): StageContext | StageContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StageContext);
		} else {
			return this.getRuleContext(i, StageContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_game; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterGame) {
			listener.enterGame(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitGame) {
			listener.exitGame(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitGame) {
			return visitor.visitGame(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeclareContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public typed(): TypedContext {
		return this.getRuleContext(0, TypedContext);
	}
	public var(): VarContext {
		return this.getRuleContext(0, VarContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_declare; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterDeclare) {
			listener.enterDeclare(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitDeclare) {
			listener.exitDeclare(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitDeclare) {
			return visitor.visitDeclare(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SetupContext extends ParserRuleContext {
	public OPEN(): TerminalNode[];
	public OPEN(i: number): TerminalNode;
	public OPEN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RecycleParser.OPEN);
		} else {
			return this.getToken(RecycleParser.OPEN, i);
		}
	}
	public playercreate(): PlayercreateContext {
		return this.getRuleContext(0, PlayercreateContext);
	}
	public CLOSE(): TerminalNode[];
	public CLOSE(i: number): TerminalNode;
	public CLOSE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RecycleParser.CLOSE);
		} else {
			return this.getToken(RecycleParser.CLOSE, i);
		}
	}
	public teamcreate(): TeamcreateContext | undefined {
		return this.tryGetRuleContext(0, TeamcreateContext);
	}
	public deckcreate(): DeckcreateContext[];
	public deckcreate(i: number): DeckcreateContext;
	public deckcreate(i?: number): DeckcreateContext | DeckcreateContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DeckcreateContext);
		} else {
			return this.getRuleContext(i, DeckcreateContext);
		}
	}
	public repeat(): RepeatContext[];
	public repeat(i: number): RepeatContext;
	public repeat(i?: number): RepeatContext | RepeatContext[] {
		if (i === undefined) {
			return this.getRuleContexts(RepeatContext);
		} else {
			return this.getRuleContext(i, RepeatContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_setup; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterSetup) {
			listener.enterSetup(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitSetup) {
			listener.exitSetup(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitSetup) {
			return visitor.visitSetup(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ScoringContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public int(): IntContext {
		return this.getRuleContext(0, IntContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_scoring; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterScoring) {
			listener.enterScoring(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitScoring) {
			listener.exitScoring(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitScoring) {
			return visitor.visitScoring(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StageContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public endcondition(): EndconditionContext | undefined {
		return this.tryGetRuleContext(0, EndconditionContext);
	}
	public multiaction(): MultiactionContext[];
	public multiaction(i: number): MultiactionContext;
	public multiaction(i?: number): MultiactionContext | MultiactionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(MultiactionContext);
		} else {
			return this.getRuleContext(i, MultiactionContext);
		}
	}
	public stage(): StageContext[];
	public stage(i: number): StageContext;
	public stage(i?: number): StageContext | StageContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StageContext);
		} else {
			return this.getRuleContext(i, StageContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_stage; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterStage) {
			listener.enterStage(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitStage) {
			listener.exitStage(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitStage) {
			return visitor.visitStage(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EndconditionContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public boolean(): BooleanContext {
		return this.getRuleContext(0, BooleanContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_endcondition; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterEndcondition) {
			listener.enterEndcondition(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitEndcondition) {
			listener.exitEndcondition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitEndcondition) {
			return visitor.visitEndcondition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MultiactionContext extends ParserRuleContext {
	public OPEN(): TerminalNode[];
	public OPEN(i: number): TerminalNode;
	public OPEN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RecycleParser.OPEN);
		} else {
			return this.getToken(RecycleParser.OPEN, i);
		}
	}
	public CLOSE(): TerminalNode[];
	public CLOSE(i: number): TerminalNode;
	public CLOSE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RecycleParser.CLOSE);
		} else {
			return this.getToken(RecycleParser.CLOSE, i);
		}
	}
	public condact(): CondactContext[];
	public condact(i: number): CondactContext;
	public condact(i?: number): CondactContext | CondactContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CondactContext);
		} else {
			return this.getRuleContext(i, CondactContext);
		}
	}
	public agg(): AggContext | undefined {
		return this.tryGetRuleContext(0, AggContext);
	}
	public let(): LetContext | undefined {
		return this.tryGetRuleContext(0, LetContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_multiaction; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterMultiaction) {
			listener.enterMultiaction(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitMultiaction) {
			listener.exitMultiaction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitMultiaction) {
			return visitor.visitMultiaction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Multiaction2Context extends ParserRuleContext {
	public OPEN(): TerminalNode[];
	public OPEN(i: number): TerminalNode;
	public OPEN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RecycleParser.OPEN);
		} else {
			return this.getToken(RecycleParser.OPEN, i);
		}
	}
	public CLOSE(): TerminalNode[];
	public CLOSE(i: number): TerminalNode;
	public CLOSE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RecycleParser.CLOSE);
		} else {
			return this.getToken(RecycleParser.CLOSE, i);
		}
	}
	public condact(): CondactContext[];
	public condact(i: number): CondactContext;
	public condact(i?: number): CondactContext | CondactContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CondactContext);
		} else {
			return this.getRuleContext(i, CondactContext);
		}
	}
	public agg(): AggContext | undefined {
		return this.tryGetRuleContext(0, AggContext);
	}
	public let(): LetContext | undefined {
		return this.tryGetRuleContext(0, LetContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_multiaction2; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterMultiaction2) {
			listener.enterMultiaction2(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitMultiaction2) {
			listener.exitMultiaction2(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitMultiaction2) {
			return visitor.visitMultiaction2(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CondactContext extends ParserRuleContext {
	public OPEN(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.OPEN, 0); }
	public boolean(): BooleanContext | undefined {
		return this.tryGetRuleContext(0, BooleanContext);
	}
	public multiaction2(): Multiaction2Context | undefined {
		return this.tryGetRuleContext(0, Multiaction2Context);
	}
	public CLOSE(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.CLOSE, 0); }
	public action(): ActionContext | undefined {
		return this.tryGetRuleContext(0, ActionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_condact; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterCondact) {
			listener.enterCondact(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitCondact) {
			listener.exitCondact(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitCondact) {
			return visitor.visitCondact(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AggContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public collection(): CollectionContext {
		return this.getRuleContext(0, CollectionContext);
	}
	public var(): VarContext {
		return this.getRuleContext(0, VarContext);
	}
	public condact(): CondactContext {
		return this.getRuleContext(0, CondactContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_agg; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterAgg) {
			listener.enterAgg(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitAgg) {
			listener.exitAgg(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitAgg) {
			return visitor.visitAgg(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LetContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public typed(): TypedContext {
		return this.getRuleContext(0, TypedContext);
	}
	public var(): VarContext {
		return this.getRuleContext(0, VarContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public multiaction(): MultiactionContext | undefined {
		return this.tryGetRuleContext(0, MultiactionContext);
	}
	public action(): ActionContext | undefined {
		return this.tryGetRuleContext(0, ActionContext);
	}
	public condact(): CondactContext | undefined {
		return this.tryGetRuleContext(0, CondactContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_let; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterLet) {
			listener.enterLet(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitLet) {
			listener.exitLet(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitLet) {
			return visitor.visitLet(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ActionContext extends ParserRuleContext {
	public OPEN(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.OPEN, 0); }
	public CLOSE(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.CLOSE, 0); }
	public initpoints(): InitpointsContext | undefined {
		return this.tryGetRuleContext(0, InitpointsContext);
	}
	public teamcreate(): TeamcreateContext | undefined {
		return this.tryGetRuleContext(0, TeamcreateContext);
	}
	public deckcreate(): DeckcreateContext | undefined {
		return this.tryGetRuleContext(0, DeckcreateContext);
	}
	public cycleaction(): CycleactionContext | undefined {
		return this.tryGetRuleContext(0, CycleactionContext);
	}
	public setaction(): SetactionContext | undefined {
		return this.tryGetRuleContext(0, SetactionContext);
	}
	public moveaction(): MoveactionContext | undefined {
		return this.tryGetRuleContext(0, MoveactionContext);
	}
	public copyaction(): CopyactionContext | undefined {
		return this.tryGetRuleContext(0, CopyactionContext);
	}
	public swapaction(): SwapactionContext | undefined {
		return this.tryGetRuleContext(0, SwapactionContext);
	}
	public updatepoints(): UpdatepointsContext | undefined {
		return this.tryGetRuleContext(0, UpdatepointsContext);
	}
	public incaction(): IncactionContext | undefined {
		return this.tryGetRuleContext(0, IncactionContext);
	}
	public setstraction(): SetstractionContext | undefined {
		return this.tryGetRuleContext(0, SetstractionContext);
	}
	public decaction(): DecactionContext | undefined {
		return this.tryGetRuleContext(0, DecactionContext);
	}
	public removeaction(): RemoveactionContext | undefined {
		return this.tryGetRuleContext(0, RemoveactionContext);
	}
	public turnaction(): TurnactionContext | undefined {
		return this.tryGetRuleContext(0, TurnactionContext);
	}
	public shuffleaction(): ShuffleactionContext | undefined {
		return this.tryGetRuleContext(0, ShuffleactionContext);
	}
	public repeat(): RepeatContext | undefined {
		return this.tryGetRuleContext(0, RepeatContext);
	}
	public agg(): AggContext | undefined {
		return this.tryGetRuleContext(0, AggContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_action; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterAction) {
			listener.enterAction(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitAction) {
			listener.exitAction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitAction) {
			return visitor.visitAction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PlayercreateContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public int(): IntContext {
		return this.getRuleContext(0, IntContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_playercreate; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterPlayercreate) {
			listener.enterPlayercreate(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitPlayercreate) {
			listener.exitPlayercreate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitPlayercreate) {
			return visitor.visitPlayercreate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TeamcreateContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public teams(): TeamsContext[];
	public teams(i: number): TeamsContext;
	public teams(i?: number): TeamsContext | TeamsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TeamsContext);
		} else {
			return this.getRuleContext(i, TeamsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_teamcreate; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterTeamcreate) {
			listener.enterTeamcreate(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitTeamcreate) {
			listener.exitTeamcreate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitTeamcreate) {
			return visitor.visitTeamcreate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TeamsContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public INTNUM(): TerminalNode[];
	public INTNUM(i: number): TerminalNode;
	public INTNUM(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RecycleParser.INTNUM);
		} else {
			return this.getToken(RecycleParser.INTNUM, i);
		}
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public teams(): TeamsContext[];
	public teams(i: number): TeamsContext;
	public teams(i?: number): TeamsContext | TeamsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TeamsContext);
		} else {
			return this.getRuleContext(i, TeamsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_teams; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterTeams) {
			listener.enterTeams(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitTeams) {
			listener.exitTeams(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitTeams) {
			return visitor.visitTeams(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeckcreateContext extends ParserRuleContext {
	public cstorage(): CstorageContext {
		return this.getRuleContext(0, CstorageContext);
	}
	public deck(): DeckContext {
		return this.getRuleContext(0, DeckContext);
	}
	public str(): StrContext | undefined {
		return this.tryGetRuleContext(0, StrContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_deckcreate; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterDeckcreate) {
			listener.enterDeckcreate(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitDeckcreate) {
			listener.exitDeckcreate(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitDeckcreate) {
			return visitor.visitDeckcreate(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DeckContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public attribute(): AttributeContext[];
	public attribute(i: number): AttributeContext;
	public attribute(i?: number): AttributeContext | AttributeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AttributeContext);
		} else {
			return this.getRuleContext(i, AttributeContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_deck; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterDeck) {
			listener.enterDeck(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitDeck) {
			listener.exitDeck(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitDeck) {
			return visitor.visitDeck(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AttributeContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public namegr(): NamegrContext[];
	public namegr(i: number): NamegrContext;
	public namegr(i?: number): NamegrContext | NamegrContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NamegrContext);
		} else {
			return this.getRuleContext(i, NamegrContext);
		}
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public attribute(): AttributeContext[];
	public attribute(i: number): AttributeContext;
	public attribute(i?: number): AttributeContext | AttributeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AttributeContext);
		} else {
			return this.getRuleContext(i, AttributeContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_attribute; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterAttribute) {
			listener.enterAttribute(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitAttribute) {
			listener.exitAttribute(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitAttribute) {
			return visitor.visitAttribute(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InitpointsContext extends ParserRuleContext {
	public pointstorage(): PointstorageContext {
		return this.getRuleContext(0, PointstorageContext);
	}
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public awards(): AwardsContext[];
	public awards(i: number): AwardsContext;
	public awards(i?: number): AwardsContext | AwardsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AwardsContext);
		} else {
			return this.getRuleContext(i, AwardsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_initpoints; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterInitpoints) {
			listener.enterInitpoints(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitInitpoints) {
			listener.exitInitpoints(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitInitpoints) {
			return visitor.visitInitpoints(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UpdatepointsContext extends ParserRuleContext {
	public pointstorage(): PointstorageContext {
		return this.getRuleContext(0, PointstorageContext);
	}
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public awards(): AwardsContext[];
	public awards(i: number): AwardsContext;
	public awards(i?: number): AwardsContext | AwardsContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AwardsContext);
		} else {
			return this.getRuleContext(i, AwardsContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_updatepoints; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterUpdatepoints) {
			listener.enterUpdatepoints(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitUpdatepoints) {
			listener.exitUpdatepoints(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitUpdatepoints) {
			return visitor.visitUpdatepoints(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AwardsContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public int(): IntContext {
		return this.getRuleContext(0, IntContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public subaward(): SubawardContext[];
	public subaward(i: number): SubawardContext;
	public subaward(i?: number): SubawardContext | SubawardContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SubawardContext);
		} else {
			return this.getRuleContext(i, SubawardContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_awards; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterAwards) {
			listener.enterAwards(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitAwards) {
			listener.exitAwards(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitAwards) {
			return visitor.visitAwards(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SubawardContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public str(): StrContext[];
	public str(i: number): StrContext;
	public str(i?: number): StrContext | StrContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StrContext);
		} else {
			return this.getRuleContext(i, StrContext);
		}
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_subaward; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterSubaward) {
			listener.enterSubaward(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitSubaward) {
			listener.exitSubaward(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitSubaward) {
			return visitor.visitSubaward(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CycleactionContext extends ParserRuleContext {
	public whop(): WhopContext | undefined {
		return this.tryGetRuleContext(0, WhopContext);
	}
	public varp(): VarpContext | undefined {
		return this.tryGetRuleContext(0, VarpContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_cycleaction; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterCycleaction) {
			listener.enterCycleaction(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitCycleaction) {
			listener.exitCycleaction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitCycleaction) {
			return visitor.visitCycleaction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SetactionContext extends ParserRuleContext {
	public rawstorage(): RawstorageContext {
		return this.getRuleContext(0, RawstorageContext);
	}
	public int(): IntContext {
		return this.getRuleContext(0, IntContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_setaction; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterSetaction) {
			listener.enterSetaction(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitSetaction) {
			listener.exitSetaction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitSetaction) {
			return visitor.visitSetaction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SetstractionContext extends ParserRuleContext {
	public strstorage(): StrstorageContext {
		return this.getRuleContext(0, StrstorageContext);
	}
	public str(): StrContext {
		return this.getRuleContext(0, StrContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_setstraction; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterSetstraction) {
			listener.enterSetstraction(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitSetstraction) {
			listener.exitSetstraction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitSetstraction) {
			return visitor.visitSetstraction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IncactionContext extends ParserRuleContext {
	public rawstorage(): RawstorageContext {
		return this.getRuleContext(0, RawstorageContext);
	}
	public int(): IntContext | undefined {
		return this.tryGetRuleContext(0, IntContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_incaction; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterIncaction) {
			listener.enterIncaction(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitIncaction) {
			listener.exitIncaction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitIncaction) {
			return visitor.visitIncaction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DecactionContext extends ParserRuleContext {
	public rawstorage(): RawstorageContext {
		return this.getRuleContext(0, RawstorageContext);
	}
	public int(): IntContext | undefined {
		return this.tryGetRuleContext(0, IntContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_decaction; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterDecaction) {
			listener.enterDecaction(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitDecaction) {
			listener.exitDecaction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitDecaction) {
			return visitor.visitDecaction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MoveactionContext extends ParserRuleContext {
	public card(): CardContext[];
	public card(i: number): CardContext;
	public card(i?: number): CardContext | CardContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CardContext);
		} else {
			return this.getRuleContext(i, CardContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_moveaction; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterMoveaction) {
			listener.enterMoveaction(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitMoveaction) {
			listener.exitMoveaction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitMoveaction) {
			return visitor.visitMoveaction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SwapactionContext extends ParserRuleContext {
	public card(): CardContext[];
	public card(i: number): CardContext;
	public card(i?: number): CardContext | CardContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CardContext);
		} else {
			return this.getRuleContext(i, CardContext);
		}
	}
	public basecstorage(): BasecstorageContext[];
	public basecstorage(i: number): BasecstorageContext;
	public basecstorage(i?: number): BasecstorageContext | BasecstorageContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BasecstorageContext);
		} else {
			return this.getRuleContext(i, BasecstorageContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_swapaction; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterSwapaction) {
			listener.enterSwapaction(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitSwapaction) {
			listener.exitSwapaction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitSwapaction) {
			return visitor.visitSwapaction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CopyactionContext extends ParserRuleContext {
	public card(): CardContext[];
	public card(i: number): CardContext;
	public card(i?: number): CardContext | CardContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CardContext);
		} else {
			return this.getRuleContext(i, CardContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_copyaction; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterCopyaction) {
			listener.enterCopyaction(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitCopyaction) {
			listener.exitCopyaction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitCopyaction) {
			return visitor.visitCopyaction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RemoveactionContext extends ParserRuleContext {
	public card(): CardContext {
		return this.getRuleContext(0, CardContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_removeaction; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterRemoveaction) {
			listener.enterRemoveaction(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitRemoveaction) {
			listener.exitRemoveaction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitRemoveaction) {
			return visitor.visitRemoveaction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ShuffleactionContext extends ParserRuleContext {
	public cstorage(): CstorageContext[];
	public cstorage(i: number): CstorageContext;
	public cstorage(i?: number): CstorageContext | CstorageContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CstorageContext);
		} else {
			return this.getRuleContext(i, CstorageContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_shuffleaction; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterShuffleaction) {
			listener.enterShuffleaction(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitShuffleaction) {
			listener.exitShuffleaction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitShuffleaction) {
			return visitor.visitShuffleaction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TurnactionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_turnaction; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterTurnaction) {
			listener.enterTurnaction(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitTurnaction) {
			listener.exitTurnaction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitTurnaction) {
			return visitor.visitTurnaction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RepeatContext extends ParserRuleContext {
	public int(): IntContext | undefined {
		return this.tryGetRuleContext(0, IntContext);
	}
	public action(): ActionContext | undefined {
		return this.tryGetRuleContext(0, ActionContext);
	}
	public OPEN(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.OPEN, 0); }
	public CLOSE(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.CLOSE, 0); }
	public moveaction(): MoveactionContext | undefined {
		return this.tryGetRuleContext(0, MoveactionContext);
	}
	public removeaction(): RemoveactionContext | undefined {
		return this.tryGetRuleContext(0, RemoveactionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_repeat; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterRepeat) {
			listener.enterRepeat(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitRepeat) {
			listener.exitRepeat(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitRepeat) {
			return visitor.visitRepeat(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PointstorageContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public str(): StrContext {
		return this.getRuleContext(0, StrContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public varo(): VaroContext | undefined {
		return this.tryGetRuleContext(0, VaroContext);
	}
	public who(): WhoContext | undefined {
		return this.tryGetRuleContext(0, WhoContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_pointstorage; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterPointstorage) {
			listener.enterPointstorage(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitPointstorage) {
			listener.exitPointstorage(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitPointstorage) {
			return visitor.visitPointstorage(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CardContext extends ParserRuleContext {
	public varcard(): VarcardContext | undefined {
		return this.tryGetRuleContext(0, VarcardContext);
	}
	public maxof(): MaxofContext | undefined {
		return this.tryGetRuleContext(0, MaxofContext);
	}
	public minof(): MinofContext | undefined {
		return this.tryGetRuleContext(0, MinofContext);
	}
	public OPEN(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.OPEN, 0); }
	public cstorage(): CstorageContext | undefined {
		return this.tryGetRuleContext(0, CstorageContext);
	}
	public CLOSE(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.CLOSE, 0); }
	public int(): IntContext | undefined {
		return this.tryGetRuleContext(0, IntContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_card; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterCard) {
			listener.enterCard(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitCard) {
			listener.exitCard(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitCard) {
			return visitor.visitCard(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MaxofContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public cstorage(): CstorageContext {
		return this.getRuleContext(0, CstorageContext);
	}
	public pointstorage(): PointstorageContext {
		return this.getRuleContext(0, PointstorageContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_maxof; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterMaxof) {
			listener.enterMaxof(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitMaxof) {
			listener.exitMaxof(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitMaxof) {
			return visitor.visitMaxof(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MinofContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public cstorage(): CstorageContext {
		return this.getRuleContext(0, CstorageContext);
	}
	public pointstorage(): PointstorageContext {
		return this.getRuleContext(0, PointstorageContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_minof; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterMinof) {
			listener.enterMinof(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitMinof) {
			listener.exitMinof(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitMinof) {
			return visitor.visitMinof(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LocpreContext extends ParserRuleContext {
	public varp(): VarpContext | undefined {
		return this.tryGetRuleContext(0, VarpContext);
	}
	public whop(): WhopContext | undefined {
		return this.tryGetRuleContext(0, WhopContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_locpre; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterLocpre) {
			listener.enterLocpre(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitLocpre) {
			listener.exitLocpre(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitLocpre) {
			return visitor.visitLocpre(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LocdescContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_locdesc; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterLocdesc) {
			listener.enterLocdesc(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitLocdesc) {
			listener.exitLocdesc(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitLocdesc) {
			return visitor.visitLocdesc(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhoContext extends ParserRuleContext {
	public whot(): WhotContext | undefined {
		return this.tryGetRuleContext(0, WhotContext);
	}
	public whop(): WhopContext | undefined {
		return this.tryGetRuleContext(0, WhopContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_who; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterWho) {
			listener.enterWho(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitWho) {
			listener.exitWho(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitWho) {
			return visitor.visitWho(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhopContext extends ParserRuleContext {
	public OPEN(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.OPEN, 0); }
	public whodesc(): WhodescContext | undefined {
		return this.tryGetRuleContext(0, WhodescContext);
	}
	public CLOSE(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.CLOSE, 0); }
	public owner(): OwnerContext | undefined {
		return this.tryGetRuleContext(0, OwnerContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_whop; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterWhop) {
			listener.enterWhop(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitWhop) {
			listener.exitWhop(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitWhop) {
			return visitor.visitWhop(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhotContext extends ParserRuleContext {
	public OPEN(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.OPEN, 0); }
	public whodesc(): WhodescContext | undefined {
		return this.tryGetRuleContext(0, WhodescContext);
	}
	public CLOSE(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.CLOSE, 0); }
	public teamp(): TeampContext | undefined {
		return this.tryGetRuleContext(0, TeampContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_whot; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterWhot) {
			listener.enterWhot(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitWhot) {
			listener.exitWhot(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitWhot) {
			return visitor.visitWhot(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WhodescContext extends ParserRuleContext {
	public int(): IntContext | undefined {
		return this.tryGetRuleContext(0, IntContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_whodesc; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterWhodesc) {
			listener.enterWhodesc(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitWhodesc) {
			listener.exitWhodesc(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitWhodesc) {
			return visitor.visitWhodesc(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OwnerContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public card(): CardContext {
		return this.getRuleContext(0, CardContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_owner; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterOwner) {
			listener.enterOwner(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitOwner) {
			listener.exitOwner(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitOwner) {
			return visitor.visitOwner(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TeampContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public varp(): VarpContext | undefined {
		return this.tryGetRuleContext(0, VarpContext);
	}
	public whop(): WhopContext | undefined {
		return this.tryGetRuleContext(0, WhopContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_teamp; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterTeamp) {
			listener.enterTeamp(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitTeamp) {
			listener.exitTeamp(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitTeamp) {
			return visitor.visitTeamp(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypedContext extends ParserRuleContext {
	public int(): IntContext | undefined {
		return this.tryGetRuleContext(0, IntContext);
	}
	public boolean(): BooleanContext | undefined {
		return this.tryGetRuleContext(0, BooleanContext);
	}
	public str(): StrContext | undefined {
		return this.tryGetRuleContext(0, StrContext);
	}
	public collection(): CollectionContext | undefined {
		return this.tryGetRuleContext(0, CollectionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_typed; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterTyped) {
			listener.enterTyped(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitTyped) {
			listener.exitTyped(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitTyped) {
			return visitor.visitTyped(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CollectionContext extends ParserRuleContext {
	public varc(): VarcContext | undefined {
		return this.tryGetRuleContext(0, VarcContext);
	}
	public filter(): FilterContext | undefined {
		return this.tryGetRuleContext(0, FilterContext);
	}
	public cstorage(): CstorageContext | undefined {
		return this.tryGetRuleContext(0, CstorageContext);
	}
	public strcollection(): StrcollectionContext | undefined {
		return this.tryGetRuleContext(0, StrcollectionContext);
	}
	public cstoragecollection(): CstoragecollectionContext | undefined {
		return this.tryGetRuleContext(0, CstoragecollectionContext);
	}
	public whot(): WhotContext | undefined {
		return this.tryGetRuleContext(0, WhotContext);
	}
	public other(): OtherContext | undefined {
		return this.tryGetRuleContext(0, OtherContext);
	}
	public range(): RangeContext | undefined {
		return this.tryGetRuleContext(0, RangeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_collection; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterCollection) {
			listener.enterCollection(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitCollection) {
			listener.exitCollection(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitCollection) {
			return visitor.visitCollection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StrcollectionContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public namegr(): NamegrContext[];
	public namegr(i: number): NamegrContext;
	public namegr(i?: number): NamegrContext | NamegrContext[] {
		if (i === undefined) {
			return this.getRuleContexts(NamegrContext);
		} else {
			return this.getRuleContext(i, NamegrContext);
		}
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_strcollection; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterStrcollection) {
			listener.enterStrcollection(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitStrcollection) {
			listener.exitStrcollection(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitStrcollection) {
			return visitor.visitStrcollection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RangeContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public int(): IntContext[];
	public int(i: number): IntContext;
	public int(i?: number): IntContext | IntContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IntContext);
		} else {
			return this.getRuleContext(i, IntContext);
		}
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_range; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterRange) {
			listener.enterRange(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitRange) {
			listener.exitRange(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitRange) {
			return visitor.visitRange(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OtherContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_other; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterOther) {
			listener.enterOther(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitOther) {
			listener.exitOther(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitOther) {
			return visitor.visitOther(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CstorageContext extends ParserRuleContext {
	public varcs(): VarcsContext | undefined {
		return this.tryGetRuleContext(0, VarcsContext);
	}
	public unionof(): UnionofContext | undefined {
		return this.tryGetRuleContext(0, UnionofContext);
	}
	public intersectof(): IntersectofContext | undefined {
		return this.tryGetRuleContext(0, IntersectofContext);
	}
	public disjunctionof(): DisjunctionofContext | undefined {
		return this.tryGetRuleContext(0, DisjunctionofContext);
	}
	public sortof(): SortofContext | undefined {
		return this.tryGetRuleContext(0, SortofContext);
	}
	public filter(): FilterContext | undefined {
		return this.tryGetRuleContext(0, FilterContext);
	}
	public basecstorage(): BasecstorageContext | undefined {
		return this.tryGetRuleContext(0, BasecstorageContext);
	}
	public memstorage(): MemstorageContext | undefined {
		return this.tryGetRuleContext(0, MemstorageContext);
	}
	public sequence(): SequenceContext | undefined {
		return this.tryGetRuleContext(0, SequenceContext);
	}
	public runsequence(): RunsequenceContext | undefined {
		return this.tryGetRuleContext(0, RunsequenceContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_cstorage; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterCstorage) {
			listener.enterCstorage(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitCstorage) {
			listener.exitCstorage(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitCstorage) {
			return visitor.visitCstorage(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BasecstorageContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public locpre(): LocpreContext {
		return this.getRuleContext(0, LocpreContext);
	}
	public locdesc(): LocdescContext {
		return this.getRuleContext(0, LocdescContext);
	}
	public str(): StrContext {
		return this.getRuleContext(0, StrContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public int(): IntContext | undefined {
		return this.tryGetRuleContext(0, IntContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_basecstorage; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterBasecstorage) {
			listener.enterBasecstorage(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitBasecstorage) {
			listener.exitBasecstorage(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitBasecstorage) {
			return visitor.visitBasecstorage(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SortofContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public cstorage(): CstorageContext {
		return this.getRuleContext(0, CstorageContext);
	}
	public pointstorage(): PointstorageContext {
		return this.getRuleContext(0, PointstorageContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_sortof; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterSortof) {
			listener.enterSortof(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitSortof) {
			listener.exitSortof(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitSortof) {
			return visitor.visitSortof(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class UnionofContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public aggcs(): AggcsContext | undefined {
		return this.tryGetRuleContext(0, AggcsContext);
	}
	public cstorage(): CstorageContext[];
	public cstorage(i: number): CstorageContext;
	public cstorage(i?: number): CstorageContext | CstorageContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CstorageContext);
		} else {
			return this.getRuleContext(i, CstorageContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_unionof; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterUnionof) {
			listener.enterUnionof(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitUnionof) {
			listener.exitUnionof(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitUnionof) {
			return visitor.visitUnionof(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntersectofContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public aggcs(): AggcsContext | undefined {
		return this.tryGetRuleContext(0, AggcsContext);
	}
	public cstorage(): CstorageContext[];
	public cstorage(i: number): CstorageContext;
	public cstorage(i?: number): CstorageContext | CstorageContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CstorageContext);
		} else {
			return this.getRuleContext(i, CstorageContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_intersectof; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterIntersectof) {
			listener.enterIntersectof(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitIntersectof) {
			listener.exitIntersectof(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitIntersectof) {
			return visitor.visitIntersectof(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DisjunctionofContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public aggcs(): AggcsContext | undefined {
		return this.tryGetRuleContext(0, AggcsContext);
	}
	public cstorage(): CstorageContext[];
	public cstorage(i: number): CstorageContext;
	public cstorage(i?: number): CstorageContext | CstorageContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CstorageContext);
		} else {
			return this.getRuleContext(i, CstorageContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_disjunctionof; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterDisjunctionof) {
			listener.enterDisjunctionof(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitDisjunctionof) {
			listener.exitDisjunctionof(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitDisjunctionof) {
			return visitor.visitDisjunctionof(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FilterContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public collection(): CollectionContext {
		return this.getRuleContext(0, CollectionContext);
	}
	public var(): VarContext {
		return this.getRuleContext(0, VarContext);
	}
	public boolean(): BooleanContext {
		return this.getRuleContext(0, BooleanContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_filter; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterFilter) {
			listener.enterFilter(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitFilter) {
			listener.exitFilter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitFilter) {
			return visitor.visitFilter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MemstorageContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public cstoragecollection(): CstoragecollectionContext {
		return this.getRuleContext(0, CstoragecollectionContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public int(): IntContext | undefined {
		return this.tryGetRuleContext(0, IntContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_memstorage; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterMemstorage) {
			listener.enterMemstorage(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitMemstorage) {
			listener.exitMemstorage(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitMemstorage) {
			return visitor.visitMemstorage(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SequenceContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public int(): IntContext {
		return this.getRuleContext(0, IntContext);
	}
	public cstorage(): CstorageContext {
		return this.getRuleContext(0, CstorageContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_sequence; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterSequence) {
			listener.enterSequence(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitSequence) {
			listener.exitSequence(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitSequence) {
			return visitor.visitSequence(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RunsequenceContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public int(): IntContext {
		return this.getRuleContext(0, IntContext);
	}
	public cstorage(): CstorageContext {
		return this.getRuleContext(0, CstorageContext);
	}
	public pointstorage(): PointstorageContext {
		return this.getRuleContext(0, PointstorageContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_runsequence; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterRunsequence) {
			listener.enterRunsequence(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitRunsequence) {
			listener.exitRunsequence(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitRunsequence) {
			return visitor.visitRunsequence(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CstoragecollectionContext extends ParserRuleContext {
	public partition(): PartitionContext | undefined {
		return this.tryGetRuleContext(0, PartitionContext);
	}
	public subset(): SubsetContext | undefined {
		return this.tryGetRuleContext(0, SubsetContext);
	}
	public run(): RunContext | undefined {
		return this.tryGetRuleContext(0, RunContext);
	}
	public aggcs(): AggcsContext | undefined {
		return this.tryGetRuleContext(0, AggcsContext);
	}
	public varcsc(): VarcscContext | undefined {
		return this.tryGetRuleContext(0, VarcscContext);
	}
	public indexed(): IndexedContext | undefined {
		return this.tryGetRuleContext(0, IndexedContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_cstoragecollection; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterCstoragecollection) {
			listener.enterCstoragecollection(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitCstoragecollection) {
			listener.exitCstoragecollection(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitCstoragecollection) {
			return visitor.visitCstoragecollection(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RunContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public int(): IntContext {
		return this.getRuleContext(0, IntContext);
	}
	public cstorage(): CstorageContext {
		return this.getRuleContext(0, CstorageContext);
	}
	public pointstorage(): PointstorageContext {
		return this.getRuleContext(0, PointstorageContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_run; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterRun) {
			listener.enterRun(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitRun) {
			listener.exitRun(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitRun) {
			return visitor.visitRun(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SubsetContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public cstorage(): CstorageContext {
		return this.getRuleContext(0, CstorageContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public intop(): IntopContext | undefined {
		return this.tryGetRuleContext(0, IntopContext);
	}
	public int(): IntContext | undefined {
		return this.tryGetRuleContext(0, IntContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_subset; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterSubset) {
			listener.enterSubset(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitSubset) {
			listener.exitSubset(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitSubset) {
			return visitor.visitSubset(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PartitionContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public str(): StrContext {
		return this.getRuleContext(0, StrContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public aggcs(): AggcsContext | undefined {
		return this.tryGetRuleContext(0, AggcsContext);
	}
	public cstorage(): CstorageContext[];
	public cstorage(i: number): CstorageContext;
	public cstorage(i?: number): CstorageContext | CstorageContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CstorageContext);
		} else {
			return this.getRuleContext(i, CstorageContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_partition; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterPartition) {
			listener.enterPartition(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitPartition) {
			listener.exitPartition(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitPartition) {
			return visitor.visitPartition(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AggcsContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public collection(): CollectionContext {
		return this.getRuleContext(0, CollectionContext);
	}
	public var(): VarContext {
		return this.getRuleContext(0, VarContext);
	}
	public cstorage(): CstorageContext {
		return this.getRuleContext(0, CstorageContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_aggcs; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterAggcs) {
			listener.enterAggcs(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitAggcs) {
			listener.exitAggcs(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitAggcs) {
			return visitor.visitAggcs(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IndexedContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public locpre(): LocpreContext {
		return this.getRuleContext(0, LocpreContext);
	}
	public locdesc(): LocdescContext {
		return this.getRuleContext(0, LocdescContext);
	}
	public str(): StrContext {
		return this.getRuleContext(0, StrContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_indexed; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterIndexed) {
			listener.enterIndexed(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitIndexed) {
			listener.exitIndexed(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitIndexed) {
			return visitor.visitIndexed(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BooleanContext extends ParserRuleContext {
	public OPEN(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.OPEN, 0); }
	public CLOSE(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.CLOSE, 0); }
	public BOOLOP(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.BOOLOP, 0); }
	public boolean(): BooleanContext[];
	public boolean(i: number): BooleanContext;
	public boolean(i?: number): BooleanContext | BooleanContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BooleanContext);
		} else {
			return this.getRuleContext(i, BooleanContext);
		}
	}
	public intop(): IntopContext | undefined {
		return this.tryGetRuleContext(0, IntopContext);
	}
	public int(): IntContext[];
	public int(i: number): IntContext;
	public int(i?: number): IntContext | IntContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IntContext);
		} else {
			return this.getRuleContext(i, IntContext);
		}
	}
	public EQOP(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.EQOP, 0); }
	public str(): StrContext[];
	public str(i: number): StrContext;
	public str(i?: number): StrContext | StrContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StrContext);
		} else {
			return this.getRuleContext(i, StrContext);
		}
	}
	public card(): CardContext[];
	public card(i: number): CardContext;
	public card(i?: number): CardContext | CardContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CardContext);
		} else {
			return this.getRuleContext(i, CardContext);
		}
	}
	public UNOP(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.UNOP, 0); }
	public whop(): WhopContext[];
	public whop(i: number): WhopContext;
	public whop(i?: number): WhopContext | WhopContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WhopContext);
		} else {
			return this.getRuleContext(i, WhopContext);
		}
	}
	public whot(): WhotContext[];
	public whot(i: number): WhotContext;
	public whot(i?: number): WhotContext | WhotContext[] {
		if (i === undefined) {
			return this.getRuleContexts(WhotContext);
		} else {
			return this.getRuleContext(i, WhotContext);
		}
	}
	public aggb(): AggbContext | undefined {
		return this.tryGetRuleContext(0, AggbContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_boolean; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterBoolean) {
			listener.enterBoolean(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitBoolean) {
			listener.exitBoolean(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitBoolean) {
			return visitor.visitBoolean(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntopContext extends ParserRuleContext {
	public COMPOP(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.COMPOP, 0); }
	public EQOP(): TerminalNode | undefined { return this.tryGetToken(RecycleParser.EQOP, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_intop; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterIntop) {
			listener.enterIntop(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitIntop) {
			listener.exitIntop(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitIntop) {
			return visitor.visitIntop(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AggbContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public collection(): CollectionContext {
		return this.getRuleContext(0, CollectionContext);
	}
	public var(): VarContext {
		return this.getRuleContext(0, VarContext);
	}
	public boolean(): BooleanContext {
		return this.getRuleContext(0, BooleanContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_aggb; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterAggb) {
			listener.enterAggb(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitAggb) {
			listener.exitAggb(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitAggb) {
			return visitor.visitAggb(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntContext extends ParserRuleContext {
	public vari(): VariContext | undefined {
		return this.tryGetRuleContext(0, VariContext);
	}
	public sizeof(): SizeofContext | undefined {
		return this.tryGetRuleContext(0, SizeofContext);
	}
	public mult(): MultContext | undefined {
		return this.tryGetRuleContext(0, MultContext);
	}
	public subtract(): SubtractContext | undefined {
		return this.tryGetRuleContext(0, SubtractContext);
	}
	public mod(): ModContext | undefined {
		return this.tryGetRuleContext(0, ModContext);
	}
	public add(): AddContext | undefined {
		return this.tryGetRuleContext(0, AddContext);
	}
	public divide(): DivideContext | undefined {
		return this.tryGetRuleContext(0, DivideContext);
	}
	public exponent(): ExponentContext | undefined {
		return this.tryGetRuleContext(0, ExponentContext);
	}
	public triangular(): TriangularContext | undefined {
		return this.tryGetRuleContext(0, TriangularContext);
	}
	public fibonacci(): FibonacciContext | undefined {
		return this.tryGetRuleContext(0, FibonacciContext);
	}
	public random(): RandomContext | undefined {
		return this.tryGetRuleContext(0, RandomContext);
	}
	public sum(): SumContext | undefined {
		return this.tryGetRuleContext(0, SumContext);
	}
	public rawstorage(): RawstorageContext | undefined {
		return this.tryGetRuleContext(0, RawstorageContext);
	}
	public score(): ScoreContext | undefined {
		return this.tryGetRuleContext(0, ScoreContext);
	}
	public pid(): PidContext | undefined {
		return this.tryGetRuleContext(0, PidContext);
	}
	public tid(): TidContext | undefined {
		return this.tryGetRuleContext(0, TidContext);
	}
	public aggi(): AggiContext | undefined {
		return this.tryGetRuleContext(0, AggiContext);
	}
	public scoremax(): ScoremaxContext | undefined {
		return this.tryGetRuleContext(0, ScoremaxContext);
	}
	public scoremin(): ScoreminContext | undefined {
		return this.tryGetRuleContext(0, ScoreminContext);
	}
	public intgr(): IntgrContext | undefined {
		return this.tryGetRuleContext(0, IntgrContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_int; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterInt) {
			listener.enterInt(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitInt) {
			listener.exitInt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitInt) {
			return visitor.visitInt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntgrContext extends ParserRuleContext {
	public INTNUM(): TerminalNode[];
	public INTNUM(i: number): TerminalNode;
	public INTNUM(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RecycleParser.INTNUM);
		} else {
			return this.getToken(RecycleParser.INTNUM, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_intgr; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterIntgr) {
			listener.enterIntgr(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitIntgr) {
			listener.exitIntgr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitIntgr) {
			return visitor.visitIntgr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SumContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public cstorage(): CstorageContext {
		return this.getRuleContext(0, CstorageContext);
	}
	public pointstorage(): PointstorageContext {
		return this.getRuleContext(0, PointstorageContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_sum; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterSum) {
			listener.enterSum(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitSum) {
			listener.exitSum(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitSum) {
			return visitor.visitSum(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ScoremaxContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public cstorage(): CstorageContext {
		return this.getRuleContext(0, CstorageContext);
	}
	public pointstorage(): PointstorageContext {
		return this.getRuleContext(0, PointstorageContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_scoremax; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterScoremax) {
			listener.enterScoremax(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitScoremax) {
			listener.exitScoremax(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitScoremax) {
			return visitor.visitScoremax(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ScoreminContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public cstorage(): CstorageContext {
		return this.getRuleContext(0, CstorageContext);
	}
	public pointstorage(): PointstorageContext {
		return this.getRuleContext(0, PointstorageContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_scoremin; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterScoremin) {
			listener.enterScoremin(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitScoremin) {
			listener.exitScoremin(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitScoremin) {
			return visitor.visitScoremin(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ScoreContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public card(): CardContext {
		return this.getRuleContext(0, CardContext);
	}
	public pointstorage(): PointstorageContext {
		return this.getRuleContext(0, PointstorageContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_score; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterScore) {
			listener.enterScore(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitScore) {
			listener.exitScore(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitScore) {
			return visitor.visitScore(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AddContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public int(): IntContext[];
	public int(i: number): IntContext;
	public int(i?: number): IntContext | IntContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IntContext);
		} else {
			return this.getRuleContext(i, IntContext);
		}
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_add; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterAdd) {
			listener.enterAdd(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitAdd) {
			listener.exitAdd(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitAdd) {
			return visitor.visitAdd(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MultContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public int(): IntContext[];
	public int(i: number): IntContext;
	public int(i?: number): IntContext | IntContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IntContext);
		} else {
			return this.getRuleContext(i, IntContext);
		}
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_mult; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterMult) {
			listener.enterMult(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitMult) {
			listener.exitMult(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitMult) {
			return visitor.visitMult(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SubtractContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public int(): IntContext[];
	public int(i: number): IntContext;
	public int(i?: number): IntContext | IntContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IntContext);
		} else {
			return this.getRuleContext(i, IntContext);
		}
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_subtract; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterSubtract) {
			listener.enterSubtract(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitSubtract) {
			listener.exitSubtract(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitSubtract) {
			return visitor.visitSubtract(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ModContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public int(): IntContext[];
	public int(i: number): IntContext;
	public int(i?: number): IntContext | IntContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IntContext);
		} else {
			return this.getRuleContext(i, IntContext);
		}
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_mod; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterMod) {
			listener.enterMod(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitMod) {
			listener.exitMod(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitMod) {
			return visitor.visitMod(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DivideContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public int(): IntContext[];
	public int(i: number): IntContext;
	public int(i?: number): IntContext | IntContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IntContext);
		} else {
			return this.getRuleContext(i, IntContext);
		}
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_divide; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterDivide) {
			listener.enterDivide(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitDivide) {
			listener.exitDivide(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitDivide) {
			return visitor.visitDivide(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExponentContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public int(): IntContext[];
	public int(i: number): IntContext;
	public int(i?: number): IntContext | IntContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IntContext);
		} else {
			return this.getRuleContext(i, IntContext);
		}
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_exponent; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterExponent) {
			listener.enterExponent(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitExponent) {
			listener.exitExponent(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitExponent) {
			return visitor.visitExponent(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TriangularContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public int(): IntContext {
		return this.getRuleContext(0, IntContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_triangular; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterTriangular) {
			listener.enterTriangular(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitTriangular) {
			listener.exitTriangular(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitTriangular) {
			return visitor.visitTriangular(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FibonacciContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public int(): IntContext {
		return this.getRuleContext(0, IntContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_fibonacci; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterFibonacci) {
			listener.enterFibonacci(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitFibonacci) {
			listener.exitFibonacci(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitFibonacci) {
			return visitor.visitFibonacci(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RandomContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public int(): IntContext[];
	public int(i: number): IntContext;
	public int(i?: number): IntContext | IntContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IntContext);
		} else {
			return this.getRuleContext(i, IntContext);
		}
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_random; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterRandom) {
			listener.enterRandom(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitRandom) {
			listener.exitRandom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitRandom) {
			return visitor.visitRandom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SizeofContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public collection(): CollectionContext {
		return this.getRuleContext(0, CollectionContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_sizeof; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterSizeof) {
			listener.enterSizeof(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitSizeof) {
			listener.exitSizeof(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitSizeof) {
			return visitor.visitSizeof(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AggiContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public collection(): CollectionContext {
		return this.getRuleContext(0, CollectionContext);
	}
	public var(): VarContext {
		return this.getRuleContext(0, VarContext);
	}
	public rawstorage(): RawstorageContext {
		return this.getRuleContext(0, RawstorageContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_aggi; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterAggi) {
			listener.enterAggi(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitAggi) {
			listener.exitAggi(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitAggi) {
			return visitor.visitAggi(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RawstorageContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public str(): StrContext {
		return this.getRuleContext(0, StrContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public varo(): VaroContext | undefined {
		return this.tryGetRuleContext(0, VaroContext);
	}
	public who(): WhoContext | undefined {
		return this.tryGetRuleContext(0, WhoContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_rawstorage; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterRawstorage) {
			listener.enterRawstorage(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitRawstorage) {
			listener.exitRawstorage(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitRawstorage) {
			return visitor.visitRawstorage(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PidContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public whop(): WhopContext {
		return this.getRuleContext(0, WhopContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_pid; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterPid) {
			listener.enterPid(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitPid) {
			listener.exitPid(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitPid) {
			return visitor.visitPid(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TidContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public whot(): WhotContext {
		return this.getRuleContext(0, WhotContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_tid; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterTid) {
			listener.enterTid(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitTid) {
			listener.exitTid(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitTid) {
			return visitor.visitTid(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StrContext extends ParserRuleContext {
	public namegr(): NamegrContext | undefined {
		return this.tryGetRuleContext(0, NamegrContext);
	}
	public strstorage(): StrstorageContext | undefined {
		return this.tryGetRuleContext(0, StrstorageContext);
	}
	public vars(): VarsContext | undefined {
		return this.tryGetRuleContext(0, VarsContext);
	}
	public cardatt(): CardattContext | undefined {
		return this.tryGetRuleContext(0, CardattContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_str; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterStr) {
			listener.enterStr(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitStr) {
			listener.exitStr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitStr) {
			return visitor.visitStr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StrstorageContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public str(): StrContext {
		return this.getRuleContext(0, StrContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	public varo(): VaroContext | undefined {
		return this.tryGetRuleContext(0, VaroContext);
	}
	public who(): WhoContext | undefined {
		return this.tryGetRuleContext(0, WhoContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_strstorage; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterStrstorage) {
			listener.enterStrstorage(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitStrstorage) {
			listener.exitStrstorage(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitStrstorage) {
			return visitor.visitStrstorage(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CardattContext extends ParserRuleContext {
	public OPEN(): TerminalNode { return this.getToken(RecycleParser.OPEN, 0); }
	public str(): StrContext {
		return this.getRuleContext(0, StrContext);
	}
	public card(): CardContext {
		return this.getRuleContext(0, CardContext);
	}
	public CLOSE(): TerminalNode { return this.getToken(RecycleParser.CLOSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_cardatt; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterCardatt) {
			listener.enterCardatt(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitCardatt) {
			listener.exitCardatt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitCardatt) {
			return visitor.visitCardatt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NamegrContext extends ParserRuleContext {
	public LETT(): TerminalNode[];
	public LETT(i: number): TerminalNode;
	public LETT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(RecycleParser.LETT);
		} else {
			return this.getToken(RecycleParser.LETT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return RecycleParser.RULE_namegr; }
	// @Override
	public enterRule(listener: RecycleListener): void {
		if (listener.enterNamegr) {
			listener.enterNamegr(this);
		}
	}
	// @Override
	public exitRule(listener: RecycleListener): void {
		if (listener.exitNamegr) {
			listener.exitNamegr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: RecycleVisitor<Result>): Result {
		if (visitor.visitNamegr) {
			return visitor.visitNamegr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


