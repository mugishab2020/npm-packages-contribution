function isValidRwandaNumber(number) {
  if (typeof number !== "string") return false;

  // Remove spaces, dashes, or parentheses for the phone number clean up
  const cleaned = number.replace(/[\s()-]/g, "");

  // Regex for Rwanda numbers: +25078XXXXXXX, 25073XXXXXXX, 07XXXXXXXX, +25072XXXXXXX
   const regex = /^(?:\+?2507(2|3|8|9)\d{7}|07(2|3|8|9)\d{7})$/;

  return regex.test(cleaned);
}

function normalizeRwandaNumber(number) {
  if (!isValidRwandaNumber(number)) return null;

  let cleaned = number.replace(/[\s()-]/g, "");

  if (cleaned.startsWith("07")) {
    cleaned = "+250" + cleaned.slice(1);
  } else if (cleaned.startsWith("2507")) {
    cleaned = "+" + cleaned;
  }

  return cleaned;
}

module.exports = { isValidRwandaNumber, normalizeRwandaNumber };
