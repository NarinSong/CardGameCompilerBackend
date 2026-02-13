// The result is the most dynamic and important part of the whole compiler
// This is where the rules are enforced and where something actually happens
// For example (Click on card [Trigger]) + (Can take action [Filter]) => {Draw the card [Result]}
import { ResultFn } from "../types";

export default class Result {
    fn: ResultFn;

    constructor( res: ResultFn ) {
        this.fn = res;
    }
}