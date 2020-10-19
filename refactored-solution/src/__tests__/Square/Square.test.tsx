import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Square from '../../Square/Square';

describe('Square component', () => {
  it("should display a player's name", async () => {
    render(<Square playerName="X" />);

    expect(
      await screen.findByRole('button', { name: 'X' })
    ).toBeInTheDocument();
  });

  it('should notify parent component when clicking on it', async () => {
    const handler = jest.fn();
    render(<Square playerName="X" onClick={handler} />);

    userEvent.click(await screen.findByRole('button', { name: 'X' }));

    await waitFor(() => {
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});
