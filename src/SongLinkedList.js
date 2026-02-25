
class SongNode {
  constructor(song, next = null) {
    this.song = song;
    this.next = next;
  }
}

class SongLinkedList {
  constructor() {
    this.head = null;
    this.current = null;
  }

  add(song) {
    const newNode = new SongNode(song);
    if (!this.head) {
      this.head = newNode;
      this.current = this.head;
    } else {
      let node = this.head;
      while (node.next) {
        node = node.next;
      }
      node.next = newNode;
    }
  }

  reset() {
    this.current = this.head;
  }

  next() {
    if (this.current && this.current.next) {
      this.current = this.current.next;
      return this.current.song;
    }
    return null;
  }

  getCurrentSong() {
    return this.current ? this.current.song : null;
  }
}

export { SongLinkedList };