import R from "ramda";
import Chess from "./chess";

// "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
// ->
//        +------------------------+
//      8 | r  n  b  q  k  b  n  r |
//      7 | p  p  p  p  p  p  p  p |
//      6 | .  .  .  .  .  .  .  . |
//      5 | .  .  .  .  .  .  .  . |
//      4 | .  .  .  .  .  .  .  . |
//      3 | .  .  .  .  .  .  .  . |
//      2 | P  P  P  P  P  P  P  P |
//      1 | R  N  B  Q  K  B  N  R |
//        +------------------------+
//          a  b  c  d  e  f  g  h'

// 'abc def ghi' -> 'abc'
export const first_word = R.replace(/\s.*$/, "");

// 'ab/c' -> 'abc'
export const no_slashes = R.replace(/\//g, "");

// 'adb' -> ['a', 'd', 'b']
export const split_chars = R.split("");

// 2 -> '  '
export const snum_to_spaces = R.compose(
  R.join(""),
  R.times(R.always(" ")),
  R.curry(x => +x)
);

// '21as' -> '   as'
export const snum_to_spaces_all = R.curry(s =>
  s.replace(/[0-8]/g, snum_to_spaces)
);

// 'rnbqk...' -> ['r', 'n', 'b', 'q', 'k' ....]
export const fen_to_entities = R.compose(
  split_chars,
  snum_to_spaces_all,
  no_slashes,
  first_word
);

// ['8','7','6','5','4','3','2','1']
export const reverse_num_list = split_chars("87654321");

// prep alpha list
export const alpha_list = split_chars("abcdefgh");

// ['a1', 'a2', 'a3'...]
export const pos_list = R.compose(
  R.map(R.compose(R.join(""), R.reverse)),
  R.xprod(reverse_num_list)
)(alpha_list);

// 'rnbqkbnr/pppppppp/8/8/8/8/PPP' -> {'a1': 'r' ...}
export const map_entities = R.compose(R.zipObj(pos_list), fen_to_entities);

// 'a2' -> 'a3' -> {'a2': 'R', 'a3': ' '} -> {'a2': 'R', 'a3': 'R'}
export const copy_old_to_new = R.curry((o, n, obj) =>
  R.set(R.lensProp(n), R.prop(o, obj), obj)
);

// 'a' -> {'a' : 'hello'} -> {'a' : ' '}
export const set_empty_string = R.curry(o => R.set(R.lensProp(o), " "));

// 'h2' -> 'h3' -> 'rnbqkbnr/pp...' -> {...'h2' : ' ', .... 'h3' : 'p'}
export const move_old_to_new = R.curry((o, n, obj) =>
  R.compose(set_empty_string(o), copy_old_to_new(o, n))(obj)
);

// state -> [{entity: 'r', position: 'a8'...}]
export const map_state = ({
  fen,
  selected,
  selected_options,
  desired_move
}) => {
  // Let
  let move = move_old_to_new(selected, desired_move),
    hasDesired = R.always(R.isNil(desired_move)),
    entities = map_entities(fen);
  // In
  return R.values(
    R.mapObjIndexed((entity, position) => {
      return {
        entity,
        position,
        selected_option: R.contains(position, selected_options),
        selected: R.equals(selected, position),
        desired_move: R.equals(desired_move, position)
      };
    }, R.ifElse(hasDesired, R.identity, move)(entities))
  );
};

// 'f4' -> true
// 'k8' -> false
export const is_valid_position = R.test(/^[a-h][1-8]$/i);

// Start of game
export const start_game_fen =
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

// Perform move logic
export const update_fen = (selected, desired_move, fen) => {
  let c = new Chess(fen);
  c.move({ from: selected, to: desired_move });
  return c.fen();
};

// Get options
export const get_options = (position, fen) =>
  R.filter(p => new Chess(fen).move({ from: position, to: p }), pos_list);

// Determine whos turn
export const is_whites_turn = fen => R.equals(new Chess(fen).turn(), "w");
