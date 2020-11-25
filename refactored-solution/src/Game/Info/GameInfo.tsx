import { TicTacToePlayer } from '../../useTicTacToe';
import './GameInfo.css';

type GameInfoProps = {
  winner?: TicTacToePlayer;
  nextPlayer?: TicTacToePlayer;
};

const GameInfo = ({ nextPlayer, winner }: GameInfoProps) => {
  return (
    <div className="game-info">
      {!winner && nextPlayer && <div>{`Next player: ${nextPlayer}`}</div>}
      {winner && <div>{`Winner: ${winner}`}</div>}
    </div>
  );
};

export default GameInfo;
