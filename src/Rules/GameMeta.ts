import ValueMap, { CardValueMap, DEFAULT_CARD_RANK_MAP, DEFAULT_CLIENT_VIEW_RANK_MAP, DEFAULT_CLIENT_VIEW_SUIT_MAP, DEFAULT_VALUE_MAP } from "../Components/ValueMap";
import { GameMetaArgs } from "../schemas/GameDefinitionArgs";

export default class GameMeta {
    #minPlayers: number;
    #maxPlayers: number;
    maps: Record<string, ValueMap<any,any>>;
    cardValueMap: CardValueMap;
    clientSuitMap: ValueMap<string, number>;
    clientRankMap: ValueMap<string, number>;

    constructor(obj: GameMetaArgs = {}) {
        this.#minPlayers = obj.minPlayers || 1;
        this.#maxPlayers = obj.maxPlayers || 4;
        this.cardValueMap = obj.cardValueMap ?? DEFAULT_VALUE_MAP;
        this.maps = { 'CARD_RANK_MAP': DEFAULT_CARD_RANK_MAP }
        this.clientSuitMap = obj.clientSuitMap ? new ValueMap<string, number>(obj.clientSuitMap) : DEFAULT_CLIENT_VIEW_SUIT_MAP;
        this.clientRankMap = obj.clientRankMap ? new ValueMap<string, number>(obj.clientRankMap) : DEFAULT_CLIENT_VIEW_RANK_MAP;
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