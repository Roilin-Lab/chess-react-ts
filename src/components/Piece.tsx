import { memo, type FC, type MouseEvent } from "react";
import type { Color } from "../chess";
import { defaultPieces } from "./pieces";

interface PieceProps {
  color: Color;
  type: string;
}

const Piece: FC<PieceProps> = memo(({ color, type }) => {

  const PieceSvg = defaultPieces[`${color}${type.toUpperCase()}`];
  return (
    <div
      style={{
        position: "absolute",
        inset: "0",
      }}
    >
      <PieceSvg />
    </div>
  );
});

export default Piece;
