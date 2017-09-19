import {
  get_options,
  is_valid_position,
  start_game_fen,
  update_fen
} from "./lib/fen_tools";
import { SELECT } from "./constants";

// Make available for testing
export const default_state = {
  fen: start_game_fen,
  selected: null,
  selected_options: [],
  desired_move: null
};

// Main State
export default (state = default_state, { type, position }) => {
  // Do not allow invalid select spots
  if (!is_valid_position(position)) return state;
  // Extract from state
  const { fen, selected, selected_options, desired_move } = state;
  // Main switch
  switch (type) {
    case SELECT:
      // 3. (When confirming move)
      if (position === desired_move) {
        // Make move
        return {
          ...default_state,
          fen: update_fen(selected, desired_move, fen)
        };
        // 2. (When preparing desired move)
      } else if (selected_options.includes(position)) {
        return {
          ...state,
          desired_move: position
        };
        // 1. For selecting position (and preparing options)
      } else {
        return {
          ...state,
          desired_move: null,
          selected: position,
          selected_options: get_options(position, fen)
        };
      }
    default:
      return state;
  }
};
