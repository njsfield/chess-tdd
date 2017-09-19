import R from "ramda";

import { reverse_num_list, alpha_list, is_whites_turn } from "./fen_tools";

const brown = "#BCAAA4";
const white = "#ffffff";
const black = "#000000";
const green = "#19a974";
const red = "#e7040f";
const transparent = "transparent";

/* Tile Helpers */
export const tile_background = p =>
  (R.indexOf(p[0], alpha_list) + R.indexOf(p[1], reverse_num_list)) % 2 == 0
    ? brown
    : white;

/* Piece Helpers */
export const piece_color = (position, { selected }) =>
  R.ifElse(R.equals(selected), R.always(white), R.always(black))(position);

/* Piece Helpers */
export const piece_background = (
  position,
  { fen, selected_options, selected }
) =>
  R.or(R.contains(position, selected_options), R.equals(position, selected))
    ? is_whites_turn(fen) ? green : red
    : transparent;

// Uni-code symbols
export const piece_codes = {
  // White
  R: "\u2656",
  N: "\u2658",
  B: "\u2657",
  Q: "\u2655",
  K: "\u2654",
  P: "\u2659",
  // black
  r: "\u265C",
  n: "\u265E",
  b: "\u265D",
  q: "\u265B",
  k: "\u265A",
  p: "\u265F"
};

/* Location Helpers */
export const top = p => `${R.indexOf(p[1], reverse_num_list) / 7 * 87.5}%`;

export const left = p => `${R.indexOf(p[0], alpha_list) / 7 * 87.5}%`;
