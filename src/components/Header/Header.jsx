import { Route, useHistory } from "react-router-dom";

function Header() {
  //Setup router variables
  const history = useHistory();

  return (
    <header className="bg-blue-700 text-white">
      <h1 className="text-2xl font-bold">ProlloTech Movie Management</h1>
      {/* Conditional rendering of add button only if on home page */}
      <Route
        exact
        path="/"
        render={() => (
          <div>
            <button
              className="mt-8 hover:text-green-400"
              onClick={() => history.push("/addmovie")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
            </button>
            <p className="">Add Movie</p>
          </div>
        )}
      />
    </header>
  );
}

export default Header;
