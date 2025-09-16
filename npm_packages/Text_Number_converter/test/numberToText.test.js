const { numberToText } = require("../lib/numberToText");

test("converts simple numbers", () => {
  expect(numberToText(5)).toBe("five");
  expect(numberToText(15)).toBe("fifteen");
});

test("converts tens and hundreds", () => {
  expect(numberToText(42)).toBe("forty two");
  expect(numberToText(300)).toBe("three hundred");
});

test("converts thousands", () => {
  expect(numberToText(4000)).toBe("four thousand");
  expect(numberToText(1234)).toBe("one thousand two hundred thirty four");
});
