import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Board from '../../Board/Board';

function rangeTo(size: number): number[] {
  return [...Array(size).keys()];
}

describe('Board component', () => {
  describe.each`
    size | expectedElementsCount
    ${3} | ${9}
    ${4} | ${16}
  `('with size $size * $size', ({ size, expectedElementsCount }) => {
    it('should be rendered', async () => {
      render(<Board size={size} squares={[]} onSquareClicked={() => {}} />);

      await waitFor(() => {
        const grid = screen.queryByRole('grid');
        expect(grid).toBeInTheDocument();
        expect(grid).toMatchSnapshot();
      });
    });

    it(`should render ${size} rows`, async () => {
      render(<Board size={size} squares={[]} onSquareClicked={() => {}} />);

      await waitFor(() => {
        expect(screen.queryAllByRole('row')).toHaveLength(size);
      });
    });

    it(`should render ${expectedElementsCount} cells`, async () => {
      render(<Board size={size} squares={[]} onSquareClicked={() => {}} />);

      await waitFor(() => {
        expect(screen.queryAllByRole('cell')).toHaveLength(
          expectedElementsCount
        );
      });
    });

    it.each(
      rangeTo(expectedElementsCount).map((playIndex) => [
        playIndex,
        playIndex + 1,
      ])
    )(
      'should notify parent component when clicking on square number %i',
      async (gridIndex, playIndex) => {
        const playSquareSpy = jest.fn();

        render(
          <Board size={size} squares={[]} onSquareClicked={playSquareSpy} />
        );

        const { findByRole } = within(
          (await screen.findAllByRole('cell'))[gridIndex]
        );

        userEvent.click(await findByRole('button'));

        await waitFor(() => {
          expect(playSquareSpy).toHaveBeenCalledTimes(1);
          expect(playSquareSpy).toHaveBeenNthCalledWith(1, playIndex);
        });
      }
    );
  });
});
