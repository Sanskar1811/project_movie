import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MovieDetail from './components/MovieDetail';
import Favorites from './components/Favorites';

function App() {
  const [text, setText] = useState("");
  const [movies, setMovies] = useState([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    // Fetch default movies (e.g., Marvel movies) when the component mounts
    const defaultSearch = "Marvel";
    axios.get(`https://www.omdbapi.com/?s=${defaultSearch}&apikey=7ec958ac`)
      .then(res => {
        if (res.data.Search) {
          setMovies(res.data.Search);
        } else {
          setMovies([]);
        }
      })
      .catch(err => {
        console.error(err);
        setMovies([]);
      });
  }, []);

  const hText = (event) => {
    setText(event.target.value);
  };

  const getMovie = (event) => {
    event.preventDefault();
    axios.get(`https://www.omdbapi.com/?s=${text}&apikey=7ec958ac`)
      .then(res => {
        if (res.data.Search) {
          setMovies(res.data.Search);
        } else {
          setMovies([]);
        }
      })
      .catch(err => {
        console.error(err);
        setMovies([]);
      });
  };

  const addToFavorites = (movie) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
      favorites.push(movie);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setNotification(`${movie.Title} added to favorites`);
    } else {
      setNotification(`${movie.Title} is already in favorites`);
    }
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <Router>
      <>
        {/* Navbar and search form */}
        {notification && <div className="alert alert-info">{notification}</div>}
        <Routes>
          <Route path="/" element={
            <>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                  <h1 className="navbar-brand">Movie App</h1>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <a className="nav-link" href="/favorites">Favorites Movies</a>
                      </li>
                    </ul>
                    <form className="d-flex" role="search" onSubmit={getMovie}>
                      <input className="form-control me-2" type="search" placeholder="Search Movie" aria-label="Search" value={text} onChange={hText} />
                      <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                  </div>
                </div>
              </nav>
              <div className="container my-3">
                <div className="row">
                  {movies.map((movie, index) => (
                    <div className="col-3" key={index}>
                      <div className="card" style={{ width: "18rem" }}>
                        <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
                        <div className="card-body">
                          <h3 className="card-title">{movie.Year}</h3>
                          <h4 className="card-text">{movie.Title}</h4>
                          <a href={`/movie/${movie.imdbID}`} className="btn btn-primary">View Details</a>
                          <br/><br/>
                          <button className="btn btn-danger" onClick={() => addToFavorites(movie)}>Add to Favorites</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          } />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/favorites" element={<Favorites setNotification={setNotification} />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
