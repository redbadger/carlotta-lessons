const { fizzBuzz } = require("./index");

describe("fizzBuzz", () => {
  it("should return a function", () => {
    expect(fizzBuzz).toBeDefined();
  });

  it("should return 1 if I parse 1", () => {
    expect(fizzBuzz(1)).toBe(1);
  });

  it("should return 2 if I parse 2", () => {
    expect(fizzBuzz(2)).toBe(2);
  });

  it("should return fizz if I parse 3", () => {
    expect(fizzBuzz(3)).toBe("fizz");
  });

  it("should return 4 if I pass 4", () => {
    expect(fizzBuzz(4)).toBe(4);
  });

  it("should return buzz if I pass 5", () => {
    expect(fizzBuzz(5)).toBe("buzz");
  });
  
  it("should return fizz if I pass 6", () => {
    expect(fizzBuzz(6)).toBe("fizz");
  });
  
  it("should return 7 if I pass 7", () => {
    expect(fizzBuzz(7)).toBe(7);
  });
});
