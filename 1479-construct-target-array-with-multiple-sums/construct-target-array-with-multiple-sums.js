class TargetMaxHeap {
  constructor() { this.h = []; }
  push(v) {
    const h = this.h;
    h.push(v);
    let i = h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (h[p] >= h[i]) break;
      [h[p], h[i]] = [h[i], h[p]];
      i = p;
    }
  }
  pop() {
    const h = this.h;
    const top = h[0];
    const last = h.pop();
    if (h.length) {
      h[0] = last;
      let i = 0;
      const n = h.length;
      while (true) {
        let l = 2 * i + 1, r = l + 1, m = i;
        if (l < n && h[l] > h[m]) m = l;
        if (r < n && h[r] > h[m]) m = r;
        if (m === i) break;
        [h[m], h[i]] = [h[i], h[m]];
        i = m;
      }
    }
    return top;
  }
}

var isPossible = function (target) {
  const heap = new TargetMaxHeap();
  let sum = 0;
  for (const x of target) {
    heap.push(x);
    sum += x;
  }

  while (true) {
    const m = heap.pop();
    if (m === 1) return true;

    const rest = sum - m;
    if (rest === 0 || rest >= m) return false;

    const prev = m % rest;
    if (prev === 0) return rest === 1;

    sum = rest + prev;
    heap.push(prev);
  }
};