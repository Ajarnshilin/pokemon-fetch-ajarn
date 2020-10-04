import React, { useState, useEffect } from "react";
import "./styles.css";

async function fetchData() {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  return response.json();
}

export default function App() {
  const [repoData, setRepoData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const handleFetchData = async () => {
    setLoading(true);
    try {
      const pokemonData = await fetchData();
      setRepoData(pokemonData);
    } catch {
      setError("No data fetched");
    }
    setLoading(false);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  return (
    <div className="container">
      <h1>Pokemon List</h1>
      <div className="content">
        {!isLoading && repoData && (
          <ul>
            {repoData.results.map((item) => (
              <li>{item.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
