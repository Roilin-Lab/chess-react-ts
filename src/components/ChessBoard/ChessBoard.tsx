import { type FC, type PropsWithChildren } from "react";

import Square from "../Square";

import classes from "./ChessBoard.module.css";
import { useBoardContext, useGameContext } from "../../contexts";
import { useActionsContext } from "../../contexts/ActionsContext";

interface ChessBoardProps extends PropsWithChildren {}

const ChessBoard: FC<ChessBoardProps> = () => {
  const { positions, selectedSquare } = useGameContext();
  const { board } = useBoardContext();
  const { onRightClick } = useActionsContext();

  return (
    <div className={classes.chessBoard} onContextMenu={onRightClick}>
      {board.map((row) =>
        row.map((square) => {
          const piece = positions?.[square.id];
          const isSelected = selectedSquare === square.id;

          return (
            <Square
              key={square.id}
              isSelect={isSelected}
              piece={piece}
              {...square}
            />
          );
        })
      )}
    </div>
  );
};

export default ChessBoard;
