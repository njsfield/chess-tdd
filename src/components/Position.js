import React from "react";
import styled, { css } from "styled-components";
import R from "ramda";

import {
  is_whites_turn,
  empty_entity,
  is_targetted_piece
} from "../lib/fen_tools";
import { top, left } from "../lib/style_tools";

export const default_piece_colour = "#000000";
export const selected_piece_colour = "#ffffff";

export const white_selected_background = "#19a974";
export const black_selected_background = "#e7040f";

export const white_option_background = "#73c5a8";
export const black_option_background = "#e4624d";
export const default_background = "transparent";

// 'a8' -> {selected: true} -> selected_piece_colour
// 'a8' -> {selected: desired} -> selected_piece_colour
// 'a8' -> {selected: false} -> default_piece_colour
export const piece_colour = ({ position, state: { selected, desired_move } }) =>
  R.ifElse(
    R.either(R.equals(selected), R.equals(desired_move)),
    R.always(selected_piece_colour),
    R.always(default_piece_colour)
  )(position);

// { position: 'a8', entity: ' '} -> state -> option_background...
// { position: 'a8', entity: 'r'} -> state -> piece_background...
export const position_background = props =>
  R.ifElse(
    R.equals(empty_entity),
    R.always(option_background(props)),
    R.always(piece_background(props))
  )(props.entity);

// 'a8' -> {fen: '...b', selected: 'a8'} -> black_selected_background
// 'a2' -> {fen: '...w', selected: 'a2'} -> white_selected_background
// 'a2' -> {fen: '...w', selected: 'a4'} -> default_background
export const piece_background = ({
  position,
  state: { fen, selected, selected_options }
}) =>
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
export const option_background = ({
  position,
  state: { fen, selected, selected_options }
}) =>
  R.or(R.contains(position, selected_options), R.equals(position, selected))
    ? R.ifElse(
        is_whites_turn,
        R.always(white_option_background),
        R.always(black_option_background)
      )(fen)
    : default_background;

export const piece_code = ({ entity }) => piece_codes[entity];

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

export const PositionStyled = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  line-height: .5rem;
  cursor: pointer;
  height: 12.5%;
  width: 12.5%;
  position: absolute;

  /** Remove text highlighting **/

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /** Transition **/

  transition: all .2s ease;

  /** Custom **/
  ${props => css`
    background: ${position_background(props)};
    animation: ${is_targetted_piece(props)
      ? "flicker .1s linear 0s infinite alternate;"
      : "none"};
    color: ${piece_colour(props)};
    top: ${top(props)};
    left: ${left(props)};
  `};

  @keyframes flicker {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
`;
// Map piece code from entity
const Position = props =>
  <PositionStyled {...props}>
    {piece_code(props)}
  </PositionStyled>;

export default Position;
