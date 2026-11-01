/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function(nums) {
    let min = Math.min(...nums);
    let sum = 0;
    let n = nums.length;
    
    for (let i = 0; i < n; i++) {
        sum += nums[i];
    }
    
    return sum - (n * min);
};