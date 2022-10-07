import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Details() {
  //Setup router params
  const { movieid } = useParams();
  //Setup redux variables
  const dispatch = useDispatch();
  //Get specific movie from store
  const movieFromStore = useSelector((store) => store.movies[movieid - 1]);

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
  }, []);

  return movieFromStore?.description === undefined ? (
    <section>
      <h2>Loading...</h2>
    </section>
  ) : (
    <section>
      <h2>{movieFromStore.title}</h2>
      <img
        src={movieFromStore.poster}
        alt={"Image of the movie" + movieFromStore.title}
      />
      <p>{movieFromStore.description}</p>
    </section>
  );
}

export default Details;
