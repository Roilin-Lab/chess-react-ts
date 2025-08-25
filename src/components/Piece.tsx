import type { FC } from 'react'

interface PieceProps {
  isSelected: boolean
}

const Piece: FC<PieceProps> = ({ isSelected }) => {
  return (
    <div style={{
      position: 'relative',
      padding: '15%',
      backgroundColor: isSelected ? 'red' : 'Highlight',
      borderRadius: '50%',
      aspectRatio: '1/1',
    }}>
     Piece
    </div>
  )
}

export default Piece;