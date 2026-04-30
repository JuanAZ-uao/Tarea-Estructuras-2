import type { City, Person } from "./types";

export const cities: City[] = [
  { id: "city-1", name: "New York" },
  { id: "city-2", name: "Los Angeles" },
  { id: "city-3", name: "Chicago" },
  { id: "city-4", name: "Houston" },
];

export const people: Person[] = [
  { id: "person-1", name: "Alice",   age: 28, cityId: "city-1" },
  { id: "person-2", name: "Bob",     age: 34, cityId: "city-1" },
  { id: "person-3", name: "Carlos",  age: 22, cityId: "city-2" },
  { id: "person-4", name: "Diana",   age: 30, cityId: "city-2" },
  { id: "person-5", name: "Eve",     age: 25, cityId: "city-3" },
  { id: "person-6", name: "Frank",   age: 40, cityId: "city-3" },
  { id: "person-7", name: "Grace",   age: 19, cityId: "city-4" },
  { id: "person-8", name: "Hector",  age: 55, cityId: "city-1" },
];
