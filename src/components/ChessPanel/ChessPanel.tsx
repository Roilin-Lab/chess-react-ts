import React from "react";

import { useGameContext } from "../../contexts";
import HistoryList from "../ui/HistoryList";
import styled from "styled-components";
import { replacePieceToUnicodeIcon } from "../../chess/utils";

interface ChessPanelProps {}

const PanelContainer = styled.div`
  position: relative;
  width: 100%;
  height: 90vmin;
  max-width: 30rem;
  min-width: 25rem;
  flex: 1 1;

  @media (max-width: 576px) {
    max-width: none;
    max-height: 20rem;
  }
`;

const ChessPanel: React.FC<ChessPanelProps> = ({}) => {
  const { chess } = useGameContext();

  let moveNumber = 1;
  return (
    <>
      <PanelContainer>
        <HistoryList>
          {chess.history({ verbose: true }).map((move, index) => {
            const moveWithIcon = replacePieceToUnicodeIcon(move);
            return (
              <>
                {index % 2 === 0 ? (
                  <HistoryList.Index key={index}>
                    {moveNumber++}
                  </HistoryList.Index>
                ) : null}
                <HistoryList.Move key={move.san}>{moveWithIcon}</HistoryList.Move>
              </>
            );
          })}
        </HistoryList>
      </PanelContainer>
    </>
  );
};

export default ChessPanel;
