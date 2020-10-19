import React from 'react';
import Board from '../Board/Board';
import { useTicTacToe } from '../useTicTacToe';
import GameInfo from './GameInfo';

const Game = () => {
  const { squares, play, winner, nextPlayer } = useTicTacToe(3);

  return (
    <div className="game">
      <Board size={3} squares={squares} playSquare={play} />
      <GameInfo winner={winner} nextPlayer={nextPlayer} />
    </div>
  );
};

export default Game;
