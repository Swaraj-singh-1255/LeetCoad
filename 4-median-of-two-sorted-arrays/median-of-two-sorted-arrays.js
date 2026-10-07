/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    // Ensure nums1 is the smaller array to minimize the binary search range
    if (nums1.length > nums2.length) {
        return findMedianSortedArrays(nums2, nums1);
    }

    const m = nums1.length;
    const n = nums2.length;
    const totalHalf = Math.floor((m + n + 1) / 2);

    let low = 0;
    let high = m;

    while (low <= high) {
        const i = Math.floor((low + high) / 2); 
        const j = totalHalf - i;                

        
        const maxLeft1 = i === 0 ? -Infinity : nums1[i - 1];
        const minRight1 = i === m ? Infinity : nums1[i];

        
        const maxLeft2 = j === 0 ? -Infinity : nums2[j - 1];
        const minRight2 = j === n ? Infinity : nums2[j];

        
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            
            if ((m + n) % 2 === 1) {
                return Math.max(maxLeft1, maxLeft2);
            }
            
            return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
        } 
        else if (maxLeft1 > minRight2) {
            high = i - 1;
        } 
        
        else {
            low = i + 1;
        }
    }

    return 0.0;
};