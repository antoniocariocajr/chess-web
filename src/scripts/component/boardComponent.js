import { qs, qsa, on, delegate } from '../utils/dom.js';
import { PIECE_UNICODE, THEME } from '../constants.js';

function createSquareElement(file, rank, theme) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.dataset.file = file;
    square.dataset.rank = rank;

    const isLightSquare = (file.charCodeAt(0) + parseInt(rank, 10)) % 2 === 0;
    square.classList.add(isLightSquare ? 'light-square' : 'dark-square');

    // Aplicar tema
    if (theme && THEME[theme]) {
        square.style.backgroundColor = isLightSquare
            ? THEME[theme].lightSquare
            : THEME[theme].darkSquare;
    }

    return square;
}

export function renderBoard(container, squeres=[8][8] ) {
    container.innerHTML = ''; // Limpar conteúdo existente
console.log(squeres);

    for (let rank = 8; rank >= 1; rank--) {
        for (let fileCode = 'a'.charCodeAt(0); fileCode <= 'h'.charCodeAt(0); fileCode++) {
            const file = String.fromCharCode(fileCode);
            const square = createSquareElement(file, rank, squeres[rank - 1][fileCode - 'a'.charCodeAt(0)]);
            container.appendChild(square);
        }
    }
}

export function updateSquare(container, file, rank, piece) {
    const square = qs(`.square[data-file="${file}"][data-rank="${rank}"]`, container);
    if (square) {
        square.textContent = piece ? PIECE_UNICODE[piece.color][piece.type] : '';
    }
}


export function bindSquareClick(container, handler) {
    delegate(container, 'click', '.square', (e, square) => {
        const file = square.dataset.file;
        const rank = square.dataset.rank;
        handler(file, rank, square);
    });
}

export function highlightSquare(container, file, rank, highlightClass) {
    const square = qs(`.square[data-file="${file}"][data-rank="${rank}"]`, container);
    if (square) {
        square.classList.add(highlightClass);
    }
}