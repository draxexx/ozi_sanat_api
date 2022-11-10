const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = 3000;

dotenv.config();

// routes
const users = require("./routes/users");

// middlewares

app.use(express.json());

// routes
app.use("/users", users);

module.exports = app;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
