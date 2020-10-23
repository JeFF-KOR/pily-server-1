import db from '../../models';
import { Request, Response } from "express";
import { Model } from 'sequelize';
const { User } = db;

const specifyUsername = async (req: Request, res: Response) => {
  const isUserName: Model = await User.findOne({ where: { username: req.params.username } });
  if (isUserName) {
    res.status(200).json(false); // 사용불가능한 username이다.
  } else {
    res.status(404).json(true);
  }
}

export default specifyUsername;