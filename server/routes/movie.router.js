const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

//Begin GET to retrieve move info with array of current genres
router.get("/", (req, res) => {
  const query = `SELECT 
	"movies"."id" AS "id",
	"movies"."title",
	"movies"."poster",
	"movies"."description",
	array_agg("genres"."name") AS "genre_array" FROM "movies"
LEFT JOIN "movies_genres" ON "movies"."id" = "movies_genres"."movie_id"
LEFT JOIN "genres" ON "genres"."id" = "movies_genres"."genre_id"
GROUP BY "movies"."id"
ORDER BY "title" ASC;`;

  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
}); //end GET

//Begin GET to get all movies
router.get("/details/:movieid", (req, res) => {
  const query = `SELECT * FROM "movies" WHERE "id" = $1`;
  pool
    .query(query, [req.params.movieid])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all movies", err);
      res.sendStatus(500);
    });
}); //end GET

//Begin post to post new movie
router.post("/", async (req, res) => {
  const client = await pool.connect();
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`;

  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertMovieQuery, [
      req.body.title,
      req.body.poster,
      req.body.description,
    ])
    .then(async (result) => {
      console.log("New Movie Id:", result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id;

      //Second query to insert multiple genres into the many to many table
      await client.query("BEGIN");
      await Promise.all(
        req.body.genre_id.map((genre) => {
          const insertGenre = `INSERT INTO "movies_genres" ("movie_id", "genre_id") VALUES  ($1, $2);`;
          const insertValues = [createdMovieId, genre];
          return client.query(insertGenre, insertValues);
        })
      );
      await client.query("COMMIT");

      // Catch for first query
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
}); //end POST

//Begin PUT to update movie info on save
router.put("/", (req, res) => {
  const queryText = `UPDATE "movies" SET "title" = $1, "description"= $2, "poster"=$3 WHERE "id" = $4;`;

  pool
    .query(queryText, [
      req.body.title,
      req.body.description,
      req.body.poster,
      req.body.id,
    ])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error caught in PUT :>> ", error);
    });
}); // end PUT

//Begin DELETE to remove movie
router.delete("/:movieid", (req, res) => {
  const queryText = `DELETE FROM "movies" WHERE "id" = $1;`;

  pool
    .query(queryText, [req.params.movieid])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error caught in DELETE Movie :>> ", error);
    });
}); // end DELETE

//Begin DELETE to remove moviegenres from join table
router.delete("/moviegenre/:movieid", (req, res) => {
  const queryText = `DELETE FROM "movies_genres" WHERE "movie_id" = $1;`;

  pool
    .query(queryText, [req.params.movieid])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error caught in DELETE Movie :>> ", error);
    });
}); //end DELETE

module.exports = router;
