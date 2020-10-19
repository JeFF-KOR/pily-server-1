import * as express from 'express'
import passport from '../controllers/passport'
import db from '../models';

const { User } = db;
const social_type = {
  google: 1,
  kakao: 2,
  naver: 3
}
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
    res.redirect(`//localhost:3000/sign/${!!result}`);
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
    res.redirect(`//localhost:3000/sign/${!!result}`);
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
    res.redirect(`//localhost:3000/sign/${!!result}`);
  }
)

route.get('/', (req, res) => {
  if (req.user) {
    let temp: { exist: boolean } = { exist: false, ...req.user }
    res.status(200).json({ exist: temp.exist });
  } else {
    res.status(200).json(false);
  }
})

export default route 