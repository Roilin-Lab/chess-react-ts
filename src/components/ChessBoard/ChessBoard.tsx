import { type FC, type PropsWithChildren } from "react";

import Square from "../Square";

import classes from "./ChessBoard.module.css";
import { useBoardContext, useGameContext } from "../../contexts";
import { useActionsContext } from "../../contexts/ActionsContext";

interface ChessBoardProps extends PropsWithChildren {}

const ChessBoard: FC<ChessBoardProps> = () => {
  const { positions, selectedPiece} = useGameContext();
  const { board } = useBoardContext();
  const { onRightClick, onMove } = useActionsContext();

  return (
    <div className={classes.chessBoard} onContextMenu={onRightClick}>
      {board.map((row) =>
        row.map((square) => {
          const piece = positions?.[square.id];
          const isSelected = selectedPiece === piece;

          return (
            <Square
              key={square.id}
              piece={piece}
              onClick={onMove}
              isSelected={isSelected}
              {...square}
            ></Square>
          );
        })
      )}
    </div>
  );
};

export default ChessBoard;
