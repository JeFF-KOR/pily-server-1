import * as express from 'express'
const route = express.Router();
import getProfile from "../controllers/user/getProfile";
import getUser from "../controllers/user/getUser";
import specifyUserName from "../controllers/user/specifyUserName";

route.get("/search/", getUser);
route.get("/search/:id", getProfile);
route.get("/user/nickname/:username", specifyUserName);

export default route;