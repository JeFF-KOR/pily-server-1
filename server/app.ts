import express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
import session = require("express-session");
import cors = require("cors");

import DB = require('./models');
const { User } = DB

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
  User.create({
    social_type: 2,
    social_id: '1234141234',
    username: 'pig-cola'
  })
});

console.log();
