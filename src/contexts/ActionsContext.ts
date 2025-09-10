import {
  createContext,
  useContext,
  type Dispatch,
  type MouseEvent,
} from "react";
import { type SquareType } from "../chess";
import type { PieceSymbol } from "chess.js";

export type ActionsContextType = {
  onMove: (event: MouseEvent, square: SquareType) => void;
  onTurnBoard: (event: MouseEvent) => void;
  onSelect: (event: MouseEvent, square: SquareType) => void;
  onReset: () => void;
  onUndo: () => void;
  onPromotion: (piece: PieceSymbol) => void;
  setShowPromotinChoise: Dispatch<React.SetStateAction<boolean>>;
};

export const ActionsContext = createContext<ActionsContextType | null>(null);

export function useActionsContext() {
  const context = useContext(ActionsContext) as ActionsContextType;
  if (!context) throw new Error("Use board context within provider!");
  return context;
}
