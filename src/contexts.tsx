import { createContext, useContext } from "react";
import type { Color, PositionsType, SquareType } from "./chess";

export type GameContextType = {
  move: Color;
  positions?: PositionsType;
  selectedPiece: SquareType | null;
};

export type BoardContextType = {
  board: SquareType[][];
  boardOrientation: Color;
}

export const GameContext = createContext<GameContextType | null>(null);
export const BoardContext = createContext<BoardContextType | null>(null);

export function useGameContext() {
  const context = useContext(GameContext) as GameContextType;
  return context;
}

export function useBoardContext() {
  const context = useContext(BoardContext) as BoardContextType;
  return context;
}
