require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Get all movies
app.get("/api/v1/movies", async (req, res) => {
  try {
    //const results = await db.query("select * from movies");
    const movieRatingsData = await db.query(
      "select * from movies left join (select movie_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by movie_id) reviews on movies.id = reviews.movie_id;"
    );
    res.status(200).json({
      status: "success",
      results: movieRatingsData.rows.length,
      data: {
        movies: movieRatingsData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a movie
app.get("/api/v1/movies/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const movie = await db.query(
      "select * from movies left join (select movie_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by movie_id) reviews on movies.id = reviews.movie_id where id = $1",
      [req.params.id]
    );

    const reviews = await db.query(
      "select * from reviews where movie_id = $1",
      [req.params.id]
    );
    console.log(reviews);

    res.status(200).json({
      status: "succes",
      data: {
        movie: movie.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Create a movie

app.post("/api/v1/movies/", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO movies (name, genre, my_rating) values ($1, $2, $3) returning *",
      [req.body.name, req.body.genre, req.body.my_rating]
    );
    console.log(results);
    res.status(201).json({
      status: "succes",
      data: {
        movie: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update movies

app.put("/api/v1/movies/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE movies SET name = $1, genre = $2, my_rating = $3 where id = $4 returning *",
      [req.body.name, req.body.genre, req.body.my_rating, req.params.id]
    );

    res.status(200).json({
      status: "succes",
      data: {
        retaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

// Delete movie

app.delete("/api/v1/movies/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM movies where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
});

//Add Review
app.post("/api/v1/movies/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (movie_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    console.log(newReview);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
