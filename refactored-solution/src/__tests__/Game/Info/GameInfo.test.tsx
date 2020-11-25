import { render, screen } from '@testing-library/react';
import GameInfo from '../../../Game/Info/GameInfo';
import { TicTacToePlayer } from '../../../useTicTacToe';

describe('Game info component', () => {
  describe('when winner is absent', () => {
    it.each(['X', 'O'] as Array<TicTacToePlayer>)(
      'should display the next player "%s" if set',
      async (nextPlayer) => {
        render(<GameInfo nextPlayer={nextPlayer} />);

        expect(
          await screen.findByText(`Next player: ${nextPlayer}`)
        ).toBeInTheDocument();
      }
    );

    it.each(['X', 'O'] as Array<TicTacToePlayer>)(
      'should not display the winner "%s"',
      (nextPlayer) => {
        render(<GameInfo nextPlayer={nextPlayer} />);

        const winnerElement = screen.queryByText('Winner:');
        expect(winnerElement).toBeFalsy();
        expect(winnerElement).not.toBeInTheDocument();
      }
    );
  });

  describe.each(['X', 'O'] as Array<TicTacToePlayer>)(
    'when winner is set as player "%s"',
    (winner) => {
      it('should not display the next player', () => {
        render(<GameInfo winner={winner} nextPlayer="O" />);

        const nextPlayerElement = screen.queryByText('Next player:');
        expect(nextPlayerElement).toBeFalsy();
        expect(nextPlayerElement).not.toBeInTheDocument();
      });

      it('should display the winner', async () => {
        render(<GameInfo winner={winner} />);

        expect(
          await screen.findByText(`Winner: ${winner}`)
        ).toBeInTheDocument();
      });
    }
  );
});
