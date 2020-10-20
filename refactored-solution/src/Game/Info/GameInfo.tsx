import React from 'react';

interface GameInfoProps {
  winner?: string;
  nextPlayer?: string;
}

const GameInfo = ({ nextPlayer, winner }: GameInfoProps) => {
  return (
    <div className="game-info">
      {!winner && nextPlayer && <div>{`Next player: ${nextPlayer}`}</div>}
      {winner && <div>{`Winner: ${winner}`}</div>}
    </div>
  );
};

export default GameInfo;
