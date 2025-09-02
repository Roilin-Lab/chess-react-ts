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
import { ActionsContext, type ActionsContextType } from "./ActionsContext";
import { positionsFromFen } from "../chess/utils";

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
  const [selectedSquare, setSelectedSquare] = useState<SquareIdType | null>(
    null
  );
  const [gameState, setGameState] = useState<GameContextType>({
    move: "w",
    positions: positionsFromFen(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    ),
    selectedPiece: null,
    selectedSquare: null,
  });

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    setBoardOrientation((boardOrientation) =>
      boardOrientation === "w" ? "b" : "w"
    );
  }, []);
  const handleMove = useCallback((e: MouseEvent, square: SquareIdType) => {
    setGameState((prevState) => {
      if (
        prevState.selectedPiece &&
        prevState.selectedSquare &&
        (!prevState.positions[square] ||
          prevState.positions[square].color !== prevState.selectedPiece.color)
      ) {
        const newPos = { ...prevState.positions } as PositionsType;
        newPos[square] = prevState.selectedPiece;
        delete newPos[prevState.selectedSquare];
        return {
          ...prevState,
          positions: newPos,
          selectedSquare: null,
          selectedPiece: null,
        };
      } else if (
        prevState.positions[square] &&
        prevState.selectedSquare !== square
      ) {
        return {
          ...prevState,
          selectedSquare: square,
          selectedPiece: prevState.positions?.[square],
        };
      }

      return prevState;
    });
  }, []);
  const handleSelect = useCallback((_e: MouseEvent, square: SquareIdType) => {},
  []);

  const boardValue: BoardContextType = useMemo(
    () => ({
      board: generateBoard(boardOrientation),
      boardOrientation,
    }),
    [boardOrientation]
  );
  const gameStateValue: GameContextType = useMemo(
    () => ({
      move,
      positions,
      selectedPiece,
      selectedSquare,
    }),
    [positions, selectedPiece, selectedSquare]
  );
  const actionsValue: ActionsContextType = useMemo(
    () => ({
      onRightClick: handleContextMenu,
      onMove: handleMove,
      onSelect: handleSelect,
    }),
    []
  );

  return (
    <GameContext.Provider value={gameState}>
      <BoardContext.Provider value={boardValue}>
        <ActionsContext.Provider value={actionsValue}>
          {children}
        </ActionsContext.Provider>
      </BoardContext.Provider>
    </GameContext.Provider>
  );
};
