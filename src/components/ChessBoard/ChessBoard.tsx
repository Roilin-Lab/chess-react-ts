import {
  useCallback,
  type FC,
  type PropsWithChildren,
} from "react";

import SquareComponent from "../Square";

import classes from "./ChessBoard.module.css";
import { useBoardContext, useGameContext } from "../../contexts";
import { useActionsContext } from "../../contexts/ActionsContext";
import "./ChessBoard.module.css";

interface ChessBoardProps extends PropsWithChildren {}

const ChessBoard: FC<ChessBoardProps> = () => {
  const { chess, positions, selected, avalibleSquare } = useGameContext();
  const { board } = useBoardContext();
  const { onRightClick, onMove, onSelect } = useActionsContext();

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
              onSelect={onSelect}
              onMove={useCallback(onMove, [squares])}
            />
          );
        })
      )}
    </div>
  );
};

export default ChessBoard;
