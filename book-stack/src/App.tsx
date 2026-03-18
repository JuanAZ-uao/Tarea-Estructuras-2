import { useRef, useState } from "react";
import { BookStack } from "./stack/BookStack";
import { mockBooks } from "./data/mockBooks";
import { BookForm } from "./components/BookForm";
import { BookStackView } from "./components/BookStackView";
import type { Book } from "./types/Book";
import "./App.css";

function createInitialStack(): BookStack {
  const stack = new BookStack();
  mockBooks.forEach((book) => stack.push(book));
  return stack;
}

function App() {
  const stackRef = useRef<BookStack>(null);
  if (stackRef.current === null) {
    stackRef.current = createInitialStack();
  }
  const [books, setBooks] = useState<Book[]>(() => stackRef.current!.toArray());

  const handleAddBook = (book: Book) => {
    stackRef.current.push(book);
    setBooks(stackRef.current.toArray());
  };

  const handlePopBook = () => {
    stackRef.current.pop();
    setBooks(stackRef.current.toArray());
  };

  return (
    <div className="app">
      <h1>📚 Book Stack - Challenge 04</h1>
      <div className="layout">
        <BookForm onAddBook={handleAddBook} />
        <BookStackView books={books} onPop={handlePopBook} />
      </div>
    </div>
  );
}

export default App;
