import { useState, useEffect, useRef } from 'react'
import {
  LinkedList,
  DoublyLinkedList,
  CircularList,
  CircularDoublyLinkedList,
} from './structures.js'
import './App.css'

// Instancias de las estructuras
const availableList   = new LinkedList()
const historyList     = new DoublyLinkedList()
const featuredList    = new CircularList()
const investorList    = new CircularDoublyLinkedList()

// Datos de ejemplo precargados
;[
  { id: 1, modelo: 'Toyota Corolla', placa: 'ABC-123', tarifa: 120000 },
  { id: 2, modelo: 'Chevrolet Spark', placa: 'DEF-456', tarifa: 80000 },
  { id: 3, modelo: 'Renault Logan', placa: 'GHI-789', tarifa: 95000 },
].forEach(v => { availableList.append(v); featuredList.append(v) })

;[
  { id: 1, nombre: 'Carlos Méndez', monto: 15000000 },
  { id: 2, nombre: 'Laura Ruiz',    monto: 22000000 },
].forEach(i => investorList.append(i))

// Contadores de ids únicos
let vehicleId   = 4
let investorId  = 3

export default function App() {
  // Estado para renderizar los datos de cada estructura
  const [available,  setAvailable]  = useState(availableList.toArray())
  const [history,    setHistory]    = useState(historyList.toArray())
  const [featured,   setFeatured]   = useState(featuredList.getCurrent())
  const [investors,  setInvestors]  = useState(investorList.toArray())

  // Formularios
  const [vForm, setVForm] = useState({ modelo: '', placa: '', tarifa: '' })
  const [iForm, setIForm] = useState({ nombre: '', monto: '' })

  // Actualiza el estado desde las estructuras
  const sync = () => {
    setAvailable([...availableList.toArray()])
    setHistory([...historyList.toArray()])
    setFeatured(featuredList.getCurrent() ? { ...featuredList.getCurrent() } : null)
    setInvestors([...investorList.toArray()])
  }

  // Rota el vehículo destacado cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      featuredList.rotate()
      setFeatured(featuredList.getCurrent() ? { ...featuredList.getCurrent() } : null)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Agrega vehículo a disponibles y a la lista circular de destacados
  const addVehicle = () => {
    if (!vForm.modelo || !vForm.placa || !vForm.tarifa) return
    const v = { id: vehicleId++, ...vForm, tarifa: Number(vForm.tarifa) }
    availableList.append(v)
    featuredList.append(v)
    setVForm({ modelo: '', placa: '', tarifa: '' })
    sync()
  }

  // Saca el vehículo de disponibles y lo inserta en el historial
  const rentVehicle = (id) => {
    const v = availableList.remove(id)
    if (!v) return
    historyList.prepend({ ...v, fecha: new Date().toLocaleString() })
    sync()
  }

  // Agrega inversionista a la lista circular doble
  const addInvestor = () => {
    if (!iForm.nombre || !iForm.monto) return
    investorList.append({ id: investorId++, ...iForm, monto: Number(iForm.monto) })
    setIForm({ nombre: '', monto: '' })
    sync()
  }

  // Elimina inversionista de la lista circular doble
  const removeInvestor = (id) => {
    investorList.remove(id)
    sync()
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Movilidad Urbana</h1>
        <p>Sistema de gestión de vehículos</p>
      </header>

      <div className="grid">

        {/* Vehículo destacado, lista circular */}
        <section className="card featured">
          <h2>Vehículo Destacado</h2>
          {featured ? (
            <div className="featured-card">
              <span className="modelo">{featured.modelo}</span>
              <span className="placa">{featured.placa}</span>
              <span className="tarifa">{Number(featured.tarifa).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}/día</span>
            </div>
          ) : (
            <p className="empty">Sin vehículos destacados</p>
          )}
        </section>

        {/* Vehículos disponibles, lista enlazada */}
        <section className="card">
          <h2>Vehículos Disponibles</h2>

          {/* Formulario para agregar vehículo */}
          <div className="form-row">
            <input placeholder="Modelo"
              value={vForm.modelo}
              onChange={e => setVForm({ ...vForm, modelo: e.target.value })} />
            <input placeholder="Placa"
              value={vForm.placa}
              onChange={e => setVForm({ ...vForm, placa: e.target.value })} />
            <input placeholder="Tarifa/día" type="number"
              value={vForm.tarifa}
              onChange={e => setVForm({ ...vForm, tarifa: e.target.value })} />
            <button className="btn-add" onClick={addVehicle}>Agregar</button>
          </div>

          {available.length === 0
            ? <p className="empty">No hay vehículos disponibles</p>
            : <ul className="list">
                {available.map(v => (
                  <li key={v.id} className="list-item">
                    <span>{v.modelo} — <em>{v.placa}</em> — {Number(v.tarifa).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}/día</span>
                    <button className="btn-rent" onClick={() => rentVehicle(v.id)}>
                      Alquilar
                    </button>
                  </li>
                ))}
              </ul>
          }
        </section>

        {/* Historial de alquileres, lista doblemente enlazada */}
        <section className="card">
          <h2>Historial de Alquileres</h2>

          {history.length === 0
            ? <p className="empty">Sin alquileres registrados</p>
            : <ul className="list">
                {history.map((v, i) => (
                  <li key={`${v.id}-${i}`} className="list-item history-item">
                    <span>{v.modelo} — <em>{v.placa}</em></span>
                    <span className="date">{v.fecha}</span>
                  </li>
                ))}
              </ul>
          }
        </section>

        {/* Inversionistas, lista circular doblemente enlazada */}
        <section className="card">
          <h2>Inversionistas Activos</h2>

          {/* Formulario para agregar inversionista */}
          <div className="form-row">
            <input placeholder="Nombre"
              value={iForm.nombre}
              onChange={e => setIForm({ ...iForm, nombre: e.target.value })} />
            <input placeholder="Monto (COP)" type="number"
              value={iForm.monto}
              onChange={e => setIForm({ ...iForm, monto: e.target.value })} />
            <button className="btn-add" onClick={addInvestor}>Agregar</button>
          </div>

          {investors.length === 0
            ? <p className="empty">Sin inversionistas</p>
            : <ul className="list">
                {investors.map(inv => (
                  <li key={inv.id} className="list-item">
                    <span>{inv.nombre} — <strong>{Number(inv.monto).toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })}</strong></span>
                    <button className="btn-remove" onClick={() => removeInvestor(inv.id)}>
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
          }
        </section>

      </div>
    </div>
  )
}
