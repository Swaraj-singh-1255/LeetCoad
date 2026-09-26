/**
 * @param {number[]} nums
 * @return {number[]}
 */
var smallerNumbersThanCurrent = function(nums) {
    const count = new Array(101).fill(0);
    
    // Step 1: Count frequency of each number
    for (let num of nums) {
        count[num]++;
    }
    
    // Step 2: Calculate prefix sums (count of numbers smaller than index i)
    let runningSum = 0;
    for (let i = 0; i < 101; i++) {
        let temp = count[i];
        count[i] = runningSum;
        runningSum += temp;
    }
    
    // Step 3: Build the result array
    return nums.map(num => count[num]);
};