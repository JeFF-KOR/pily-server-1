import db from '../../models';
import { Request, Response } from "express";
import { Model } from 'sequelize/types';
const { User } = db;

const getUser = async (req: Request, res: Response) => {
  let currUser: any = { info: {}, ...req.user };
  if (req.user) { // 로그인 검증을 하기 위해..
    console.log("req.user:", req.user);
    const searchUser: Model = await User.findOne({
      attributes: ["username", "IMG"],
      where: { social_id: currUser.info.id }
    });
    if (searchUser) {
      res.status(200).json(searchUser);
      console.log(JSON.parse(JSON.stringify(searchUser)));
    } else {
      res.status(404).json({ message: "NOT FOUND" });
    }
  } else {
    res.status(404).json({ message: "NOT FOUND" });
  }
}

export default getUser;