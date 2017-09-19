import is_valid_position from "../../lib/is_valid_position";

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
