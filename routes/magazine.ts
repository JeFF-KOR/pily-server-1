import magazineCtnl from "../controllers/user/likes";
import * as express from 'express'
const route = express.Router();

route.post("/like", magazineCtnl.like);
route.post("/unlike", magazineCtnl.unlike);

export default route;