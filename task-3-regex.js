/**
 * Check parenthesis matching via regex expressions
 * This implementation doesn't include deep matching cases
 *
 * @param {string} str — input string
 * @return {boolean} is correct parenthesis matching
 */
const checkParentheses = (str) => {
  let result = false;

  const regexCheckList = [
    /\[([^)}])*\]/, // []
    /\(([^\]}])*\)/, // ()
    /\{([^\])])*\}/, // {}
  ];

  for (const regex of regexCheckList) {
    if (str.match(regex)) {
      result = true;
      break;
    }
  }

  return result;
};

console.log("1:", checkParentheses("--()--")); // true
console.log("2:", checkParentheses("-a]--[")); // false
console.log("3:", checkParentheses("dsa{vsfs{ad")); // false
console.log("4:", checkParentheses("j78(g5b]uyg")); // false
console.log("5:", checkParentheses(",m{i987y}hj")); // true
console.log("6:", checkParentheses("dsa[3ed---:]::")); // true
