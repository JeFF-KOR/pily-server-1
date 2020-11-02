import passport = require("passport");
require('dotenv').config();
import { OAuth2Strategy as Google } from "passport-google-oauth";
import { Strategy as Kakao } from "passport-kakao";
import { Strategy as Naver } from "passport-naver";
import db from '../../models';
import { BASEURL_server, social_type } from '../helper';

const { User } = db;


const {
  GclientID,
  GclientSecret,
  KclientID,
  KclientSecret,
  NclientID,
  NclientSecret,
} = process.env

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
  done(null, { info: user, exist: !!result, userInfo: result });
})

passport.use(new Google({
  clientID: GclientID,
  clientSecret: GclientSecret,
  callbackURL: `${BASEURL_server}/oauth/google`
}, function (accessToken, refreshToken, profile, done) {
  process.nextTick(() => done(null, profile))
}))

passport.use(new Kakao({
  clientID: KclientID,
  clientSecret: KclientSecret,
  callbackURL: `${BASEURL_server}/oauth/kakao`
}, function (accessToken, refreshToken, profile, done) {
  process.nextTick(() => done(null, profile))
}))

passport.use(new Naver({
  clientID: NclientID,
  clientSecret: NclientSecret,
  callbackURL: `${BASEURL_server}/oauth/naver`
}, function (accessToken, refreshToken, profile, done) {
  process.nextTick(() => done(null, profile))
}))


export default passport;