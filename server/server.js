const express = require("express");
const app = express();
const movieRouter = require("./routes/movie.router.js");
const genreRouter = require("./routes/genre.router.js");
const port = process.env.PORT || 5000;

/** ---------- MIDDLEWARE ---------- **/
app.use(express.json()); // needed for angular requests
app.use(express.static("build"));

/** ---------- ROUTES ---------- **/
app.use("/api/movie", movieRouter);
app.use("/api/genre", genreRouter);

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
  console.log("Listening on port: ", port);
});
