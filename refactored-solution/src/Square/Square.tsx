import React from 'react';
import './Square.css';

interface SquareProps {
  playerName: string;
  onClick?: () => void;
}

const Square: React.FC<SquareProps> = ({ onClick, playerName }) => {
  return (
    <button className="square" onClick={() => onClick && onClick()}>
      {playerName}
    </button>
  );
};

export default Square;
