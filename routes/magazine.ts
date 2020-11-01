import * as express from 'express';
import { createMagazine, getMagazine, myMagazine } from '../controllers/magazine';

const route = express.Router();

route.post('/create', createMagazine);
route.get('/mymagazine', myMagazine);
route.get('/get-magazine', getMagazine);

export default route;