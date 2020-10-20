import { useCallback, useMemo, useState } from 'react';

type GameState = {
  squares: string[];
  currentPlayer: string;
};

interface UseTicTacToe {
  squares: string[];
  history: GameState[];
  winner?: string;
  play: (squareIndex: number) => void;
  nextPlayer: string;
  hasGameStarted: boolean;
  goBackToMove: (moveNumber: number) => void;
}

// TODO : restore current playing player with history ?
export function useTicTacToe(size: number): UseTicTacToe {
  const {
    history,
    addMove,
    jumpTo: goBackToMove,
    current: squares,
  } = useGameState(Array.from({ length: size * size }, () => ''));
  const { currentPlayer, changePlayer, nextPlayer } = useCurrentPlayer();
  const hasGameStarted = useMemo(() => history.length >= 1, [history]);

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
    return undefined;
  }, [squares]);

  const play = useCallback(
    (squareIndex: number) => {
      const storageIndex = squareIndex - 1;
      if (winner || squares[storageIndex]) {
        return;
      }

      addMove(storageIndex, currentPlayer);
      changePlayer();
    },
    [winner, squares, addMove, changePlayer, currentPlayer]
  );

  return {
    squares,
    history,
    winner,
    play,
    nextPlayer,
    hasGameStarted,
    goBackToMove,
  };
}

interface UseGameState {
  history: GameState[];
  addMove: (squareIndex: number, currentPlayer: string) => void;
  jumpTo: (moveNumber: number) => void;
  current: string[];
}

function useGameState(initialState: string[]): UseGameState {
  const { setCurrentPlayer } = useCurrentPlayer();
  const [history, setHistory] = useState<GameState[]>(() => []);
  const [currentStateIndex, setCurrentStateIndex] = useState(0);

  const current = useMemo(() => {
    if (history.length) {
      return history[currentStateIndex - 1].squares;
    }
    return initialState;
  }, [currentStateIndex, history, initialState]);
  return {
    history,
    addMove: useCallback(
      (squareIndex: number, currentPlayer: string) => {
        const squares = current.map((playerOnSquare, index) => {
          if (index === squareIndex) {
            return currentPlayer;
          }
          return playerOnSquare;
        });

        setHistory((history) => [
          ...history.slice(0, currentStateIndex),
          { squares, currentPlayer },
        ]);
        setCurrentStateIndex((stateIndex) => stateIndex + 1);
      },
      [current, currentStateIndex]
    ),
    jumpTo: useCallback(
      (moveNumber: number) => {
        setCurrentStateIndex(moveNumber);
        setCurrentPlayer(switchPlayer(history[moveNumber - 1].currentPlayer));
      },
      [history, setCurrentPlayer]
    ),
    current,
  };
}

interface UseCurrentPlayer {
  currentPlayer: string;
  changePlayer: () => void;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<string>>;
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
    setCurrentPlayer,
    nextPlayer,
  };
}

function switchPlayer(player: string): string {
  return player === 'X' ? 'O' : 'X';
}
