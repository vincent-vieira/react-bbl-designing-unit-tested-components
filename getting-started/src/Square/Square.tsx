import { FC } from 'react';
import { TicTacToePlayer } from '../Models';
import './Square.css';

type SquareProps = {
  playerName: TicTacToePlayer;
  onClick?: () => void;
};

const Square: FC<SquareProps> = ({ onClick, playerName }) => {
  return (
    <div role="cell">
      <button className="square" onClick={() => onClick && onClick()}>
        {playerName}
      </button>
    </div>
  );
};

export default Square;
