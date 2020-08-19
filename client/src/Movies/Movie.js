import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, movies, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const deleteMovie = e => {
    e.preventDefault()
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then( res => {
        movies = movies.filter( movie => 
          movie.id !== res.data
        )
        setMovieList(movies)
        history.push('/movies')

        })
      .catch( err => console.error(err))
  }

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div>
      <button
        onClick={() => history.push(`/update-movie/${params.id}`)}
        >
          Edit Movie
        </button>
        <button
        onClick={deleteMovie}
        >
          Delete Movie
        </button>
      </div>
    </div>
  );
}

export default Movie;
