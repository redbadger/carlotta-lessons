const { fizzBuzz } = require("./index");

describe("fizzBuzz", () => {
  it("should return a function", () => {
    expect(fizzBuzz).toBeDefined();
  });
});
