import * as express from 'express'
import { updateProfileIMG, updateUsername, upload } from '../controllers/user/update';

const route = express.Router();

route.post('/username', updateUsername);
route.post('/profile-img', upload.single('img'), updateProfileIMG);

export default route;