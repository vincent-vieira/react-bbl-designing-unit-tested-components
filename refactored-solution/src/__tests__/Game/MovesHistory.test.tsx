import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import MovesHistory from '../../Game/MovesHistory';

describe('Moves history component', () => {
  it('should render first move with a special label', async () => {
    render(<MovesHistory history={[[]]} jumpTo={() => {}} />);

    expect(await screen.findAllByRole('button')).toHaveLength(1);
    expect(await screen.findByRole('button')).toHaveTextContent(
      'Go to game start'
    );
  });

  it('should render all subsequent moves with their index', async () => {
    render(<MovesHistory history={[[], [], []]} jumpTo={() => {}} />);

    const navigationButtons = await screen.findAllByRole('button');
    expect(navigationButtons).toHaveLength(3);
    expect(navigationButtons[1]).toHaveTextContent('Go to move #1');
    expect(navigationButtons[2]).toHaveTextContent('Go to move #2');
  });

  it.each([1, 2])(
    'should notify parent component when jumping to move %i',
    async (moveNumber) => {
      const jumpToSpy = jest.fn();

      render(<MovesHistory history={[[], [], []]} jumpTo={jumpToSpy} />);

      userEvent.click(await screen.findByText(`Go to move #${moveNumber}`));

      expect(jumpToSpy).toHaveBeenCalledTimes(1);
      expect(jumpToSpy).toHaveBeenNthCalledWith(1, moveNumber);
    }
  );
});
