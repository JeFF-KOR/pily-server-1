import * as express from 'express'
const route = express.Router();
import getProfile from "../controllers/user/getProfile";
import getUser from "../controllers/user/getUser";
import specifyUserName from "../controllers/user/specifyUserName";
// import magazine from "../controllers/magazine/like";

route.get("/search", getUser);
route.get("/search/:username", getProfile);
route.get("/user/nickname/:username", specifyUserName);

// route.post("/:id/like", likes);
// route.post("/:id/unlike", unlikes);
// route.post("/:id/search/like", likeList);

export default route;