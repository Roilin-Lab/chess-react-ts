import { createContext, useState, useMemo } from "react";
import type { FC, MouseEvent } from "react";
import ChessBoard from "../ChessBoard/ChessBoard";
import ChessPanel from "../ChessPanel/ChessPanel";

import classes from "./ChessLayout.module.css";

interface ChessLayoutProps {}

type File = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
type Rank = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
type SquareIdType = `${File}${Rank}`;
type SquareType = {
  id: SquareIdType;
  isLight: boolean;
};
type PieceType = {
  type: "p" | "n" | "b" | "r" | "k" | "q";
  isWhite: boolean;
};
type PositionsType = {
  [square in SquareIdType]: PieceType;
};

export type GameContextType = {
  move: "w" | "b";
  positions?: PositionsType;
  board: SquareType[][];
};

export const GameContext = createContext<GameContextType | null>(null);

const ChessLayout: FC<ChessLayoutProps> = ({}) => {
  const [move, setMove] = useState<"w" | "b">("w");

  const handleMove = (e: MouseEvent) => {
    setMove(() => (move === "w" ? "b" : "w"));
  };
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
  };

  const gameStateValue: GameContextType = {
    move,
    board: [],
  }

  return (
    <div className={classes.chessLayout}>
      <GameContext value={gameStateValue}>
        <ChessBoard
          onMove={handleMove}
          onContextMenu={handleContextMenu}
        ></ChessBoard>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <ChessPanel></ChessPanel>
        </div>
      </GameContext>
    </div>
  );
};

export default ChessLayout;
