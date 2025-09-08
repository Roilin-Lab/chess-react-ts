import React from "react";

import classes from "./ChessPanel.module.css";
import "./ChessPanel.module.css";
import { useGameContext } from "../../contexts";
import type { Move } from "chess.js";

interface ChessPanelProps {}

const ChessPanel: React.FC<ChessPanelProps> = ({}) => {
  const { chess } = useGameContext();

  let moveNumber = 1;
  return (
    <>
      <div className={classes.chessPanel}>
        {chess.history({ verbose: true }).map((move, index) => {
          return (
            <>
              {index % 2 === 0
               ? <div>{moveNumber++}</div>
               : null}
              <div>{move.san}</div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default ChessPanel;
