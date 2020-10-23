import * as express from 'express';
import { Model } from 'sequelize';
import db from '../../models';
const { User } = db;
const social_type = {
  google: 1,
  kakao: 2,
  naver: 3
}


export const signup = async (req: express.Request, res: express.Response) => {
  let username: string = req.body.username
  if (req.user) {
    // passport 의 타입지정이 req.user객체 안의 내용을 참조할 수 없어
    // 아래와 같이 info라는 변수를 만들어 줌.
    let info: any = { info: {}, ...req.user }.info
    let temp: number[] = [];
    if (await User.findOne({
      where: {
        username
      }
    })) {
      temp.push(1);
    }
    if (await User.findOne({
      where: {
        social_type: social_type[info.provider],
        social_id: info.id
      }
    })) {
      temp.push(1);
    }
    let result: Model;
    if (temp.length === 0) {
      result = await User.create({
        social_type: social_type[info.provider],
        social_id: info.id,
        username
      });
    }
    if (result) {
      res.status(200).send();
    } else {
      res.status(409).send();
    }
  } else {
    res.status(400).send();
  }
}