import ValueMap, { CardValueMap, DEFAULT_CARD_RANK_MAP, DEFAULT_CLIENT_VIEW_RANK_MAP, DEFAULT_CLIENT_VIEW_SUIT_MAP, DEFAULT_VALUE_MAP } from "../Components/ValueMap.js";
import { GameMetaArgs } from "../schemas/GameDefinitionArgs.js";


/**
 * Defines metadata and configuration for a game.
 * 
 * A GameMeta describes the minimum and maximum number of players allowed, available value maps, the card value map, and the client suit and rank maps.
 */
export default class GameMeta {
    #minPlayers: number;
    #maxPlayers: number;
    maps: Record<string, ValueMap<any,any>>;
    cardValueMap: CardValueMap;
    clientSuitMap: ValueMap<string, number>;
    clientRankMap: ValueMap<string, number>;

    /**
     * Creates a new GameMeta configuration.
     * @param obj - Configuration for the game, including the minimum and maximum number of players allowed, available value maps, the card value map, and the client suit and rank maps.
     */
    constructor(obj: GameMetaArgs = {}) {
        this.#minPlayers = obj.minPlayers || 1;
        this.#maxPlayers = obj.maxPlayers || 4;
        this.cardValueMap = obj.cardValueMap ?? DEFAULT_VALUE_MAP;
        this.maps = { 'CARD_RANK_MAP': DEFAULT_CARD_RANK_MAP }
        this.clientSuitMap = obj.clientSuitMap ? new ValueMap<string, number>(obj.clientSuitMap) : DEFAULT_CLIENT_VIEW_SUIT_MAP;
        this.clientRankMap = obj.clientRankMap ? new ValueMap<string, number>(obj.clientRankMap) : DEFAULT_CLIENT_VIEW_RANK_MAP;
    }

    // Prevent the minimum number of players from being larger than the maximum
    /**
     * Sets the minimum number of players supported by the game.
     *
     * If the minimum number of players is greater than the maximum, the maximum number of players will also be updated to the same size as the minimum.
     * 
     * @param minPlayers - Value of the minimum number of players supported.
     */
    set minPlayers(minPlayers: number) {
        if (minPlayers > this.#maxPlayers) {
            this.#maxPlayers = minPlayers;
        }
        this.#minPlayers = minPlayers;
    }

    /**
     * Sets the maximum number of players supported by the game.
     * 
     * If the maximum number of players is less than the minimum, the minimum number of players will also be updated to the same size as the maximum.
     * 
     * @param maxPlayers - Value of the maximum number of players supported.
     */
    set maxPlayers(maxPlayers: number) {
        if (maxPlayers < this.#minPlayers) {
            this.#minPlayers = maxPlayers;
        }
        this.#maxPlayers = maxPlayers;
    }

    /**
     * The minimum number of players supported by this game.
     */
    get minPlayers() {
        return this.#minPlayers;
    }

    /**
     * The maximum number of players supported by this game.
     */
    get maxPlayers() {
        return this.#maxPlayers;
    }
}