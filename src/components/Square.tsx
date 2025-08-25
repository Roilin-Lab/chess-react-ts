import type { FC, MouseEvent, PropsWithChildren, CSSProperties } from "react";
import type { Color, SquareIdType, SquareType } from "../chess/types";

interface SquareProps extends PropsWithChildren {
  id: SquareIdType;
  color: Color;
  onClick: (event: MouseEvent, square: SquareType) => void;
}

const Square: FC<SquareProps> = ({
  id,
  color,
  onClick,
  children,
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
    <div id={id} style={squareStyle} onClick={(e) => onClick(e, { id, color })}>
      {children}
    </div>
  );
};

export default Square;
