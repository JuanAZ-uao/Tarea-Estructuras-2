type Comparator<T> = (a: T, b: T) => number

export class MaxHeap<T> {
  private readonly values: T[] = []
  private readonly compare: Comparator<T>

  constructor(compare: Comparator<T>) {
    this.compare = compare
  }

  size(): number {
    return this.values.length
  }

  insert(value: T): void {
    this.values.push(value)
    this.heapifyUp(this.values.length - 1)
  }

  extractMax(): T | undefined {
    if (!this.values.length) {
      return undefined
    }

    const max = this.values[0]
    const last = this.values.pop()

    if (this.values.length && last !== undefined) {
      this.values[0] = last
      this.heapifyDown(0)
    }

    return max
  }

  toSortedArray(): T[] {
    const clone = new MaxHeap<T>(this.compare)
    for (const value of this.values) {
      clone.insert(value)
    }

    const sorted: T[] = []
    while (clone.size()) {
      const extracted = clone.extractMax()
      if (extracted !== undefined) {
        sorted.push(extracted)
      }
    }

    return sorted
  }

  private heapifyUp(startIndex: number): void {
    let index = startIndex

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2)
      if (this.compare(this.values[index], this.values[parentIndex]) <= 0) {
        break
      }

      this.swap(index, parentIndex)
      index = parentIndex
    }
  }

  private heapifyDown(startIndex: number): void {
    let index = startIndex

    while (true) {
      const left = index * 2 + 1
      const right = index * 2 + 2
      let largest = index

      if (left < this.values.length && this.compare(this.values[left], this.values[largest]) > 0) {
        largest = left
      }

      if (
        right < this.values.length &&
        this.compare(this.values[right], this.values[largest]) > 0
      ) {
        largest = right
      }

      if (largest === index) {
        return
      }

      this.swap(index, largest)
      index = largest
    }
  }

  private swap(a: number, b: number): void {
    ;[this.values[a], this.values[b]] = [this.values[b], this.values[a]]
  }
}