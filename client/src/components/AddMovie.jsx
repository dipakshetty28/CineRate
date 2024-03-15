import React, { useState, useContext } from "react";
import MovieFinder from "../apis/MovieFinder";
import { MovieContext } from "../context/MovieContext";

const AddMovie = () => {
  const { addMovies } = useContext(MovieContext);
  const [name, setName] = useState("");
  const [genre, setgenre] = useState("");
  const [myRating, setmyRating] = useState("My Rating");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await MovieFinder.post("/", {
        name,
        genre,
        my_rating: myRating,
      });
      addMovies(response.data.data.movie);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mb-4">
      <form action="">
        <div className="form-row">
          <div className="col">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="name"
            />
          </div>
          <div className="col">
            <input
              value={genre}
              onChange={(e) => setgenre(e.target.value)}
              className="form-control"
              type="text"
              placeholder="genre"
            />
          </div>
          <div className="col">
            <select
              value={myRating}
              onChange={(e) => setmyRating(e.target.value)}
              className="custom-select my-1 mr-sm-2"
            >
              <option disabled>My Rating</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
