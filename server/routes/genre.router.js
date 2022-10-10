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
}); //end GET

//Begin router to get movie info related to movie ID
router.get("/details/:movieid", (req, res) => {
  const queryText = `SELECT "movies"."id", array_agg("genres"."id"::TEXT) AS "genre_array" 
  FROM "movies"
  JOIN "movies_genres" ON "movies"."id" = "movies_genres"."movie_id"
  JOIN "genres" ON "movies_genres"."genre_id" = "genres"."id"
  WHERE "movies"."id" = $1
  GROUP BY "movies"."id";`;

  pool
    .query(queryText, [req.params.movieid])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log("error caught in GET genres :>> ", error);
    });
}); //end GET

//Begin router to delete movie
router.delete("/removegenre/:movieid", (req, res) => {
  const queryText = `DELETE FROM "movies_genres" WHERE "movie_id" = $1;`;

  pool
    .query(queryText, [req.params.movieid])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error caught in DELETE genres :>> ", error);
    });
}); //end DELETE

//Begin router to POST new genres
router.post("/:movieid", async (req, res) => {
  const queryText = `INSERT INTO "movies_genres" ("movie_id", "genre_id") VALUES  ($1, $2);`;

  for (genre of req.body.checkboxes) {
    pool
      .query(queryText, [req.params.movieid, genre])
      .then((result) => {})
      .catch((error) => {
        console.log("error caught in POST genres :>> ", error);
      });
  }
  res.sendStatus(200);

}); //end POST

module.exports = router;
