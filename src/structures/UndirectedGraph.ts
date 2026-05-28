export class UndirectedGraph<T> {
  private readonly adjacency = new Map<T, Set<T>>()

  addVertex(vertex: T): void {
    if (!this.adjacency.has(vertex)) {
      this.adjacency.set(vertex, new Set<T>())
    }
  }

  addEdge(a: T, b: T): void {
    this.addVertex(a)
    this.addVertex(b)

    this.adjacency.get(a)?.add(b)
    this.adjacency.get(b)?.add(a)
  }

  neighbors(vertex: T): T[] {
    const neighbors = this.adjacency.get(vertex)
    return neighbors ? Array.from(neighbors) : []
  }
}