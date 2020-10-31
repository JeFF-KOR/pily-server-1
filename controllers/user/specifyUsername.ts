import db from '../../models';
import { Request, Response } from "express";
import { Model } from 'sequelize';
import qs from "querystring";
const { User } = db;

const specifyUsername = async (req: Request, res: Response) => {
  const isUserName: Model = await User.findOne({
    where: { username: qs.unescape(req.params.username) }
  });
  if (isUserName) {
    res.status(200).json({ isValidate: false }); // 사용불가능한 username이다.
  } else {
    res.status(200).json({ isValidate: true });
  }
}

export default specifyUsername;