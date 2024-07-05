import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Favorites({ setNotification }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFromFavorites = (movie) => {
    const updatedFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
    setNotification(`${movie.Title} removed from favorites`);
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <h1 className="navbar-brand" to="/">Movie App</h1>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container my-3">
        <div className="row">
          {favorites.map((movie, index) => (
            <div className="col-3" key={index}>
              <div className="card" style={{ width: "18rem" }}>
                <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
                <div className="card-body">
                  <h3 className="card-title">{movie.Year}</h3>
                  <h4 className="card-text">{movie.Title}</h4>
                  <Link to={`/movie/${movie.imdbID}`} className="btn btn-primary">View Details</Link>
                  <br/><br/>
                  <button className="btn btn-danger" onClick={() => removeFromFavorites(movie)}>Remove from Favorites</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Favorites;
