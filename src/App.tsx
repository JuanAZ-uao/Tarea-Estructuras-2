import { useState, useEffect, useRef } from 'react'
import Tree from 'react-d3-tree'
import BST from './bst'
import './App.css'

const numerosIniciales = [50, 30, 70, 20, 40, 60, 80, 10, 25, 35, 45]

function App() {
  const [arbol] = useState(() => {
    const bst = new BST()
    numerosIniciales.forEach((n) => bst.insert(n))
    return bst
  })

  const [datosArbol, setDatosArbol] = useState(arbol.toD3Tree())
  const [nuevoValor, setNuevoValor] = useState('')
  const [valorBusqueda, setValorBusqueda] = useState('')
  const [resultadoBusqueda, setResultadoBusqueda] = useState<string | null>(null)
  const [recorridos, setRecorridos] = useState({
    inorden: arbol.inorder(),
    preorden: arbol.preorder(),
    postorden: arbol.postorder(),
  })

  const contenedorRef = useRef<HTMLDivElement>(null)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (contenedorRef.current) {
      const { width } = contenedorRef.current.getBoundingClientRect()
      setTranslate({ x: width / 2, y: 50 })
    }
  }, [])

  // Imprimir recorridos en consola al inicio
  useEffect(() => {
    console.log('--- Recorridos del Arbol Binario de Busqueda ---')
    console.log('Inorden:', arbol.inorder().join(', '))
    console.log('Preorden:', arbol.preorder().join(', '))
    console.log('Postorden:', arbol.postorder().join(', '))
  }, [])

  const actualizarRecorridos = () => {
    setRecorridos({
      inorden: arbol.inorder(),
      preorden: arbol.preorder(),
      postorden: arbol.postorder(),
    })
    setDatosArbol(arbol.toD3Tree())
  }

  const handleInsertar = () => {
    const valor = parseInt(nuevoValor)
    if (isNaN(valor)) return
    arbol.insert(valor)
    actualizarRecorridos()
    setNuevoValor('')
    console.log(`Insertado: ${valor}`)
    console.log('Inorden:', arbol.inorder().join(', '))
    console.log('Preorden:', arbol.preorder().join(', '))
    console.log('Postorden:', arbol.postorder().join(', '))
  }

  const handleBuscar = () => {
    const valor = parseInt(valorBusqueda)
    if (isNaN(valor)) return
    const encontrado = arbol.search(valor)
    setResultadoBusqueda(
      encontrado
        ? `El valor ${valor} SI se encuentra en el arbol`
        : `El valor ${valor} NO se encuentra en el arbol`
    )
    console.log(encontrado ? `Buscar(${valor}): ENCONTRADO` : `Buscar(${valor}): NO ENCONTRADO`)
  }

  return (
    <div className="app">
      <h1>Challenge 08 - BST</h1>

      <div className="controles">
        <div className="grupo-control">
          <h3>Insertar valor</h3>
          <input
            type="number"
            value={nuevoValor}
            onChange={(e) => setNuevoValor(e.target.value)}
            placeholder="Ej: 55"
            onKeyDown={(e) => e.key === 'Enter' && handleInsertar()}
          />
          <button onClick={handleInsertar}>Insertar</button>
        </div>

        <div className="grupo-control">
          <h3>Buscar valor</h3>
          <input
            type="number"
            value={valorBusqueda}
            onChange={(e) => {
              setValorBusqueda(e.target.value)
              setResultadoBusqueda(null)
            }}
            placeholder="Ej: 40"
            onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
          />
          <button onClick={handleBuscar}>Buscar</button>
          {resultadoBusqueda && (
            <p className={resultadoBusqueda.includes('SI') ? 'encontrado' : 'no-encontrado'}>
              {resultadoBusqueda}
            </p>
          )}
        </div>
      </div>

      <div className="recorridos">
        <div>
          <strong>En orden:</strong> {recorridos.inorden.join(', ')}
        </div>
        <div>
          <strong>Pre-orden:</strong> {recorridos.preorden.join(', ')}
        </div>
        <div>
          <strong>Post-orden:</strong> {recorridos.postorden.join(', ')}
        </div>
      </div>

      <div className="arbol-contenedor" ref={contenedorRef}>
        {datosArbol && (
          <Tree
            data={datosArbol}
            translate={translate}
            orientation="vertical"
            pathFunc="step"
            separation={{ siblings: 1, nonSiblings: 1.5 }}
            nodeSize={{ x: 80, y: 80 }}
          />
        )}
      </div>
    </div>
  )
}

export default App
