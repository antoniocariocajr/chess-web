class GameResponse {
    id;
    fen;
    activeColor;
    status;
    inCheck;
    lastMoveUci;
    botNext;
}
class Chess {
    id;
    squeres = [8][8];
    activeColor;
    castlingRights;
    enPassantSquare;
    halfMoveClock;
    fullMoveNumber;
    status;
    inCheck;
    lastMove;
}

class Move {
    from;
    to;
    promotion;
}

class MoveRequest{
    color;
    uci;
}

class LegalMovesResponse{
    moves=[];
}

export { GameResponse, Chess, Move, MoveRequest, LegalMovesResponse };