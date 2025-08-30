import {
  type FC,
  type MouseEvent,
  type PropsWithChildren,
  type CSSProperties,
  memo,
} from "react";
import type { Color, PieceType, SquareIdType } from "../chess/types";
import Piece from "./Piece";

interface SquareProps extends PropsWithChildren {
  id: SquareIdType;
  color: Color;
  piece?: PieceType;
  isSelected?: boolean;

  onClick: (event: MouseEvent, square: SquareIdType) => void;
}

const Square: FC<SquareProps> = memo(
  ({ id, color, onClick, piece, isSelected }: SquareProps) => {
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
      <div id={id} style={squareStyle}>
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
        {piece && <Piece {...piece} position={id} onClick={onClick} isSelected={isSelected}></Piece>}
      </div>
    );
  }
);

export default Square;
