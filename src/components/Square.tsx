import {
  type FC,
  type PropsWithChildren,
  type CSSProperties,
  memo,
  type MouseEvent,
} from "react";
import type { Color, SquareType } from "../chess/types";
import PieceComponent from "./Piece";
import type { Piece } from "chess.js";

interface SquareProps extends PropsWithChildren {
  id: SquareType;
  color: Color;
  piece?: Piece;
  isSelect: boolean;
  isAvalible: boolean;
  onSelect: (e: MouseEvent, id: SquareType) => void;
  onMove: (e: MouseEvent, id: SquareType) => void;
}

const Square: FC<SquareProps> = memo(
  ({
    id,
    color,
    piece,
    isSelect,
    isAvalible,
    onSelect,
    onMove,
  }: SquareProps) => {
    const squareStyle: CSSProperties = {
      position: "relative",
      width: "100%",
      height: "100%",
      aspectRatio: "1/1",
      backgroundColor: color === "w" ? "#eeeed2" : "#769656",
      color: color === "w" ? "#769656" : "#eeeed2",
      userSelect: "none",
    };

    return (
      <div
        id={id}
        style={squareStyle}
        onMouseDown={(e) => {
          if (isAvalible) {  
            onMove(e, id)
          } else {
            onSelect(e, id);
          }
        }}
      >
        <span
          style={{
            position: "absolute",
            top: "30%",
            left: "35%",
            fontSize: "1.6rem",
          }}
        >
          {id}
        </span>
        {isSelect && (
          <div
            style={{
              backgroundColor: "yellow",
              opacity: "0.5",
              position: "absolute",
              inset: "0",
            }}
          ></div>
        )}
        {isAvalible && (
          <div
            style={{
              backgroundColor: "red",
              opacity: "0.5",
              position: "absolute",
              inset: "0",
            }}
          ></div>
        )}
        {piece && <PieceComponent {...piece} />}
      </div>
    );
  }
);

export default Square;
