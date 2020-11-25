import Square from '../Square/Square';
import { TicTacToeSquares } from '../useTicTacToe';
import { rangeTo } from '../utils';
import './Board.css';

type BoardProps = {
  size: number;
  squares: TicTacToeSquares;
  onSquareClicked: (squareIndex: number) => void;
};

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
                key={gridIndex}
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
