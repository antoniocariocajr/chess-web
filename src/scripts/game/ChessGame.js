import { Piece, PIECE_TYPES, COLORS, MOVES } from './pieces.js';

export class ChessGame {
    constructor() {
        this.board = Array(8).fill(null).map(() => Array(8).fill(null));
        this.turn = COLORS.WHITE;
        this.isGameOver = false;
        this.winner = null;
        this.moveHistory = [];
        this.setupBoard();
    }

    setupBoard() {
        this.board = Array(8).fill(null).map(() => Array(8).fill(null));
        // Setup Pawns
        for (let i = 0; i < 8; i++) {
            this.board[1][i] = new Piece(PIECE_TYPES.PAWN, COLORS.WHITE);
            this.board[6][i] = new Piece(PIECE_TYPES.PAWN, COLORS.BLACK);
        }

        const setupRow = (rank, color) => {
            const types = [
                PIECE_TYPES.ROOK, PIECE_TYPES.KNIGHT, PIECE_TYPES.BISHOP, PIECE_TYPES.QUEEN,
                PIECE_TYPES.KING, PIECE_TYPES.BISHOP, PIECE_TYPES.KNIGHT, PIECE_TYPES.ROOK
            ];
            types.forEach((type, file) => {
                this.board[rank][file] = new Piece(type, color);
            });
        };

        setupRow(0, COLORS.WHITE); // Rank 1
        setupRow(7, COLORS.BLACK); // Rank 8
    }

    getPiece(rank, file) {
        if (this.isValidSquare(rank, file)) {
            return this.board[rank][file];
        }
        return null;
    }

    isValidSquare(rank, file) {
        return rank >= 0 && rank < 8 && file >= 0 && file < 8;
    }

    cloneBoard() {
        const newBoard = Array(8).fill(null).map(() => Array(8).fill(null));
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (this.board[r][c]) {
                    const p = this.board[r][c];
                    const newP = new Piece(p.type, p.color);
                    newP.hasMoved = p.hasMoved;
                    newBoard[r][c] = newP;
                }
            }
        }
        return newBoard;
    }

    // Returns array of destination squares {rank, file}
    getLegalMoves(rank, file) {
        const piece = this.getPiece(rank, file);
        if (!piece || piece.color !== this.turn) return [];

        const pseudoMoves = this.getPseudoLegalMoves(rank, file, piece);
        const legalMoves = [];

        for (const move of pseudoMoves) {
            // Simulate move
            const originalBoard = this.board; // Ref to current board (shallow copy issues? No, we will restore or replace)
            // Actually, better to copy board, execute move, check safety.

            // To be efficient, we swap temporarily
            const targetPiece = this.board[move.rank][move.file];
            this.board[move.rank][move.file] = piece;
            this.board[rank][file] = null;

            if (!this.isKingInCheck(piece.color)) {
                legalMoves.push(move);
            }

            // Undo move
            this.board[rank][file] = piece;
            this.board[move.rank][move.file] = targetPiece;
        }

        return legalMoves;
    }

    getPseudoLegalMoves(rank, file, piece) {
        const moves = [];

        if (piece.type === PIECE_TYPES.PAWN) {
            const direction = piece.color === COLORS.WHITE ? 1 : -1;
            const startRank = piece.color === COLORS.WHITE ? 1 : 6;

            // Forward 1
            if (this.isValidSquare(rank + direction, file) && !this.board[rank + direction][file]) {
                moves.push({ rank: rank + direction, file });
                // Forward 2
                if (rank === startRank && !this.board[rank + direction * 2][file]) {
                    moves.push({ rank: rank + direction * 2, file });
                }
            }

            // Captures
            const captureOffsets = [-1, 1];
            for (const offset of captureOffsets) {
                const targetFile = file + offset;
                if (this.isValidSquare(rank + direction, targetFile)) {
                    const targetPiece = this.board[rank + direction][targetFile];
                    if (targetPiece && targetPiece.color !== piece.color) {
                        moves.push({ rank: rank + direction, file: targetFile });
                    }
                }
            }
            // TODO: En Passant
        } else {
            const offsets = MOVES[piece.type];
            const isSliding = [PIECE_TYPES.ROOK, PIECE_TYPES.BISHOP, PIECE_TYPES.QUEEN].includes(piece.type);

            for (const offset of offsets) {
                let r = rank + offset.r;
                let c = file + offset.c;

                while (this.isValidSquare(r, c)) {
                    const targetPiece = this.board[r][c];
                    if (!targetPiece) {
                        moves.push({ rank: r, file: c });
                    } else {
                        if (targetPiece.color !== piece.color) {
                            moves.push({ rank: r, file: c });
                        }
                        break; // Blocked
                    }

                    if (!isSliding) break; // Knight/King only go once
                    r += offset.r;
                    c += offset.c;
                }
            }
        }
        return moves;
    }

    isKingInCheck(color) {
        // Find King
        let kingRank, kingFile;
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const p = this.board[r][c];
                if (p && p.type === PIECE_TYPES.KING && p.color === color) {
                    kingRank = r;
                    kingFile = c;
                    break;
                }
            }
            if (kingRank !== undefined) break;
        }

        // Check if any opponent piece can attack king position
        // Optimization: iterate all opponent pieces and see if they can move to King
        // Or reverse: can King be attacked by... (like knight jumps, sliding lines)
        // Let's iterate opponent pieces for simplicity for now

        const opponentColor = color === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;

        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const p = this.board[r][c];
                if (p && p.color === opponentColor) {
                    const moves = this.getPseudoLegalMoves(r, c, p);
                    if (moves.some(m => m.rank === kingRank && m.file === kingFile)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    makeMove(fromRank, fromFile, toRank, toFile) {
        const legalMoves = this.getLegalMoves(fromRank, fromFile);
        const isLegal = legalMoves.some(m => m.rank === toRank && m.file === toFile);

        if (!isLegal) return false;

        const piece = this.board[fromRank][fromFile];
        this.board[toRank][toFile] = piece;
        this.board[fromRank][fromFile] = null;
        piece.hasMoved = true;

        // Pawn Promotion (Auto-Queen for now)
        if (piece.type === PIECE_TYPES.PAWN) {
            if ((piece.color === COLORS.WHITE && toRank === 7) ||
                (piece.color === COLORS.BLACK && toRank === 0)) {
                piece.type = PIECE_TYPES.QUEEN;
            }
        }

        // Switch Turn
        this.turn = this.turn === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE;

        // Check Game Over
        if (this.isCheckmate(this.turn)) {
            this.isGameOver = true;
            this.winner = this.turn === COLORS.WHITE ? COLORS.BLACK : COLORS.WHITE; // Previous player won
        } else if (this.isStalemate(this.turn)) {
            this.isGameOver = true;
            this.winner = 'DRAW';
        }

        return true;
    }

    hasLegalMoves(color) {
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const p = this.board[r][c];
                if (p && p.color === color) {
                    if (this.getLegalMoves(r, c).length > 0) return true;
                }
            }
        }
        return false;
    }

    isCheckmate(color) {
        if (!this.isKingInCheck(color)) return false;
        return !this.hasLegalMoves(color);
    }

    isStalemate(color) {
        if (this.isKingInCheck(color)) return false;
        return !this.hasLegalMoves(color);
    }
}
