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
  type PositionsType,
  type SquareType,
} from "../chess";
import { boardToPositions, positionsFromFen } from "../chess/utils";
import { Chess, type Move, type Square } from "chess.js";

interface ChessboardProviderProps extends PropsWithChildren {}

const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const ChessboardProvider: FC<ChessboardProviderProps> = ({
  children,
}) => {
  const [boardOrientation, setBoardOrientation] = useState<Color>("w");
  const [positions, setPositions] = useState<PositionsType>(
    positionsFromFen(FEN)
  );
  const [selected, setSelected] = useState<Square | null>(null);
  const [avalibleSquare, setAvalibleSquare] = useState<Move[]>([]);
  const chess = useMemo(() => new Chess(FEN), []);
  const board = useMemo(
    () => generateBoard(boardOrientation),
    [boardOrientation]
  );

  const onRightClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    setBoardOrientation((boardOrientation) =>
      boardOrientation === "w" ? "b" : "w"
    );
  }, []);
  const onMove = useCallback(
    (e: MouseEvent, square: SquareType) => {
      const move = avalibleSquare.find((move) => move.to === square);
      if (move) {
        chess.move({ from: move.from, to: move.to });
        setPositions(boardToPositions(chess.board()));
        setSelected(null);
        setAvalibleSquare([]);
      }
    },
    [positions, selected, avalibleSquare]
  );

  const onSelect = useCallback((e: MouseEvent, square: SquareType) => {
    const piece = chess.get(square);
    if (piece && piece.color === chess.turn()) {
      setSelected(square);
      setAvalibleSquare(chess.moves({ square: square, verbose: true }));
    } else {
      setSelected(null);
      setAvalibleSquare([]);
    }
  }, []);

  const onReset = useCallback(() => {
    chess.reset();
    setPositions(boardToPositions(chess.board()));
  }, []);

  const onUndo = useCallback(() => {
    chess.undo();
    setPositions(boardToPositions(chess.board()));
  }, []);

  const boardValue: BoardContextType = useMemo(
    () => ({
      board: board,
      boardOrientation,
    }),
    [boardOrientation]
  );
  const actionsValue: ActionsContextType = useMemo(
    () => ({
      onRightClick,
      onMove,
      onSelect,
      onReset,
      onUndo
    }),
    [onMove, onSelect, onRightClick]
  );
  const state: GameContextType = useMemo(
    () => ({
      chess: chess,
      positions,
      selected,
      avalibleSquare,
    }),
    [positions, selected, actionsValue]
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
