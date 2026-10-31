/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePaths = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    const MOD = 1000000007;

    function simulateMove(r, c, d) {
        let currD = d;
        let nr = r + (currD === 1 ? 1 : 0);
        let nc = c + (currD === 0 ? 1 : 0);

        while (true) {
            if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
                return null; // Out of bounds
            }

            if (grid[nr][nc] === 1) {
                // Mirror reflection
                if (currD === 0) {
                    // Moving right into mirror -> reflected down, lands at (nr + 1, nc), facing down
                    nr = nr + 1;
                    currD = 1;
                } else {
                    // Moving down into mirror -> reflected right, lands at (nr, nc + 1), facing right
                    nc = nc + 1;
                    currD = 0;
                }

                if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
                    return null;
                }

                // If the landing cell is also a mirror, immediately reflect again
                if (grid[nr][nc] === 1) {
                    continue;
                } else {
                    return [nr, nc];
                }
            } else {
                return [nr, nc];
            }
        }
    }

    const dp = Array.from({ length: m }, () => Array(n).fill(0));
    dp[0][0] = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (dp[i][j] === 0) continue;
            if (i === m - 1 && j === n - 1) continue;

            // Try moving right (d = 0) and down (d = 1)
            for (let d = 0; d < 2; d++) {
                let nextPos = simulateMove(i, j, d);
                if (nextPos !== null) {
                    let [ni, nj] = nextPos;
                    dp[ni][nj] = (dp[ni][nj] + dp[i][j]) % MOD;
                }
            }
        }
    }

    return dp[m - 1][n - 1];
};