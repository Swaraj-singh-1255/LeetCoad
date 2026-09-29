/**
 * @param {number[]} target
 * @param {number} n
 * @return {string[]}
 */
var buildArray = function(target, n) {
    const result = [];
    let current = 1;

    for (const num of target) {
        // While the current stream number is less than the required target number,
        // we push and pop to discard numbers not in target
        while (current < num) {
            result.push("Push");
            result.push("Pop");
            current++;
        }
        
        // Push the matching target number into the stack
        result.push("Push");
        current++;
    }

    return result;
};