import { Route, useHistory } from "react-router-dom";

function Header() {
  //Setup router variables
  const history = useHistory();
  return (
    <header className="bg-blue-700 text-white">
      <h1 className="text-2xl font-bold">ProlloTech Movie Management</h1>
      <Route
        exact
        path="/"
        render={() => (
          <div>
            <button
              className="mt-5 inline-flex items-center rounded-full border-2 border-white bg-green-500 px-2 hover:border-black hover:bg-white hover:text-black"
              onClick={() => history.push("/addmovie")}
            >
              +
            </button>
          </div>
        )}
      />
    </header>
  );
}

export default Header;
