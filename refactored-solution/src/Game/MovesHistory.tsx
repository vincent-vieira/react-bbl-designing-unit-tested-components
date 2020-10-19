import React from 'react';
import './MovesHistory.css';

interface MovesHistoryProps {
  history: unknown[];
  onJumpToMove: (moveNumber: number) => void;
}

const MovesHistory: React.FC<MovesHistoryProps> = ({ history, onJumpToMove: jumpTo }) => {
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

export default MovesHistory;
