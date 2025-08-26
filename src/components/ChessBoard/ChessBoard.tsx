import { type FC, type PropsWithChildren } from "react";

import Square from "../Square";

import classes from "./ChessBoard.module.css";
import { useBoardContext, useGameContext } from "../../contexts";

interface ChessBoardProps extends PropsWithChildren {}

const ChessBoard: FC<ChessBoardProps> = () => {
  const { positions, onMove } = useGameContext();
  const { board, onRightClick } = useBoardContext();

  return (
    <div className={classes.chessBoard} onContextMenu={onRightClick}>
      {board.map((row) =>
        row.map((square) => {
          const piece = positions?.[square.id];

          return (
            <Square
              key={square.id}
              piece={piece}
              onClick={onMove}
              {...square}
            ></Square>
          );
        })
      )}
    </div>
  );
};

export default ChessBoard;
