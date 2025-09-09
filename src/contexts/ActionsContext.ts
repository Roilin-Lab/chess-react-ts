import {
  createContext,
  useContext,
  type MouseEvent,
} from "react";
import { type SquareType } from "../chess";

export type ActionsContextType = {
  onMove: (event: MouseEvent, square: SquareType) => void;
  onRightClick: (event: MouseEvent) => void;
  onSelect: (event: MouseEvent, square: SquareType) => void;
};

export const ActionsContext = createContext<ActionsContextType | null>(null);

export function useActionsContext() {
  const context = useContext(ActionsContext) as ActionsContextType;
  if (!context) throw new Error("Use board context within provider!");
  return context;
}
