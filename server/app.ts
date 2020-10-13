const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const session = require("express-session");
const cors = require("cors");

app.use(session({
  secret: process.env.SECRET,
  cookie: { secure: false }

}));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json("Hello, World!");
});

app.listen(port, () => {
  console.log(`Listening on ${port} port...`);
});

console.log();
