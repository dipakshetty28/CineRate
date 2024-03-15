import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import MovieFinder from "../apis/MovieFinder";

const UpdateMovie = (props) => {
  const { id } = useParams();
  let history = useHistory();
  const { Movies } = useContext(MovieContext);
  const [name, setName] = useState("");
  const [genre, setgenre] = useState("");
  const [MyRating, setMyRating] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await MovieFinder.get(`/${id}`);
      console.log(response.data.data);
      setName(response.data.data.movie.name);
      setgenre(response.data.data.movie.genre);
      setMyRating(response.data.data.movie.MyRating);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMovie = await MovieFinder.put(`/${id}`, {
      name,
      genre,
      my_rating: MyRating,
    });
    history.push("/");
  };

  return (
    <div>
      <form action="">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className="form-control"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">genre</label>
          <input
            value={genre}
            onChange={(e) => setgenre(e.target.value)}
            id="genre"
            className="form-control"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="my_rating">My Rating</label>
          <input
            value={MyRating}
            onChange={(e) => setMyRating(e.target.value)}
            id="my_rating"
            className="form-control"
            type="number"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateMovie;
