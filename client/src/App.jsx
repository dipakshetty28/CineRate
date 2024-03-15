import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import MovieDetailPage from "./routes/MovieDetailPage";
import { MovieContextProvider } from "./context/MovieContext";
const App = () => {
  return (
    <MovieContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/movies/:id/update"
              component={UpdatePage}
            />
            <Route
              exact
              path="/movies/:id"
              component={MovieDetailPage}
            />
          </Switch>
        </Router>
      </div>
    </MovieContextProvider>
  );
};

export default App;
