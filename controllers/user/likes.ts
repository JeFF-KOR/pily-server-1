import db from '../../models';
import { Model } from 'sequelize';
import { user, expressFn } from "../helper"
const { Like, User } = db;
const social_type = {
  google: 1,
  kakao: 2,
  naver: 3
}

const like: expressFn = async (req, res) => {
  const user = <user>req.user;
  if (user && user.exist) {
    const [likes, created] = await Like.findOrCreate({
      where: {
        magazine_id: req.body.magazineId,
        user_id: user.userInfo.id
      },
    });

    if (created) {
      res.status(201).send("Success to store like.");
    } else {
      res.status(409).send("Failure to store like");
    }
  } else {
    res.status(404).send("로그인이 필요합니다.");
  }
};

// 좋아요 취소
const unlike: expressFn = async (req, res) => {
  const user = <user>req.user;
  if (user && user.exist) {
    const unlike: Model = await Like.findOne({
      where: {
        magazine_id: req.body.magazineId,
        user_id: user.userInfo.id
      }
    });
    if (unlike) {
      await unlike.destroy();
      res.status(201).send("success");
    } else {
      res.status(404).send("fail");
    }
  } else {
    res.status(404).send("로그인이 필요합니다.");
  }
}

export default { like, unlike };