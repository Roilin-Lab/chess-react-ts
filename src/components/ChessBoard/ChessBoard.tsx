import React from "react";
import type { FC, MouseEvent } from "react";

import classes from "./ChessBoard.module.css";

interface ChessBoardProps {
  onMove: (event: MouseEvent) => void;
  onContextMenu: (event: MouseEvent) => void,
}

const ChessBoard: FC<ChessBoardProps> = ({ onMove, onContextMenu }) => {
  return (
    <div className={classes.chessBoard} onClick={onMove} onContextMenu={onContextMenu}>
      ChessBoard
    </div>
  );
};

export default ChessBoard;
