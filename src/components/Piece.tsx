import { memo, type FC, type MouseEvent } from "react";
import type { Color, SquareIdType } from "../chess";

interface PieceProps {
  color: Color;
  type: string;
  position: SquareIdType;
  isSelected?: boolean;
  onClick: (event: MouseEvent, position: SquareIdType) => void;
}

const Piece: FC<PieceProps> = memo(
  ({ color, type, position, onClick, isSelected }) => {
    return (
      <div
        style={{
          position: "relative",
          padding: "15%",
          backgroundColor: isSelected ? "red" : "Highlight",
          borderRadius: "50%",
          aspectRatio: "1/1",
        }}
        onClick={(e) => onClick(e, position)}
      >
        {`${color}${type.toUpperCase()}`}
      </div>
    );
  }
);

export default Piece;
