import * as express from 'express';
import passport from '../controllers/passport';
import db from '../models';
import { BASEURL_client, social_type, user } from '../controllers/helper';

const { User } = db;
const route = express.Router();

route.get('/google', passport.authenticate('google'),
  async function (req, res) {
    let user: any = { ...req.user }
    let result = await User.findOne({
      where: {
        social_id: user.id,
        social_type: social_type.google
      }
    })
    res.redirect(`${BASEURL_client}/sign/${!!result}`);
  }
)

route.get('/kakao', passport.authenticate('kakao'),
  async function (req, res) {
    let user: any = { ...req.user }
    let result = await User.findOne({
      where: {
        social_id: user.id,
        social_type: social_type.kakao
      }
    })
    res.redirect(`${BASEURL_client}/sign/${!!result}`);
  }
)

route.get('/naver', passport.authenticate('naver'),
  async function (req, res) {
    let user: any = { ...req.user }
    let result = await User.findOne({
      where: {
        social_id: user.id,
        social_type: social_type.naver
      }
    })
    res.redirect(`${BASEURL_client}/sign/${!!result}`);
  }
)

route.get('/', (req, res) => {
  if (req.user) {
    let user = <user>req.user
    res.status(200).json({ exist: user.exist });
  } else {
    res.status(200).json(false);
  }
})

export default route; 