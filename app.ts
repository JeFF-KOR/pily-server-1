import express = require("express");
require("dotenv").config();
const app = express();
const { PORT:port, NODE_ENV } = process.env;
import session = require("express-session");
import cors = require("cors");
import bodyparser = require('body-parser');
import passport from './controllers/passport'
import { root, user, oauth, signin, feed, magazine } from './routes';
import { BASEURL_client } from './controllers/helper';


const cookie = {
  development: {
    secure: false
  },
  product: { secure: true, sameSite: false }
}

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors({
  origin: BASEURL_client,
  credentials: true
}));
app.use(session({
  secret: process.env.SECRET,
  cookie: cookie[NODE_ENV],
  resave: false,
  saveUninitialized: true,
  proxy: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', root);
app.use("/user", user);
app.use('/signin', signin);
app.use('/oauth', oauth);
app.use('/feed', feed);
app.use('/magazine', magazine);


app.listen(port, () => {
  console.log(`Listening on ${port} port...`);
});
