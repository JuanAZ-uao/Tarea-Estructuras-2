
import LinkedListPage from './LinkedListPage';
import DoublyLinkedListPage from './DoublyLinkedListPage';
import { useState } from 'react';
import './App.css';

function App() {
  const [page, setPage] = useState('linked');

  return (
    <div>
      <div className="challenge-title">CHALLENGE 07</div>
      <ol className="challenge-list">
        <li>Implementa una lista enlazada para reproducir canciones en orden. Llena la lista con datos simulados.</li>
        <li>Implementa una lista doblemente enlazada para navegar hacia atrás y adelante entre páginas visitadas en el navegador. Llena la lista con datos simulados.</li>
        <li>Crea un proyecto en React con 2 páginas: lista enlazada y lista doblemente enlazada.</li>
        <li>Usa las listas implementadas en cada página. Navega por las listas usando botones dentro de las páginas.</li>
      </ol>
      <div className="nav-buttons">
        <button onClick={() => setPage('linked')}>Lista Enlazada</button>
        <button onClick={() => setPage('doubly')}>Lista Doblemente Enlazada</button>
      </div>
      <div className="page-section">
        {page === 'linked' ? <LinkedListPage /> : <DoublyLinkedListPage />}
      </div>
    </div>
  );
}

export default App;
