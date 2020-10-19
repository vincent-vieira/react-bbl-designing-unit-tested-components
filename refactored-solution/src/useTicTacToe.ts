import { useCallback, useEffect, useMemo, useState } from 'react';

interface UseTicTacToe {
  squares: string[];
  history: { squares: string[] }[];
  winner: string | null;
  play: (squareIndex: number) => void;
  nextPlayer: string;
}

export function useTicTacToe(size: number): UseTicTacToe {
  const [squares, setSquares] = useState(
    Array.from({ length: size * size }, () => '')
  );
  const { history, addMove } = useHistory();
  const { currentPlayer, changePlayer, nextPlayer } = useCurrentPlayer();

  const winner = useMemo(() => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }, [squares]);

  useEffect(() => {
    addMove(squares);
  }, [addMove, squares]);

  const play = useCallback(
    (squareIndex: number) => {
      const storageIndex = squareIndex - 1;
      if (winner || squares[storageIndex]) {
        return;
      }
      setSquares((squares) => {
        return squares.map((playerOnSquare, index) => {
          if (index === storageIndex) {
            return currentPlayer;
          }
          return playerOnSquare;
        });
      });
      changePlayer();
    },
    [currentPlayer, winner, changePlayer, squares]
  );

  return {
    squares,
    history,
    winner,
    play,
    nextPlayer,
  };
}

interface UseHistory {
  history: { squares: string[] }[];
  addMove: (squares: string[]) => void;
}

function useHistory(): UseHistory {
  const [history, setHistory] = useState<{ squares: string[] }[]>(() => []);
  return {
    history,
    addMove: useCallback(
      (squares: string[]) => setHistory((history) => [...history, { squares }]),
      []
    ),
  };
}

interface UseCurrentPlayer {
  currentPlayer: string;
  changePlayer: () => void;
  nextPlayer: string;
}

function useCurrentPlayer(): UseCurrentPlayer {
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const changePlayer = useCallback(
    () => setCurrentPlayer((player) => switchPlayer(player)),
    []
  );

  const nextPlayer = useMemo(() => switchPlayer(currentPlayer), [
    currentPlayer,
  ]);

  return {
    currentPlayer,
    changePlayer,
    nextPlayer,
  };

  function switchPlayer(player: string): string {
    return player === 'X' ? 'O' : 'X';
  }
}