// This is the overarching definition
// All other definitions are held within one large GameDefinition object
// When a player starts a game, they will pass in a GameDefinition object's Rules component

import BoardDefinition from "./BoardDefinition";
import PlayerDefinition from "./PlayerDefinition";

export default class GameDefinition {
    phases: GamePhaseDefinition[];
    players: PlayerDefinition[];
    board: BoardDefinition;

    constructor() {
        this.players = [];
        this.board = null;
    }
}