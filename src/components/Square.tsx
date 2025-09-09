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
import { useBoardContext, useGameContext } from "../contexts";
import styled from "styled-components";

const SquareContainer = styled.div<{ $color: Color }>`
  position: relative;
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  background-color: ${(props) =>
    props.$color === "w" ? "#eeeed2" : "#769656"};
  color: ${(props) => (props.$color === "w" ? "#769656" : "#eeeed2")};
  user-select: none;
`;
const HighLight = styled.div`
  background-color: yellow;
  opacity: 0.5;
  position: absolute;
  inset: 0;
`;
const Bullet = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 37%;
  height: 37%;
  background-color: black;
  opacity: 0.4;
  border-radius: 50%;
`;
const Label = styled.span`
  position: absolute;
  font-family: Noto Sans, sans-serif;
  font-size: 1.8rem;
  font-weight: bold;
`;
const LabelFile = styled(Label)`
  top: 5%;
  right: 5%;
`;
const LabelRank = styled(Label)`
  bottom: 5%;
  left: 5%;
`;

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
    const { boardOrientation } = useBoardContext();
    // const { chess } = useGameContext();

    const labelFile =
      id[0] === (boardOrientation === "b" ? "a" : "h") ? id[1] : null;
    const labelRank =
      id[1] === (boardOrientation === "b" ? "8" : "1") ? id[0] : null;

    return (
      <SquareContainer
        id={id}
        $color={color}
        onMouseDown={(e) => {
          if (isAvalible) {
            onMove(e, id);
          } else {
            onSelect(e, id);
          }
        }}
      >
        {isSelect && <HighLight/>}
        {isAvalible && <Bullet/>}
        {labelFile && <LabelFile>{labelFile}</LabelFile>}
        {labelRank && <LabelRank>{labelRank}</LabelRank>}

        {piece && <PieceComponent {...piece} />}
      </SquareContainer>
    );
  }
);

export default Square;
