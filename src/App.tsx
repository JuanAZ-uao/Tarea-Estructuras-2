import './App.css'
import { cities, people } from './data'
import FriendsGraph from './components/FriendsGraph'
import CityPeopleList from './components/CityPeopleList'

function App() {
  return (
    <>
      <header className="app-header">
        <h1>Challenge 10 — Friends &amp; Cities Graph</h1>
        <p>Each node represents a person or a city. Edges connect people to their city.</p>
      </header>

      <main className="app-main">
        <section className="graph-section">
          <h2>Graph View</h2>
          <FriendsGraph cities={cities} people={people} />
        </section>

        <section className="list-section">
          <CityPeopleList cities={cities} people={people} />
        </section>
      </main>
    </>
  )
}

export default App
