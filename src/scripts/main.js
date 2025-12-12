import { ChessGame } from './game/ChessGame.js';
import { renderBoard, bindSquareClick, highlightSquares, highlightSelected } from './component/boardComponent.js';
import { qs, on } from './utils/dom.js';

let game;
let selectedSquare = null; // { rank, file }

const boardContainer = qs('#tabuleiro_xadrez');
const statusDisplay = qs('#game-status');
const playerDisplay = qs('#current-player');
const checkIndicator = qs('#check-indicator');

function init() {
    startNewGame();

    on(qs('#new-game-btn'), 'click', () => {
        if (confirm("Start new game?")) startNewGame();
    });

    bindSquareClick(boardContainer, handleSquareClick);
}

function startNewGame() {
    game = new ChessGame();
    selectedSquare = null;
    updateUI();
}

function updateUI() {
    renderBoard(boardContainer, game);

    // Update Status
    playerDisplay.textContent = game.turn;
    statusDisplay.textContent = game.isGameOver ? `Game Over - ${game.winner === 'DRAW' ? 'Draw' : game.winner + ' Wins!'}` : 'In Progress';

    if (game.isKingInCheck(game.turn)) {
        checkIndicator.classList.add('visible');
    } else {
        checkIndicator.classList.remove('visible');
    }

    if (selectedSquare) {
        highlightSelected(boardContainer, selectedSquare.rank, selectedSquare.file);
        const moves = game.getLegalMoves(selectedSquare.rank, selectedSquare.file);
        highlightSquares(boardContainer, moves);
    }
}

function handleSquareClick(rank, file) {
    if (game.isGameOver) return;

    const clickedPiece = game.getPiece(rank, file);
    const isFriendly = clickedPiece && clickedPiece.color === game.turn;

    if (selectedSquare) {
        // If clicked same square, deselect
        if (selectedSquare.rank === rank && selectedSquare.file === file) {
            selectedSquare = null;
            updateUI(); // renders board clears highlights
            return;
        }

        // Try to move
        const moved = game.makeMove(selectedSquare.rank, selectedSquare.file, rank, file);
        if (moved) {
            selectedSquare = null;
            // Play sound?
            updateUI();
        } else {
            // Invalid move. 
            // If clicked another friendly piece, switch selection
            if (isFriendly) {
                selectedSquare = { rank, file };
                updateUI();
            } else {
                // Invalid move to empty or enemy -> Deselect or just Feedback
                selectedSquare = null;
                updateUI();
            }
        }
    } else {
        // No selection
        if (isFriendly) {
            selectedSquare = { rank, file };
            updateUI();
        }
    }
}

init();