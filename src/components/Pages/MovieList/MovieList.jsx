import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./MovieList.css";

function MovieList() {
  //Setup redux variables
  const dispatch = useDispatch();
  const history = useHistory();
  //Get movies from redux store
  const movies = useSelector((store) => store.movies.allMovies);

  //Setup clickHandler for entire section
  function clickHandler(id) {
    history.push(`/details/${id}`);
  } //End clickHandler

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  return (
    <main>
      <h1>MovieList</h1>
      <section className="movies">
        {movies.map((movie) => {
          return (
            <div key={movie.id} onClick={() => clickHandler(movie.id)}>
              <h3>{movie.title}</h3>
              <img src={movie.poster} alt={movie.title} />
              {movie.genre_array.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default MovieList;
