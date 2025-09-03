import {
  createContext,
  useContext,
} from "react";
import type { Color, PieceType, PositionsType, SquareIdType } from "../chess";
import type { HistoryMoves } from "../chess/types";

export type GameContextType = {
  move: Color;
  positions: PositionsType;
  history: HistoryMoves;
  selectedPiece: PieceType | null;
  selectedSquare: SquareIdType | null;
};

export const GameContext = createContext<GameContextType | null>(null);

export function useGameContext() {
  const context = useContext(GameContext) as GameContextType;
  if (!context) throw new Error("Use game context within provider!");
  return context;
}
