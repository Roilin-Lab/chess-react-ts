import React from "react";

import { useGameContext, useActionsContext } from "../../contexts";
import HistoryList from "../ui/HistoryList";
import styled from "styled-components";
import { replacePieceToUnicodeIcon } from "../../chess/utils";

interface ChessPanelProps {}

const PanelContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vmin;
  max-width: 30rem;
  min-width: 25rem;
  flex: 1 1;
  background-color: #262421;
  border-radius: 0.7rem;
  border: 1px solid #3c3b3a;
  font-family: "Noto Sans", sans-serif;
  overflow: hidden;

  @media (max-width: 576px) {
    max-width: none;
    max-height: 20rem;
  }
`;
const BoardInfo = styled.div`
  font-size: 2rem;
  padding: 1rem;
  border-bottom: 2px solid #3c3b3a;
`;
const ActionsContainer = styled.div`
  position: relative;
  display: flex;
`;
const ActionButton = styled.button`
  width: 100%;
  background-color: #383734;
  border: 0;
  padding: 0.7rem 1rem;
  color: #bababa;
  font-family: Noto Sans, sans-serif;
  font-weight: 600;

  &:hover {
    background-color: #535251;
  }
  &:active {
    background-color: #777674;
  }
`;

const ChessPanel: React.FC<ChessPanelProps> = ({}) => {
  const { chess } = useGameContext();
  const { onReset, onUndo, onTurnBoard } = useActionsContext();

  let moveNumber = 1;
  return (
    <>
      <PanelContainer>
        <BoardInfo>Ход {chess.turn() === "w" ? "белых" : "чёрных"}</BoardInfo>
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
                <HistoryList.Move key={move.san}>
                  {moveWithIcon}
                </HistoryList.Move>
              </>
            );
          })}
        </HistoryList>
        <ActionsContainer>
          <ActionButton title="Перевернуть доску" onClick={onTurnBoard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              height="24"
              width="24"
              className="size-6"
            >
              <path
              
                fillRule="evenodd"
                d="M12 5.25c1.213 0 2.415.046 3.605.135a3.256 3.256 0 0 1 3.01 3.01c.044.583.077 1.17.1 1.759L17.03 8.47a.75.75 0 1 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 0 0 0-1.06-1.06l-1.752 1.751c-.023-.65-.06-1.296-.108-1.939a4.756 4.756 0 0 0-4.392-4.392 49.422 49.422 0 0 0-7.436 0A4.756 4.756 0 0 0 3.89 8.282c-.017.224-.033.447-.046.672a.75.75 0 1 0 1.497.092c.013-.217.028-.434.044-.651a3.256 3.256 0 0 1 3.01-3.01c1.19-.09 2.392-.135 3.605-.135Zm-6.97 6.22a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.752-1.751c.023.65.06 1.296.108 1.939a4.756 4.756 0 0 0 4.392 4.392 49.413 49.413 0 0 0 7.436 0 4.756 4.756 0 0 0 4.392-4.392c.017-.223.032-.447.046-.672a.75.75 0 0 0-1.497-.092c-.013.217-.028.434-.044.651a3.256 3.256 0 0 1-3.01 3.01 47.953 47.953 0 0 1-7.21 0 3.256 3.256 0 0 1-3.01-3.01 47.759 47.759 0 0 1-.1-1.759L6.97 15.53a.75.75 0 0 0 1.06-1.06l-3-3Z"
                clipRule="evenodd"
              />
            </svg>
          </ActionButton>
          <ActionButton title="Отменить ход" onClick={onUndo}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              height="24"
              width="24"
            >
              <path
                fillRule="evenodd"
                d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </ActionButton>
          <ActionButton title="Начать заново" onClick={onReset}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              height="24"
              width="24"
            >
              <path
                fillRule="evenodd"
                d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </ActionButton>
        </ActionsContainer>
      </PanelContainer>
    </>
  );
};

export default ChessPanel;
