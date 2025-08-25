import React from "react";

import classes from "./ChessPanel.module.css";
import type { PositionsType } from "../../chess/types";
import { useGameContext } from "../../contexts";

interface ChessPanelProps {}

const ChessPanel: React.FC<ChessPanelProps> = ({}) => {
  const { positions } = useGameContext();

  return (
    <div className={classes.chessPanel}>
      {Object.keys(positions as PositionsType).map((id: string) => (
        <span key={id}>{id}</span>
      ))}
    </div>
  );
};

export default ChessPanel;
