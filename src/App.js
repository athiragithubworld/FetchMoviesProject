import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovies from "./components/AddMovies";

function App() {
  const [movies, setMovies] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [errors, setError] = useState(null);

  const FetchMovieHandler = useCallback(async () => {
    setIsloading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-http-1b7b8-default-rtdb.firebaseio.com/movies.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong ...");
      }
      const data = await response.json();
      const loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      // const transformedMovies = data.results.map((movieData) => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     releaseDate: movieData.release_date,
      //     openingText: movieData.opening_crawl,
      //   };
      // });
      setMovies(loadedMovies);

      setIsloading(false);
    } catch (error) {
      setError(error.message);
      if (errors !== null) {
        setError("Retrying...");
      }
    }
    setIsloading(false);
  }, [errors]);

  useEffect(() => {
    let timer = 0;
    if (errors !== null) {
      timer = setTimeout(() => {
        FetchMovieHandler();
      }, 5000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [errors]);

  useEffect(() => {
    FetchMovieHandler();
  }, [FetchMovieHandler]);

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

  async function AddMovieHandler(movie) {
    // console.log(movie);
    const response = await fetch(
      "https://react-http-1b7b8-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  // async function deleteMovieHandler(MovieId) {
  //   // console.log(movie);
  //   const response = await fetch(
  //     "https://react-http-1b7b8-default-rtdb.firebaseio.com/movies.json",
  //     {
  //       method: "DELETE",
  //       body: JSON.stringify(MovieId),
  //       header: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   console.log(data);
  // }

  return (
    <React.Fragment>
      <section>
        <AddMovies onAddMovie={AddMovieHandler}></AddMovies>
      </section>
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
