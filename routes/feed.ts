import * as express from 'express';
import { createFeed, imgUpload } from '../controllers/feed';

const route = express.Router();

route.post('/create', createFeed);
route.post('/img-upload', imgUpload);



export default route;