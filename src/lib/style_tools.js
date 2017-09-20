import R from "ramda";

import {
  reverse_num_list,
  alpha_list,
  is_whites_turn,
  empty_entity
} from "./fen_tools";

export const even_tile_colour = "#BCAAA4";
export const odd_tile_colour = "#ffffff";

export const default_piece_colour = "#000000";
export const selected_piece_colour = "#ffffff";

export const white_selected_background = "#19a974";
export const black_selected_background = "#e7040f";

export const white_option_background = "#73c5a8";
export const black_option_background = "#e4624d";
export const default_background = "transparent";

// 'a8' -> even_tile_colour
// 'a7' -> odd_tile_colour
export const tile_background = p =>
  (R.indexOf(p[0], alpha_list) + R.indexOf(p[1], reverse_num_list)) % 2 == 0
    ? even_tile_colour
    : odd_tile_colour;

// 'a8' -> {selected: true} -> selected_piece_colour
// 'a8' -> {selected: desired} -> selected_piece_colour
// 'a8' -> {selected: false} -> default_piece_colour
export const piece_colour = (position, { selected, desired_move }) =>
  R.ifElse(
    R.either(R.equals(selected), R.equals(desired_move)),
    R.always(selected_piece_colour),
    R.always(default_piece_colour)
  )(position);

// { position: 'a8', entity: ' '} -> state -> option_background...
// { position: 'a8', entity: 'r'} -> state -> piece_background...
export const position_background = ({ position, entity }, state) =>
  R.ifElse(
    R.equals(empty_entity),
    R.always(option_background(position, state)),
    R.always(piece_background(position, state))
  )(entity);

// 'a8' -> {fen: '...b', selected: 'a8'} -> black_selected_background
// 'a2' -> {fen: '...w', selected: 'a2'} -> white_selected_background
// 'a2' -> {fen: '...w', selected: 'a4'} -> default_background
export const piece_background = (
  position,
  { fen, selected, selected_options }
) =>
  R.or(R.equals(position, selected), R.contains(position, selected_options))
    ? R.ifElse(
        is_whites_turn,
        R.always(white_selected_background),
        R.always(black_selected_background)
      )(fen)
    : default_background;

// 'a8' -> {fen: '...b', selected_options: ['a8']} -> black_options_background
// 'a2' -> {fen: '...w', selected_options: ['a2']} -> white_selected_background
// 'a2' -> {fen: '...w', selected_options: ['a3']} -> default_background
export const option_background = (
  position,
  { fen, selected, selected_options }
) =>
  R.or(R.contains(position, selected_options), R.equals(position, selected))
    ? R.ifElse(
        is_whites_turn,
        R.always(white_option_background),
        R.always(black_option_background)
      )(fen)
    : default_background;

// Collection of chess symbols
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

// 'a8' -> "0%""
// 'a1' -> "87.5%""
export const top = p => `${R.indexOf(p[1], reverse_num_list) / 7 * 87.5}%`;

// 'a8' -> "0%""
// 'h1' -> "87.5%""
export const left = p => `${R.indexOf(p[0], alpha_list) / 7 * 87.5}%`;
