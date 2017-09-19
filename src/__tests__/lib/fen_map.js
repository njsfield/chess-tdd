import { default_state } from "../../reducer.js";
import fen_map, {
  first_word,
  no_slashes,
  split_chars,
  snum_to_spaces,
  snum_to_spaces_all,
  fen_to_entities,
  num_list,
  alpha_list,
  pos_list,
  map_entities,
  copy_old_to_new,
  set_empty_string,
  move_old_to_new
} from "../../lib/fen_map.js";

// first_word
describe("first_word", () => {
  it("Returns first word from string (fen)", () => {
    const word = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    const expected = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
    expect(first_word(word)).toEqual(expected);
  });
});

// no_slashes
describe("no_slashes", () => {
  it("Returns word without slashes", () => {
    const word = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
    const expected = "rnbqkbnrpppppppp8888PPPPPPPPRNBQKBNR";
    expect(no_slashes(word)).toEqual(expected);
  });
});

// split_chars
describe("split_chars", () => {
  it("Returns word split into chars", () => {
    const word = "rnbq";
    const expected = ["r", "n", "b", "q"];
    expect(split_chars(word)).toEqual(expected);
  });
});

// snum_to_spaces
describe("snum_to_spaces", () => {
  it("Converts string int to spaces ", () => {
    const snumA = "2";
    const snumB = "4";
    const snumC = "8";
    const expectedA = "  ";
    const expectedB = "    ";
    const expectedC = "        ";
    expect(snum_to_spaces(snumA)).toEqual(expectedA);
    expect(snum_to_spaces(snumB)).toEqual(expectedB);
    expect(snum_to_spaces(snumC)).toEqual(expectedC);
  });
});

// snup_to_spaces_all
describe("snup_to_spaces_all", () => {
  it("Converts string int to spaces ", () => {
    const snum_string = "rnbqkbnr/pppppppp/2/3/2/1/PPPPPPPP/RNBQKBNR";
    const expected = "rnbqkbnr/pppppppp/  /   /  / /PPPPPPPP/RNBQKBNR";
    expect(snum_to_spaces_all(snum_string)).toEqual(expected);
  });
});

// fen_to_entities
describe("fen_to_entities", () => {
  it("Converts string int to spaces ", () => {
    const string = "rnbqkbn23";
    const expected = [
      "r",
      "n",
      "b",
      "q",
      "k",
      "b",
      "n",
      " ",
      " ",
      " ",
      " ",
      " "
    ];
    expect(fen_to_entities(string)).toEqual(expected);
  });
});

// num_list
describe("num_list", () => {
  it("Produces num list", () => {
    const expected = ["1", "2", "3", "4", "5", "6", "7", "8"];
    expect(num_list).toEqual(expected);
  });
});

// alpha_list
describe("alpha_list", () => {
  it("Produces alpha list", () => {
    const expected = ["a", "b", "c", "d", "e", "f", "g", "h"];
    expect(alpha_list).toEqual(expected);
  });
});

// pos_list
describe("pos_list", () => {
  it("Produces pos list", () => {
    const some_expected = ["a1", "b1", "c1", "d1", "a2", "b2", "b3"];
    expect(pos_list).toEqual(expect.arrayContaining(some_expected));
    expect(pos_list.length).toEqual(64);
  });
});

// map_entities
describe("map_entities", () => {
  it("Produces zipped object with pos list and fen entities", () => {
    const test_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    const some_expected = { a1: "r", b1: "n", c1: "b", d1: "q" };
    const result = map_entities(test_fen);
    expect(result).toEqual(expect.objectContaining(some_expected));
    expect(Object.keys(result).length).toEqual(64);
  });
});

// copy_old_to_new
describe("copy_old_to_new", () => {
  it("Copies old key value to new key value in object", () => {
    const obj = { a: 1, b: 2, c: null };
    const o = "a";
    const n = "c";
    const result = copy_old_to_new(o, n, obj);
    expect(result.c).toEqual(1);
    expect(result.a).toEqual(1);
  });
});

// set_empty_string
describe("set_empty_string", () => {
  it("Sets emtpy string for key in object", () => {
    const obj = { a: 1, b: 2, c: null };
    const o = "a";
    const result = set_empty_string(o)(obj);
    expect(result.a).toEqual(" ");
  });
});

// move_old_to_new
describe("move_old_to_new", () => {
  it("Moves old key value to new key value in object (sets old to empty string)", () => {
    const obj = { a: 1, b: 2, c: null };
    const o = "a";
    const n = "c";
    const result = move_old_to_new(o, n, obj);
    expect(result.c).toEqual(1);
    expect(result.a).toEqual(" ");
  });
});

// fen_map
describe("fen_map (main)", () => {
  it("(default) maps state to fen_map", () => {
    const some_expected = [
      {
        entity: "r",
        position: "a1",
        selected: false,
        selected_option: false,
        desired_move: false
      },
      {
        entity: "n",
        position: "b1",
        selected: false,
        selected_option: false,
        desired_move: false
      }
    ];
    const result = fen_map(default_state);
    expect(result).toEqual(expect.arrayContaining(some_expected));
    expect(result.length).toEqual(64);
  });
  it("(selected) maps state to fen_map", () => {
    const position = "a2";
    const options = ["a3", "a4"];
    const selected_state = {
      ...default_state,
      selected: position,
      selected_options: options
    };
    const some_expected = [
      {
        entity: "p",
        position: "a2",
        selected: true,
        selected_option: false,
        desired_move: false
      },
      {
        entity: " ",
        position: "a3",
        selected: false,
        selected_option: true,
        desired_move: false
      },
      {
        entity: " ",
        position: "a4",
        selected: false,
        selected_option: true,
        desired_move: false
      }
    ];
    const result = fen_map(selected_state);
    expect(result).toEqual(expect.arrayContaining(some_expected));
    expect(result.length).toEqual(64);
  });
  it("(selected) maps state to fen_map", () => {
    const position = "a2";
    const options = ["a3", "a4"];
    const desired_move = options[0];
    const selected_state = {
      ...default_state,
      selected: position,
      selected_options: options,
      desired_move
    };
    const some_expected = [
      {
        entity: " ",
        position: "a2",
        selected: true,
        selected_option: false,
        desired_move: false
      },
      {
        entity: "p",
        position: "a3",
        selected: false,
        selected_option: true,
        desired_move: true
      },
      {
        entity: " ",
        position: "a4",
        selected: false,
        selected_option: true,
        desired_move: false
      }
    ];
    const result = fen_map(selected_state);
    expect(result).toEqual(expect.arrayContaining(some_expected));
    expect(result.length).toEqual(64);
  });
});
