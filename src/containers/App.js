import React from "react";
import R from "ramda";
import Tile from "../components/Tile";
import Position from "../components/Position";
import Board from "../components/Board";
import { connect } from "react-redux";
import { select } from "../actions";
import { map_state, pos_list, is_targetted_piece } from "../lib/fen_tools";
import {
  tile_background,
  piece_colour,
  position_background,
  piece_codes,
  top,
  left
} from "../lib/style_tools";

// Main
const App = ({ state, trigger_select }) => {
  return (
    <Board>
      {/* Map Tiles */}
      {R.compose(
        R.map(position =>
          <Tile
            key={position}
            background={tile_background(position)}
            top={top(position)}
            left={left(position)}
          />
        ),
        R.map(n => pos_list[n]),
        R.range(0)
      )(64)}
      {/* Map Positions */}
      {R.compose(
        R.map(({ position, entity }) =>
          <Position
            key={position}
            colour={piece_colour(position, state)}
            background={position_background({ position, entity }, state)}
            targetted={is_targetted_piece({ position, entity }, state)}
            top={top(position)}
            left={left(position)}
            onTouchStart={() => trigger_select(position)}
            onMouseDown={() => trigger_select(position)}
          >
            {piece_codes[entity]}
          </Position>
        )
      )(map_state(state))}
    </Board>
  );
};

// mdtp
const map_dispatch_to_props = dispatch => {
  return {
    trigger_select: position => dispatch(select(position))
  };
};

export default connect(R.objOf("state"), map_dispatch_to_props)(App);
