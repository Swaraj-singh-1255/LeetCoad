/**
 * @param {number[]} prices
 * @return {number[]}
 */
var finalPrices = function(prices) {
    const res = [...prices];
    const stack = []; // Monotonic non-decreasing stack storing indices

    for (let i = 0; i < prices.length; i++) {
        // Pop elements from the stack if current price is <= top of the stack
        while (stack.length > 0 && prices[stack[stack.length - 1]] >= prices[i]) {
            const idx = stack.pop();
            res[idx] -= prices[i];
        }
        stack.push(i);
    }

    return res;
};