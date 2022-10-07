import { HashRouter as Router, Route } from "react-router-dom";
import "./App.css";
import MovieList from "../Pages/MovieList/MovieList";
import Details from "../Pages/Details/Details";
import AddMovie from "../Pages/AddMovie/AddMovie";

function App() {
  return (
    <div className="App">
      <h1>The Movies Saga!</h1>
      <Router>
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/details/:movieid">
          <Details />
        </Route>
        <Route path="/addmovie/">
          <AddMovie />
        </Route>
      </Router>
    </div>
  );
}

export default App;
