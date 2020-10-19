import React from 'react';
import Square from '../Square/Square';
import './Board.css';

interface BoardProps {
  size: number;
  squares: string[];
  onSquareClicked: (squareIndex: number) => void;
}

function rangeTo(size: number): number[] {
  return [...Array(size).keys()];
}

const Board: React.FC<BoardProps> = ({ size, squares, onSquareClicked }) => {
  return (
    <div role="grid" className="game-board">
      {rangeTo(size).map((rowIndex) => (
        <div className="board-row" role="row" key={rowIndex}>
          {rangeTo(size).map((cellIndex) => {
            const gridIndex = cellIndex + rowIndex * size;
            const playIndex = gridIndex + 1;

            return (
              <div role="cell" key={cellIndex}>
                <Square
                  playerName={squares[gridIndex]}
                  onClick={() => onSquareClicked(playIndex)}
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
