import { PageDoublyLinkedList } from './PageDoublyLinkedList';
import { useState } from 'react';

const mockPages = [
  'Page 1',
  'Page 2',
  'Page 3',
  'Page 4',
];

function DoublyLinkedListPage() {
  const [list] = useState(() => {
    const l = new PageDoublyLinkedList();
    mockPages.forEach(page => l.add(page));
    return l;
  });
  const [currentPage, setCurrentPage] = useState(list.getCurrentPage());

  const handleNext = () => {
    const next = list.next();
    if (next) setCurrentPage(next);
  };

  const handlePrev = () => {
    const prev = list.prev();
    if (prev) setCurrentPage(prev);
  };

  const handleReset = () => {
    list.reset();
    setCurrentPage(list.getCurrentPage());
  };

  return (
    <div>
      <h2 style={{ color: '#3ec6d3', fontWeight: 600 }}>Lista Doblemente Enlazada de Páginas</h2>
      <div className="current-item">Página actual: {currentPage}</div>
      <div className="list-buttons">
        <button onClick={handlePrev}>Anterior</button>
        <button onClick={handleNext}>Siguiente</button>
        <button onClick={handleReset}>Reiniciar</button>
      </div>
    </div>
  );
}

export default DoublyLinkedListPage;
