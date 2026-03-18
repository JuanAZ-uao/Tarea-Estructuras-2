import type { Book } from "../types/Book";

export class BookStack {
  private items: Book[];

  constructor() {
    this.items = [];
  }

  push(book: Book): void {
    this.items.push(book);
  }

  pop(): Book | undefined {
    return this.items.pop();
  }

  peek(): Book | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  toArray(): Book[] {
    return [...this.items].reverse();
  }
}
