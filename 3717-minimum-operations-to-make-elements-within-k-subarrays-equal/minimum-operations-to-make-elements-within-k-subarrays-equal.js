var minOperations = function(nums, x, k) {
    const n = nums.length;

    // coordinate compression
    const vals = Array.from(new Set(nums)).sort((a, b) => a - b);
    const m = vals.length;
    const idxMap = new Map();
    vals.forEach((v, i) => idxMap.set(v, i + 1));

    const cnt = new Float64Array(m + 1);
    const sum = new Float64Array(m + 1);

    const update = (p, dc, ds) => {
        for (; p <= m; p += p & -p) { cnt[p] += dc; sum[p] += ds; }
    };
    let LOG = 1;
    while ((1 << LOG) <= m) LOG++;

    // find position of the t-th smallest element (1-indexed)
    const kth = (t) => {
        let pos = 0;
        for (let b = LOG; b >= 0; b--) {
            const np = pos + (1 << b);
            if (np <= m && cnt[np] < t) {
                pos = np;
                t -= cnt[np];
            }
        }
        return pos + 1;
    };
    const prefix = (p) => {
        let c = 0, s = 0;
        for (; p > 0; p -= p & -p) { c += cnt[p]; s += sum[p]; }
        return [c, s];
    };

    const m2 = n - x + 1;
    const windowCosts = new Array(m2);
    let total = 0;
    const medRank = Math.floor((x - 1) / 2) + 1;

    for (let i = 0; i < x; i++) { update(idxMap.get(nums[i]), 1, nums[i]); total += nums[i]; }

    for (let i = 0; i < m2; i++) {
        if (i > 0) {
            const out = nums[i - 1], inn = nums[i + x - 1];
            update(idxMap.get(out), -1, -out);
            update(idxMap.get(inn), 1, inn);
            total += inn - out;
        }
        const pos = kth(medRank);
        const med = vals[pos - 1];
        const [cLE, sLE] = prefix(pos);
        windowCosts[i] = med * cLE - sLE + (total - sLE) - med * (x - cLE);
    }

    // DP: dp[j][i] = min cost using j windows among the first i window starts
    let prev = new Array(m2 + 1).fill(0); // j = 0
    for (let j = 1; j <= k; j++) {
        const cur = new Array(m2 + 1).fill(Infinity);
        for (let i = 1; i <= m2; i++) {
            const take = i - x >= 0 ? prev[i - x] : (j === 1 ? 0 : Infinity);
            cur[i] = Math.min(cur[i - 1], take + windowCosts[i - 1]);
        }
        prev = cur;
    }
    return prev[m2];
};