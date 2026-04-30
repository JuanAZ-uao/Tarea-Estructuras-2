export interface Product {
  name: string;
  popularity: number;
}

class TrieNode {
  children: Map<string, TrieNode> = new Map();
  products: Product[] = [];
}

export class Trie {
  private root: TrieNode = new TrieNode();

  insert(product: Product): void {
    let node = this.root;
    const key = product.name.toLowerCase();

    for (const char of key) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
      node.products.push(product);
    }
  }

  /** Returns all products whose name starts with `prefix` (case-insensitive). */
  search(prefix: string): Product[] {
    let node = this.root;
    const key = prefix.toLowerCase();

    for (const char of key) {
      if (!node.children.has(char)) return [];
      node = node.children.get(char)!;
    }

    return node.products;
  }
}
