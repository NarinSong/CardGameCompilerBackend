import ValueMap, { CardValueMap, DEFAULT_CARD_RANK_MAP, DEFAULT_CLIENT_VIEW_RANK_MAP, DEFAULT_CLIENT_VIEW_SUIT_MAP, DEFAULT_VALUE_MAP } from "../Components/ValueMap.js";
import { ValueTypeName } from "../schemas/Blocks.js";
import { GameMetaArgs } from "../schemas/GameDefinitionArgs.js";
import { DEFAULT_BUTTON_LOCATION, DEFAULT_COUNTER_LOCATION, DEFAULT_PILE_LOCATION, DefaultLocation, Location } from "../schemas/types.js";


/**
 * Defines metadata and configuration for a game.
 * 
 * A GameMeta describes the minimum and maximum number of players allowed, available value maps, the card value map, and the client suit and rank maps.
 */
export default class GameMeta {
    #minPlayers: number;
    #maxPlayers: number;
    #name: string;
    maps: Record<string, ValueMap<any,any>>;
    cardValueMap: CardValueMap;
    clientSuitMap: ValueMap<string, number>;
    clientRankMap: ValueMap<string, number>;
    variables: Record<string, ValueTypeName>;
    locations: Record<string, DefaultLocation>;
    parentGameId?: number | undefined;
    description: string;
    private: boolean;
    id?: number | undefined;

    /**
     * Creates a new GameMeta configuration.
     * @param obj - Configuration for the game, including the minimum and maximum number of players allowed, available value maps, the card value map, and the client suit and rank maps.
     */
    constructor(obj: GameMetaArgs = { name: 'Game' }) {
        this.#name = obj.name;
        this.#minPlayers = obj.minPlayers || 1;
        this.#maxPlayers = obj.maxPlayers || 4;
        this.cardValueMap = /*obj.cardValueMap ??*/ DEFAULT_VALUE_MAP;
        this.maps = { 'CARD_RANK_MAP': DEFAULT_CARD_RANK_MAP }
        this.clientSuitMap = obj.clientSuitMap ? new ValueMap<string, number>(obj.clientSuitMap) : DEFAULT_CLIENT_VIEW_SUIT_MAP;
        this.clientRankMap = obj.clientRankMap ? new ValueMap<string, number>(obj.clientRankMap) : DEFAULT_CLIENT_VIEW_RANK_MAP;
        this.variables = obj.variables ?? {};
        this.parentGameId = obj.parentGameId;
        this.description = obj.description || obj.name;
        this.private = obj.private ?? true;
        this.id = obj.id;

        this.locations = {
            'DEFAULT_PILE': DEFAULT_PILE_LOCATION,
            'DEFAULT_BUTTON': DEFAULT_BUTTON_LOCATION,
            'DEFAULT_COUNTER': DEFAULT_COUNTER_LOCATION,
        };

        for (let i in obj.locations) {
            if (!obj.locations[i]) continue;
            this.locations[i] = obj.locations[i];
        }
    }

    /**
     * Calculates the next offset value and whether it wrapped around the threshold.
     * @param current - The current position value.
     * @param offset - The amount to offset by.
     * @param threshold - The maximum value before wrapping.
     * @param wrapTo - The value to wrap back to.
     * @returns An object containing the new value and whether wrapping occurred.
     */
    static locationOffset(current: number, offset: number, threshold: number, wrapTo: number): { value: number, wrapped: boolean } {
        current += offset;
        let wrapped = false;
        if (current > threshold) {
            current = wrapTo;
            wrapped = true;
        }
        return { value: current, wrapped: wrapped };
    }

    /**
     * Computes the next location for a game component based on a named default layout.
     * @param locationName - The name of the default location configuration to use.
     * @param currentLocation - The current location to offset from, if any.
     * @returns The next computed location.
     */
    nextLocation(locationName: string, currentLocation?: Location | undefined): Location {
        const defaultLocation: DefaultLocation | undefined = this.locations[locationName];
        if (!defaultLocation) return {x:0, y:0};
        
        if (!currentLocation) {
            // Spelled out so that it clones and does not hold a reference
            currentLocation = {
                x: defaultLocation.anchor.x,
                y: defaultLocation.anchor.y
            }

            return currentLocation;
        }

        if (defaultLocation.direction === 'HORIZONTAL') {
            const base = GameMeta.locationOffset(currentLocation.x, defaultLocation.horizontalOffset, defaultLocation.wraptAt, defaultLocation.wrapTo);
            if (base.wrapped) {
                currentLocation.y += defaultLocation.verticalOffset;
            }
            currentLocation.x = base.value;
        } else if (defaultLocation.direction === 'VERTICAL') {
            const base = GameMeta.locationOffset(currentLocation.y, defaultLocation.verticalOffset, defaultLocation.wraptAt, defaultLocation.wrapTo);
            if (base.wrapped) {
                currentLocation.x += defaultLocation.horizontalOffset;
            }
            currentLocation.y = base.value;
        }

        return currentLocation;
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

    get name() {
        return this.#name;
    }
}