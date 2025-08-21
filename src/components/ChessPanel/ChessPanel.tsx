import React, { useContext } from 'react'
import { GameContext, type GameContextType } from '../ChessLayout/ChessLayout'
 
import classes from './ChessPanel.module.css'

interface ChessPanelProps {

}

const ChessPanel: React.FC<ChessPanelProps> = ({}) => {
  const { move } = useContext(GameContext) as GameContextType;

  return (
    <div className={classes.chessPanel}>
      {move}
    </div>
  )
}

export default ChessPanel;