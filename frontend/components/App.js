import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Character from './Character';

const urlPlanets = 'http://localhost:9009/api/planets'
const urlPeople = 'http://localhost:9009/api/people'

function App() {

  // ❗ Create state to hold the data from the API
  // ❗ Create effects to fetch the data and put it in state
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [peopleResponse, planetsResponse] = await Promise.all([
          axios.get(urlPeople),
          axios.get(urlPlanets),
        ]);

        const people = peopleResponse.data;
        const planets = planetsResponse.data;

        const combinedData = people.map(person => {
          const homeworld = planets.find(planet => planet.id === person.homeworld);
          return { ...person, homeworld: homeworld ? homeworld.name : 'Unknown' };
        });

        setCharacters(combinedData);
      } catch (error) {
        console.error('Error fetching data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, 
  []);

  if (loading) {
    return <p>Loading Characters...</p>
  }
  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>See the README of the project for instructions on completing this challenge</p>
      {characters.map(character => (
        <Character
          key={character.id}
          name={character.name}
          birthYear={character.birth_year}
          homeworld={character.homeworld}
        />
      ))}
    </div>
  )
}

export default App

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App
