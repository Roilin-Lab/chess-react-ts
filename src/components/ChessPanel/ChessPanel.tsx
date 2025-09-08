import React from "react";

import "./ChessPanel.module.css";
import { useGameContext } from "../../contexts";
import HistoryList from "../ui/HistoryList";
import styled from "styled-components";

interface ChessPanelProps {}

const PanelContainer = styled.div`
  position: relative;
  width: 100%;
  
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
            return (
              <>
                {index % 2 === 0 ? (
                  <HistoryList.Index key={index}>
                    {moveNumber++}
                  </HistoryList.Index>
                ) : null}
                <HistoryList.Move key={move.san}>{move.san}</HistoryList.Move>
              </>
            );
          })}
        </HistoryList>
      </PanelContainer>
    </>
  );
};

export default ChessPanel;
