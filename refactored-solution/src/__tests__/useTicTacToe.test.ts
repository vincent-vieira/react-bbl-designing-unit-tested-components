import { act, renderHook } from '@testing-library/react-hooks';
import { useTicTacToe } from '../useTicTacToe';

describe('Tic tac toe business hook', () => {
  describe.each`
    size | expectedElementsCount
    ${3} | ${9}
    ${4} | ${16}
  `(
    'current game state with size $size * $size',
    ({ size, expectedElementsCount }) => {
      it('should be initialized properly', () => {
        const { result } = renderHook(() => useTicTacToe(size));

        expect(result.current.squares).toEqual(
          Array(expectedElementsCount).fill('')
        );
      });
    }
  );

  describe('history', () => {
    it('should be initialized properly', () => {
      const { result } = renderHook(() => useTicTacToe(3));

      expect(result.current.history).toEqual([]);
    });

    it('should evolve when adding a move', () => {
      const { result } = renderHook(() => useTicTacToe(3));

      act(() => {
        result.current.play(4);
      });

      expect(result.current.history).toEqual([
        expect.objectContaining({
          squares: ['', '', '', 'X', '', '', '', '', ''],
        }),
      ]);
    });

    it('can be used to go back to a specific state', () => {
      const { result } = renderHook(() => useTicTacToe(3));

      act(() => result.current.play(4));
      act(() => result.current.play(6));

      act(() => result.current.goBackToMove(1));

      expect(result.current.history).toEqual([
        expect.objectContaining({
          squares: ['', '', '', 'X', '', '', '', '', ''],
        }),
      ]);
      expect(result.current.squares).toEqual([
        '',
        '',
        '',
        'X',
        '',
        '',
        '',
        '',
        '',
      ]);
    });
  });

  describe('winner', () => {
    it('should be initialized properly', () => {
      const { result } = renderHook(() => useTicTacToe(3));

      expect(result.current.winner).toBeNull();
    });

    it('should evolve when winning conditions are met', () => {
      const { result } = renderHook(() => useTicTacToe(3));

      act(() => result.current.play(1));
      act(() => result.current.play(5));
      act(() => result.current.play(2));
      act(() => result.current.play(8));
      act(() => result.current.play(3));

      expect(result.current.winner).toBe('X');
    });
  });

  describe('next player', () => {
    it('should be initialized properly', () => {
      const { result } = renderHook(() => useTicTacToe(3));

      expect(result.current.nextPlayer).toBe('O');
    });

    it("should evolve from 'X' to 'O'", () => {
      const { result } = renderHook(() => useTicTacToe(3));

      act(() => {
        result.current.play(4);
      });

      expect(result.current.nextPlayer).toBe('X');
    });

    it("should evolve from 'O' to 'X'", () => {
      const { result } = renderHook(() => useTicTacToe(3));

      act(() => {
        result.current.play(4);
      });

      act(() => {
        result.current.play(5);
      });

      expect(result.current.nextPlayer).toBe('O');
    });

    it('should be reset by navigation from history', () => {
      
    });
  });

  it('should expose a flag showing that game has not yet started', () => {
    const { result } = renderHook(() => useTicTacToe(3));

    expect(result.current.hasGameStarted).toBe(false);
  });

  it('should expose a flag showing that game has started', () => {
    const { result } = renderHook(() => useTicTacToe(3));

    act(() => {
      result.current.play(4);
    });

    expect(result.current.hasGameStarted).toBe(true);
  });
});
