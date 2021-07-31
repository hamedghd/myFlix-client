import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import './movie-view.scss';
export class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      Email: "",
      Birthday: "",
      FavoriteMovies: [],
    };
  }
  refresh = () => {
    // re-renders the component
    this.setState({});
  };
  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }
  getUser(token) {
    const username = localStorage.getItem('user');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`https://myflix-movieapi.herokuapp.com/users/${username}`, config)
      .then((res) => {

        this.setState({

          Username: res.data.Username,
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday,
          FavoriteMovies: res.data.FavoriteMovies,

        });
        console.log(res);
        console.log('User data is received!');
      })
      .catch((e) => {
        console.log('Error Retrieving User Data');
        console.log(e);
      });
  }

  addMovie(e, movie) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios({
      method: 'patch',
      url: `https://myflix-movieapi.herokuapp.com/users/${username}/movies/${movie._id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert(`${movie.Title} is added to your Favorites`);
        window.location.reload();
      })
      .catch(function (err) {
        console.log(err);
      });

  }
  deleteMovie(e, movie) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios({
      method: 'delete',
      url: `https://myflix-movieapi.herokuapp.com/users/${username}/movies/${movie._id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert(`${movie.Title} is deleted from your Favorites`);
        window.location.reload();

      })
      .catch(function (err) {
        console.log(err);
      });
  }
  render() {
    const { movie, onBackClick } = this.props;
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const { FavoriteMovies } = this.state;
    const { movies } = this.props;
    return (
      <div className="movie-view bg-dark">
        <div className="centered">
          <img className="movie-poster" src={movie.ImagePath} />
        </div>

        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>

        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <span className="label">
            Genre:{' '}
          </span>
          <span className="value">
            <Link to={`/genres/${movie.Genre.Name}`}>
              {movie.Genre.Name}
            </Link>
          </span>
        </div>

        <div className="movie-director">
          <span className="label">
            Director:{' '}
          </span>
          <span className="value">
            <Link to={`/directors/${movie.Director.Name}`}>
              {movie.Director.Name}
            </Link>
          </span>
        </div>

        <Button className="button-style" variant="primary" type="submit" onClick={() => { onBackClick(null); }}>
          Back
        </Button>

        {(movie._id === FavoriteMovies.find((favoriteMovieID) => favoriteMovieID === movie._id)) ? (
          <div>
            <Button className="button-style" variant="primary" value={movie._id}
              onClick={(e) => {
                this.deleteMovie(e, movie);
              }} >
              Delete from Favorites
            </Button>
          </div>
        ) : (
          <div>
            <Button className="button-style" variant="primary" value={movie._id}
              onClick={(e) => {
                this.addMovie(e, movie);
              }} >
              Add to Favorites
            </Button>
          </div>
        )}
      </div>
    );
  }
}
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired

};