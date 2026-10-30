/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {string} labels
 * @param {number} k
 * @return {number}
 */
var shortestPath = function(n, edges, labels, k) {
    // Build adjacency list: u -> list of [v, w]
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v, w] of edges) {
        adj[u].push([v, w]);
    }

    // Min-priority queue storing [weight, u, count]
    // Using a simple array-based min-heap or min priority queue implementation:
    // For standard JS environment, we can implement a basic min-heap or use sorting (though min-heap is optimal).
    class MinPriorityQueue {
        constructor() {
            this.heap = [];
        }
        enqueue(element) {
            this.heap.push(element);
            this.up(this.heap.length - 1);
        }
        dequeue() {
            if (this.heap.length === 1) return this.heap.pop();
            const top = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.down(0);
            return top;
        }
        isEmpty() {
            this.heap.sort((a, b) => a[0] - b[0]); // Simple fallback sort for demonstration
            return this.heap.length === 0;
        }
        up(i) {
            while (i > 0) {
                let p = Math.floor((i - 1) / 2);
                if (this.heap[i][0] < this.heap[p][0]) {
                    [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
                    i = p;
                } else break;
            }
        }
        down(i) {
            let last = this.heap.length - 1;
            while (2 * i + 1 <= last) {
                let left = 2 * i + 1, right = 2 * i + 2, smallest = i;
                if (this.heap[left][0] < this.heap[smallest][0]) smallest = left;
                if (right <= last && this.heap[right][0] < this.heap[smallest][0]) smallest = right;
                if (smallest !== i) {
                    [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
                    i = smallest;
                } else break;
            }
        }
    }

    // Since k is small (<= 50) and n <= 50,000, we can use a Map or nested structure for distances
    // dist[u][count] = minimum weight to reach node u with consecutive count
    const dist = new Map();
    const getKey = (u, count) => u * 51 + count;

    const pq = new MinPriorityQueue();
    
    // Initial state: start at node 0 with count 1 and weight 0
    pq.enqueue([0, 0, 1]);
    dist.set(getKey(0, 1), 0);

    while (!pq.heap.length === false) {
        // Sort-based fallback for standard JS array queue if min-heap helper isn't fully built out:
        pq.heap.sort((a, b) => a[0] - b[0]);
        const [d, u, count] = pq.dequeue();

        if (u === n - 1) return d;

        if (d > (dist.get(getKey(u, count)) ?? Infinity)) continue;

        for (const [v, w] of adj[u]) {
            let nextCount = (labels[u] === labels[v]) ? count + 1 : 1;
            
            if (nextCount > k) continue;

            const nextWeight = d + w;
            const key = getKey(v, nextCount);

            if (nextWeight < (dist.get(key) ?? Infinity)) {
                dist.set(key, nextWeight);
                pq.enqueue([nextWeight, v, nextCount]);
            }
        }
    }

    return -1;
};