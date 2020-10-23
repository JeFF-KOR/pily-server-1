import db from '../../models';
import { Request, Response } from "express";
import { Model } from 'sequelize';
const { Like, User } = db;
const social_type = {
  google: 1,
  kakao: 2,
  naver: 3
}

const like = async (req: Request, res: Response) => {
  if (req.user) {
    const [likes, created] = await Like.findOrCreate({
      where: {
        magazine_id: req.body.magazineId,
        user_id: req.body.user_id
      },
    });

    if (created) {
      res.status(201).send("Success to store like.");
    } else {
      res.status(409).send("Failure to store like");
    }
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
};

// 좋아요 취소
const unlike = async (req: Request, res: Response) => {
  if (req.user) {
    let currUser: any = { info: {}, ...req.user };
    // user의 id 값을 얻는다(provider, id를 이용)
    const getUsers = await User.findOne({
      where: {
        social_id: currUser.info.id,
        social_type: social_type[currUser.info.provider]
      }
    });
    const unlike: Model = await Like.findOne({
      where: {
        magazine_id: req.body.magazineId,
        user_id: getUsers
      },
    });
    if (unlike) {
      await unlike.destroy();
      res.status(201).send("success");
    } else {
      res.status(404).send("fail");
    }
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
}

export default { like, unlike };
