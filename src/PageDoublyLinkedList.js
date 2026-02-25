
class PageNode {
  constructor(page, prev = null, next = null) {
    this.page = page;
    this.prev = prev;
    this.next = next;
  }
}

class PageDoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.current = null;
  }

  add(page) {
    const newNode = new PageNode(page);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      this.current = this.head;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  reset() {
    this.current = this.head;
  }

  next() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
      return this.current.page;
    }
    return null;
  }

  prev() {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
      return this.current.page;
    }
    return null;
  }

  getCurrentPage() {
    return this.current ? this.current.page : null;
  }
}

export { PageDoublyLinkedList };