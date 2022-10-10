import { Route, useHistory } from "react-router-dom";

function Header({ addButton }) {
  //Setup router variables
  const history = useHistory();
  return (
    <header>
      <h1 className="bg-slate-600">The Movie Saga!</h1>
      <Route
        exact
        path="/"
        render={() => (
          <div>
            <button onClick={() => history.push("/addmovie")}>Add Movie</button>
          </div>
        )}
      />
    </header>
  );
}

export default Header;
