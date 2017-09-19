import R from "ramda";

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

// "1234" -> ['1', '2', '3', '4']
export const num_list = split_chars("12345678");

// prep alpha list
export const alpha_list = split_chars("abcdefgh");

// ['a1', 'a2', 'a3'...]
export const pos_list = R.compose(
  R.map(R.compose(R.join(""), R.reverse)),
  R.xprod(num_list)
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

// Main export
export default ({ fen, selected, selected_options, desired_move }) => {
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
