import * as express from 'express';
import { createFeed, imgUpload } from '../controllers/feed';
import { upload } from '../controllers/multer';

const route = express.Router();

route.post('/create', createFeed);
route.post('/img-upload', upload.single('img'), imgUpload);



export default route;