import { renderBoard } from "./component/boardComponent.js";
import { qs, qsa, on, delegate } from '../utils/dom.js';

function init(){
    const boardContainer = qs('#tabuleiro_xadrez');
    console.log("init");
    
    renderBoard(boardContainer);
}
init();