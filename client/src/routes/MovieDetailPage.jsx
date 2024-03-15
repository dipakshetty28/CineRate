import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import MovieFinder from "../apis/MovieFinder";
import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { selectedMovie, setSelectedMovie } = useContext(
    MovieContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MovieFinder.get(`/${id}`);
        console.log(response);

        setSelectedMovie(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      {selectedMovie && (
        <>
          <h1 className="text-center display-1">
            {selectedMovie.movie.name}
          </h1>
          <div className="text-center">
            <StarRating rating={selectedMovie.movie.average_rating} />
            <span className="text-warning ml-1">
              {selectedMovie.movie.count
                ? `(${selectedMovie.movie.count})`
                : "(0)"}
            </span>
          </div>
          <div className="mt-3">
            <Reviews reviews={selectedMovie.reviews} />
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default MovieDetailPage;
