import { API_BASE } from '../constants.js';
import { http } from '../utils/http.js';

/* ---------- helper interno ---------- */
const url = (path) => `${API_BASE}${path}`;

/* ---------- 1. NOVO JOGO ---------- */
export const createGame = () =>
  http.post(url('/init')); 

/* ---------- 2. LEGAL MOVES DE UMA PEÇA ---------- */
export const getLegalMoves = (id, square) =>
  http.get(url(`/${id}/legal-moves?square=${square}`));

/* ---------- 3. ESTADO ATUAL DA PARTIDA ---------- */
export const getGame = (id) =>
  http.get(url(`/${id}`)); 

/* ---------- 4. ENVIA LANCE ---------- */
export const makeMove = (id, color, uci) =>
  http.post(
    url(`/${id}/move`),
    { color, uci } 
  );

/* ---------- 5. LANCE DO BOT ---------- */
export const botMove = (id, depth = 10) =>
  http.post(url(`/${id}/bot/move?depth=${depth}`)); 