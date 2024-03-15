CREATE TABLE movies (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    genre TEXT NOT NULL,
    my_rating INT NOT NULL check(
        my_rating >= 1
        and my_rating <= 5
    )
);

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    movie_id BIGINT NOT NULL REFERENCES movies(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(
        rating >= 1
        and rating <= 5
    )
);

INSERT INTO movies (name, genre, my_rating) VALUES
('Inception', 'Science Fiction, Action', 5),
('The Shawshank Redemption', 'Drama', 5),
('The Godfather', 'Crime, Drama', 5),
('Interstellar', 'Science Fiction, Drama', 4),
('Forrest Gump', 'Drama, Romance', 5);

INSERT INTO reviews (movie_id, name, review, rating) VALUES
(1, 'John Doe', 'Mind-bending and visually stunning.', 5),
(1, 'Jane Smith', 'A masterpiece of modern cinema.', 5),
(2, 'Emily Johnson', 'An emotional journey like no other.', 5),
(3, 'Michael Brown', 'A timeless classic that gets better with age.', 5),
(4, 'Jessica Davis', 'Astounding visuals and deep, thematic complexity.', 4),
(5, 'Robert Wilson', 'Inspirational story with a heartwarming performance.', 5);

SELECT *
FROM movies
LEFT JOIN (
    SELECT movie_id,
           COUNT(*) AS review_count,
           TRUNC(AVG(rating), 1) AS average_rating
    FROM reviews
    GROUP BY movie_id
) reviews ON movies.id = reviews.movie_id;
