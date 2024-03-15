import React, { useEffect, useContext } from "react";
import MovieFinder from "../apis/MovieFinder";
import { MovieContext } from "../context/MovieContext";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";

const MovieList = (props) => {
  const { Movies, setMovies } = useContext(MovieContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MovieFinder.get("/");
        console.log(response);
        setMovies(response.data.data.movies);
      } catch (err) {}
    };

    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await MovieFinder.delete(`/${id}`);
      setMovies(
        Movies.filter((Movie) => {
          return Movie.id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/Movies/${id}/update`);
  };

  const handleMovieSelect = (id) => {
    history.push(`/Movies/${id}`);
  };

  const renderRating = (Movie) => {
    if (!Movie.count) {
      return <span className="text-warning">0 reviews</span>;
    }
    return (
      <>
        <StarRating rating={Movie.id} />
        <span className="text-warning ml-1">({Movie.count})</span>
      </>
    );
  };

  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Movie</th>
            <th scope="col">Genre</th>
            <th scope="col">My Rating</th>
            <th scope="col">AVG Ratings</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {Movies &&
            Movies.map((Movie) => {
              return (
                <tr
                  onClick={() => handleMovieSelect(Movie.id)}
                  key={Movie.id}
                >
                  <td>{Movie.name}</td>
                  <td>{Movie.genre}</td>
                  <td>{"$".repeat(Movie.my_rating)}</td>
                  <td>{renderRating(Movie)}</td>
                  <td>
                    <button
                      onClick={(e) => handleUpdate(e, Movie.id)}
                      className="btn btn-warning"
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={(e) => handleDelete(e, Movie.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                
              );
            })}
          {/* <tr>
            <td>mcdonalds</td>
            <td>New YOrk</td>
            <td>$$</td>
            <td>Rating</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr>

          <tr>
            <td>mcdonalds</td>
            <td>New YOrk</td>
            <td>$$</td>
            <td>Rating</td>
            <td>
              <button className="btn btn-warning">Update</button>
            </td>
            <td>
              <button className="btn btn-danger">Delete</button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default MovieList;
