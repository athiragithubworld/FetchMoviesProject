import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [errors, setError] = useState(null);

  async function FetchMovieHandler() {
    setIsloading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.py4e.com/api/film/");

      if (!response.ok) {
        throw new Error("Something went wrong ...");
      }

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl,
        };
      });
      setMovies(transformedMovies);
      setIsloading(false);
    } catch (error) {
      setError(error.message);
      if (errors !== null) {
        setError("Retrying...");
      }
    }
    setIsloading(false);
  }

  useEffect(() => {
    let timer = 0;
    if (errors !== null) {
      timer = setTimeout(() => {
        console.log("Retrying1");
        FetchMovieHandler();
      }, 5000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [errors]);

  let content = <h3>Movies not found.</h3>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (errors) {
    const cancelHandler = () => {
      setError(null);
    };

    content = (
      <div>
        <h3>{errors}</h3>
        {errors && <button onClick={cancelHandler}>Cancel</button>}
      </div>
    );
  }

  if (isloading) {
    content = <h3>Loading...</h3>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMovieHandler}>Fetch Movies</button>
      </section>

      <section>
        {content}
        {/* {isloading && <h2>Loading...</h2>}
        {!isloading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isloading && movies.length === 0 && <h3>Movies not found </h3>}
        {!isloading && error && <h3>{error}</h3>} */}
      </section>
    </React.Fragment>
  );
}

export default App;
