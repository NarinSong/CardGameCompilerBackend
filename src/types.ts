import GameState from "./Game/GameState";

export type FilterFn = (value: any) => boolean;
export type ResultFn = (value: GameState) => void;
export enum PlayerType { HUMAN, ROBOT, AI };
export enum PileState {
    SORTED,
    EMPTY,
    SHUFFLED,
};

export enum Visibility {
    FACE_UP,
    FACE_DOWN,
    INVISIBLE
}

export enum TriggerType {
    CLICK,
}

export const RANK = [
    'Ace','Two','Three','Four','Five','Six',
    'Seven','Eight','Nine','Ten','Jack','Queen','King'
] as const;

export const SUIT = [
    'Clubs','Diamonds','Hearts','Spades'
] as const;


export type rank = string;
export type suit = string;