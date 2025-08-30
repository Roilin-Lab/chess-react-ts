import {
  useCallback,
  useMemo,
  useState,
  type FC,
  type PropsWithChildren,
  type MouseEvent,
} from "react";
import { GameContext, type GameContextType } from "./GameContext";
import { BoardContext, type BoardContextType } from "./BoardContext";
import {
  generateBoard,
  type Color,
  type PieceType,
  type PositionsType,
  type SquareIdType,
} from "../chess";
import { ActionsContext } from "./ActionsContext";

interface ChessboardProviderProps extends PropsWithChildren {}

export const ChessboardProvider: FC<ChessboardProviderProps> = ({
  children,
}) => {
  const [boardOrientation, setBoardOrientation] = useState<Color>("w");
  const [move, setMove] = useState<Color>("w");
  const [positions, setPositions] = useState({
    a1: { type: "b", color: "w" },
    b2: { type: "p", color: "w" },
    c3: { type: "q", color: "w" },
    d4: { type: "k", color: "w" },
  } as PositionsType);
  const [selectedPiece, setSelectedPiece] = useState<PieceType | null>(null);

  const handleMove = useCallback((_e: MouseEvent, _square: SquareIdType) => {
    console.log(selectedPiece);
    setPositions((pos) => {
      setSelectedPiece(pos[_square]);
      return { ...pos };
    });
  }, []);
  const handleContextMenu = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      setBoardOrientation(boardOrientation === "w" ? "b" : "w");
    },
    [boardOrientation]
  );

  const boardValue: BoardContextType = useMemo(
    () => ({
      boardOrientation,
      board: generateBoard(boardOrientation),
      onRightClick: handleContextMenu,
    }),
    [boardOrientation]
  );
  const gameStateValue: GameContextType = useMemo(
    () => ({
      move,
      positions,
      selectedPiece,
      onMove: handleMove,
    }),
    [positions, selectedPiece]
  );

  return (
    <GameContext.Provider value={gameStateValue}>
      <BoardContext.Provider value={boardValue}>
        <ActionsContext.Provider value={{
          onRightClick: handleContextMenu,
          onMove: handleMove,
        }}>
          {children}
        </ActionsContext.Provider>
      </BoardContext.Provider>
    </GameContext.Provider>
  );
};
