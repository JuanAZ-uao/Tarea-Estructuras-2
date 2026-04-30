import type { Product } from "./Trie";

/**
 * Min-Heap of Products ordered by popularity.
 * Used to efficiently extract the Top K most popular products.
 */
export class MinHeap {
  private heap: Product[] = [];

  private parent(i: number) {
    return Math.floor((i - 1) / 2);
  }
  private left(i: number) {
    return 2 * i + 1;
  }
  private right(i: number) {
    return 2 * i + 2;
  }

  private swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  get size() {
    return this.heap.length;
  }

  peek(): Product | undefined {
    return this.heap[0];
  }

  push(product: Product) {
    this.heap.push(product);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): Product | undefined {
    if (this.heap.length === 0) return undefined;
    const top = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.siftDown(0);
    }
    return top;
  }

  private bubbleUp(i: number) {
    while (i > 0 && this.heap[this.parent(i)].popularity > this.heap[i].popularity) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  private siftDown(i: number) {
    let smallest = i;
    const l = this.left(i);
    const r = this.right(i);

    if (l < this.heap.length && this.heap[l].popularity < this.heap[smallest].popularity) {
      smallest = l;
    }
    if (r < this.heap.length && this.heap[r].popularity < this.heap[smallest].popularity) {
      smallest = r;
    }
    if (smallest !== i) {
      this.swap(i, smallest);
      this.siftDown(smallest);
    }
  }
}

/**
 * Returns the Top K products by popularity from `candidates`
 * using a size-K min-heap — O(n log k).
 */
export function topK(candidates: Product[], k: number): Product[] {
  const heap = new MinHeap();

  for (const product of candidates) {
    heap.push(product);
    if (heap.size > k) heap.pop(); // evict the least popular
  }

  // Extract results sorted descending by popularity
  const result: Product[] = [];
  while (heap.size > 0) {
    result.unshift(heap.pop()!);
  }
  return result;
}
