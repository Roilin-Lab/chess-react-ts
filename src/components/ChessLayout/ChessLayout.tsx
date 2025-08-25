import { useMemo, useState } from "react";
import type { FC, MouseEvent } from "react";
import ChessBoard from "../ChessBoard/ChessBoard";
import ChessPanel from "../ChessPanel/ChessPanel";
import type { GameContextType, BoardContextType } from "../../contexts";
import { GameContext, BoardContext } from "../../contexts";

import type { PositionsType, SquareType, Color } from "../../chess";
import { generateBoard } from "../../chess";

import classes from "./ChessLayout.module.css";

interface ChessLayoutProps {}

const ChessLayout: FC<ChessLayoutProps> = ({}) => {
  const [move, setMove] = useState<Color>("w");
  const [boardOrientation, setBoardOrientation] = useState<Color>("w");

  const [positions, setPositions] = useState({
    a1: { type: "b", color: "w" },
    b2: { type: "b", color: "w" },
    c3: { type: "b", color: "w" },
    d4: { type: "b", color: "w" },
  } as PositionsType);
  const [selectedPiece, setSelectedPiece] = useState<SquareType | null>(null);

  const handleMove = (_e: MouseEvent, _square: SquareType) => {
    if (selectedPiece) {
      const newPositions: PositionsType = {} as PositionsType;
      newPositions[_square.id] = positions[selectedPiece.id];
      delete positions[selectedPiece.id];

      setPositions({ ...positions, ...newPositions });
      setSelectedPiece(null);
    } else {
      if (positions[_square.id]) setSelectedPiece(_square);
    }
  };
  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setBoardOrientation(boardOrientation === "w" ? "b" : "w");
  };

  const board = useMemo(() => {
    return generateBoard(boardOrientation);
  }, [boardOrientation]);

  const gameStateValue: GameContextType = {
    move,
    positions,
    selectedPiece,
  };

  const boardStateValue: BoardContextType = {
    boardOrientation,
    board,
  };

  return (
    <div className={classes.chessLayout}>
      <GameContext value={gameStateValue}>
        <BoardContext value={boardStateValue}>
          <ChessBoard
            onMove={handleMove}
            onContextMenu={handleContextMenu}
          ></ChessBoard>

          <ChessPanel></ChessPanel>
        </BoardContext>
      </GameContext>
    </div>
  );
};

export default ChessLayout;
