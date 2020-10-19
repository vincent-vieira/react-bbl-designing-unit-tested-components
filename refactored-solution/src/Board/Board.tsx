import React from 'react';
import Square from '../Square/Square';

interface BoardProps {
  size: number;
  squares: string[];
  playSquare: (squareIndex: number) => void;
}

function range(size: number): number[] {
  return [...Array(size).keys()];
}

const Board: React.FC<BoardProps> = ({ size, squares, playSquare }) => {
  return (
    <div role="grid">
      {range(size).map((rowIndex) => (
        <div className="board-row" role="row" key={rowIndex}>
          {range(size).map((cellIndex) => {
            const gridIndex = cellIndex + rowIndex * size;
            const playIndex = gridIndex + 1;

            return (
              <div role="cell" key={cellIndex}>
                <Square
                  playerName={squares[gridIndex]}
                  onClick={() => playSquare(playIndex)}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
