import Card from "../Components/Card";
import ValueMap, { CardValueMap, DEFAULT_CARD_RANK_MAP, DEFAULT_VALUE_MAP } from "../Components/ValueMap";

export default class GameMeta {
    #minPlayers: number;
    #maxPlayers: number;
    maps: Record<string, ValueMap<any,any>>;
    cardValueMap: CardValueMap;
    // TODO: suit display map from suits to indexes

    constructor(obj: {minPlayers?: number, maxPlayers?: number, cardValueMap?: CardValueMap} = {}) {
        this.#minPlayers = obj.minPlayers || 1;
        this.#maxPlayers = obj.maxPlayers || 4;
        this.cardValueMap = obj.cardValueMap ?? DEFAULT_VALUE_MAP;
        this.maps = { 'CARD_RANK_MAP': DEFAULT_CARD_RANK_MAP }
    }

    // Prevent the minimum number of players from being larger than the maximum
    set minPlayers(minPlayers: number) {
        if (minPlayers > this.#maxPlayers) {
            this.#maxPlayers = minPlayers;
        }
        this.#minPlayers = minPlayers;
    }

    set maxPlayers(maxPlayers: number) {
        if (maxPlayers < this.#minPlayers) {
            this.#minPlayers = maxPlayers;
        }
        this.#maxPlayers = maxPlayers;
    }

    get minPlayers() {
        return this.#minPlayers;
    }

    get maxPlayers() {
        return this.#maxPlayers;
    }
}