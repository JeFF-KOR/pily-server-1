import * as express from 'express';
import { createFeed, imgUpload, myFeed } from '../controllers/feed';
import { upload } from '../controllers/multer';

const route = express.Router();

route.post('/create', createFeed);
route.post('/img-upload', upload.single('img'), imgUpload);
route.get('/my-feed', myFeed)


export default route;