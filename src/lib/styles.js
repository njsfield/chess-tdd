import R from "ramda";

import { num_list, alpha_list } from "./fen_map";

const brown = "#BCAAA4";
const white = "#ffffff";
const black = "#000000";
const green = "#19a974";

/* Tile Helpers */
export const tile_background = p =>
  (R.indexOf(p[0], alpha_list) + R.indexOf(p[1], num_list)) % 2 == 0
    ? brown
    : white;

/* Piece Helpers */
export const piece_color = black;

// Get piece code
export const piece_code = p => piece_codes[p];

// Hold codes
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
export const top = p => `${R.indexOf(p[1], num_list) / 7 * 87.5}%`;

export const left = p => `${R.indexOf(p[0], alpha_list) / 7 * 87.5}%`;
