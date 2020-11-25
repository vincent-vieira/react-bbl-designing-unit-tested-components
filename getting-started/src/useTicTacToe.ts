import { useCallback, useMemo, useState } from 'react';

export type TicTacToePlayer = 'X' | 'O';
export type TicTacToeSquares = Array<TicTacToePlayer>;
type EmptyTicTacToeSquares = Array<''>;

type GameState = {
  squares: TicTacToeSquares;
  currentPlayer: TicTacToePlayer;
};

interface UseTicTacToe {
  squares: TicTacToeSquares;
  history: GameState[];
  winner?: TicTacToePlayer;
  play: (squareIndex: number) => void;
  nextPlayer: TicTacToePlayer;
  hasGameStarted: boolean;
  goBackToMove: (moveNumber: number) => void;
}

export function useTicTacToe(size: number): UseTicTacToe {
  const {
    history,
    addMove,
    jumpTo: goBackToMove,
    current: squares,
  } = useGameState(Array.from({ length: size * size }, () => ''));
  const { currentPlayer, switchCurrentPlayer, nextPlayer } = useCurrentPlayer();
  const hasGameStarted = useMemo(() => history.length > 1, [history]);

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
      switchCurrentPlayer();
    },
    [winner, squares, addMove, switchCurrentPlayer, currentPlayer]
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
  addMove: (squareIndex: number, currentPlayer: TicTacToePlayer) => void;
  jumpTo: (moveNumber: number) => void;
  current: TicTacToeSquares;
}

function useGameState(initialState: EmptyTicTacToeSquares): UseGameState {
  const { currentPlayer, changeCurrentPlayer } = useCurrentPlayer();
  const [history, setHistory] = useState<GameState[]>(() => [
    { squares: (initialState as unknown) as TicTacToeSquares, currentPlayer },
  ]);
  const [currentStateIndex, setCurrentStateIndex] = useState(1);
  const current = useMemo(() => history[currentStateIndex - 1].squares, [
    currentStateIndex,
    history,
  ]);

  const addMove = useCallback(
    (squareIndex: number, currentPlayer: TicTacToePlayer) => {
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
  );

  const jumpTo = useCallback(
    (moveNumber: number) => {
      setCurrentStateIndex(() => moveNumber);
      changeCurrentPlayer(() =>
        switchPlayer(history[moveNumber - 1].currentPlayer)
      );
    },
    [history, changeCurrentPlayer]
  );

  return {
    history,
    addMove,
    jumpTo,
    current,
  };
}

interface UseCurrentPlayer {
  currentPlayer: TicTacToePlayer;
  changeCurrentPlayer: React.Dispatch<React.SetStateAction<TicTacToePlayer>>;
  switchCurrentPlayer: () => void;
  nextPlayer: TicTacToePlayer;
}

function useCurrentPlayer(): UseCurrentPlayer {
  const [currentPlayer, setCurrentPlayer] = useState('X' as TicTacToePlayer);
  const switchCurrentPlayer = useCallback(
    () => setCurrentPlayer((player) => switchPlayer(player)),
    []
  );

  const nextPlayer = useMemo(() => switchPlayer(currentPlayer), [
    currentPlayer,
  ]);

  return {
    currentPlayer,
    switchCurrentPlayer,
    changeCurrentPlayer: setCurrentPlayer,
    nextPlayer,
  };
}

function switchPlayer(player: TicTacToePlayer): TicTacToePlayer {
  return player === 'X' ? 'O' : 'X';
}
