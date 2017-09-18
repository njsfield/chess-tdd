// import { show_piece_options, confirm_move, prepare_move } from '../actions';
import reducer, { default_state } from '../reducer.js';
import Chess from '../lib/chess.js';

describe('Default state (no changes)', () => {
  it('Sets new fen', () => {
    const result = reducer(default_state, {
      type: 'NO_OP',
      payload: null
    });
    expect(result.fen).toBe(new Chess().fen());
  });
});
