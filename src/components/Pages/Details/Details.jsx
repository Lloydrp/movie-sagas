import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BaseDetails from "./BaseDetails";
import EditDetails from "./EditDetails";

function Details() {
  //Setup router params
  const { movieid } = useParams();
  //Setup redux variables
  const dispatch = useDispatch();
  //Get specific movie from store
  const movieFromStore = useSelector((store) => store.movies.recentMovie[0]);
  const genres = useSelector((store) => store.genres);
  //Setup local state
  const [toggleEditMode, setToggleEditMode] = useState(false);
  const [checkboxes, setCheckboxes] = useState([]);

  //Safeguard to update local state on initial load for recent genre
  if (genres.recentGenres?.genre_array !== checkboxes && !toggleEditMode) {
    if (genres.recentGenres?.genre_array !== undefined)
      setCheckboxes(genres.recentGenres?.genre_array);
  }

  //Get initial movie/genres by ID and update all genres to store
  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
    dispatch({ type: "FETCH_ID_MOVIE", payload: movieid });
    dispatch({ type: "FETCH_ID_GENRE", payload: movieid });
  }, []);

  return toggleEditMode ? (
    <EditDetails
      checkboxes={checkboxes}
      setCheckboxes={setCheckboxes}
      movieFromStore={movieFromStore}
      genres={genres}
      setToggleEditMode={setToggleEditMode}
      movieid={movieid}
    />
  ) : (
    <BaseDetails
      setToggleEditMode={setToggleEditMode}
      genres={genres}
      movieFromStore={movieFromStore}
      movieid={movieid}
    />
  );
}

export default Details;
