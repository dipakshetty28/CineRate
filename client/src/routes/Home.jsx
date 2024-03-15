import React from "react";
import Header from "../components/Header";
import AddMovie from "../components/AddMovie";
import MovieList from "../components/MovieList";

const Home = () => {
  return (
    <div>
      <Header />
      <AddMovie />
      <MovieList />
    </div>
  );
};

export default Home;
