
/**
 * Default mapping from card rank names to numeric rank values.
 */
export const DEFAULT_CLIENT_VIEW_RANK_MAP = {
    name: 'rank',
    map: {
        'Ace': 0,
        'Two': 1,
        'Three': 2,
        'Four': 3,
        'Five': 4,
        'Six': 5,
        'Seven': 6,
        'Eight': 7,
        'Nine': 8,
        'Ten': 9,
        'Jack': 10,
        'Queen': 11,
        'King': 12,
    }
};

/**
 * Default mapping used by the client to display suit values.
 */
export const DEFAULT_CLIENT_VIEW_SUIT_MAP = {
    name: 'suit',
    map: {
        'Clubs': 0,
        'Diamonds': 1,
        'Spades': 2,
        'Hearts': 3,
        'Jokers': 4,
        'Trumps': 5,
    }
};

/**
 * Default calculation used to determine a card's numeric value.
 */
export const DEFAULT_VALUE_MAP = [DEFAULT_CLIENT_VIEW_RANK_MAP, DEFAULT_CLIENT_VIEW_SUIT_MAP];