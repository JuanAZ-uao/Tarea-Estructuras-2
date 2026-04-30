import React, { useState } from "react";
import type { City, Person } from "../types";

interface Props {
  cities: City[];
  people: Person[];
}

const CityPeopleList: React.FC<Props> = ({ cities, people }) => {
  const [selectedCityId, setSelectedCityId] = useState<string>(cities[0]?.id ?? "");

  const filtered = people.filter((p) => p.cityId === selectedCityId);
  const selectedCity = cities.find((c) => c.id === selectedCityId);

  return (
    <div className="city-list-panel">
      <h2>People by City</h2>

      <div className="city-selector">
        {cities.map((city) => (
          <button
            key={city.id}
            className={city.id === selectedCityId ? "city-btn active" : "city-btn"}
            onClick={() => setSelectedCityId(city.id)}
          >
            {city.name}
          </button>
        ))}
      </div>

      <div className="people-list">
        <h3>
          Residents of <span className="city-name">{selectedCity?.name}</span>
          <span className="count"> ({filtered.length})</span>
        </h3>

        {filtered.length === 0 ? (
          <p className="no-people">No people registered in this city.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((person, idx) => (
                <tr key={person.id}>
                  <td>{idx + 1}</td>
                  <td>{person.name}</td>
                  <td>{person.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CityPeopleList;
