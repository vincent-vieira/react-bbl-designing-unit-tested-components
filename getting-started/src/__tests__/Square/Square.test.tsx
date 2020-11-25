import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Square from '../../Square/Square';
import { TicTacToePlayer } from '../../useTicTacToe';

describe('Square component', () => {
  describe.each(['X', 'O'] as Array<TicTacToePlayer>)(
    'with player %s',
    (playerName) => {
      it('should be wrapped in a cell role', async () => {
        render(<Square playerName={playerName} />);

        expect(await screen.findByRole('cell')).toBeInTheDocument();
      });

      it("should display player's name", async () => {
        render(<Square playerName={playerName} />);

        expect(
          await screen.findByRole('button', { name: playerName })
        ).toBeInTheDocument();
      });

      it('should notify parent component when clicking on it', async () => {
        const handler = jest.fn();
        render(<Square playerName={playerName} onClick={handler} />);

        userEvent.click(
          await screen.findByRole('button', { name: playerName })
        );

        await waitFor(() => {
          expect(handler).toHaveBeenCalledTimes(1);
        });
      });
    }
  );
});
