/**
 * @param {number[]} servers
 * @param {number[]} tasks
 * @return {number[]}
 */
var assignTasks = function(servers, tasks) {
    const n = servers.length;
    const m = tasks.length;
    const ans = new Array(m);

    // MinHeap implementation for priority queues
    class MinHeap {
        constructor(comparator) {
            this.heap = [];
            this.comparator = comparator;
        }

        size() {
            return this.heap.length;
        }

        isEmpty() {
            return this.heap.length === 0;
        }

        peek() {
            return this.heap[0];
        }

        push(val) {
            this.heap.push(val);
            this._up(this.heap.length - 1);
        }

        pop() {
            if (this.isEmpty()) return null;
            const top = this.heap[0];
            const bottom = this.heap.pop();
            if (this.heap.length > 0) {
                this.heap[0] = bottom;
                this._down(0);
            }
            return top;
        }

        _up(i) {
            let parent = Math.floor((i - 1) / 2);
            while (i > 0 && this.comparator(this.heap[i], this.heap[parent]) < 0) {
                [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
                i = parent;
                parent = Math.floor((i - 1) / 2);
            }
        }

        _down(i) {
            let left = 2 * i + 1;
            let right = 2 * i + 2;
            let smallest = i;

            if (left < this.heap.length && this.comparator(this.heap[left], this.heap[smallest]) < 0) {
                smallest = left;
            }
            if (right < this.heap.length && this.comparator(this.heap[right], this.heap[smallest]) < 0) {
                smallest = right;
            }
            if (smallest !== i) {
                [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
                this._down(smallest);
            }
        }
    }

   
    const freeServers = new MinHeap((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        return a[1] - b[1];
    });

    for (let i = 0; i < n; i++) {
        freeServers.push([servers[i], i]);
    }

    const busyServers = new MinHeap((a, b) => {
        if (a[0] !== b[0]) return a[0] - b[0];
        if (a[1] !== b[1]) return a[1] - b[1];
        return a[2] - b[2];
    });

    let currentTime = 0;

    for (let j = 0; j < m; j++) {
        currentTime = Math.max(currentTime, j);

    
        if (freeServers.isEmpty()) {
            currentTime = busyServers.peek()[0];
        }

       
        while (!busyServers.isEmpty() && busyServers.peek()[0] <= currentTime) {
            const [freeTime, weight, index] = busyServers.pop();
            freeServers.push([weight, index]);
        }
        const [weight, index] = freeServers.pop();
        ans[j] = index;
        
        busyServers.push([currentTime + tasks[j], weight, index]);
    }

    return ans;
};