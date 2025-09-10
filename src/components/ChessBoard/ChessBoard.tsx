import { useCallback, useState, type FC, type PropsWithChildren } from "react";

import SquareComponent from "../Square";

import classes from "./ChessBoard.module.css";
import { useBoardContext, useGameContext } from "../../contexts";
import { useActionsContext } from "../../contexts/ActionsContext";
import "./ChessBoard.module.css";
import Piece from "../Piece";
import styled from "styled-components";

interface ChessBoardProps extends PropsWithChildren {}

const PromotionPopupOverlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  inset: 0;
  background-color: #00000076;
`;
const PromotionPopup = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin: 22%;
  padding: 0.7rem;
  align-items: center;
  border: 1px solid gray;
  border-radius: 8px;
  background: linear-gradient(160deg, #444444 0%, rgba(26, 26, 26, 1) 100%);
`;
const PieceContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1/1;
  &:hover {
    transform: scale(1.2);
  }
`;

const ChessBoard: FC<ChessBoardProps> = () => {
  const { chess, positions, selected, avalibleSquare } = useGameContext();
  const { board, showPromotinChoise } = useBoardContext();
  const { onMove, onSelect, onPromotion, setShowPromotinChoise } = useActionsContext();

  return (
    <div className={classes.chessBoard}>
      {board.map((row, rowIndex) =>
        row.map((square, colIndex) => {
          const piece = positions?.[square];
          const color = (rowIndex + colIndex) % 2 === 0 ? "w" : "b";
          const squares = avalibleSquare.find((move) => move.to === square);
          const isAvalible = squares ? true : false;
          const isSelected = selected === square;
          const isInCheck = chess.inCheck() && piece?.color === chess.turn();

          return (
            <SquareComponent
              key={square}
              id={square}
              color={color}
              piece={piece}
              isSelect={isSelected}
              isAvalible={isAvalible}
              isInCheck={isInCheck}
              onSelect={onSelect}
              onMove={useCallback(onMove, [squares])}
            />
          );
        })
      )}
      {showPromotinChoise && (
        <PromotionPopupOverlay onClick={() => setShowPromotinChoise(false)}>
          <PromotionPopup>
            <PieceContainer onClick={() => onPromotion('q')}>
              <Piece type="q" color={chess.turn()} />
            </PieceContainer>
            <PieceContainer onClick={() => onPromotion('r')}>
              <Piece type="r" color={chess.turn()} />
            </PieceContainer>
            <PieceContainer onClick={() => onPromotion('b')}>
              <Piece type="b" color={chess.turn()} />
            </PieceContainer>
            <PieceContainer onClick={() => onPromotion('n')}>
              <Piece type="n" color={chess.turn()} />
            </PieceContainer>
          </PromotionPopup>
        </PromotionPopupOverlay>
      )}
    </div>
  );
};

export default ChessBoard;
