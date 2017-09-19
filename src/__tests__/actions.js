import { select } from "../actions";
import { SELECT } from "../constants";

describe("select", () => {
  it("Returns action object with type & position", () => {
    const input = "f4";
    const received = select(input);
    expect(received.type).toEqual(SELECT);
    expect(received.position).toEqual(input);
  });
});
