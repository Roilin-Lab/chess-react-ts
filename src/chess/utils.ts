import type { Color, Move, PieceSymbol, Square } from "chess.js";
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

export function replacePieceToUnicodeIcon(move: Move): string | null {
  const unicodeBlackPiece = {
    k: "♔",
    q: "♕",
    r: "♖",
    n: "♘",
    b: "♗",
    p: "♙",
  };
  const unicodeWhitePiece = {
    k: "♚",
    q: "♛",
    r: "♜",
    n: "♞",
    b: "♝",
    p: "♟",
  };
  const isPromotion = move.isPromotion();
  const piece = isPromotion ? move.promotion! : move.piece;
  const pieceIcon =
    move.color === "w"
      ? unicodeWhitePiece[piece]
      : unicodeBlackPiece[piece];

  return move.san.replace(/[KQRNB]/, pieceIcon);
}

export function boardToPositions(
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][]
): PositionsType {
  const positions = {} as PositionsType;
  board.map((row) => {
    row.map((position) => {
      if (position) {
        positions[position.square] = {
          type: position.type,
          color: position.color,
        };
      }
    });
  });
  return positions;
}
