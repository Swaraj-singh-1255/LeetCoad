/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function (arr, n) {
    if (n === 0) return arr;

    const res = [];

    const helper = (subArr, depth) => {
        for (const item of subArr) {
            if (Array.isArray(item) && depth < n) {
                helper(item, depth + 1);
            } else {
                res.push(item);
            }
        }
    };

    helper(arr, 0);
    return res;
};