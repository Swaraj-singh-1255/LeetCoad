/**
 * @param {number} n
 * @param {string[]} logs
 * @return {number[]}
 */
var exclusiveTime = function(n, logs) {
    const result = new Array(n).fill(0);
    const stack = []; // Stores function IDs currently executing
    let prevTime = 0;

    for (const log of logs) {
        const [idStr, type, timeStr] = log.split(':');
        const id = parseInt(idStr, 10);
        const time = parseInt(timeStr, 10);

        if (type === 'start') {
            // If another function was executing, add its elapsed time before pushing the new function
            if (stack.length > 0) {
                result[stack[stack.length - 1]] += time - prevTime;
            }
            stack.push(id);
            prevTime = time;
        } else {
            // Function end: duration includes the end unit of time (time - prevTime + 1)
            result[stack.pop()] += time - prevTime + 1;
            prevTime = time + 1; // Next event starts after this timestamp finishes
        }
    }

    return result;
};