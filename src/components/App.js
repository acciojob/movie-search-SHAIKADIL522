import React, { useState } from "react";
import "./../styles/App.css";

const API_KEY = "99eb9fd1";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const searchMovies = () => {
    if (!query.trim()) return;

    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
          setError("");
        } else {
          setMovies([]);
          setError("Invalid movie name. Please try again.");
        }
      })
      .catch(() => {
        setMovies([]);
        setError("Invalid movie name. Please try again.");
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") searchMovies();
  };

  return (
    <div>
      {/* Do not remove the main div */}
      <div className="search-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="search-button" onClick={searchMovies}>
          Search
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/150x220?text=No+Image"
              }
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;