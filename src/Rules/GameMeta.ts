export default class GameMeta {
    #minPlayers: number;
    #maxPlayers: number;

    constructor(obj: {minPlayers?: number, maxPlayers?: number} = {}) {
        this.#minPlayers = obj.minPlayers || 1;
        this.#maxPlayers = obj.maxPlayers || 4;
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