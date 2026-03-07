// This is the JSON object that will be sent to the clients
// Note: anything starting with # will not be sent

import ValueMap, { CardValueMap } from "../Components/ValueMap";
import { Label } from "../Rules/LabelManager";
import { PlayerID, Visibility } from "../types";
import Board from "./Board";
import Counter from "./Counter";
import Game from "./Game";
import Pile from "./Pile";
import Player from "./Player";

type ClientPileType = { owner: number, visibility: Visibility, cards: {suit: number, rank: number}[], label: string, displayName: string, actionRoles: string[] };
type ClientCounterType = { owner: number, visibility: Visibility, value: number, label: string, displayName: string, actionRoles: string[] };

export default class ClientView {
    // These are readonly so that they can be linked to the actual gamestate without having to worry about side-effects
    readonly piles: ClientPileType[];
    readonly counters: ClientCounterType[];
    readonly players: Record<PlayerID, Player>;
    readonly board: Board;

    private constructor(
        piles: ClientPileType[],
        counters: ClientCounterType[],
        players: Record<PlayerID, Player>,
        board: Board
    ) {
        this.piles = piles;
        this.counters = counters;
        this.players = players;
        this.board = board;
    }

    static pileView(pile: Pile, owner: number, player: Player, suitMap: ValueMap<string, number>, rankMap: ValueMap<string, number>) {
        // Do *not* mutate pile, since it's from the gamestate
        if (pile.visibility == Visibility.INVISIBLE) return null;
        
        let hide = pile.visibility == Visibility.FACE_DOWN;
        
        const cards: {suit: number, rank: number}[] = [];

        for (let card of pile.cards) {
            if (!card) continue;
            if (hide) cards.push({suit: 0, rank: 0});
            else cards.push({suit: suitMap.get(card.suit) ?? 0, rank: rankMap.get(card.rank) ?? 0});
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

    static fromGamestate(g: Game, p: Player) {
        const piles: ClientPileType[] = [];
        const counters: ClientCounterType[] = [];

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

        return new ClientView(
            piles, counters, g.gameState.players, g.gameState.board
        );
    }
}