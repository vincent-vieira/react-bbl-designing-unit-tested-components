import React from 'react';

interface MovesHistoryProps {
  // TODO : change typing
  history: any[];
  jumpTo: (moveNumber: number) => void;
}

const MovesHistory: React.FC<MovesHistoryProps> = ({ history, jumpTo }) => {
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
