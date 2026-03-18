import type { Person } from "../types/Person";

interface Props {
  queue: Person[];
  onDequeue: () => void;
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export default function QueueDisplay({ queue, onDequeue }: Props) {
  return (
    <div className="queue-display">
      <div className="queue-header">
        <h2>Fila del cajero ATM</h2>
        <span className="badge">{queue.length} personas</span>
      </div>

      {queue.length === 0 ? (
        <p className="empty-message">No hay personas en la fila.</p>
      ) : (
        <>
          <button
            className="btn-dequeue"
            onClick={onDequeue}
            disabled={queue.length === 0}
          >
            Atender siguiente persona
          </button>
          <div className="queue-list">
            {queue.map((person, index) => (
              <div
                key={person.id}
                className={`queue-item ${index === 0 ? "next" : ""}`}
              >
                <div className="queue-position">{index + 1}</div>
                <div className="queue-info">
                  <span className="person-name">{person.name}</span>
                  <span className="person-amount">
                    Retiro: ${person.withdrawalAmount.toLocaleString("es-ES")}
                  </span>
                  <span className="person-date">
                    Llegada: {formatDate(person.arrivalDate)}
                  </span>
                </div>
                {index === 0 && <span className="next-label">Siguiente</span>}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
