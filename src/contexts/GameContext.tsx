import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type FC,
  type MouseEvent,
  type PropsWithChildren,
} from "react";
import type { Color, PieceType, PositionsType, SquareIdType } from "../chess";

export type GameContextType = {
  move: Color;
  positions?: PositionsType;
  selectedPiece: PieceType | null;
  onMove: (event: MouseEvent, square: SquareIdType) => void;
};

export const GameContext = createContext<GameContextType | null>(null);

export function useGameContext() {
  const context = useContext(GameContext) as GameContextType;
  if (!context) throw new Error("Use game context within provider!");
  return context;
}

interface GameContextProviderProps extends PropsWithChildren {}

export const GameContextProvider: FC<GameContextProviderProps> = ({
  children,
}) => {
  const [move, setMove] = useState<Color>("w");

  const [positions, setPositions] = useState({
    a1: { type: "b", color: "w" },
    b2: { type: "p", color: "w" },
    c3: { type: "q", color: "w" },
    d4: { type: "k", color: "w" },
  } as PositionsType);
  const [selectedPiece, setSelectedPiece] = useState<PieceType | null>(null);

  const handleMove = useCallback((_e: MouseEvent, _square: SquareIdType) => {
    setPositions((pos) => {
      console.log(pos[_square]);

      setSelectedPiece(() => pos[_square]);
      return pos;
    });
  }, []);

  const gameStateValue: GameContextType = useMemo(
    () => ({
      move,
      positions,
      selectedPiece,
      onMove: handleMove,
    }),
    [positions, selectedPiece]
  );

  return (
    <GameContext.Provider value={gameStateValue}>
      {children}
    </GameContext.Provider>
  );
};
