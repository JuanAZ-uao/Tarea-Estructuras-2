import type { Person } from "../types/Person";

function randomDate(start: Date, end: Date): Date {
  const startTime = start.getTime();
  const endTime = end.getTime();
  return new Date(startTime + Math.random() * (endTime - startTime));
}

let idCounter = 0;
export function generateId(): string {
  idCounter++;
  return `person-${Date.now()}-${idCounter}`;
}

export function generateRandomArrivalDate(): Date {
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  return randomDate(oneHourAgo, now);
}

export const mockData: Person[] = [
  {
    id: generateId(),
    name: "Carlos García",
    withdrawalAmount: 500,
    arrivalDate: generateRandomArrivalDate(),
  },
  {
    id: generateId(),
    name: "María López",
    withdrawalAmount: 1200,
    arrivalDate: generateRandomArrivalDate(),
  },
  {
    id: generateId(),
    name: "Juan Rodríguez",
    withdrawalAmount: 300,
    arrivalDate: generateRandomArrivalDate(),
  },
  {
    id: generateId(),
    name: "Ana Martínez",
    withdrawalAmount: 800,
    arrivalDate: generateRandomArrivalDate(),
  },
  {
    id: generateId(),
    name: "Pedro Sánchez",
    withdrawalAmount: 2000,
    arrivalDate: generateRandomArrivalDate(),
  },
];
