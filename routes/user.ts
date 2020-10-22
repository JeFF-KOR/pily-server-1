import * as express from 'express'
const route = express.Router();
import { getProfile, getUser, specifyUserName } from '../controllers/user';
import update from './user-update';
// import magazine from "../controllers/magazine/like";

route.use('/update', update);   
route.get("/my-profile", getUser);
route.get("/profile/:username", getProfile);
route.get("/available/:username", specifyUserName);

export default route;