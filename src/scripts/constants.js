export const PIECE_UNICODE = {
    WHITE: { KING: '♔', QUEEN: '♕', ROOK: '♖', BISHOP: '♗', KNIGHT: '♘', PAWN: '♙' },
    BLACK: { KING: '♚', QUEEN: '♛', ROOK: '♜', BISHOP: '♝', KNIGHT: '♞', PAWN: '♟' },
};

export const GAME_STATUS = {
    IN_PROGRESS: 'IN_PROGRESS',
    WHITE_WINS: 'WHITE_WINS',
    BLACK_WINS: 'BLACK_WINS',
    DRAW: 'DRAW',
    STALEMATE: 'STALEMATE',
};

// FEN inicial (útil para testes ou para reiniciar tabuleiro)
export const START_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

export const API_BASE = 'http://localhost:8080/api/chess';
export const API_TIMEOUT = 8000; // 8 segundos
export const BOT_DEPTH = 10;

export const THEME = {
    LIGHT_SQUARE: '#f0d9b5',
    DARK_SQUARE: '#b58863',
    HIGHLIGHT: '#fffb76',
    CHECK: '#e53e3e',
    LAST_MOVE: '#cdd26a',
};