import React from "react";
import Tile from "../components/Tile";
import Position from "../components/Position";
import Board from "../components/Board";
import { connect } from "react-redux";
// import { tileStyles } from "../css/mapstyles";
// import { fen_map } from "../lib/fen_map.js";
import { select } from "../actions";
import fen_map, { pos_list } from "../lib/fen_map.js";
import {
  tile_background,
  piece_color,
  piece_code,
  top,
  left
} from "../lib/styles.js";
import R from "ramda";

// @TODO, map state to props, dispatch to props

// 1) Import board (container)
// 2) Map tiles
// 3) Map positions

const App = ({ state, trigger_select }) => {
  return (
    <Board>
      {/* Prepare Tiles */}
      {R.compose(
        R.map(p =>
          <Tile
            key={p}
            position={p}
            background={tile_background(p)}
            top={top(p)}
            left={left(p)}
          />
        ),
        R.map(p => pos_list[p]),
        R.range(0)
      )(64)}
      {/* Prepare Positions */}
      {R.compose(
        R.map(p =>
          <Position
            key={p.position}
            position={p}
            color={piece_color}
            background={state.selected == p.position ? "#19a974" : "tranparent"}
            top={top(p.position)}
            left={left(p.position)}
            onClick={() => trigger_select(p.position)}
          >
            {piece_code(p.entity)}
          </Position>
        )
      )(fen_map(state))}
    </Board>
  );
};

const map_state_to_props = state => {
  return {
    state
  };
};

const map_dispatch_to_props = dispatch => {
  return {
    trigger_select: position => dispatch(select(position))
  };
};

export default connect(map_state_to_props, map_dispatch_to_props)(App);