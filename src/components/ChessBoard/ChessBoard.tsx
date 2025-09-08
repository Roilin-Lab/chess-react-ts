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
import type { SquareIdType } from "../../chess";
import type { Move, Square } from "chess.js";

interface ChessBoardProps extends PropsWithChildren {}

const ChessBoard: FC<ChessBoardProps> = () => {
  const { chess, positions, move } = useGameContext();
  const { board } = useBoardContext();
  const { onRightClick, onMove } = useActionsContext();
  const [selected, setSelected] = useState<Square | null>(null);
  const [avalibleSquare, setAvalibleSquare] = useState<Move[]>([]);

  const handleMove = (e: MouseEvent, square: Square) => {
    const move = chess
      .moves({ square: selected!, verbose: true })
      .find((move) => move.to === square);
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
  console.log(chess.board());
  

  return (
    <div className={classes.chessBoard} onContextMenu={onRightClick}>
      {board.map((row, rowIndex) =>
        row.map((square, colIndex) => {
          const piece = positions?.[square];
          const color = (rowIndex + colIndex) % 2 === 0 ? "w" : "b"
          const isSelected = selected === square;
          const isAvalible = avalibleSquare.find(
            (move) => move.to === square
          )
            ? true
            : false;

          return (
            <SquareComponent
              key={square}
              id={square}
              color={color}
              piece={piece}
              isSelect={isSelected}
              isAvalible={isAvalible}
              onSelect={useCallback(handleSelect, [])}
              onMove={useCallback(handleMove, [isAvalible])}
            />
          );
        })
      )}
    </div>
  );
};

export default ChessBoard;
