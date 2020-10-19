import express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
import session = require("express-session");
import cors = require("cors");
import DB = require('./models');
import * as bodyParser from "body-parser";
const { User, Magazine } = DB
/* 아 이렇게 하는거구나 */
import getProfile from "./controllers/user/getProfile";
import getUser from "./controllers/user/getUser";
app.use(session({
  secret: process.env.SECRET,
  cookie: { secure: false }
}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json("Hello, World!");
});
app.get("/test/:id", getProfile);
app.get("/user", getUser);

app.listen(port, () => {
  console.log(`Listening on ${port} port...`);
  // User.create({
  //   social_type: 1,
  //   social_id: 'kakao',
  //   username: 'pig-cola',
  //   IMG: "null",
  // });
});
