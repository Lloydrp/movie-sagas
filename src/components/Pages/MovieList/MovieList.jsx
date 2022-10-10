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
      <h1 className="my-5 text-2xl font-bold">Top Movies</h1>
      <section className="flex flex-wrap justify-evenly">
        {movies.map((movie) => {
          return (
            <div
              className="mb-5 flex h-fit w-4/5 flex-col rounded-md border-2 border-black p-5"
              key={movie.id}
              onClick={() => clickHandler(movie.id)}
            >
              <h3 className="mb-5 h-1/5 whitespace-normal text-xl font-bold">
                {movie.title}
              </h3>
              <img
                className="mb-5 rounded-md border-2 border-black"
                src={movie.poster}
                alt={movie.title}
              />
              <p className="font-bold">Genres:</p>
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
