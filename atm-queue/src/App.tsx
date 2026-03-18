import { useState, useRef, useCallback } from "react";
import { ATMQueue } from "./models/ATMQueue";
import { mockData, generateId, generateRandomArrivalDate } from "./data/mockData";
import PersonForm from "./components/PersonForm";
import QueueDisplay from "./components/QueueDisplay";
import type { Person } from "./types/Person";
import "./App.css";

function App() {
  const atmQueueRef = useRef(new ATMQueue(mockData));
  const [queue, setQueue] = useState<Person[]>(atmQueueRef.current.getAll());

  const handleAddPerson = useCallback((name: string, withdrawalAmount: number) => {
    const newPerson: Person = {
      id: generateId(),
      name,
      withdrawalAmount,
      arrivalDate: generateRandomArrivalDate(),
    };
    atmQueueRef.current.enqueue(newPerson);
    setQueue(atmQueueRef.current.getAll());
  }, []);

  const handleDequeue = useCallback(() => {
    const served = atmQueueRef.current.dequeue();
    if (served) {
      setQueue(atmQueueRef.current.getAll());
      alert(
        `Se atendió a: ${served.name} — Retiro: $${served.withdrawalAmount.toLocaleString("es-ES")}`
      );
    }
  }, []);

  return (
    <div className="app">
      <h1>🏧 Sistema de Fila ATM</h1>
      <div className="layout">
        <PersonForm onAddPerson={handleAddPerson} />
        <QueueDisplay queue={queue} onDequeue={handleDequeue} />
      </div>
    </div>
  );
}

export default App;
