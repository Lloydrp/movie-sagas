import { useHistory } from "react-router-dom";

function Header() {
  //Setup router variables
  const history = useHistory();
  return (
    <header>
      <h1>The Movie Saga!</h1>
      <div>
        <button onClick={() => history.push("/addmovie")}>Add Movie</button>
      </div>
    </header>
  );
}

export default Header;
