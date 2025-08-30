import type { FC } from "react";
import ChessBoard from "../ChessBoard/ChessBoard";
import ChessPanel from "../ChessPanel/ChessPanel";

import { ChessboardProvider } from "../../contexts";

import classes from "./ChessLayout.module.css";

interface ChessLayoutProps {}

const ChessLayout: FC<ChessLayoutProps> = ({}) => {
  return (
    <div className={classes.chessLayout}>
      <ChessboardProvider>
        <ChessBoard></ChessBoard>
        <ChessPanel></ChessPanel>
      </ChessboardProvider>
    </div>
  );
};

export default ChessLayout;
