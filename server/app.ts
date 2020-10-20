import express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
import session = require("express-session");
import cors = require("cors");
import bodyparser = require('body-parser');
import passport from './controllers/passport'
import signin from './routes/signin'
import oauth from './routes/oauth'
import user from "./routes/user";

import DB from './models';
import { Model } from "sequelize/types";
const { User } = DB
const social_type = {
  google: 1,
  kakao: 2,
  naver: 3
}

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(session({
  secret: process.env.SECRET,
  cookie: { secure: false },
  resave: false,
  saveUninitialized: false
}));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(200).send(`Hello, World!`);
});


app.use("/user", user);
app.use('/signin', signin);
app.use('/oauth', oauth);
app.get('/signout', (req, res) => {
  req.logout();
  res.redirect('//localhost:3000/sign');
})
app.post('/signup', async (req, res) => {
  let username: string = req.body.username
  if (req.user) {
    let info: any = { info: {}, ...req.user }.info
    console.log(info)
    let temp: number[] = [];
    if (await User.findOne({
      where: {
        username
      }
    })) {
      temp.push(1);
    }
    if (await User.findOne({
      where: {
        social_type: social_type[info.provider],
        social_id: info.id
      }
    })) {
      temp.push(1);
    }
    let result: Model;
    if (temp.length === 0) {
      result = await User.create({
        social_type: social_type[info.provider],
        social_id: info.id,
        username
      });
    }
    if (result) {
      res.status(200).send();
    } else {
      res.status(409).send();
    }
  } else {
    res.status(400).send();
  }
})

app.listen(port, () => {
  console.log(`Listening on ${port} port...`);
});
