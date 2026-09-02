/**
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
var compactObject = function(obj) {
    // Base case: primitives and null
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // Handle Array case
    if (Array.isArray(obj)) {
        const compactedArr = [];
        for (const item of obj) {
            const val = compactObject(item);
            if (Boolean(val)) {
                compactedArr.push(val);
            }
        }
        return compactedArr;
    }

    // Handle Object case
    const compactedObj = {};
    for (const key in obj) {
        const val = compactObject(obj[key]);
        if (Boolean(val)) {
            compactedObj[key] = val;
        }
    }
    return compactedObj;
};