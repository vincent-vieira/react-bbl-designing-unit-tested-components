import { TicTacToePlayer } from '../../Models';
import './GameInfo.css';

type GameInfoProps = {
  nextPlayer: TicTacToePlayer;
  winner?: TicTacToePlayer;
};

const GameInfo = ({ nextPlayer, winner }: GameInfoProps) => {
  return (
    <div className="game-info">
      {!winner && nextPlayer && <div>Next player : {nextPlayer}</div>}
      {winner && <div>Winner : {winner}</div>}
    </div>
  );
};

export default GameInfo;
