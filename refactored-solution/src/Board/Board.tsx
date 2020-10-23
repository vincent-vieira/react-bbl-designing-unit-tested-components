import React from 'react';
import Square from '../Square/Square';
import './Board.css';

type BoardProps = {
  size: number;
  squares: string[];
  onSquareClicked: (squareIndex: number) => void;
};

function rangeTo(size: number): number[] {
  return [...Array(size).keys()];
}

const Board = ({ size, squares, onSquareClicked }: BoardProps) => {
  return (
    <div role="grid" className="game-board">
      {rangeTo(size).map((rowIndex) => (
        <div className="board-row" role="row" key={rowIndex}>
          {rangeTo(size).map((cellIndex) => {
            const gridIndex = cellIndex + rowIndex * size;
            const playIndex = gridIndex + 1;

            return (
              <Square
                key={cellIndex}
                playerName={squares[gridIndex]}
                onClick={() => onSquareClicked(playIndex)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
