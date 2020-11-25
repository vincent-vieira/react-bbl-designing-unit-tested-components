import { render, screen } from '@testing-library/react';
import Game from '../../Game/Game';
import { useTicTacToe } from '../../useTicTacToe';

jest.mock('../../useTicTacToe', () => {
  const useTicTacToe = jest.fn();
  return {
    __esModule: true,
    useTicTacToe,
  };
});

describe('Game component', () => {
  it('should hide moves history if game has not yet started', () => {
    (useTicTacToe as jest.Mock).mockReturnValueOnce({
      squares: [],
      history: [],
      hasGameStarted: false,
    });

    render(<Game />);

    const gameStateHistoryElement = screen.queryByRole('list');
    expect(gameStateHistoryElement).toBeFalsy();
    expect(gameStateHistoryElement).not.toBeInTheDocument();
  });

  it('should show moves history if game has started', () => {
    (useTicTacToe as jest.Mock).mockReturnValueOnce({
      squares: [],
      history: [],
      hasGameStarted: true,
    });

    render(<Game />);

    const gameStateHistoryElement = screen.queryByRole('list');
    expect(gameStateHistoryElement).toBeTruthy();
    expect(gameStateHistoryElement).toBeInTheDocument();
  });
});
