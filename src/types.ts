export type FilterFn = (value: any) => boolean;
export type ResultFn = (value: any) => void;
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

export type rank = string;
export type suit = string;