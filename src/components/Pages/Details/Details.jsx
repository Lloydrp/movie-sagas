import { useState } from "react";
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
  const movieFromStore = useSelector((store) => store.movies.recentMovie[0]);
  const genres = useSelector((store) => store.genres);
  //Setup local state
  const [toggleEditMode, setToggleEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [description, setDescription] = useState("");
  const [checkboxes, setCheckboxes] = useState([]);

  //Safeguard to update local state on initial load so it can be displayed in edit mode
  //Using last defined variable for additional padding
  if (movieFromStore?.description !== description) {
    setTitle(movieFromStore?.title);
    setPosterUrl(movieFromStore?.poster);
    setDescription(movieFromStore?.description);
  }

  console.log("checkboxes :>> ", genres.recentGenres?.genre_array, checkboxes);
  //Safeguard to update local state on initial load for recent genre
  if (genres.recentGenres?.genre_array !== checkboxes && !toggleEditMode) {
    if (genres.recentGenres?.genre_array !== undefined)
      setCheckboxes(genres.recentGenres?.genre_array);
  }

  function checkboxHandler(event) {
    if (event.target.checked) {
      setCheckboxes([...checkboxes, event.target.value]);
    } else {
      setCheckboxes(checkboxes.filter((item) => item !== event.target.value));
    }
  } //end checkboxHandler

  function handleSave() {
    dispatch({
      type: "REFRESH_FROM_SAVE",
      payload: {
        checkboxes,
        id: movieid,
        title,
        description,
        poster: posterUrl,
      },
    });
    history.replace("/");
    setTimeout(() => {
      dispatch({ type: "FETCH_MOVIES" });
    }, 100);
  }

  function handleReturnToMovies() {
    dispatch({ type: "RESET_RECENT_MOVIE" });
    dispatch({ type: "RESET_RECENT_GENRES" });
    history.replace("/");
  }

  function handleDelete() {
    dispatch({ type: "DELETE_MOVIE", payload: movieid });
    history.replace("/");
  }

  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
    dispatch({ type: "FETCH_ID_MOVIE", payload: movieid });
    dispatch({ type: "FETCH_ID_GENRE", payload: movieid });
  }, []);

  if (toggleEditMode) {
    //Begin EDIT MODE detail page
    return (
      <section>
        <div>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Enter updated Title..."
          />
        </div>
        <img
          src={movieFromStore?.poster}
          alt={"Image of the movie" + movieFromStore?.title}
        />
        <div>
          <input
            value={posterUrl}
            onChange={(event) => setPosterUrl(event.target.value)}
            type="text"
            placeholder="Enter updated poster URL..."
          />
        </div>
        <p>Genres:</p>
        <div id="checkboxes">
          {genres.allGenres.map((genre, index) => (
            <label key={index} htmlFor={genre.id}>
              <input
                checked={
                  checkboxes &&
                  checkboxes.some((item) => item === String(genre.id))
                    ? true
                    : false
                }
                value={genre.id}
                type="checkbox"
                id={genre.id}
                onChange={(event) => checkboxHandler(event)}
              />
              {genre?.name}
            </label>
          ))}
        </div>
        <textarea
          onChange={(event) => setDescription(event.target.value)}
          value={description}
          name="movie-description"
          id="movie-description"
          cols="50"
          rows="15"
          placeholder="Enter movie description..."
        ></textarea>
        <button onClick={() => handleSave()}>Save</button>
        <button onClick={() => setToggleEditMode(false)}>Cancel</button>
        <button onClick={() => handleDelete()}>Delete</button>
      </section>
    );
  } else {
    return (
      //Begin base Detail page
      <section>
        <h2>{movieFromStore?.title}</h2>
        <img
          src={movieFromStore?.poster}
          alt={"Image of the movie" + movieFromStore?.title}
        />
        <p>Genres:</p>
        <ul>
          {genres.recentGenres?.genre_array?.map((item, index) => (
            <li key={index}>{genres.allGenres[item - 1]?.name}</li>
          ))}
        </ul>
        <p>{movieFromStore?.description}</p>
        <button onClick={() => setToggleEditMode(true)}>Edit</button>
        <button onClick={() => handleReturnToMovies()}>
          Return to Movie List
        </button>
      </section>
    );
  }
}

export default Details;
