import React from "react";

import classes from "./ChessPanel.module.css";
import type { PositionsType } from "../../chess/types";
import { useGameContext } from "../../contexts";

interface ChessPanelProps {}

const ChessPanel: React.FC<ChessPanelProps> = ({}) => {
  const { history, move } = useGameContext();

  return (
    <>
      <span>{move}</span>
      <div className={classes.chessPanel}>
        {history.map((move) => (
          <span>
            {move.id}. {move.source} - {move.target}
          </span>
        ))}
      </div>
    </>
  );
};

export default ChessPanel;
