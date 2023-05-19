import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  async function deleteMovieHandler(MovieId) {
    const response = await fetch(
      `https://react-http-1b7b8-default-rtdb.firebaseio.com/movies/${MovieId}.json`,
      {
        method: "DELETE",
        body: JSON.stringify(MovieId),
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
  }

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button
        style={{ background: "rgb(196, 68, 221)" }}
        onClick={() => deleteMovieHandler(props.id)}
      >
        Delete
      </button>
    </li>
  );
};

export default Movie;
