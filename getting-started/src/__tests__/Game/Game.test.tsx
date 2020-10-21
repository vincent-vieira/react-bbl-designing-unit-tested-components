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

describe('Game component', () => {});
