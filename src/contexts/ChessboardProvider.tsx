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
import { ActionsContext, type ActionsContextType } from "./ActionsContext";
import {
  generateBoard,
  type Color,
  type PieceType,
  type PositionsType,
  type SquareIdType,
  type Move,
} from "../chess";
import { positionsFromFen } from "../chess/utils";

interface ChessboardProviderProps extends PropsWithChildren {}

export const ChessboardProvider: FC<ChessboardProviderProps> = ({
  children,
}) => {
  const [boardOrientation, setBoardOrientation] = useState<Color>("w");
  const [gameState, setGameState] = useState<GameContextType>({
    move: "w",
    positions: positionsFromFen(
      "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
    ),
    history: [],
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
        const newPos = { ...prevState.positions };
        newPos[square] = prevState.selectedPiece;
        delete newPos[prevState.selectedSquare];

        const move: Move = {
          id: prevState.history.length + 1,
          piece: prevState.selectedPiece,
          source: prevState.selectedSquare,
          target: square,
        }

        return {
          ...prevState,
          move: prevState.move === 'w' ? 'b' : 'w', 
          positions: newPos,
          history: [...prevState.history, move],
          selectedSquare: null,
          selectedPiece: null,
        };
      } else if (
        prevState.positions[square] &&
        prevState.selectedSquare !== square &&
        prevState.positions[square].color === prevState.move
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
