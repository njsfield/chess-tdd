import Chess from "./lib/chess.js";
import is_valid_position from "./lib/is_valid_position";
import { SELECT } from "./constants";

// Make available for testing
export const default_state = {
  fen: new Chess().fen(),
  selected: null,
  selected_options: [],
  desired_move: null
};

// Main State
export default (state = default_state, { type, position }) => {
  // Do not allow invalid select spots
  if (!is_valid_position(position)) return state;
  const current = new Chess(state.fen);
  switch (type) {
    case SELECT:
      // 3. (When confirming move)
      if (position === state.desired_move) {
        // Make move
        current.move(position);
        return {
          ...default_state,
          fen: current.fen()
        };
        // 2. (When preparing desired move)
      } else if (state.selected_options.indexOf(position) > -1) {
        return {
          ...state,
          desired_move: position
        };
        // 1. For selecting position (and preparing options)
      } else {
        return {
          ...default_state,
          selected: position,
          selected_options: current.moves({
            square: position
          })
        };
      }
    default:
      return state;
  }
};
