import * as express from 'express';
import { signout, signup } from '../controllers/root'


const route = express.Router();


route.get("/", (req, res) => {
  res.status(200).send(`Hello, World!`);
});

route.get('/signout', signout)

route.post('/signup', signup)

export default route;