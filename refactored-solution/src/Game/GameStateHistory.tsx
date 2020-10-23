import React from 'react';
import './GameStateHistory.css';

type GameStateHistoryProps = {
  history: unknown[];
  onJumpToMove: (moveNumber: number) => void;
}

const GameStateHistory = ({
  history,
  onJumpToMove: jumpTo,
}: GameStateHistoryProps) => {
  return (
    <ol>
      {history.map((_, moveNumber) => (
        <li key={moveNumber}>
          <button onClick={() => jumpTo(moveNumber)}>
            {`Go to ${moveNumber ? `move #${moveNumber}` : 'game start'}`}
          </button>
        </li>
      ))}
    </ol>
  );
};

export default GameStateHistory;
