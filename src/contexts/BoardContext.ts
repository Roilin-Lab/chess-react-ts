import {
  createContext,
  useContext,
  type MouseEvent,
} from "react";
import { type SquareType, type Color } from "../chess";

export type BoardContextType = {
  board: SquareType[][];
  boardOrientation: Color;
  showPromotinChoise: boolean;
};

export const BoardContext = createContext<BoardContextType | null>(null);

export function useBoardContext() {
  const context = useContext(BoardContext) as BoardContextType;
  if (!context) throw new Error("Use board context within provider!");
  return context;
}
