import { SongLinkedList } from './SongLinkedList';
import { useState } from 'react';

const mockSongs = [
  'Song A',
  'Song B',
  'Song C',
  'Song D',
];

function LinkedListPage() {
  const [list] = useState(() => {
    const l = new SongLinkedList();
    mockSongs.forEach(song => l.add(song));
    return l;
  });
  const [currentSong, setCurrentSong] = useState(list.getCurrentSong());

  const handleNext = () => {
    const next = list.next();
    if (next) setCurrentSong(next);
  };

  const handleReset = () => {
    list.reset();
    setCurrentSong(list.getCurrentSong());
  };

  return (
    <div>
      <h2 style={{ color: '#3ec6d3', fontWeight: 600 }}>Lista Enlazada de Canciones</h2>
      <div className="current-item">Canción actual: {currentSong}</div>
      <div className="list-buttons">
        <button onClick={handleNext}>Siguiente canción</button>
        <button onClick={handleReset}>Reiniciar</button>
      </div>
    </div>
  );
}

export default LinkedListPage;
