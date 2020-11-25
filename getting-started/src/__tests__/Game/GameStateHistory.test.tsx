import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameStateHistory from '../../Game/GameStateHistory';

describe('Game state history component', () => {
  it('should display a list', async () => {
    render(<GameStateHistory movesNumber={0} onJumpToMove={() => {}} />);

    expect(await screen.findByRole('list')).toBeInTheDocument();
  });

  it.each([2, 3, 4])(
    'should render %d moves as listitems, with the first move being with a special label',
    async (movesNumber) => {
      render(
        <GameStateHistory movesNumber={movesNumber} onJumpToMove={() => {}} />
      );

      const listItems = await screen.findAllByRole('listitem');
      expect(listItems).toHaveLength(movesNumber);
      expect(listItems[0]).toHaveTextContent('Go to game start');
    }
  );

  it('should render all subsequent moves with their index', async () => {
    render(<GameStateHistory movesNumber={3} onJumpToMove={() => {}} />);

    const navigationButtons = await screen.findAllByRole('button');
    expect(navigationButtons).toHaveLength(3);
    expect(navigationButtons[1]).toHaveTextContent('Go to move #1');
    expect(navigationButtons[2]).toHaveTextContent('Go to move #2');
  });

  it.each([1, 2])(
    'should notify parent component when jumping to move %i',
    async (displayedMoveNumber) => {
      const jumpToSpy = jest.fn();

      const moveNumber = displayedMoveNumber + 1;
      render(
        <GameStateHistory movesNumber={moveNumber} onJumpToMove={jumpToSpy} />
      );

      userEvent.click(
        await screen.findByText(`Go to move #${displayedMoveNumber}`)
      );

      expect(jumpToSpy).toHaveBeenCalledTimes(1);
      expect(jumpToSpy).toHaveBeenNthCalledWith(
        1,
        moveNumber
      );
    }
  );
});
