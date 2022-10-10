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
  //Setup store variables
  const genres = useSelector((store) => store.genres.allGenres);

  //Begin function to handle submit clicks
  function clickHandler() {
    //Simple gaurdclause for data validation
    if (!title || !poster || !description || !checkboxes)
      return alert("Please enter valid information");
    //Send inputs to server/DB
    dispatch({
      type: "ADD_MOVIE",
      payload: { title, poster, description, genre_id: checkboxes },
    });
    //Push back to movieList
    history.replace("/");
    setTimeout(() => {
      dispatch({ type: "FETCH_MOVIES" });
    }, 150);
  } //end clickHandler

  //Begin function to handle when checkboxes are checked/unchecked
  function checkboxHandler(event) {
    if (event.target.checked) {
      //If checked add to checkboxes variable
      setCheckboxes([...checkboxes, event.target.value]);
    } else {
      //If not then remove from checkboxes variable
      setCheckboxes(checkboxes.filter((item) => item !== event.target.value));
    }
  } //end checkboxHandler

  //Get initial genres on page load
  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, []);

  return (
    <section className="flex justify-center">
      <div className="flex w-4/5 flex-col md:w-1/3">
        <h2 className="my-3 text-xl font-bold">Add Movie</h2>
        <input
          className="text-l h-2/12 mb-3 w-full border-2 border-b-blue-700 bg-white py-1 text-center font-bold"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          placeholder="Enter movie title..."
        />
        <input
          className="text-l h-2/12 mb-3 w-full border-2 border-b-blue-700 bg-white py-1 text-center font-bold"
          onChange={(event) => setPoster(event.target.value)}
          value={poster}
          type="text"
          placeholder="Enter movie poster url..."
        />
        <textarea
          className="mb-3 whitespace-normal border-2 border-b-blue-700 bg-white p-2"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
          name="movie-description"
          id="movie-description"
          cols="30"
          rows="10"
          placeholder="Enter movie description..."
        ></textarea>
        {/* Begin section for popdown checkboxes */}
        <div className="multiselect">
          <div
            className="relative border-2 border-blue-700 bg-white"
            onClick={() => setToggleCheckbox(!toggleCheckbox)}
          >
            <p className="">
              Select Genres{" "}
              <span className="absolute top-1 right-0 float-right pr-3 align-bottom text-xs">
                V
              </span>
            </p>
          </div>
          {/* If clicked display checkboxes */}
          {toggleCheckbox && (
            <div
              className="mx-auto flex h-44 w-full flex-col flex-wrap items-start justify-start self-center border-2 border-blue-700 bg-white"
              id="checkboxes"
            >
              {genres.map((genres, index) => (
                <label className="mr-5" key={index} htmlFor={genres.id}>
                  <input
                    className="mx-2"
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
        <div className="flex justify-evenly">
          <button
            className="my-5 w-1/4 rounded-lg border-2 border-blue-700 hover:bg-blue-700 hover:text-white"
            onClick={() => clickHandler()}
          >
            Add Movie
          </button>
          <button
            className="my-5 w-1/4 rounded-lg border-2 border-blue-700 hover:bg-blue-700 hover:text-white"
            onClick={() => history.replace("/")}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}

export default AddMovie;
