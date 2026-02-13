// A filter is a boolean function which takes in the game state
//      and outputs whether the action triggered is legal
// These can run client side to highlight available actions
//      and server-side to determine if the trigger is legal

import { FilterFn } from "../types";

export default class Filter {
    fn: FilterFn;

    constructor( res: FilterFn ) {
        this.fn = res;
    }
}