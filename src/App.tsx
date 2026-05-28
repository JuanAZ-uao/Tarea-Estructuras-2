import { useEffect, useMemo, useState } from 'react'
import { seedSongs } from './data/seed'
import { MaxHeap } from './structures/MaxHeap'
import { Trie } from './structures/Trie'
import { UndirectedGraph } from './structures/UndirectedGraph'
import type { SongRecord } from './types/song'
import './App.scss'

const GENEROS_DISPONIBLES = [
  'pop',
  'rock',
  'jazz',
  'trap',
  'corridos tumbados',
  'salsa',
  'bachata',
  'electronica',
]

function App() {
  const [songs, setSongs] = useState<SongRecord[]>(seedSongs)

  const [prefixInput, setPrefixInput] = useState('')
  const [activePrefix, setActivePrefix] = useState('')
  const [searchTitle, setSearchTitle] = useState('')

  const [newSongTitle, setNewSongTitle] = useState('')
  const [newSongGenre, setNewSongGenre] = useState('pop')
  const [selectedSong, setSelectedSong] = useState(seedSongs[0]?.title ?? '')

  const trie = useMemo(() => {
    const structure = new Trie()
    songs.forEach((song) => structure.insert(song.title))
    return structure
  }, [songs])

  const topSongs = useMemo(() => {
    const heap = new MaxHeap<SongRecord>((a, b) => a.plays - b.plays)
    songs.forEach((song) => heap.insert(song))
    return heap.toSortedArray().slice(0, 5)
  }, [songs])

  const graph = useMemo(() => {
    const structure = new UndirectedGraph<string>()
    songs.forEach((song) => structure.addVertex(song.title))

    const songsByGenre = new Map<string, string[]>()
    songs.forEach((song) => {
      const group = songsByGenre.get(song.genre) ?? []
      group.push(song.title)
      songsByGenre.set(song.genre, group)
    })

    songsByGenre.forEach((titles) => {
      for (let i = 0; i < titles.length; i += 1) {
        for (let j = i + 1; j < titles.length; j += 1) {
          structure.addEdge(titles[i], titles[j])
        }
      }
    })

    return structure
  }, [songs])

  const suggestions = useMemo(() => {
    const byTitle = trie.suggest(activePrefix, 6)
    const normalizedPrefix = activePrefix.trim().toLowerCase()

    if (!normalizedPrefix) {
      return byTitle
    }

    const byGenre = songs
      .filter((song) => song.genre.toLowerCase().startsWith(normalizedPrefix))
      .map((song) => song.title)

    const merged = [...new Set([...byTitle, ...byGenre])]
    return merged.slice(0, 6)
  }, [trie, activePrefix, songs])

  const selectedSongRecord = useMemo(
    () => songs.find((song) => song.title === selectedSong) ?? null,
    [songs, selectedSong],
  )

  const songExists = useMemo(() => {
    const clean = searchTitle.trim()
    if (!clean) {
      return null
    }
    return trie.contains(clean)
  }, [searchTitle, trie])

  const relatedSongs = useMemo(() => {
    if (!selectedSong) {
      return []
    }
    return graph.neighbors(selectedSong)
  }, [graph, selectedSong])

  const recommendationTitles = useMemo(() => {
    if (!selectedSong) {
      return []
    }
    return [selectedSong, ...relatedSongs]
  }, [selectedSong, relatedSongs])

  const graphNodes = useMemo(() => {
    const width = 320
    const height = 210
    const total = recommendationTitles.length || 1
    const radius = Math.min(width, height) * 0.33
    const centerX = width / 2
    const centerY = height / 2

    return recommendationTitles.map((title, index) => {
      const angle = (2 * Math.PI * index) / total - Math.PI / 2
      return {
        title,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      }
    })
  }, [recommendationTitles])

  const nodeByTitle = useMemo(() => {
    return new Map(graphNodes.map((node) => [node.title, node]))
  }, [graphNodes])

  const recommendationEdges = useMemo(() => {
    const titleSet = new Set(recommendationTitles)
    const dedupe = new Set<string>()
    const edges: Array<[string, string]> = []

    recommendationTitles.forEach((title) => {
      graph.neighbors(title).forEach((neighbor) => {
        if (!titleSet.has(neighbor)) {
          return
        }

        const key = [title, neighbor].sort().join('::')
        if (!dedupe.has(key)) {
          dedupe.add(key)
          edges.push([title, neighbor])
        }
      })
    })

    return edges
  }, [graph, recommendationTitles])

  useEffect(() => {
    if (!songs.some((song) => song.title === selectedSong)) {
      setSelectedSong(songs[0]?.title ?? '')
    }
  }, [songs, selectedSong])

  const handleInsertSong = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cleanTitle = newSongTitle.trim()
    const cleanGenre = newSongGenre.trim()
    const plays = 500

    if (!cleanTitle || !cleanGenre) {
      return
    }

    const exists = songs.some((song) => song.title.toLowerCase() === cleanTitle.toLowerCase())
    if (exists) {
      return
    }

    setSongs((prev) => [...prev, { title: cleanTitle, genre: cleanGenre, plays }])
    setSelectedSong(cleanTitle)
    setNewSongTitle('')
  }

  const handleFilterPrefix = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setActivePrefix(prefixInput.trim())
  }

  return (
    <main className="dashboard">
      <header className="dashboard__hero">
        <p className="dashboard__eyebrow">Parcial 3 · Mini plataforma Spotify</p>
        <h1>Panel de musica educativa</h1>
        <p>
          Busqueda predictiva con Trie, ranking TOP con Max Heap y recomendaciones con
          grafo no dirigido.
        </p>
      </header>

      <section className="panel-grid">
        <article className="panel">
          <h2>1) Buscador predictivo</h2>
          <form className="panel__form" onSubmit={handleInsertSong}>
            <label>
              Nueva cancion
              <input
                value={newSongTitle}
                onChange={(event) => setNewSongTitle(event.target.value)}
                placeholder="Ej: Cielo Nocturno"
              />
            </label>
            <label>
              Genero de la cancion
              <select
                value={newSongGenre}
                onChange={(event) => setNewSongGenre(event.target.value)}
              >
                {GENEROS_DISPONIBLES.map((genero) => (
                  <option key={genero} value={genero}>
                    {genero}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Insertar cancion</button>
          </form>

          <div className="panel__split">
            <label>
              Buscar existencia
              <input
                value={searchTitle}
                onChange={(event) => setSearchTitle(event.target.value)}
                placeholder="Titulo exacto"
              />
            </label>
            <p className="badge">
              {songExists === null
                ? 'Escribe un titulo para validar'
                : songExists
                  ? 'La cancion existe en el Trie'
                  : 'No existe en el Trie'}
            </p>
          </div>

          <form className="panel__split" onSubmit={handleFilterPrefix}>
            <label>
              Sugerencias por prefijo (titulo o genero)
              <input
                value={prefixInput}
                onChange={(event) => setPrefixInput(event.target.value)}
                placeholder="Ej: Sue"
              />
            </label>
            <button type="submit">Filtrar por prefijo</button>
            <ul className="pill-list">
              {suggestions.length ? (
                suggestions.map((song) => <li key={song}>{song}</li>)
              ) : (
                <li>Sin sugerencias</li>
              )}
            </ul>
          </form>
        </article>

        <article className="panel">
          <h2>2) Ranking de popularidad</h2>
          <ol className="ranking-list" start={1}>
            {topSongs.map((song) => (
              <li key={song.title}>
                <span>{song.title}</span>
                <strong>{song.plays} reproducciones</strong>
              </li>
            ))}
          </ol>
        </article>

        <article className="panel">
          <h2>3) Recomendaciones</h2>
          <div className="panel__form">
            <label>
              Cancion principal
              <select
                value={selectedSong}
                onChange={(event) => setSelectedSong(event.target.value)}
              >
                <option value="">Selecciona</option>
                {songs.map((song) => (
                  <option key={`view-${song.title}`} value={song.title}>
                    {song.title}
                  </option>
                ))}
              </select>
            </label>

            <p className="badge">
              Genero detectado: {selectedSongRecord?.genre ?? 'Sin genero'}
            </p>

            <ul className="pill-list">
              {relatedSongs.length ? (
                relatedSongs.map((song) => <li key={song}>{song}</li>)
              ) : (
                <li>Sin conexiones aun</li>
              )}
            </ul>
          </div>

          <div className="graph-board">
            {graphNodes.length ? (
              <svg
                viewBox="0 0 320 210"
                role="img"
                aria-label="Grafo de canciones relacionadas por genero musical"
              >
                {recommendationEdges.map(([a, b]) => {
                  const from = nodeByTitle.get(a)
                  const to = nodeByTitle.get(b)
                  if (!from || !to) {
                    return null
                  }

                  return (
                    <line
                      key={`${a}-${b}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      className="graph-board__edge"
                    />
                  )
                })}

                {graphNodes.map((node) => (
                  <g key={node.title}>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="18"
                      className={
                        node.title === selectedSong ? 'graph-board__node graph-board__node--active' : 'graph-board__node'
                      }
                    />
                    <text x={node.x} y={node.y + 4} textAnchor="middle" className="graph-board__label">
                      {node.title.slice(0, 6)}
                    </text>
                  </g>
                ))}
              </svg>
            ) : (
              <p className="graph-board__empty">No hay canciones para este genero musical.</p>
            )}
          </div>

          <p className="badge">Conexiones del grafo: {recommendationEdges.length}</p>
        </article>
      </section>
    </main>
  )
}

export default App
