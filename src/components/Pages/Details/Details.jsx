import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

function Details() {
  //Setup router params
  const { movieid } = useParams();
  //Setup redux variables
  const dispatch = useDispatch();
  const history = useHistory();
  //Get specific movie from store
  const movieFromStore = useSelector((store) => store.movies[movieid - 1]);
  const genres = useSelector((store) => store.genres.allGenres);
  const recentGenres = useSelector((store) => store.genres.recentGenres[0]);
  console.log("genres :>> ", genres, recentGenres);

  useEffect(() => {
    dispatch({ type: "FETCH_MOVIES" });
    dispatch({ type: "FETCH_GENRES" });
    dispatch({ type: "FETCH_ID_GENRE", payload: movieid });
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
      <button onClick={() => history.replace("/")}>
        Go back to Movie List
      </button>
    </section>
  );
}

export default Details;
