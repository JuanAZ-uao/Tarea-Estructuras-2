import { useState, useMemo } from "react";
import { Trie } from "../dataStructures/Trie";
import { topK } from "../dataStructures/MinHeap";
import type { Product } from "../dataStructures/Trie";

interface SmartSearchProps {
  initialProducts?: Product[];
  defaultK?: number;
}

const DEFAULT_PRODUCTS: Product[] = [
  { name: "air max", popularity: 90 },
  { name: "air force", popularity: 95 },
  { name: "air jordan", popularity: 85 },
  { name: "adidas boost", popularity: 80 },
];

export default function SmartSearch({
  initialProducts = DEFAULT_PRODUCTS,
  defaultK = 2,
}: SmartSearchProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [query, setQuery] = useState("");
  const [k, setK] = useState(defaultK);
  const [newName, setNewName] = useState("");
  const [newPop, setNewPop] = useState<number | "">("");

  // Reconstruir el trie solo cuando cambie la lista de productos
  const trie = useMemo(() => {
    const t = new Trie();
    products.forEach((p) => t.insert(p));
    return t;
  }, [products]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const candidates = trie.search(query.trim());
    return topK(candidates, k);
  }, [trie, query, k]);

  function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    const name = newName.trim();
    if (!name || newPop === "" || newPop < 0) return;
    setProducts((prev) => [...prev, { name, popularity: Number(newPop) }]);
    setNewName("");
    setNewPop("");
  }

  return (
    <div className="smart-search">
      <h1>Motor de Búsqueda Inteligente</h1>

      {/* Barra de búsqueda */}
      <section className="search-section">
        <input
          className="search-input"
          type="text"
          placeholder="Buscar productos por prefijo…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <label className="k-label">
          Top&nbsp;
          <input
            className="k-input"
            type="number"
            min={1}
            max={products.length}
            value={k}
            onChange={(e) => setK(Math.max(1, Number(e.target.value)))}
          />
          &nbsp;resultados
        </label>
      </section>

      {/* Resultados */}
      <section className="results-section">
        {query.trim() === "" ? (
          <p className="hint">Empieza a escribir para buscar…</p>
        ) : results.length === 0 ? (
          <p className="hint">No se encontraron productos para "{query}".</p>
        ) : (
          <ul className="results-list">
            {results.map((p, i) => (
              <li key={`${p.name}-${i}`} className="result-item">
                <span className="rank">#{i + 1}</span>
                <span className="product-name">{p.name}</span>
                <span className="popularity">⭐ {p.popularity}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Formulario para agregar producto */}
      <section className="add-section">
        <h2>Agregar Producto</h2>
        <form className="add-form" onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Nombre del producto"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Popularidad (0-100)"
            min={0}
            max={100}
            value={newPop}
            onChange={(e) => setNewPop(e.target.value === "" ? "" : Number(e.target.value))}
            required
          />
          <button type="submit">Insertar</button>
        </form>
      </section>

      {/* Catálogo de productos */}
      <section className="catalog-section">
        <h2>Catálogo de Productos ({products.length})</h2>
        <ul className="catalog-list">
          {products.map((p, i) => (
            <li key={`${p.name}-${i}`} className="catalog-item">
              <span>{p.name}</span>
              <span className="popularity">⭐ {p.popularity}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
