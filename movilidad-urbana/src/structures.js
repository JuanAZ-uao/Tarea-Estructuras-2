// Nodo simple
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Nodo doble (tiene referencia prev)
class DNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

// Lista enlazada para vehículos disponibles
export class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // Agrega al final
  append(data) {
    const node = new Node(data);
    if (!this.head) { this.head = node; }
    else {
      let cur = this.head;
      while (cur.next) cur = cur.next;
      cur.next = node;
    }
    this.size++;
  }

  // Elimina por id y devuelve los datos
  remove(id) {
    if (!this.head) return null;
    if (this.head.data.id === id) {
      const removed = this.head.data;
      this.head = this.head.next;
      this.size--;
      return removed;
    }
    let cur = this.head;
    while (cur.next && cur.next.data.id !== id) cur = cur.next;
    if (!cur.next) return null;
    const removed = cur.next.data;
    cur.next = cur.next.next;
    this.size--;
    return removed;
  }

  // Retorna array para renderizar
  toArray() {
    const result = [];
    let cur = this.head;
    while (cur) { result.push(cur.data); cur = cur.next; }
    return result;
  }
}

// Lista doblemente enlazada para historial de alquileres
export class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // Inserta al inicio para que el más reciente quede primero
  prepend(data) {
    const node = new DNode(data);
    if (!this.head) { this.head = this.tail = node; }
    else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.size++;
  }

  toArray() {
    const result = [];
    let cur = this.head;
    while (cur) { result.push(cur.data); cur = cur.next; }
    return result;
  }
}

// Lista circular para vehículos destacados, rota cada 5 s
export class CircularList {
  constructor() {
    this.head = null;
    this.current = null;
    this.size = 0;
  }

  append(data) {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
      node.next = node;
      this.current = node;
    } else {
      let tail = this.head;
      while (tail.next !== this.head) tail = tail.next;
      tail.next = node;
      node.next = this.head;
    }
    this.size++;
  }

  // Avanza al siguiente nodo del círculo
  rotate() {
    if (this.current) this.current = this.current.next;
  }

  getCurrent() {
    return this.current ? this.current.data : null;
  }

  toArray() {
    if (!this.head) return [];
    const result = [];
    let cur = this.head;
    do { result.push(cur.data); cur = cur.next; } while (cur !== this.head);
    return result;
  }
}

// Lista circular doblemente enlazada para inversionistas
export class CircularDoublyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(data) {
    const node = new DNode(data);
    if (!this.head) {
      node.next = node;
      node.prev = node;
      this.head = node;
    } else {
      const tail = this.head.prev;
      tail.next = node;
      node.prev = tail;
      node.next = this.head;
      this.head.prev = node;
    }
    this.size++;
  }

  remove(id) {
    if (!this.head) return;
    let cur = this.head;
    let found = null;
    do {
      if (cur.data.id === id) { found = cur; break; }
      cur = cur.next;
    } while (cur !== this.head);

    if (!found) return;
    if (this.size === 1) { this.head = null; }
    else {
      found.prev.next = found.next;
      found.next.prev = found.prev;
      if (found === this.head) this.head = found.next;
    }
    this.size--;
  }

  toArray() {
    if (!this.head) return [];
    const result = [];
    let cur = this.head;
    do { result.push(cur.data); cur = cur.next; } while (cur !== this.head);
    return result;
  }
}
