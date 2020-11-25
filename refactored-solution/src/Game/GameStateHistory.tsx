import { useMemo } from 'react';
import { rangeTo } from '../utils';
import './GameStateHistory.css';

type GameStateHistoryProps = {
  movesNumber: number;
  onJumpToMove: (moveNumber: number) => void;
};

const GameStateHistory = ({
  movesNumber,
  onJumpToMove: jumpTo,
}: GameStateHistoryProps) => {
  const movesNumbers = useMemo(() => rangeTo(movesNumber), [movesNumber]);
  return (
    <ol>
      {movesNumbers.map((moveNumber) => (
        <li key={moveNumber}>
          <button onClick={() => jumpTo(moveNumber + 1)}>
            {`Go to ${moveNumber ? `move #${moveNumber}` : 'game start'}`}
          </button>
        </li>
      ))}
    </ol>
  );
};

export default GameStateHistory;
