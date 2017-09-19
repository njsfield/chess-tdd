import { default_state } from "../../reducer.js";
import {
  first_word,
  no_slashes,
  split_chars,
  snum_to_spaces,
  snum_to_spaces_all,
  fen_to_entities,
  reverse_num_list,
  alpha_list,
  pos_list,
  map_entities,
  copy_old_to_new,
  set_empty_string,
  move_old_to_new,
  is_valid_position,
  map_state,
  update_fen,
  get_options
} from "../../lib/fen_tools";

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

// reverse_num_list
describe("reverse_num_list", () => {
  it("Produces reversed num list", () => {
    const expected = ["8", "7", "6", "5", "4", "3", "2", "1"];
    expect(reverse_num_list).toEqual(expected);
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
    const some_expected = ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"];
    expect(pos_list.slice(0, 8)).toEqual(some_expected);
    expect(pos_list.length).toEqual(64);
  });
});

// map_entities
describe("map_entities", () => {
  it("Produces zipped object with pos list and fen entities", () => {
    const test_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    const some_expected = { a8: "r", b8: "n", c8: "b", d8: "q" };
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

// map_state
describe("map_state (main)", () => {
  it("(default) maps state to map_state", () => {
    const some_expected = [
      {
        entity: "r",
        position: "a8",
        selected: false,
        selected_option: false,
        desired_move: false
      },
      {
        entity: "n",
        position: "b8",
        selected: false,
        selected_option: false,
        desired_move: false
      }
    ];
    const result = map_state(default_state);
    expect(result).toEqual(expect.arrayContaining(some_expected));
    expect(result.length).toEqual(64);
  });
  it("(selected) maps state to map_state", () => {
    const position = "a7";
    const options = ["a6", "a5"];
    const selected_state = {
      ...default_state,
      selected: position,
      selected_options: options
    };
    const some_expected = [
      {
        entity: "p",
        position: "a7",
        selected: true,
        selected_option: false,
        desired_move: false
      },
      {
        entity: " ",
        position: "a6",
        selected: false,
        selected_option: true,
        desired_move: false
      },
      {
        entity: " ",
        position: "a5",
        selected: false,
        selected_option: true,
        desired_move: false
      }
    ];
    const result = map_state(selected_state);
    expect(result).toEqual(expect.arrayContaining(some_expected));
    expect(result.length).toEqual(64);
  });
  it("(selected) maps state to map_state", () => {
    const position = "a7";
    const options = ["a6", "a5"];
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
        position: "a7",
        selected: true,
        selected_option: false,
        desired_move: false
      },
      {
        entity: "p",
        position: "a6",
        selected: false,
        selected_option: true,
        desired_move: true
      },
      {
        entity: " ",
        position: "a5",
        selected: false,
        selected_option: true,
        desired_move: false
      }
    ];
    const result = map_state(selected_state);
    expect(result).toEqual(expect.arrayContaining(some_expected));
    expect(result.length).toEqual(64);
  });
});

describe("is_valid_position", () => {
  it("validates valid positions", () => {
    const valid_positions = ["a1", "b4", "b6", "g4", "h2"];
    valid_positions.forEach(p => {
      expect(is_valid_position(p)).toBeTruthy();
    });
  });
  it("invalidates invalid positions", () => {
    const invalid_positions = ["k1", "v4", "gg", "14", " ", "", "3"];
    invalid_positions.forEach(p => {
      expect(is_valid_position(p)).toBeFalsy();
    });
  });
});

describe("update_fen", () => {
  it("creates new fen", () => {
    const fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    const selected = "a2";
    const desired = "a3";
    const expected =
      "rnbqkbnr/pppppppp/8/8/8/P7/1PPPPPPP/RNBQKBNR b KQkq - 0 1";
    expect(update_fen(selected, desired, fen)).toBe(expected);
  });
});

describe("get_options", () => {
  it("creates new fen", () => {
    const fen = "rnbqkbnr/pppp1ppp/8/4p3/4PP2/8/PPPP2PP/RNBQKBNR b KQkq f3 0 2";
    const selected = "e5";
    const expected = ["f4"];
    expect(get_options(selected, fen)).toEqual(expected);
  });
});
