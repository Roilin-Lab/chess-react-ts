import {
  createContext,
  useContext,
} from "react";
import type { Color, PieceType, PositionsType, SquareIdType } from "../chess";
import type { HistoryMoves } from "../chess/types";
import type { Chess } from "chess.js";

export type GameContextType = {
  chess: Chess;
  move: Color;
  positions: PositionsType;
  history: HistoryMoves;
};

export const GameContext = createContext<GameContextType | null>(null);

export function useGameContext() {
  const context = useContext(GameContext) as GameContextType;
  if (!context) throw new Error("Use game context within provider!");
  return context;
}
