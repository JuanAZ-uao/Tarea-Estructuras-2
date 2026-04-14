export class BSTNode {
  value: number;
  left: BSTNode | null = null;
  right: BSTNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

export default class BST {
  root: BSTNode | null = null;

  insert(value: number): void {
    const newNode = new BSTNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  inorder(node: BSTNode | null = this.root, result: number[] = []): number[] {
    if (node) {
      this.inorder(node.left, result);
      result.push(node.value);
      this.inorder(node.right, result);
    }
    return result;
  }

  preorder(node: BSTNode | null = this.root, result: number[] = []): number[] {
    if (node) {
      result.push(node.value);
      this.preorder(node.left, result);
      this.preorder(node.right, result);
    }
    return result;
  }

  postorder(node: BSTNode | null = this.root, result: number[] = []): number[] {
    if (node) {
      this.postorder(node.left, result);
      this.postorder(node.right, result);
      result.push(node.value);
    }
    return result;
  }

  search(value: number): boolean {
    let current = this.root;
    while (current) {
      if (value === current.value) return true;
      current = value < current.value ? current.left : current.right;
    }
    return false;
  }

  // Converts BST to react-d3-tree format
  toD3Tree(node: BSTNode | null = this.root): RawNodeDatum | undefined {
    if (!node) return undefined;
    const datum: RawNodeDatum = { name: String(node.value), children: [] };
    const left = this.toD3Tree(node.left);
    const right = this.toD3Tree(node.right);
    if (left) datum.children!.push(left);
    if (right) datum.children!.push(right);
    if (datum.children!.length === 0) delete datum.children;
    return datum;
  }
}

export interface RawNodeDatum {
  name: string;
  attributes?: Record<string, string | number>;
  children?: RawNodeDatum[];
}
