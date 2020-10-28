import express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
import session = require("express-session");
import cors = require("cors");
import bodyparser = require('body-parser');
import passport from './controllers/passport'
import { root, user, oauth, signin, feed, magazine } from './routes';


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

app.use('/', root);
app.use("/user", user);
app.use('/signin', signin);
app.use('/oauth', oauth);
app.use('/feed', feed);


app.listen(port, () => {
  console.log(`Listening on ${port} port...`);
});
