// fenmap
//
// 1) parse_positions
// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1 ->
// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR
//
// 2) pad_spaces_from_nums
// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR ->
// rnbqkbnr/pppppppp/        /        /        /        /PPPPPPPP/RNBQKBNR
//
// 3) removeSlashes
// rnbqkbnr/pppppppp/        /        /        /        /PPPPPPPP/RNBQKBNR
// rnbqkbnrpppppppp                                 PPPPPPPPRNBQKBNR
//
// 5) sign_val ->
// R -> {entity: R, value: 'selected', position: 'a5'}

const pad_spaces_from_nums = str =>
  str.replace(/[0-8]/g, x => Array(+x).fill(' ').join(''));

const parse_positions = fen => fen.split('/').slice(0, 8).join('/');

const remove_slashes = str => str.replace(/\//g, '');

const fen_to_entities = str =>
  remove_slashes(pad_spaces_from_nums(parse_positions(str)));

const num_list = '12345678'.split('');
const alpha_list = 'abcdefgh'.split('');

// Create position map
const position_map = num_list
  .map(n =>
    alpha_list.map(l => {
      return { position: `${l}${n}` };
    })
  )
  .reduce((acc, x) => acc.concat(x), []);

// Assign entities
const map_entities_to_position_map = entities =>
  entities
    .split('')
    .map((e, i) => Object.assign(position_map[i], { entity: e }));

//
// 6) fen_map ->
//
//
