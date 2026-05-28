// This is the JSON object that will be sent to the clients
// Note: anything starting with # will not be sent

import ValueMap from "../Components/ValueMap.js";
import { PlayerID, PlayerType, Visibility } from "../schemas/types.js";
import Board from "../Game/Board.js";
import Counter from "../Game/Counter.js";
import Game from "../Game/Game.js";
import Pile from "../Game/Pile.js";
import Player from "../Game/Player.js";

type ClientPileType = { owner: number, visibility: Visibility, cards: {suit: number, rank: number, id: number}[], label: string, displayName: string, actionRoles: string[] };
type ClientCounterType = { owner: number, visibility: Visibility, value: number, label: string, displayName: string, actionRoles: string[] };
type ClientPlayerType = { playerId: PlayerID, type: PlayerType }

/**
 * The current gamestate from the perspective of the client.
 * 
 * The ClientView contains the piles, counters, players, and board information.
 */
export default class ClientView {
    // These are readonly so that they can be linked to the actual gamestate without having to worry about side-effects
    readonly piles: ClientPileType[];
    readonly counters: ClientCounterType[];
    readonly players: ClientPlayerType[];

    /**
     * Creates the ClientView.
     * @param piles - Piles in the game.
     * @param counters - Counters in the game.
     * @param players - The players in the game.
     */
    private constructor(
        piles: ClientPileType[],
        counters: ClientCounterType[],
        players: ClientPlayerType[]
    ) {
        this.piles = piles;
        this.counters = counters;
        this.players = players;
    }

    /**
     * The view of the pile from the perspective of the client.
     * @param pile - the pile to generate a view for. 
     * @param owner - id of the owner of the pile. 
     * @param player - Player object of the client.
     * @param suitMap - Map between the suit and its value.
     * @param rankMap - Map between the rank and its value.
     * @returns Created pileView object, else null if the pile is supposed to be invisible.
     */
    static pileView(pile: Pile, owner: number, player: Player, suitMap: ValueMap<string, number>, rankMap: ValueMap<string, number>) {
        // Do *not* mutate pile, since it's from the gamestate
        if (pile.visibility == Visibility.INVISIBLE) return null;
        
        let hide = pile.visibility == Visibility.FACE_DOWN;
        
        const cards: {suit: number, rank: number, id: number}[] = [];

        for (let card of pile.cards) {
            if (!card) continue;
            if (hide) cards.push({suit: 0, rank: 0, id: 0});
            else cards.push({suit: suitMap.get(card.suit) ?? 0, rank: rankMap.get(card.rank) ?? 0, id: card.id});
        }

        const pileView: ClientPileType = {
            owner: owner,
            visibility: pile.visibility,
            label: pile.label,
            actionRoles: pile.actionRoles,
            displayName: pile.displayName,
            cards: cards,
        };

        return pileView;
    }

    /**
     * The view of the counter from the perspective of the client.
     * @param counter - the counter to generate a view for.
     * @param owner - id of the owner of the counter.
     * @param player - Player object of the client.
     * @returns Created counterView object, else null if the counter is supposed to be invisible.
     */
    static counterView(counter: Counter, owner: number, player: Player) {
        if (counter.visibility == Visibility.INVISIBLE) return null;

        let hide = counter.visibility == Visibility.FACE_DOWN;

        const counterView: ClientCounterType = {
            owner: owner,
            value: hide ? 0 : counter.value,
            visibility: counter.visibility,
            label: counter.label,
            displayName: counter.displayName,
            actionRoles: counter.actionRoles,
        }

        return counterView;
    }

    /**
     * Creates the view that the client will see from the game state
     * @param g - running game instance.
     * @param p - Player object of the client.
     * @returns ClientView object.
     */
    static fromGamestate(g: Game, p: Player) {
        const piles: ClientPileType[] = [];
        const counters: ClientCounterType[] = [];
        const players: ClientPlayerType[] = [];

        for (let key of Object.keys(g.gameState.piles)) {
            let item = g.gameState.piles[key];
            if (!item || !item.pile) continue;

            let pileView = ClientView.pileView(item.pile, item.owner, p, g.definition.gameMeta.clientSuitMap, g.definition.gameMeta.clientRankMap);
            if (pileView) piles.push(pileView);
        }

        for (let key of Object.keys(g.gameState.counters)) {
            let item = g.gameState.counters[key];
            if (!item || !item.counter) continue;

            let counterView = ClientView.counterView(item.counter, item.owner, p);
            if (counterView) counters.push(counterView);
        }

        const gamePlayers = Object.entries(g.gameState.players);

        for (let player of gamePlayers) {
            players.push({
                playerId: player[1].id,
                type: player[1].type
            })
        }

        return new ClientView(
            piles, counters, players
        );
    }
}