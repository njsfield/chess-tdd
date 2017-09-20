import R from "ramda";

import { reverse_num_list, alpha_list } from "./fen_tools";

// 'a8' -> "0%""
// 'a1' -> "87.5%""
export const top = ({ position }) =>
  `${R.indexOf(position[1], reverse_num_list) / 7 * 87.5}%`;

// 'a8' -> "0%""
// 'h1' -> "87.5%""
export const left = ({ position }) =>
  `${R.indexOf(position[0], alpha_list) / 7 * 87.5}%`;
