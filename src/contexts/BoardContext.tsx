import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
  type MouseEvent,
} from "react";
import { type SquareType, type Color, generateBoard } from "../chess";

export type BoardContextType = {
  board: SquareType[][];
  boardOrientation: Color;

  onRightClick: (event: MouseEvent) => void;
};

export const BoardContext = createContext<BoardContextType | null>(null);

export function useBoardContext() {
  const context = useContext(BoardContext) as BoardContextType;
  if (!context) throw new Error("Use board context within provider!");
  return context;
}

interface BoardContextProviderProps extends PropsWithChildren {}

export const BoardContextProvider: FC<BoardContextProviderProps> = ({
  children,
}) => {
  const [boardOrientation, setBoardOrientation] = useState<Color>("w");

  const handleContextMenu = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      setBoardOrientation(boardOrientation === "w" ? "b" : "w");
    },
    [boardOrientation]
  );

  const board = useMemo(() => {
    return generateBoard(boardOrientation);
  }, [boardOrientation]);

  return (
    <BoardContext.Provider
      value={{ boardOrientation, board, onRightClick: handleContextMenu }}
    >
      {children}
    </BoardContext.Provider>
  );
};
