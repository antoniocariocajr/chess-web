import { Chess } from "../data/Data";

export function fenToMatrix(fen) {
    const rows = fen.split(' ')[0].split('/');
    const chessData = new Chess();
    let rankIndex = 7;
    for (let row of rows) {
        let fileIndex = 0;
        for (let char of row) {
            if (isNaN(char)) {
                chessData.squeres[rankIndex][fileIndex] = char;
            } else {
                const emptySquares = parseInt(char, 10);
                for (let i = 0; i < emptySquares; i++) {
                    chessData.squeres[rankIndex][fileIndex] = null;
                }
            }
            fileIndex++;
        }
        rankIndex--;
    }
    chessData.activeColor = fen.split(' ')[1];
    chessData.castlingRights = fen.split(' ')[2];
    chessData.enPassantSquare = fen.split(' ')[3];
    chessData.halfMoveClock = parseInt(fen.split(' ')[4], 10);
    chessData.fullMoveNumber = parseInt(fen.split(' ')[5], 10);
    return chessData;
}

export function matrixToFen(chessData) {
    let fen = '';
    for (let rank = 7; rank >= 0; rank--) {
        let emptyCount = 0;
        for (let file = 0; file < 8; file++) {
            const piece = chessData.squeres[rank][file];
            if (piece) {
                if (emptyCount > 0) {
                    fen += emptyCount;
                    emptyCount = 0;
                }
                fen += piece;
            } else {
                emptyCount++;
            }
        }
        if (emptyCount > 0) {
            fen += emptyCount;
        }
        if (rank > 0) {
            fen += '/';
        }
    }
    fen += ` ${chessData.activeColor} ${chessData.castlingRights} ${chessData.enPassantSquare} ${chessData.halfMoveClock} ${chessData.fullMoveNumber}`;
    return fen;
}