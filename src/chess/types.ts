export type Color = "w" | "b";
export type File = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
export type Rank = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
export type SquareIdType = `${File}${Rank}`;
export type SquareType = {
  id: SquareIdType;
  color: Color;
};
export type PieceType = {
  type: "p" | "n" | "b" | "r" | "k" | "q";
  color: Color;
};
export type PositionsType = {
  [square in SquareIdType]: PieceType;
};
