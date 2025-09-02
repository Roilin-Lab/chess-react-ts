import { memo, type FC, type MouseEvent } from "react";
import type { Color, SquareIdType } from "../chess";
import { defaultPieces } from "./pieces";

interface PieceProps {
  color: Color;
  type: string;
  // position: SquareIdType;
  onClick?: (event: MouseEvent) => void;
}

const Piece: FC<PieceProps> = memo(({ color, type, onClick }) => {
  const pieceType = `${color}${type.toUpperCase()}`;
  const PieceSvg = defaultPieces[pieceType];
  return (
    <div
      style={{
        // position: "relative",
        // padding: "15%",
        // backgroundColor: "Highlight",
        // borderRadius: "50%",
        // aspectRatio: "1/1",
        position: "absolute",
        inset: "0",
      }}
      // onClick={onClick}
    >
      <PieceSvg />
    </div>
  );
});

export default Piece;
