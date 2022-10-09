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
  const queryText = `SELECT "movies"."id", array_agg("genres"."id") AS "genre_array" 
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
});

router.post("/:movieid", async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await Promise.all(
      req.body.checkboxes.map((genre) => {
        const insertGenre = `INSERT INTO "movies_genres" ("movie_id", "genre_id") VALUES  ($1, $2);`;
        const insertValues = [req.params.movieid, genre];
        return client.query(insertGenre, insertValues);
      })
    );
    await client.query("COMMIT");
  } catch (error) {
    console.log("error caught in POST MovieID :>> ", error);
  }
});

module.exports = router;
