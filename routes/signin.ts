import * as express from 'express'
import passport from '../controllers/passport'

const route = express.Router();

route.get('/google', passport.authenticate('google', {scope: 'profile'}))
route.get('/kakao', passport.authenticate('kakao'))
route.get('/naver', passport.authenticate('naver'))

export default route;