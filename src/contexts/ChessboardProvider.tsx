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
  type SquareIdType,
  type SquareType,
} from "../chess";
import { positionsFromFen } from "../chess/utils";
import { Chess, type Move } from "chess.js";

interface ChessboardProviderProps extends PropsWithChildren {}

const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const ChessboardProvider: FC<ChessboardProviderProps> = ({
  children,
}) => {
  const [boardOrientation, setBoardOrientation] = useState<Color>("w");
  const [selectedSquare, setSelectedSquare] = useState<SquareIdType | null>(
    null
  );

  const [state, setState] = useState<GameContextType>({
    chess: new Chess(FEN),
    move: "w",
    positions: positionsFromFen(FEN),
    history: [],
  });

  const handleContextMenu = useCallback((e: MouseEvent) => {
    e.preventDefault();
    setBoardOrientation((boardOrientation) =>
      boardOrientation === "w" ? "b" : "w"
    );
  }, []);
  const handleMove = useCallback(
    (e: MouseEvent, square: SquareType, move: Move) => {
      setState((prevState) => {
        const newPos = { ...prevState.positions };
        newPos[square] = { type: move.piece, color: move.color };
        delete newPos[move.from];

        return {
          ...prevState,
          move: prevState.move === "w" ? "b" : "w",
          positions: { ...newPos },
        };
      });
      console.log(move);
      
      state.chess.move({ from: move.from, to: move.to });
    },
    []
  );

  const handleSelect = useCallback((e: MouseEvent, square: SquareType) => {

  }, []);

  const board = useMemo(
    () => generateBoard(boardOrientation),
    [boardOrientation]
  );
  const boardValue: BoardContextType = useMemo(
    () => ({
      board: board,
      boardOrientation,
      selected: selectedSquare,

    }),
    [boardOrientation]
  );
  const actionsValue: ActionsContextType = useMemo(
    () => ({
      onRightClick: handleContextMenu,
      onMove: handleMove,
      onSelect: handleSelect,
      setSelectedSquare,
    }),
    []
  );

  return (
    <GameContext.Provider value={state}>
      <BoardContext.Provider value={boardValue}>
        <ActionsContext.Provider value={actionsValue}>
          {children}
        </ActionsContext.Provider>
      </BoardContext.Provider>
    </GameContext.Provider>
  );
};
