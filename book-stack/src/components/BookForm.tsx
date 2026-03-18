import { useState, type FormEvent } from "react";
import type { Book } from "../types/Book";

interface BookFormProps {
  onAddBook: (book: Book) => void;
}

export function BookForm({ onAddBook }: BookFormProps) {
  const [name, setName] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [editorial, setEditorial] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !isbn.trim() || !author.trim() || !editorial.trim()) return;

    onAddBook({ name: name.trim(), isbn: isbn.trim(), author: author.trim(), editorial: editorial.trim() });
    setName("");
    setIsbn("");
    setAuthor("");
    setEditorial("");
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <h2>Agregar libro a la pila</h2>
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del libro"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="isbn">ISBN</label>
        <input
          id="isbn"
          type="text"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          placeholder="978-0-00-000000-0"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="author">Autor</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Nombre del autor"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="editorial">Editorial</label>
        <input
          id="editorial"
          type="text"
          value={editorial}
          onChange={(e) => setEditorial(e.target.value)}
          placeholder="Nombre de la editorial"
          required
        />
      </div>
      <button type="submit" className="btn-add">Agregar a la pila</button>
    </form>
  );
}
