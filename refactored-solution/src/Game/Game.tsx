import React from 'react';
import Board from '../Board/Board';
import { useTicTacToe } from '../useTicTacToe';
import GameInfo from './Info/GameInfo';
import MovesHistory from './MovesHistory';
import './Game.css';

const Game = () => {
  const { squares, play, winner, nextPlayer, history } = useTicTacToe(3);
  // TODO : has played flag in order to hide first move navigation ?
  return (
    <div className="game">
      <Board size={3} squares={squares} playSquare={play} />
      <div className="game-info-and-history">
        <GameInfo winner={winner} nextPlayer={nextPlayer} />
        <MovesHistory history={history} jumpTo={() => {}} />
      </div>
    </div>
  );
};

export default Game;
