import React from "react";
import R from "ramda";
import Tile from "../components/Tile";
import Position from "../components/Position";
import Board from "../components/Board";
import { connect } from "react-redux";
import { select } from "../actions";
import { map_state, pos_list } from "../lib/fen_tools";

// Main
const App = ({ state, trigger_select }) => {
  return (
    <Board>
      {/* Map Tiles */}
      {R.map(i => <Tile key={i} position={pos_list[i]} />)(R.range(0, 64))}
      {/* Map Positions */}
      {R.map(props =>
        <Position
          key={props.position}
          {...props}
          state={state}
          onMouseDown={() => trigger_select(props.position)}
          onTouchStart={() => trigger_select(props.position)}
        />
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
