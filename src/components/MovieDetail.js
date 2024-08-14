import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios.get(`https://www.omdbapi.com/?i=${id}&apikey=7ec958ac`)
      .then(res => setMovie(res.data))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <div className="container my-3">
      {movie ? (
        <div className="card d-flex flex-row">
          <img src={movie.Poster} className="card-img-left" alt={movie.Title} style={{ width: '18rem' }} />
          <div className="card-body">
            <h2 className="card-title">{movie.Title}</h2>
            <p className="card-text"><strong>Year:</strong> {movie.Year}</p>
            <p className="card-text"><strong>Genre:</strong> {movie.Genre}</p>
            <p className="card-text"><strong>Director:</strong> {movie.Director}</p>
            <p className="card-text"><strong>Actors:</strong> {movie.Actors}</p>
            <p className="card-text"><strong>Plot:</strong> {movie.Plot}</p>
            <p className="card-text"><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MovieDetail;
