import * as express from 'express'
const route = express.Router();
import { getProfile, getUser, specifyUserName } from '../controllers/user';
import likeController from '../controllers/user/likes';
import update from './user-update';

route.use('/update', update);
route.get("/my-profile", getUser);
route.get("/profile/:username", getProfile);
route.get("/available/:username", specifyUserName);
route.post("/like", likeController.like);
route.post("/unlike", likeController.unlike);

export default route;