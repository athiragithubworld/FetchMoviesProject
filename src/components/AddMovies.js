import React, { useRef } from "react";

const AddMovies = (props) => {
  const titleRef = useRef("");
  const openingTextRef = useRef("");
  const releaseDateRef = useRef("");

  const addMoviesHandler = (event) => {
    event.preventDefault();

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    props.onAddMovie(movie);

    titleRef.current.value = "";
    openingTextRef.current.value = "";
    releaseDateRef.current.value = "";
  };

  return (
    <div>
      <form onSubmit={addMoviesHandler}>
        <div>
          {/* //className="form-group" */}
          <label
            // htmlFor="exampleFormControlInput1"
            style={{ alignItems: "flex-start", fontWeight: "bold" }}
          >
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            ref={titleRef}
          ></input>
        </div>
        <div className="form-group">
          <label
            htmlFor="exampleFormControlTextarea1"
            style={{ textAlign: "left", fontWeight: "bold" }}
          >
            Opening Text
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            ref={openingTextRef}
          ></textarea>
        </div>
        <div className="form-group">
          <label
            htmlFor="exampleFormControlTextarea1"
            style={{ textAlign: "left", fontWeight: "bold" }}
          >
            {" "}
            Release Date
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlTextarea1"
            ref={releaseDateRef}
          ></input>
        </div>
        <button>Add Movies</button>
      </form>
    </div>
  );
};

export default AddMovies;
