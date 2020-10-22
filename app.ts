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
import root from './routes/root'


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


app.listen(port, () => {
  console.log(`Listening on ${port} port...`);
});
