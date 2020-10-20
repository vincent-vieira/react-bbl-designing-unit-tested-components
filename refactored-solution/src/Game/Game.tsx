import React from 'react';
import Board from '../Board/Board';
import { useTicTacToe } from '../useTicTacToe';
import GameInfo from './Info/GameInfo';
import MovesHistory from './MovesHistory';
import './Game.css';

const Game = () => {
  const {
    squares,
    play,
    winner,
    nextPlayer,
    history,
    hasGameStarted,
    goBackToMove,
  } = useTicTacToe(3);

  return (
    <div className="game">
      <Board size={3} squares={squares} onSquareClicked={play} />
      <div className="game-info-and-history">
        <GameInfo winner={winner} nextPlayer={nextPlayer} />
        {hasGameStarted && (
          <MovesHistory history={history} onJumpToMove={goBackToMove} />
        )}
      </div>
    </div>
  );
};

export default Game;
