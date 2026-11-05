/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @param {number} d
 * @return {number}
 */
var findTheDistanceValue = function(arr1, arr2, d) {
    // Sort arr2 to enable binary search
    arr2.sort((a, b) => a - b);
    let distanceValue = 0;

    for (let i = 0; i < arr1.length; i++) {
        let x = arr1[i];
        let left = 0;
        let right = arr2.length - 1;
        let isValid = true;

        // Binary search for the closest element in arr2 to x
        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            
            if (Math.abs(x - arr2[mid]) <= d) {
                isValid = false;
                break;
            }
            
            if (arr2[mid] < x) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        if (isValid) {
            distanceValue++;
        }
    }

    return distanceValue;
};