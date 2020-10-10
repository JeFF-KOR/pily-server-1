const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.status(200).json("Hello, World!");
});

app.listen(port, () => {
  console.log(`Listening on ${port} port...`);
});
