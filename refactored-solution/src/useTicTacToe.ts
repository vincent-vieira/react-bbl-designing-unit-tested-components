import { useCallback, useMemo, useState } from 'react';

type GameState = Array<{
  squares: string[];
  player: string;
}>;

interface UseTicTacToe {
  squares: string[];
  history: GameState;
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
    resetTo: goBackToMove,
    current: squares,
  } = useHistory(Array.from({ length: size * size }, () => ''));
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

      addMove(
        squares.map((playerOnSquare, index) => {
          if (index === storageIndex) {
            return currentPlayer;
          }
          return playerOnSquare;
        })
      );
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

interface UseHistory {
  history: GameState;
  addMove: (squares: string[]) => void;
  resetTo: (moveNumber: number) => void;
  current: string[];
}

// FIXME: current player when resetting ?
function useHistory(initialState: string[]): UseHistory {
  const { currentPlayer, setCurrentPlayer } = useCurrentPlayer();

  const [history, setHistory] = useState<GameState>(() => []);
  return {
    history,
    addMove: useCallback(
      (squares: string[]) =>
        setHistory((history) => [
          ...history,
          { squares, player: currentPlayer },
        ]),
      [currentPlayer]
    ),
    resetTo: useCallback(
      (moveNumber: number) =>
        setHistory((history) => [...history].splice(0, moveNumber + 1)),
      []
    ),
    current: useMemo(() => {
      if (history.length) {
        return history[history.length - 1].squares;
      }
      return initialState;
    }, [history, initialState]),
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
