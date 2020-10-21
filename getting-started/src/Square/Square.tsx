import React from 'react';
import './Square.css';

interface SquareProps {
  playerName: string;
  onClick?: () => void;
}

const Square: React.FC<SquareProps> = ({ onClick, playerName }) => {
  return (
    <div role="cell">
      <button className="square" onClick={() => onClick && onClick()}>
        {playerName}
      </button>
    </div>
  );
};

export default Square;
