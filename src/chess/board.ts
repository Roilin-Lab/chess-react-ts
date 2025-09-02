import type { Color, SquareType } from "./types";
import { indexesToSquareId } from "./utils";

export const generateBoard = (boardOrientation: Color): SquareType[][] => {
  const board: SquareType[][] = Array.from(Array(8), () => Array(8));
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      board[row][col] = {
        id:
          boardOrientation === "w"
            ? indexesToSquareId(row, col)
            : indexesToSquareId(7 - row, 7 - col),
        color: (row + col) % 2 === 0 ? "w" : "b",
      };
    }
  }
  return board;
};
