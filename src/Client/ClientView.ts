// This is the JSON object that will be sent to the clients
// Note: anything starting with # will not be sent

import ValueMap from "../Components/ValueMap.js";
import { ButtonType, Location, LocationResolver, PlayerID, PlayerType, Visibility } from "../schemas/types.js";
import Counter from "../Game/Counter.js";
import Game from "../Game/Game.js";
import Pile from "../Game/Pile.js";
import Player from "../Game/Player.js";
import Button from "../Game/Button.js";
import GameMeta from "../Rules/GameMeta.js";

type ClientPileType = { owner: number, visibility: Visibility, cards: {suit: number, rank: number, id: number}[], label: string, displayName: string, actionRoles: string[], location: Location };
type ClientCounterType = { owner: number, visibility: Visibility, value: number, label: string, displayName: string, actionRoles: string[], location: Location };
type ClientButtonType = { owner: number, visibility: Visibility, label: string, actionRoles: string[], displayName: string, type: ButtonType, range: { min: number | undefined, max: number | undefined, increment: number | undefined } | undefined, location: Location };
type ClientPlayerType = { playerId: PlayerID, type: PlayerType };

/**
 * Resolves a LocationResolver to a concrete Location.
 * For exact locations, returns the location directly.
 * For non-exact locations, computes the next available position using the game meta.
 * @param location - The location resolver to evaluate.
 * @param locations - Record tracking the last used position for each location key.
 * @param gameMeta - The game meta used to compute the next location.
 * @returns The resolved concrete Location.
 */
function resolveLocation(location: LocationResolver, locations: Record<string, Location>, gameMeta: GameMeta, isOwner: boolean): Location {
    if (location.locationType === 'exact') return location.location;

    const toResolve =
        location.ownerLocation && isOwner ?
            location.ownerLocation :
            location.location;

    const toReturn = gameMeta.nextLocation(
        toResolve, locations[toResolve]
    );

    locations[toResolve] = toReturn;

    return toReturn;
}

function resolveVisibility(vis: Visibility, owner: PlayerID, player: Player): Visibility {
    if (vis !== Visibility.PRIVATE && vis !== Visibility.PRIVATE_SPREAD) return vis;

    if (owner === player.id && vis === Visibility.PRIVATE) return Visibility.FACE_UP;
    if (owner === player.id && vis === Visibility.PRIVATE_SPREAD) return Visibility.FACE_UP_SPREAD;

    if (vis === Visibility.PRIVATE) return Visibility.FACE_DOWN;
    if (vis === Visibility.PRIVATE_SPREAD) return Visibility.FACE_DOWN_SPREAD;
    
    throw new Error(`Unknown visibility/owner combo while evaluating visibility: ${vis}, ${owner === player.id}`);
}

/**
 * The current gamestate from the perspective of the client.
 * 
 * The ClientView contains the piles, counters, buttons, and players.
 */
export default class ClientView {
    // These are readonly so that they can be linked to the actual gamestate without having to worry about side-effects
    readonly piles: ClientPileType[];
    readonly counters: ClientCounterType[];
    readonly buttons: ClientButtonType[];
    readonly players: ClientPlayerType[];

    /**
     * Creates the ClientView.
     * @param piles - Piles in the game.
     * @param counters - Counters in the game.
     * @param buttons - Buttons in the game.
     * @param players - The players in the game.
     */
    private constructor(
        piles: ClientPileType[],
        counters: ClientCounterType[],
        buttons: ClientButtonType[],
        players: ClientPlayerType[]
    ) {
        this.piles = piles;
        this.counters = counters;
        this.buttons = buttons;
        this.players = players;
    }

    /**
     * The view of the pile from the perspective of the client.
     * @param pile - the pile to generate a view for. 
     * @param owner - id of the owner of the pile. 
     * @param player - Player object of the client.
     * @param suitMap - Map between the suit and its value.
     * @param rankMap - Map between the rank and its value.
     * @param locations - Record tracking the last used position for each location key.
     * @param gameMeta - The game meta used to resolve locations.
     * @returns Created pileView object, else null if the pile is supposed to be invisible.
     */
    static pileView(pile: Pile, owner: number, player: Player, suitMap: ValueMap<string, number>, rankMap: ValueMap<string, number>, locations: Record<string, Location>, gameMeta: GameMeta) {
        const vis = resolveVisibility(pile.visibility, owner, player);

        // Do *not* mutate pile, since it's from the gamestate
        if (vis == Visibility.INVISIBLE) return null;
        
        let hide = vis == Visibility.FACE_DOWN;
        
        const cards: {suit: number, rank: number, id: number}[] = [];

        for (let card of pile.cards) {
            if (!card) continue;
            if (hide) cards.push({suit: 0, rank: 0, id: 0});
            else cards.push({suit: suitMap.get(card.suit) ?? 0, rank: rankMap.get(card.rank) ?? 0, id: card.id});
        }

        const pileView: ClientPileType = {
            owner: owner,
            visibility: vis,
            label: pile.label,
            actionRoles: pile.actionRoles,
            displayName: pile.displayName,
            cards: cards,
            location: resolveLocation(pile.location, locations, gameMeta, owner === player.id),
        };

        return pileView;
    }

    /**
     * The view of the counter from the perspective of the client.
     * @param counter - the counter to generate a view for.
     * @param owner - id of the owner of the counter.
     * @param player - Player object of the client.
     * @param locations - Record tracking the last used position for each location key.
     * @param gameMeta - The game meta used to resolve locations.
     * @returns Created counterView object, else null if the counter is supposed to be invisible.
     */
    static counterView(counter: Counter, owner: number, player: Player, locations: Record<string, Location>, gameMeta: GameMeta) {
        const vis = resolveVisibility(counter.visibility, owner, player);

        if (vis == Visibility.INVISIBLE) return null;

        let hide = vis == Visibility.FACE_DOWN;

        const counterView: ClientCounterType = {
            owner: owner,
            value: hide ? 0 : counter.value,
            visibility: vis,
            label: counter.label,
            displayName: counter.displayName,
            actionRoles: counter.actionRoles,
            location: resolveLocation(counter.location, locations, gameMeta, owner === player.id),
        }

        return counterView;
    }

    /**
     * The view of the button from the perspective of the client.
     * @param button - The button to generate a view for.
     * @param owner - The id of the owner of the button.
     * @param player - The Player object of the client.
     * @param locations - Record tracking the last used position for each location key.
     * @param gameMeta - The game meta used to resolve locations.
     * @returns Created buttonView object, else null if the counter is supposed to be invisible.
     */
    static buttonView(button: Button, owner: number, player: Player, locations: Record<string, Location>, gameMeta: GameMeta) {
        const vis = resolveVisibility(button.visibility, owner, player);

        if (vis == Visibility.INVISIBLE) return null;

        //let hide = vis == Visibility.FACE_DOWN;

        const buttonView: ClientButtonType = {
            owner: owner,
            visibility: vis,
            label: button.label,
            displayName: button.displayName,
            actionRoles: button.actionRoles,
            type: button.type,
            range: button.range,
            location: resolveLocation(button.location, locations, gameMeta, owner === player.id),
        }

        return buttonView;
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
        const buttons: ClientButtonType[] = [];
        const players: ClientPlayerType[] = [];

        const locations: Record<string, Location> = {};

        for (let key of Object.keys(g.gameState.piles)) {
            let item = g.gameState.piles[key];
            if (!item || !item.pile) continue;

            let pileView = ClientView.pileView(item.pile, item.owner, p, g.definition.gameMeta.clientSuitMap, g.definition.gameMeta.clientRankMap, locations, g.definition.gameMeta);
            if (pileView) piles.push(pileView);
        }

        for (let key of Object.keys(g.gameState.counters)) {
            let item = g.gameState.counters[key];
            if (!item || !item.counter) continue;

            let counterView = ClientView.counterView(item.counter, item.owner, p, locations, g.definition.gameMeta);
            if (counterView) counters.push(counterView);
        }

        for (let key of Object.keys(g.gameState.buttons)) {
            let item = g.gameState.buttons[key];
            if (!item || !item.button) continue;

            let buttonView = ClientView.buttonView(item.button, item.owner, p, locations, g.definition.gameMeta);
            if (buttonView) buttons.push(buttonView);
        }

        const gamePlayers = Object.entries(g.gameState.players);

        for (let player of gamePlayers) {
            players.push({
                playerId: player[1].id,
                type: player[1].type
            })
        }

        return new ClientView(
            piles, counters, buttons, players
        );
    }
}