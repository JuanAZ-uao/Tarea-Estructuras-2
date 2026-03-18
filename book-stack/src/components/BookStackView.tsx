import type { Book } from "../types/Book";

interface BookStackViewProps {
  books: Book[];
  onPop: () => void;
}

export function BookStackView({ books, onPop }: BookStackViewProps) {
  return (
    <div className="stack-view">
      <div className="stack-header">
        <h2>Pila de libros ({books.length})</h2>
        <button
          className="btn-pop"
          onClick={onPop}
          disabled={books.length === 0}
        >
          Quitar último
        </button>
      </div>
      {books.length === 0 ? (
        <p className="empty-msg">La pila está vacía.</p>
      ) : (
        <div className="stack-list">
          {books.map((book, index) => (
            <div
              key={`${book.isbn}-${index}`}
              className={`book-card ${index === 0 ? "top" : ""}`}
            >
              {index === 0 && <span className="badge">← Tope de la pila</span>}
              <h3>{book.name}</h3>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              <p><strong>Autor:</strong> {book.author}</p>
              <p><strong>Editorial:</strong> {book.editorial}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
