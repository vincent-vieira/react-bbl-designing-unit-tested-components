import React from 'react';

interface GameInfoProps {
  winner: string | null;
  nextPlayer?: string;
}

const GameInfo: React.FC<GameInfoProps> = ({ nextPlayer, winner }) => {
  return (
    <div className="game-info">
      {nextPlayer && <div>{`Next player: ${nextPlayer}`}</div>}
      {winner && <div>{`Winner: ${winner}`}</div>}
    </div>
  );
};

export default GameInfo;
