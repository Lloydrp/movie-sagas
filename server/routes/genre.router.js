const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

//Begin router to get ALL genres
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM "genres" ORDER BY "id";`;

  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error caught in GET genres :>> ", error);
    });
});

//Begin router to get genres related to movie ID
router.get("/details/:movieid", (req, res) => {
  const queryText = `SELECT "movies"."id", array_agg("genres"."name") AS "genre_array" 
  FROM "movies"
  JOIN "movies_genres" ON "movies"."id" = "movies_genres"."movie_id"
  JOIN "genres" ON "movies_genres"."genre_id" = "genres"."id"
  WHERE "movies"."id" = $1
  GROUP BY "movies"."id";`;

  pool
    .query(queryText, [req.params.movieid])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("error caught in GET genres :>> ", error);
    });
});

module.exports = router;
