import {
  createContext,
  useContext,
} from "react";
import type { Color, PieceType, PositionsType } from "../chess";

export type GameContextType = {
  move: Color;
  positions?: PositionsType;
  selectedPiece: PieceType | null;
};

export const GameContext = createContext<GameContextType | null>(null);

export function useGameContext() {
  const context = useContext(GameContext) as GameContextType;
  if (!context) throw new Error("Use game context within provider!");
  return context;
}
