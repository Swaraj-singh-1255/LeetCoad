/**
 * @param {number} n
 * @param {number[][]} logs
 * @param {number} x
 * @param {number[]} queries
 * @return {number[]}
 */
var countServers = function(n, logs, x, queries) {
    // Sort logs by time
    logs.sort((a, b) => a[1] - b[1]);

    // Attach original indices to queries so we can restore the original order later
    const indexedQueries = queries.map((q, idx) => [q, idx]);
    indexedQueries.sort((a, b) => a[0] - b[0]);

    const ans = new Array(queries.length);
    const serverCounts = new Map();
    
    let left = 0;
    let right = 0;
    let activeServersCount = 0;

    for (let i = 0; i < indexedQueries.length; i++) {
        const [qTime, origIdx] = indexedQueries[i];
        const windowStart = qTime - x;
        const windowEnd = qTime;

        // Expand right pointer to include logs <= windowEnd
        while (right < logs.length && logs[right][1] <= windowEnd) {
            const serverId = logs[right][0];
            if (!serverCounts.has(serverId) || serverCounts.get(serverId) === 0) {
                activeServersCount++;
            }
            serverCounts.set(serverId, (serverCounts.get(serverId) || 0) + 1);
            right++;
        }

        // Shrink left pointer to exclude logs < windowStart
        while (left < right && logs[left][1] < windowStart) {
            const serverId = logs[left][0];
            serverCounts.set(serverId, serverCounts.get(serverId) - 1);
            if (serverCounts.get(serverId) === 0) {
                activeServersCount--;
            }
            left++;
        }

        // Total servers minus servers that got at least one request
        ans[origIdx] = n - activeServersCount;
    }

    return ans;
};