import Chess from './lib/chess.js';
import { SELECT } from './constants';

// Make available for testing
export const default_state = {
  fen: new Chess().fen(),
  selected: null,
  selected_options: [],
  desired_move: null
};

// Main State
export default (state = default_state, { type, selected }) => {
  switch (type) {
    case SELECT:
      // 3. (When confirming move)
      if (selected == state.desired_move) {
        return {
          ...default_state,
          fen: new Chess(state.fen).move(selected).fen()
        };
        // 2. (When preparing desired move)
      } else if (state.selected_piece_options.indexOf(selected) > -1) {
        return {
          ...state,
          desired_move: selected
        };
        // 1. For selecting piece (and preparing options)
      } else {
        return {
          desired_move: null,
          selected,
          selected_options: new Chess(state.fen).moves({
            square: selected
          })
        };
      }
    default:
      return state;
  }
};
