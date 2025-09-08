import type { PieceType, PositionsType, SquareType } from "./types";

export function indexesToSquareId(row: number, col: number): SquareType {
  const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h"];
  return `${alphabet[col]}${8 - row}` as SquareType;
}

export function positionsFromFen(fen: string): PositionsType {
  const positions = {} as PositionsType;
  const rows = fen.split(" ")[0].split("/");

  for (let row = 0; row < rows.length; row++) {
    let col = 0;
    for (const char of rows[row]) {
      if (isNaN(Number(char))) {
        const position = indexesToSquareId(row, col);

        positions[position] = {
          type: char.toLowerCase(),
          color: char.toLowerCase() === char ? "b" : "w",
        } as PieceType;
        col++;
      } else {
        col += Number(char);
      }
    }
  }

  return positions;
}
