import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Board from '../../Board/Board';

function range(size: number): number[] {
  return [...Array(size).keys()];
}

describe('Board component', () => {
  describe.each`
    size | expectedElementsCount
    ${3} | ${9}
    ${4} | ${16}
  `('with size $size * $size', ({ size, expectedElementsCount }) => {
    it('should be rendered', async () => {
      render(<Board size={size} squares={[]} playSquare={() => {}} />);

      await waitFor(() => {
        expect(screen.queryAllByRole('cell')).toHaveLength(
          expectedElementsCount
        );
      });
    });

    it.each(
      range(expectedElementsCount).map((playIndex) => [
        playIndex,
        playIndex + 1,
      ])
    )(
      'should notify parent component when clicking on square number %i',
      async (gridIndex, playIndex) => {
        const playSquareSpy = jest.fn();

        render(<Board size={size} squares={[]} playSquare={playSquareSpy} />);

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
