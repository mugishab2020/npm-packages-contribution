const { isValidRwandaNumber, normalizeRwandaNumber } = require("../lib/phone_verifier");

test("valid Rwandan numbers with active prefixes", () => {
  expect(isValidRwandaNumber("0788123456")).toBe(true);
  expect(isValidRwandaNumber("0798123456")).toBe(true);
  expect(isValidRwandaNumber("0728123456")).toBe(true);
  expect(isValidRwandaNumber("0738123456")).toBe(true);
  expect(isValidRwandaNumber("+250788123456")).toBe(true);
  expect(isValidRwandaNumber("250728123456")).toBe(true);
});

test("invalid numbers and prefixes", () => {
  expect(isValidRwandaNumber("0748123456")).toBe(false); // not active
  expect(isValidRwandaNumber("0711234567")).toBe(false); // invalid prefix
  expect(isValidRwandaNumber("123456")).toBe(false);
});

test("normalize numbers", () => {
  expect(normalizeRwandaNumber("0788123456")).toBe("+250788123456");
  expect(normalizeRwandaNumber("0798123456")).toBe("+250798123456");
  expect(normalizeRwandaNumber("0728123456")).toBe("+250728123456");
  expect(normalizeRwandaNumber("0738123456")).toBe("+250738123456");
  expect(normalizeRwandaNumber("250728123456")).toBe("+250728123456");
  expect(normalizeRwandaNumber("+250788123456")).toBe("+250788123456");
  expect(normalizeRwandaNumber("0748123456")).toBe(null); // invalid prefix
});
