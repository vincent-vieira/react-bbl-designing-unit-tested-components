import { act, renderHook } from '@testing-library/react-hooks';
import { useTicTacToe } from '../useTicTacToe';

describe('Tic tac toe business hook', () => {
  describe('game state', () => {
    describe.each`
      size | expectedElementsCount
      ${3} | ${9}
      ${4} | ${16}
    `('with size $size * $size', ({ size, expectedElementsCount }) => {
      it('should be initialized properly', () => {
        const { result } = renderHook(() => useTicTacToe(size));

        const squares = Array(expectedElementsCount).fill('');

        expect(result.current.squares).toEqual(squares);
        expect(result.current.history).toEqual([
          { currentPlayer: 'X', squares },
        ]);
      });
    });

    it('should evolve when adding a move and store squares & current player', () => {
      const { result } = renderHook(() => useTicTacToe(3));

      act(() => {
        result.current.play(4);
      });

      expect(result.current.history).toEqual([
        { currentPlayer: 'X', squares: Array(9).fill('') },
        {
          currentPlayer: 'X',
          squares: ['', '', '', 'X', '', '', '', '', ''],
        },
      ]);
    });

    it('can be used to go back to a specific state and not reset further states', () => {
      const { result } = renderHook(() => useTicTacToe(3));
      act(() => result.current.play(4));
      act(() => result.current.play(6));

      act(() => result.current.goBackToMove(2));

      expect(result.current.history).toEqual([
        { currentPlayer: 'X', squares: Array(9).fill('') },
        {
          currentPlayer: 'X',
          squares: ['', '', '', 'X', '', '', '', '', ''],
        },
        {
          currentPlayer: 'O',
          squares: ['', '', '', 'X', '', 'O', '', '', ''],
        },
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

    it('should reset further states when playing a new move after jumping to a previous state', () => {
      const { result } = renderHook(() => useTicTacToe(3));
      act(() => result.current.play(4));
      act(() => result.current.play(6));
      act(() => result.current.play(8));

      act(() => result.current.goBackToMove(3));

      act(() => result.current.play(5));

      expect(result.current.history).toEqual([
        { currentPlayer: 'X', squares: Array(9).fill('') },
        {
          currentPlayer: 'X',
          squares: ['', '', '', 'X', '', '', '', '', ''],
        },
        {
          currentPlayer: 'O',
          squares: ['', '', '', 'X', '', 'O', '', '', ''],
        },
        {
          currentPlayer: 'O',
          squares: ['', '', '', 'X', 'O', 'O', '', '', ''],
        },
      ]);
      expect(result.current.squares).toEqual([
        '',
        '',
        '',
        'X',
        'O',
        'O',
        '',
        '',
        '',
      ]);
    });
  });

  describe('winner', () => {
    it('should be initialized properly', () => {
      const { result } = renderHook(() => useTicTacToe(3));

      expect(result.current.winner).toBeUndefined();
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
      const { result } = renderHook(() => useTicTacToe(3));

      act(() => result.current.play(4));
      act(() => result.current.play(6));
      act(() => result.current.play(8));

      act(() => result.current.goBackToMove(3));

      act(() => result.current.play(5));

      expect(result.current.nextPlayer).toEqual('O');
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
