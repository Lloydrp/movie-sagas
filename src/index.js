import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App.js";
import { createStore, combineReducers, applyMiddleware } from "redux";
// Provider allows us to use redux within our react app
import { Provider } from "react-redux";
import logger from "redux-logger";
// Import saga middleware
import createSagaMiddleware from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery("FETCH_MOVIES", fetchAllMovies);
  yield takeEvery("FETCH_ID_MOVIE", fetchIdMovie);
  yield takeEvery("FETCH_GENRES", fetchAllGenres);
  yield takeEvery("FETCH_ID_GENRE", fetchIdGenre);
  yield takeEvery("ADD_MOVIE", addMovie);
  yield takeEvery("DELETE_MOVIE", deleteMovie);
  yield takeEvery("REFRESH_FROM_SAVE", refreshFromSave);
  yield takeEvery("POST_GENRES", postGenres);
  yield takeEvery("PUT_MOVIE", putMovie);
}

function* fetchAllMovies(action) {
  // get all movies from the DB
  try {
    const movies = yield axios.get("/api/movie");
    yield put({ type: "SET_MOVIES", payload: movies.data });
  } catch {
    console.log("get all error");
  }
} //end fetchAllMovies

function* fetchIdMovie(action) {
  //Setup pull genres for specific ID
  try {
    const movie = yield axios.get(`/api/movie/details/${action.payload}`);
    yield put({ type: "SET_RECENT_MOVIE", payload: movie.data });
  } catch (error) {
    console.log("error caught in fetchGenres :>> ", error);
  }
} //end fetchIdGenre

function* fetchAllGenres(action) {
  //Setup pull for all genres in DB
  try {
    const genres = yield axios.get("/api/genre");
    yield put({ type: "SET_GENRES", payload: genres.data });
  } catch (error) {
    console.log("error caught in fetchGenres :>> ", error);
  }
} //end fetchAllGenres

function* fetchIdGenre(action) {
  //Setup pull genres for specific ID
  try {
    const genre = yield axios.get(`/api/genre/details/${action.payload}`);
    yield put({ type: "SET_RECENT_GENRES", payload: genre.data });
  } catch (error) {
    console.log("error caught in fetchGenres :>> ", error);
  }
} //end fetchIdGenre

function* addMovie(action) {
  //Add new movie
  try {
    yield axios.post("api/movie/", action.payload);
    yield put({ type: "FETCH_MOVIES" });
  } catch (error) {
    console.log("error caught in addMovie :>> ", error);
  }
} //end addMovie

function* deleteMovie(action) {
  //Delete a movie by ID
  try {
    yield axios.delete(`/api/movie/moviegenre/${action.payload}`);
    yield axios.delete(`/api/movie/${action.payload}`);
  } catch (error) {
    console.log("error caught in deleteMovie :>> ", error);
  }
} //end deleteMovie

function* refreshFromSave(action) {
  //Run actions after save on edit screen
  try {
    yield axios.delete(`/api/genre/removegenre/${action.payload.id}`);
    yield put({ type: "POST_GENRES", payload: action.payload });
  } catch (error) {
    console.log("error caught in refreshFromSave :>> ", error);
  }
} //end refreshFromSave

function* postGenres(action) {
  try {
    yield axios.post(`/api/genre/${action.payload.id}`, {
      checkboxes: action.payload.checkboxes,
    });
    yield put({ type: "PUT_MOVIE", payload: action.payload });
  } catch (error) {
    console.log("error caught in postGenres :>> ", error);
  }
}

function* putMovie(action) {
  try {
    yield axios.put(`/api/movie/`, action.payload);
    yield put({ type: "FETCH_MOVIES" });
  } catch (error) {
    console.log("error caught in putMovie :>> ", error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = { allMovies: [], recentMovie: {} }, action) => {
  switch (action.type) {
    case "SET_MOVIES":
      return { ...state, allMovies: action.payload };
    case "SET_RECENT_MOVIE":
      return { ...state, recentMovie: action.payload };
    case "RESET_RECENT":
      return { ...state, recentMovie: {} };
    default:
      return state;
  }
};

// Used to store the movie genres
const genres = (state = { allGenres: [], recentGenres: {} }, action) => {
  switch (action.type) {
    case "SET_GENRES":
      return { ...state, allGenres: action.payload };
    case "SET_RECENT_GENRES":
      return { ...state, recentGenres: action.payload };
    case "RESET_RECENT":
      return { ...state, recentGenres: {} };
    default:
      return state;
  }
};

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware)
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
