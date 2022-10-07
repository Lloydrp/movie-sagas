import { useState } from "react";
import { useDispatch } from "react-redux";
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

  //Begin function to handle submit clicks
  function clickHandler() {
    // dispatch({ type: "ADD_MOVIE", payload: { title, poster, description } });
    setTitle("");
    setPoster("");
    setDescription("");
  } //end clickHandler

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
      <button onClick={() => clickHandler()}>Add Movie</button>
      <button onClick={() => history.replace("/")}>Cancel</button>
    </section>
  );
}

export default AddMovie;
