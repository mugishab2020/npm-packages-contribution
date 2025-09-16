const { textToNumber } = require("../lib/textToNumber");

test("converts simple words", () => {
  expect(textToNumber("five")).toBe(5);
  expect(textToNumber("fifteen")).toBe(15);
});

test("converts tens and hundreds", () => {
  expect(textToNumber("forty two")).toBe(42);
  expect(textToNumber("three hundred")).toBe(300);
});

test("converts thousands", () => {
  expect(textToNumber("four thousand")).toBe(4000);
  expect(textToNumber("one thousand two hundred thirty four")).toBe(1234);
});
