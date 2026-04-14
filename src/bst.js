class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);
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

  inorder(node = this.root, result = []) {
    if (node) {
      this.inorder(node.left, result);
      result.push(node.value);
      this.inorder(node.right, result);
    }
    return result;
  }

  preorder(node = this.root, result = []) {
    if (node) {
      result.push(node.value);
      this.preorder(node.left, result);
      this.preorder(node.right, result);
    }
    return result;
  }

  postorder(node = this.root, result = []) {
    if (node) {
      this.postorder(node.left, result);
      this.postorder(node.right, result);
      result.push(node.value);
    }
    return result;
  }

  search(value, node = this.root) {
    if (!node) return false;
    if (value === node.value) return true;
    if (value < node.value) return this.search(value, node.left);
    return this.search(value, node.right);
  }

  // Convierte el BST al formato que react-d3-tree necesita
  toD3Tree(node = this.root) {
    if (!node) return null;
    const d3Node = { name: String(node.value), children: [] };
    const left = this.toD3Tree(node.left);
    const right = this.toD3Tree(node.right);
    if (left) d3Node.children.push(left);
    if (right) d3Node.children.push(right);
    if (d3Node.children.length === 0) delete d3Node.children;
    return d3Node;
  }
}

export default BST;
