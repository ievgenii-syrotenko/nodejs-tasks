/**
 * Check parenthesis matching
 *
 * @param {string} str — input string
 * @return {boolean} is correct parenthesis matching
 */
const checkParentheses = (str) => {
  let result = true;
  const stack = [];
  const bracketsMap = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  const openBrackets = Object.keys(bracketsMap);
  const closeBrackets = Object.values(bracketsMap);

  for (const char of str) {
    if (openBrackets.includes(char)) {
      stack.push(bracketsMap[char]);
    } else if (closeBrackets.includes(char)) {
      // fails when:
      // 1. empty stack (closed bracket starts before open bracket)
      // 2. invalid brackets pair, for example [}, {[)}
      if (stack.length === 0 || stack.pop() !== char) {
        result = false;
        break;
      }
    }
  }

  return stack.length === 0 ? result : false;
};

console.log("1:", checkParentheses("--()--")); // true
console.log("2:", checkParentheses("-a]--[")); // false
console.log("3:", checkParentheses("dsa{vsfs{ad")); // false
console.log("4:", checkParentheses("j78(g5b]uyg")); // false
console.log("5:", checkParentheses(",m{i987y}hj")); // true
console.log("6:", checkParentheses("dsa[3ed---:]::")); // true
// or even more complex examples with deep parenthesis checking:
console.log("7:", checkParentheses("sdaasd[xzczcx{xxx}]")); // true
console.log("8:", checkParentheses("sd,.sd(tr[xxx}i7)")); // false
