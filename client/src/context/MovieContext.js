import React, { useState, createContext } from "react";

export const MovieContext = createContext();

export const MovieContextProvider = (props) => {
  const [Movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const addMovies = (Movie) => {
    setMovies([...Movies, Movie]);
  };
  return (
    <MovieContext.Provider
      value={{
        Movies,
        setMovies,
        addMovies,
        selectedMovie,
        setSelectedMovie,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
