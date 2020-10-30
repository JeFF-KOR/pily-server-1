import * as express from 'express';
import { createFeed, imgUpload, myFeed } from '../controllers/feed';

const route = express.Router();

route.post('/create', createFeed);
route.post('/img-upload', imgUpload);
route.get('/my-feed', myFeed)


export default route;