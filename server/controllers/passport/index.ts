import passport = require("passport");
require('dotenv').config();
import { OAuth2Strategy as Google } from "passport-google-oauth";
import { Strategy as Kakao } from "passport-kakao";
import { Strategy as Naver } from "passport-naver";
import db from '../../models';

const { User } = db;


const {
  GclientID,
  GclientSecret,
  KclientID,
  KclientSecret,
  NclientID,
  NclientSecret,
} = process.env

const social_type = {
  google: 1,
  kakao: 2,
  naver: 3
}

passport.serializeUser(function (user, done) {
  // console.log(user);
  done(null, user);
})

passport.deserializeUser(async function (user: any, done) {
  let result = await User.findOne({
    where: {
      social_id: user.id,
      social_type: social_type[user.provider]
    }
  })
  console.log(user.id, user.provider)
  done(null, { info: user, exist: !!result })
})

passport.use(new Google({
  clientID: GclientID,
  clientSecret: GclientSecret,
  callbackURL: '/oauth/google'
}, function (accessToken, refreshToken, profile, done) {
  process.nextTick(() => done(null, profile))
}))

passport.use(new Kakao({
  clientID: KclientID,
  clientSecret: KclientSecret,
  callbackURL: '/oauth/kakao'
}, function (accessToken, refreshToken, profile, done) {
  process.nextTick(() => done(null, profile))
}))

passport.use(new Naver({
  clientID: NclientID,
  clientSecret: NclientSecret,
  callbackURL: '/oauth/naver'
}, function (accessToken, refreshToken, profile, done) {
  process.nextTick(() => done(null, profile))
}))


export default passport;