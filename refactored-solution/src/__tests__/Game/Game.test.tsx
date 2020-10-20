import { render, screen } from '@testing-library/react';
import React from 'react';
import Game from '../../Game/Game';

jest.mock('../../useTicTacToe', () => {
  return {
    __esModule: true,
    useTicTacToe: jest
      .fn()
      .mockReturnValueOnce({ squares: [], history: [], hasGameStarted: false })
      .mockReturnValueOnce({ squares: [], history: [], hasGameStarted: true }),
  };
});

describe('Game component', () => {
  it('should hide moves history if game has not yet started', () => {
    render(<Game />);

    const gameStateHistoryElement = screen.queryByRole('list');
    expect(gameStateHistoryElement).toBeFalsy();
    expect(gameStateHistoryElement).not.toBeInTheDocument();
  });

  it('should show moves history if game has started', () => {
    render(<Game />);

    const gameStateHistoryElement = screen.queryByRole('list');
    expect(gameStateHistoryElement).toBeTruthy();
    expect(gameStateHistoryElement).toBeInTheDocument();
  });
});
