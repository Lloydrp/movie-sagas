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
  const recentGenres = useSelector((store) => store.genres.recentGenres[0]);
  //Setup local state
  const [toggleEditMode, setToggleEditMode] = useState(false);
  const [title, setTitle] = useState(movieFromStore?.title);
  const [posterUrl, setPosterUrl] = useState(movieFromStore?.poster);
  const [description, setDescription] = useState(movieFromStore?.description);
  //Safegaurd to update local state on initial load so it can be displayed in edit mode
  //Using last defined variable for additional padding
  if (movieFromStore?.description !== undefined && description === undefined) {
    setTitle(movieFromStore?.title);
    setPosterUrl(movieFromStore?.poster);
    setDescription(movieFromStore?.description);
  }

  useEffect(() => {
    dispatch({ type: "FETCH_ID_MOVIE", payload: movieid });
    dispatch({ type: "FETCH_ID_GENRE", payload: movieid });
  }, []);

  if (movieFromStore?.description === undefined) {
    //Begin loading screen
    return (
      <section>
        <h2>Loading...</h2>
      </section>
    );
  } else if (toggleEditMode) {
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
          src={movieFromStore.poster}
          alt={"Image of the movie" + movieFromStore.title}
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
        <ul>
          {recentGenres?.genre_array.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <textarea
          onChange={(event) => setDescription(event.target.value)}
          value={description}
          name="movie-description"
          id="movie-description"
          cols="50"
          rows="15"
          placeholder="Enter movie description..."
        ></textarea>
        <button>Save</button>
        <button onClick={() => setToggleEditMode(false)}>Cancel</button>
      </section>
    );
  } else {
    return (
      //Begin base Detail page
      <section>
        <h2>{movieFromStore.title}</h2>
        <img
          src={movieFromStore.poster}
          alt={"Image of the movie" + movieFromStore.title}
        />
        <p>Genres:</p>
        <ul>
          {recentGenres?.genre_array.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{movieFromStore.description}</p>
        <button onClick={() => setToggleEditMode(true)}>Edit</button>
        <button onClick={() => history.replace("/")}>
          Return to Movie List
        </button>
      </section>
    );
  }
}

export default Details;
