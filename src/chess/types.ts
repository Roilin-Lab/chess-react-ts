export type Color = "w" | "b";
export type File = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
export type Rank = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
export type SquareType = `${File}${Rank}`;
export type PieceType = {
  type: "p" | "n" | "b" | "r" | "k" | "q";
  color: Color;
};
export type Move = {
  id: number;
  piece: PieceType;
  source: SquareType;
  target: SquareType;
}
export type PositionsType = {
  [square in SquareType]: PieceType;
};
export type HistoryMoves = Move[];
