import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function BaseDetails({ setToggleEditMode, genres, movieFromStore }) {
  //Setup router variables
  const history = useHistory();
  //Setup redux variables
  const dispatch = useDispatch();

  //Begin function to clear recents when going back to home
  function handleReturnToMovies() {
    dispatch({ type: "RESET_RECENT" });
    history.replace("/");
  } //end handleReturnToMovies

  return (
    <section className="flex justify-center">
      <div className="flex w-4/5 flex-col md:w-1/2">
        <h2 className="my-10 h-1/5 whitespace-normal text-5xl font-bold">
          {movieFromStore?.title}
        </h2>
        <img
          className="mb-5 rounded-md border-2 border-black md:w-1/2 md:self-center"
          src={movieFromStore?.poster}
          alt={"Image of the movie" + movieFromStore?.title}
        />
        <p className="font-bold">Genres:</p>
        <ul className="mb-10">
          {genres.recentGenres?.genre_array?.map((item, index) => (
            <li key={index}>{genres.allGenres[item - 1]?.name}</li>
          ))}
        </ul>
        <p className="whitespace-normal">{movieFromStore?.description}</p>
        <div className="flex justify-evenly">
          <button
            className="my-5 w-1/5 rounded-lg border-2 border-blue-700 hover:bg-blue-700 hover:text-white"
            onClick={() => setToggleEditMode(true)}
          >
            Edit
          </button>
          <button
            className="my-5 w-3/5 rounded-lg border-2 border-blue-700 hover:bg-blue-700 hover:text-white"
            onClick={() => handleReturnToMovies()}
          >
            Return to Movie List
          </button>
        </div>
      </div>
    </section>
  );
}

export default BaseDetails;
