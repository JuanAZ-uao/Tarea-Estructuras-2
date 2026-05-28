class TrieNode {
  children = new Map<string, TrieNode>()
  isTerminal = false
  words = new Set<string>()
}

const normalize = (value: string) => value.trim().toLowerCase()

export class Trie {
  private readonly root = new TrieNode()

  insert(word: string): void {
    const cleanWord = word.trim()
    const normalized = normalize(cleanWord)

    if (!normalized) {
      return
    }

    let current = this.root
    for (const char of normalized) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode())
      }
      current = current.children.get(char) as TrieNode
    }

    current.isTerminal = true
    current.words.add(cleanWord)
  }

  contains(word: string): boolean {
    const node = this.findNode(normalize(word))
    return Boolean(node?.isTerminal)
  }

  suggest(prefix: string, limit = 6): string[] {
    const normalizedPrefix = normalize(prefix)
    const start = this.findNode(normalizedPrefix)

    if (!start) {
      return []
    }

    const found: string[] = []
    this.depthFirstCollect(start, found, limit)
    return found
  }

  private findNode(fragment: string): TrieNode | null {
    let current = this.root

    for (const char of fragment) {
      const next = current.children.get(char)
      if (!next) {
        return null
      }
      current = next
    }

    return current
  }

  private depthFirstCollect(node: TrieNode, found: string[], limit: number): void {
    if (found.length >= limit) {
      return
    }

    if (node.isTerminal) {
      for (const word of node.words) {
        if (!found.includes(word)) {
          found.push(word)
        }
        if (found.length >= limit) {
          return
        }
      }
    }

    const orderedChildren = Array.from(node.children.entries()).sort((a, b) =>
      a[0].localeCompare(b[0]),
    )

    for (const [, child] of orderedChildren) {
      this.depthFirstCollect(child, found, limit)
      if (found.length >= limit) {
        return
      }
    }
  }
}