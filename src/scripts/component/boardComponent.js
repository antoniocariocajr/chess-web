import { qs, delegate } from '../utils/dom.js';
import { PIECE_UNICODE, THEME } from '../constants.js';

function createSquareElement(file, rank, piece) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.dataset.file = file; // 0-7
    square.dataset.rank = rank; // 0-7

    // File 0 is 'a', File 7 is 'h'.
    // Logic: Rank 0 is bottom (White side usually), Rank 7 is top.

    // Light/Dark square logic
    // a1 (0,0) is Dark? No, a1 is Black in standard board? 
    // Wait, chessboard a1 is dark. 0,0. 0+0=0 even.
    // If (file+rank)%2 === 0 it is dark?
    // Standard: a1 (0,0) is BLACK. b1 (1,0) is WHITE.
    // Let's check logic: (0+0)%2=0. 
    // Usually: (rank + file) % 2 === 0 -> Dark, !== 0 -> Light.
    // Let's stick to standard.

    const isDark = (file + rank) % 2 === 0;
    square.classList.add(isDark ? 'dark-square' : 'light-square');

    if (piece) {
        const pieceChar = PIECE_UNICODE[piece.color][piece.type];
        const pieceSpan = document.createElement('span');
        pieceSpan.classList.add('piece');
        pieceSpan.textContent = pieceChar;
        pieceSpan.dataset.color = piece.color; // for CSS logic if needed
        square.appendChild(pieceSpan);
    }

    return square;
}

export function renderBoard(container, game) {
    container.innerHTML = '';
    // Render from Rank 7 down to Rank 0 (Top to Bottom visual)
    for (let rank = 7; rank >= 0; rank--) {
        for (let file = 0; file < 8; file++) {
            const piece = game.board[rank][file];
            const square = createSquareElement(file, rank, piece);
            container.appendChild(square);
        }
    }
}

export function highlightSquares(container, moves) {
    // Clear previous highlights
    const previous = container.querySelectorAll('.highlight-move');
    previous.forEach(el => el.classList.remove('highlight-move'));

    const captures = container.querySelectorAll('.highlight-capture');
    captures.forEach(el => el.classList.remove('highlight-capture'));

    moves.forEach(move => {
        const square = qs(`.square[data-file="${move.file}"][data-rank="${move.rank}"]`, container);
        if (square) {
            // Check if capture (if square has a piece child)
            if (square.querySelector('.piece')) {
                square.classList.add('highlight-capture');
            } else {
                square.classList.add('highlight-move');
            }
        }
    });
}

export function highlightSelected(container, rank, file) {
    const all = container.querySelectorAll('.selected-square');
    all.forEach(el => el.classList.remove('selected-square'));

    if (rank !== null && file !== null) {
        const square = qs(`.square[data-file="${file}"][data-rank="${rank}"]`, container);
        if (square) square.classList.add('selected-square');
    }
}

export function bindSquareClick(container, handler) {
    delegate(container, 'click', '.square', (e, square) => {
        const file = parseInt(square.dataset.file, 10);
        const rank = parseInt(square.dataset.rank, 10);
        handler(rank, file);
    });
}