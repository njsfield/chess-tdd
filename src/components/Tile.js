import styled, { css } from "styled-components";

import R from "ramda";

import { reverse_num_list, alpha_list } from "../lib/fen_tools";
import { top, left } from "../lib/style_tools";

export const even_tile_colour = "#BCAAA4";
export const odd_tile_colour = "#ffffff";

// 'a8' -> even_tile_colour
// 'a7' -> odd_tile_colour
export const tile_background = ({ position }) =>
  (R.indexOf(position[0], alpha_list) +
    R.indexOf(position[1], reverse_num_list)) %
    2 ==
  0
    ? even_tile_colour
    : odd_tile_colour;

export default styled.span`
  display: inline-block;
  height: 12.5%;
  width: 12.5%;
  position: absolute;
  ${props => css`
    background: ${tile_background(props)};
    top: ${top(props)};
    left: ${left(props)};
  `};
`;
