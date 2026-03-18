import type { Person } from "../types/Person";

export class ATMQueue {
  private queue: Person[] = [];

  constructor(initialPeople?: Person[]) {
    if (initialPeople) {
      this.queue = [...initialPeople];
      this.sortByArrivalDate();
    }
  }

  enqueue(person: Person): void {
    this.queue.push(person);
    this.sortByArrivalDate();
  }

  dequeue(): Person | undefined {
    return this.queue.shift();
  }

  getAll(): Person[] {
    return [...this.queue];
  }

  size(): number {
    return this.queue.length;
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }

  private sortByArrivalDate(): void {
    this.queue.sort(
      (a, b) => new Date(a.arrivalDate).getTime() - new Date(b.arrivalDate).getTime()
    );
  }
}
