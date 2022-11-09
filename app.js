const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = 3000;

// routes

// middlewares

dotenv.config();

app.use(express.json());

// routes

module.exports = app;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
