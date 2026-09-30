/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
    const stack = [];

    for (const token of tokens) {
        if (token === '+') {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(a + b);
        } else if (token === '-') {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(a - b);
        } else if (token === '*') {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(a * b);
        } else if (token === '/') {
            const b = stack.pop();
            const a = stack.pop();
            // Math.trunc handles truncation towards zero for negative numbers as well
            stack.push(Math.trunc(a / b));
        } else {
            stack.push(Number(token));
        }
    }

    return stack.pop();
};