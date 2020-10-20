import { render, screen } from '@testing-library/react';
import React from 'react';
import GameInfo from '../../../Game/Info/GameInfo';

describe('Game info component', () => {
  describe('when winner is absent', () => {
    it('should display the next player if set', async () => {
      render(<GameInfo nextPlayer="X" />);

      expect(await screen.findByText('Next player: X')).toBeInTheDocument();
    });

    it('should not display the winner', () => {
      render(<GameInfo nextPlayer="X" />);

      const winnerElement = screen.queryByText('Winner: X');
      expect(winnerElement).toBeFalsy();
      expect(winnerElement).not.toBeInTheDocument();
    });
  });

  describe('when winner is set', () => {
    it('should not display the next player', () => {
      render(<GameInfo winner="X" nextPlayer="O" />);

      const nextPlayerElement = screen.queryByText('Next player: X');
      expect(nextPlayerElement).toBeFalsy();
      expect(nextPlayerElement).not.toBeInTheDocument();
    });

    it('should display the winner', async () => {
      render(<GameInfo winner="X" />);

      expect(await screen.findByText('Winner: X')).toBeInTheDocument();
    });
  });
});
