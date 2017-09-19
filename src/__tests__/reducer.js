import { select } from "../actions";
import reducer, { default_state } from "../reducer.js";
import Chess from "../lib/chess.js";

describe("Fresh state", () => {
  it("Sets new fen", () => {
    const result = reducer(default_state, {
      type: "%NO_OP%",
      payload: null
    });
    expect(result.fen).toBe(new Chess().fen());
    expect(result.selected).toBeFalsy();
    expect(result.desired_move).toBeFalsy();
    expect(result.selected_options).toEqual([]);
  });
});

describe("Invalid action payload", () => {
  it("Returns default state if action contains invalid position", () => {
    const result = reducer(default_state, select("INVALID"));
    expect(result).toEqual(default_state);
  });
});

describe("[SELECT] a position neither desired or in options", () => {
  it("Sets selected position", () => {
    const position = "a2";
    const options = ["a4", "a3"];
    const result = reducer(default_state, select(position));
    expect(result.fen).toBe(new Chess().fen());
    expect(result.selected).toBe(position);
    expect(result.desired_move).toBeFalsy();
    expect(result.selected_options).toEqual(options);
  });
});

describe("[DESIRED] Select a position in options", () => {
  it("Sets desired move", () => {
    const position = "a2";
    const options = ["a3", "a4"];
    const desired_move = options[0];
    const selected_state = {
      ...default_state,
      selected: position,
      selected_options: options
    };
    const result = reducer(selected_state, select(desired_move));
    expect(result.fen).toBe(new Chess().fen());
    expect(result.selected).toBe(position);
    expect(result.desired_move).toBe(desired_move);
    expect(result.selected_options).toEqual(options);
  });
  it("Sets selected position (if position not in options)", () => {
    const position = "a2";
    const options = ["a3", "a4"];
    const desired_move = "a5";
    const selected_state = {
      ...default_state,
      selected: position,
      selected_options: options
    };
    const result = reducer(selected_state, select(desired_move));
    expect(result.fen).toBe(new Chess().fen());
    expect(result.selected).toBe(desired_move);
    expect(result.desired_move).toBeFalsy();
    expect(result.selected_options).toEqual([]);
  });
});
describe("[CONFIRM] Select a position in desired & options", () => {
  it("Sets new fen state after confirm", () => {
    const position = "a2";
    const options = ["a3", "a4"];
    const desired_move = options[0];
    const desired_state = {
      ...default_state,
      selected: position,
      desired_move,
      selected_options: options
    };
    const expected_fen =
      "rnbqkbnr/pppppppp/8/8/8/P7/1PPPPPPP/RNBQKBNR b KQkq - 0 1";
    const result = reducer(desired_state, select(desired_move));
    expect(result.fen).not.toBe(new Chess().fen());
    expect(result.fen).toBe(expected_fen);
    expect(result.selected).toBeFalsy();
    expect(result.desired_move).toBeFalsy();
    expect(result.selected_options).toEqual([]);
  });
  it("Sets selected position (if position not in options)", () => {
    const position = "a2";
    const options = ["a3", "a4"];
    const desired_move = options[0];
    const attempted_confirm = "a5";
    const selected_state = {
      ...default_state,
      selected: position,
      desired_move,
      selected_options: options
    };

    const result = reducer(selected_state, select(attempted_confirm));
    expect(result.fen).toBe(new Chess().fen());
    expect(result.selected).toBe(attempted_confirm);
    expect(result.desired_move).toBeFalsy();
    expect(result.selected_options).toEqual([]);
  });
});
