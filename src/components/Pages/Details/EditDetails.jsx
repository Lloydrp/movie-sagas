import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function EditDetails({
  checkboxes,
  setCheckboxes,
  movieFromStore,
  genres,
  movieid,
  setToggleEditMode,
}) {
  //Setup redux variables
  const dispatch = useDispatch();
  const history = useHistory();
  //Setup local state
  const [title, setTitle] = useState("");
  const [posterUrl, setPosterUrl] = useState("");
  const [description, setDescription] = useState("");

  //Safeguard to update local state on initial load so it can be displayed in edit mode
  //Using last defined variable for additional padding
  if (movieFromStore?.description !== description) {
    setTitle(movieFromStore?.title);
    setPosterUrl(movieFromStore?.poster);
    setDescription(movieFromStore?.description);
  }

  //Begin function to handle checkboxes
  function checkboxHandler(event) {
    if (event.target.checked) {
      //If checked add to checkboxes variable
      setCheckboxes([...checkboxes, event.target.value]);
    } else {
      //If unchecked remove from checkboxes variable
      setCheckboxes(checkboxes.filter((item) => item !== event.target.value));
    }
  } //end checkboxHandler

  //Begin function to handle save dispatch
  function handleSave() {
    //Simple gaurdclause for data validation
    if (!title || !posterUrl || !description || !checkboxes)
      return alert("Please enter valid information");

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
    //Refresh movielist after short delay this likely is not the best fix
    //If this is not on, then movies don't show until refreshed on main page
    // setTimeout(() => {
    //   dispatch({ type: "FETCH_MOVIES" });
    // }, 150);
  } //end handleSave

  //EXAMPLE OF GETTING ONLY NEW GENRES
  // console.log("checkboxes, genres :>> ", checkboxes, genres);
  // let newCheckboxes = checkboxes.filter(
  //   (item) => !genres.recentGenres.genre_array.includes(item)
  // );
  // console.log("newCheckboxes :>> ", newCheckboxes);

  //Begin function to handle delete button
  function handleDelete() {
    dispatch({ type: "DELETE_MOVIE", payload: movieid });
    history.replace("/");
  } //end handleDelete

  return (
    <section className="flex justify-center">
      <div className="flex w-4/5 flex-col md:w-1/2">
        <div className="flex items-center">
          <input
            className="my-5 h-2/5 w-full border-2 border-b-blue-700 bg-white p-5 text-center text-3xl font-bold"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Enter updated Title..."
          />
        </div>
        <img
          className="mb-5 rounded-md border-2 border-black md:w-1/2 md:self-center"
          src={movieFromStore?.poster}
          alt={"Image of the movie" + movieFromStore?.title}
        />
        <div className="flex items-center justify-center">
          <input
            className="text-l h-1/5 w-full border-2 border-b-blue-700 bg-white py-5 text-center font-bold"
            value={posterUrl}
            onChange={(event) => setPosterUrl(event.target.value)}
            type="text"
            placeholder="Enter updated poster URL..."
          />
        </div>
        <p className="font-bold">Genres:</p>
        <div
          className="flex h-44 w-2/3 flex-col flex-wrap items-start justify-start self-center"
          id="checkboxes"
        >
          {genres.allGenres.map((genre, index) => (
            <label className="mr-5" key={index} htmlFor={genre.id}>
              <input
                className="mx-2"
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
          className="whitespace-normal bg-white p-2"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
          name="movie-description"
          id="movie-description"
          cols="50"
          rows="15"
          placeholder="Enter movie description..."
        ></textarea>
        <div className="flex justify-between">
          <button
            className="my-5 w-1/4 rounded-lg border-2 border-blue-700 hover:bg-blue-700 hover:text-white"
            onClick={() => handleSave()}
          >
            Save
          </button>
          <button
            className="my-5 w-1/4 rounded-lg border-2 border-blue-700 hover:bg-blue-700 hover:text-white"
            onClick={() => handleDelete()}
          >
            Delete
          </button>
          <button
            className="my-5 w-1/4 rounded-lg border-2 border-blue-700 hover:bg-blue-700 hover:text-white"
            onClick={() => setToggleEditMode(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}

export default EditDetails;
