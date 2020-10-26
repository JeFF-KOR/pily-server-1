import * as express from 'express'
import { updateProfileIMG, updateUsername } from '../controllers/user/update';
import { resizeUpload } from '../controllers/multer';

const route = express.Router();

route.post('/username', updateUsername);
route.post('/profile-img', resizeUpload.single('img'), updateProfileIMG);

export default route;