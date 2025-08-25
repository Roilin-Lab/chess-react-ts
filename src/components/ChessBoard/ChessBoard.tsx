import { type FC, type MouseEvent, type PropsWithChildren } from "react";

import Square from "../Square";
import Piece from "../Piece";
import type { SquareType } from "../../chess";

import classes from "./ChessBoard.module.css";
import { useBoardContext, useGameContext } from "../../contexts";

interface ChessBoardProps extends PropsWithChildren {
  onMove: (event: MouseEvent, square: SquareType) => void;
  onContextMenu: (event: MouseEvent) => void;
}

const ChessBoard: FC<ChessBoardProps> = ({ onContextMenu, onMove, children }) => {
  const { positions, selectedPiece } = useGameContext();
  const { board } = useBoardContext();

  return (
    <div className={classes.chessBoard} onContextMenu={onContextMenu}>
      {children}
      {board.map((row) =>
        row.map((square) => {
          const piece = positions?.[square.id];
          const isSelected = square.id === selectedPiece?.id;

          return (
            <Square key={square.id} onClick={onMove} {...square}>
              <span
                style={{
                  position: "absolute",
                  top: "30%",
                  left: "35%",
                  fontSize: "1.6rem",
                }}
              >
                {square.id}
              </span>
              {piece && <Piece isSelected={isSelected}></Piece>}
            </Square>
          );
        })
      )}
    </div>
  );
};

export default ChessBoard;
