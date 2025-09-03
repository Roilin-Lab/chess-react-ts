import {
  type FC,
  type PropsWithChildren,
  type CSSProperties,
  memo,
  useCallback,
} from "react";
import type { Color, PieceType, SquareIdType } from "../chess/types";
import { useActionsContext } from "../contexts/ActionsContext";
import Piece from "./Piece";

interface SquareProps extends PropsWithChildren {
  id: SquareIdType;
  color: Color;
  piece?: PieceType;
  isSelect: boolean;
}

const Square: FC<SquareProps> = memo(
  ({ id, color, piece, isSelect, children }: SquareProps) => {
    const squareStyle: CSSProperties = {
      position: "relative",
      width: "100%",
      height: "100%",
      aspectRatio: "1/1",
      backgroundColor: color === "w" ? "#eeeed2" : "#769656",
      color: color === "w" ? "#769656" : "#eeeed2",
      userSelect: "none",
    };
    const { onMove, onSelect } = useActionsContext();

    return (
      <div id={id} style={squareStyle} onClick={(e) => onMove(e, id)}>
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
            opacity: '0.5',
            position: "absolute",
            inset: '0'

          }}
          ></div>
        )}
        {/* {children} */}
        {piece && <Piece {...piece}/>}
      </div>
    );
  }
);

export default Square;
