import React from 'react';
import Board from './Board/Board';
import { useTicTacToe } from './useTicTacToe';

const Game = () => {
  const { squares, play } = useTicTacToe(3);

  return <Board size={3} squares={squares} playSquare={play} />;
};

export default Game;
