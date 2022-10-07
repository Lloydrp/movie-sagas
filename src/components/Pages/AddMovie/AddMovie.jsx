import { useHistory } from "react-router-dom";

function AddMovie() {
  //Setup router variables
  const history = useHistory();

  return (
    <section>
      <h2>Add Movie</h2>
      <input type="text" placeholder="Enter movie title..." />
      <input type="text" placeholder="Enter movie poster url..." />
      <textarea
        name="movie-description"
        id="movie-description"
        cols="30"
        rows="10"
        placeholder="Enter movie description..."
      ></textarea>
      <button>Add Movie</button>
      <button onClick={() => history.replace("/")}>Cancel</button>
    </section>
  );
}

export default AddMovie;
