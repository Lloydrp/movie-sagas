import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function AddMovie() {
  //Setup router variables
  const history = useHistory();
  //Setup redux variables
  const dispatch = useDispatch();
  //Setup local state for inputs
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [description, setDescription] = useState("");
  const [checkboxes, setCheckboxes] = useState([]);
  const [toggleCheckbox, setToggleCheckbox] = useState(false);
  const genres = useSelector((store) => store.genres.allGenres);

  //Begin function to handle submit clicks
  function clickHandler() {
    //Send inputs to server/DB
    dispatch({
      type: "ADD_MOVIE",
      payload: { title, poster, description, genre_id: checkboxes },
    });
    //Push back to movieList
    history.replace("/");
  } //end clickHandler

  function checkboxHandler(event) {
    if (event.target.checked) {
      setCheckboxes([...checkboxes, event.target.value]);
    } else {
      setCheckboxes(checkboxes.filter((item) => item !== event.target.value));
    }
  } //end checkboxHandler

  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, []);
  return (
    <section>
      <h2>Add Movie</h2>
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        type="text"
        placeholder="Enter movie title..."
      />
      <input
        onChange={(event) => setPoster(event.target.value)}
        value={poster}
        type="text"
        placeholder="Enter movie poster url..."
      />
      <textarea
        onChange={(event) => setDescription(event.target.value)}
        value={description}
        name="movie-description"
        id="movie-description"
        cols="30"
        rows="10"
        placeholder="Enter movie description..."
      ></textarea>
      <div className="multiselect">
        <div onClick={() => setToggleCheckbox(!toggleCheckbox)}>
          Select an option <span>V</span>
        </div>
        {toggleCheckbox && (
          <div id="checkboxes">
            {genres.map((genres, index) => (
              <label key={index} htmlFor={genres.id}>
                <input
                  value={genres.id}
                  type="checkbox"
                  id={genres.id}
                  onChange={(event) => checkboxHandler(event)}
                />
                {genres.name}
              </label>
            ))}
          </div>
        )}
      </div>
      <button onClick={() => clickHandler()}>Add Movie</button>
      <button onClick={() => history.replace("/")}>Cancel</button>
    </section>
  );
}

export default AddMovie;
