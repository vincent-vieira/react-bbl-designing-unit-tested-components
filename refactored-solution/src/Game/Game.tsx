import React from 'react';
import Board from '../Board/Board';
import { useTicTacToe } from '../useTicTacToe';
import GameInfo from './GameInfo';
import MovesHistory from './MovesHistory';

const Game = () => {
  const { squares, play, winner, nextPlayer, history } = useTicTacToe(3);
  // TODO : has played flag in order to hide first move navigation ?
  return (
    <div className="game">
      <Board size={3} squares={squares} playSquare={play} />
      <GameInfo winner={winner} nextPlayer={nextPlayer} />
      <MovesHistory history={history} jumpTo={() => {}} />
    </div>
  );
};

export default Game;
