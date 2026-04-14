import type { FC } from "react";

export interface MenuNode {
  title: string;
  link: string;
  component: FC;
  children: MenuNode[];
}

export class NaryTree {
  root: MenuNode[];

  constructor() {
    this.root = [];
  }

  addNode(parent: MenuNode | null, node: MenuNode): void {
    if (parent === null) {
      this.root.push(node);
    } else {
      parent.children.push(node);
    }
  }

  findNode(title: string, nodes: MenuNode[] = this.root): MenuNode | null {
    for (const node of nodes) {
      if (node.title === title) return node;
      const found = this.findNode(title, node.children);
      if (found) return found;
    }
    return null;
  }
}
