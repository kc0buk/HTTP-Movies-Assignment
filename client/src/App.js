import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./components/UpdateMovieForm"
import AddMovieForm from './components/AddMovieForm'
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        setMovieList(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path='/add-movie'>
        <AddMovieForm setMovieList={setMovieList} />
      </Route>

      <Route exact path="/" >
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} setMovieList={setMovieList} movies={movieList} />
      </Route>

      <Route path="/update-movie/:id">
        <UpdateMovieForm setMovieList={setMovieList} movies={movieList} />
      </Route>
    </>
  );
};

export default App;
