import { render, screen } from '@testing-library/react';
import React from 'react';
import GameInfo from '../../Game/GameInfo';

describe('Game info component', () => {
  it('should display the winner if set', async () => {
    render(<GameInfo winner="X" />);

    expect(await screen.findByText('Winner: X')).toBeInTheDocument();
  });

  it('should display the next player if set', async () => {
    render(<GameInfo nextPlayer="X" />);

    expect(await screen.findByText('Next player: X')).toBeInTheDocument();
  });
});
