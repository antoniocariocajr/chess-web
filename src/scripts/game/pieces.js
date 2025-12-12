export const PIECE_TYPES = {
    KING: 'KING',
    QUEEN: 'QUEEN',
    ROOK: 'ROOK',
    BISHOP: 'BISHOP',
    KNIGHT: 'KNIGHT',
    PAWN: 'PAWN'
};

export const COLORS = {
    WHITE: 'WHITE',
    BLACK: 'BLACK'
};

export class Piece {
    constructor(type, color) {
        this.type = type;
        this.color = color;
        this.hasMoved = false;
    }
}

export const MOVES = {
    [PIECE_TYPES.ROOK]: [
        { r: 1, c: 0 }, { r: -1, c: 0 }, { r: 0, c: 1 }, { r: 0, c: -1 }
    ],
    [PIECE_TYPES.BISHOP]: [
        { r: 1, c: 1 }, { r: 1, c: -1 }, { r: -1, c: 1 }, { r: -1, c: -1 }
    ],
    [PIECE_TYPES.KNIGHT]: [
        { r: 2, c: 1 }, { r: 2, c: -1 }, { r: -2, c: 1 }, { r: -2, c: -1 },
        { r: 1, c: 2 }, { r: 1, c: -2 }, { r: -1, c: 2 }, { r: -1, c: -2 }
    ],
    [PIECE_TYPES.QUEEN]: [
        { r: 1, c: 0 }, { r: -1, c: 0 }, { r: 0, c: 1 }, { r: 0, c: -1 },
        { r: 1, c: 1 }, { r: 1, c: -1 }, { r: -1, c: 1 }, { r: -1, c: -1 }
    ],
    [PIECE_TYPES.KING]: [
        { r: 1, c: 0 }, { r: -1, c: 0 }, { r: 0, c: 1 }, { r: 0, c: -1 },
        { r: 1, c: 1 }, { r: 1, c: -1 }, { r: -1, c: 1 }, { r: -1, c: -1 }
    ]
};
