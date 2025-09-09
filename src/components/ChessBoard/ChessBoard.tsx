import {
  useCallback,
  useState,
  type FC,
  type MouseEvent,
  type PropsWithChildren,
} from "react";

import SquareComponent from "../Square";

import classes from "./ChessBoard.module.css";
import { useBoardContext, useGameContext } from "../../contexts";
import { useActionsContext } from "../../contexts/ActionsContext";
import type { Move, Square } from "chess.js";
import "./ChessBoard.module.css";

interface ChessBoardProps extends PropsWithChildren {}

const ChessBoard: FC<ChessBoardProps> = () => {
  const { chess, positions, move } = useGameContext();
  const { board } = useBoardContext();
  const { onRightClick, onMove } = useActionsContext();
  const [selected, setSelected] = useState<Square | null>(null);
  const [avalibleSquare, setAvalibleSquare] = useState<Move[]>([]);

  const handleMove = (e: MouseEvent, square: Square) => {
    const move = avalibleSquare.find((move) => move.to === square);
    if (move) {
      onMove(e, square, move);
      setSelected(null);
      setAvalibleSquare([]);
    }
  };

  const handleSelect = (e: MouseEvent, square: Square) => {
    const piece = chess.get(square);
    if (piece && piece.color === chess.turn()) {
      setSelected(square);
      setAvalibleSquare(chess.moves({ square: square, verbose: true }));
    } else {
      setSelected(null);
      setAvalibleSquare([]);
    }
  };

  return (
    <div className={classes.chessBoard} onContextMenu={onRightClick}>
      {board.map((row, rowIndex) =>
        row.map((square, colIndex) => {
          const piece = positions?.[square];
          const color = (rowIndex + colIndex) % 2 === 0 ? "w" : "b";
          const squares = avalibleSquare.find((move) => move.to === square);
          const isAvalible = squares ? true : false;
          const isSelected = selected === square;
          const isInCheck = chess.inCheck() && piece?.color === chess.turn();

          return (
            <SquareComponent
              key={square}
              id={square}
              color={color}
              piece={piece}
              isSelect={isSelected}
              isAvalible={isAvalible}
              isInCheck={isInCheck}
              onSelect={useCallback(handleSelect, [])}
              onMove={useCallback(handleMove, [squares])}
            />
          );
        })
      )}
    </div>
  );
};

export default ChessBoard;
