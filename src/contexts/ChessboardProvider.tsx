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
import { Chess, type Move, type PieceSymbol, type Square } from "chess.js";

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
  const [showPromotinChoise, setShowPromotinChoise] = useState<boolean>(false);
  const [promotionMove, setPromotionMove] = useState<Move | null>(null);

  const chess = useMemo(() => new Chess(FEN), []);
  const board = useMemo(
    () => generateBoard(boardOrientation),
    [boardOrientation]
  );

  const onTurnBoard = useCallback((e: MouseEvent) => {
    setBoardOrientation((boardOrientation) =>
      boardOrientation === "w" ? "b" : "w"
    );
  }, []);
  const onMove = useCallback(
    (e: MouseEvent, square: SquareType) => {
      const move = avalibleSquare.find((move) => move.to === square);
      if (move) {
        if (move.isPromotion()) {
          console.log(move);
          
          setPromotionMove(move)
          setShowPromotinChoise(true);
          return;
        }
        chess.move(move);

        setPositions(boardToPositions(chess.board()));
        setSelected(null);
        setAvalibleSquare([]);
      }
    },
    [positions, selected, avalibleSquare, promotionMove]
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

  const onPromotion = useCallback((piece: PieceSymbol) => {
    if (promotionMove) {
      promotionMove.promotion = piece;
      chess.move(promotionMove);
    }

    setPositions(boardToPositions(chess.board()));
    setPromotionMove(null);
    setSelected(null);
    setAvalibleSquare([]);
  }, [promotionMove]);

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
      showPromotinChoise,
    }),
    [boardOrientation, showPromotinChoise]
  );
  const actionsValue: ActionsContextType = useMemo(
    () => ({
      onTurnBoard,
      onMove,
      onSelect,
      onReset,
      onUndo,
      onPromotion,
      setShowPromotinChoise,
    }),
    [onMove, onSelect, onTurnBoard, onPromotion]
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
