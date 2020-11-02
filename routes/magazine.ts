import * as express from 'express';
import { createMagazine, getMagazine, myMagazine, detail } from '../controllers/magazine';
import { upload } from '../controllers/multer';
import { imgUpload } from '../controllers/feed';

const route = express.Router();

route.post('/create', createMagazine);
route.get('/mymagazine', myMagazine);
route.get('/get-magazine', getMagazine);
route.get('/detail/:id', detail);
route.post('/img-upload', upload.single('img'), imgUpload);

export default route;