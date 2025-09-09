import { createContext, useContext } from "react";
import type { PositionsType } from "../chess";
import type { Chess, Move, Square } from "chess.js";

export type GameContextType = {
  chess: Chess;
  positions: PositionsType;
  selected: Square | null;
  avalibleSquare: Move[];
};

export const GameContext = createContext<GameContextType | null>(null);

export function useGameContext() {
  const context = useContext(GameContext) as GameContextType;
  if (!context) throw new Error("Use game context within provider!");
  return context;
}
