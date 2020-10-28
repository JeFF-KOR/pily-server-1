import { Request, Response } from "express";
import {user} from '../helper';

// 내 프로필 검색
const getUser = async (req: Request, res: Response) => {
  const user = <user>req.user

  if (!(user && user.exist)) { // 로그인 검증을 하기 위해..
    return res.status(404).json({ message: "NOT FOUND" });
  }

  res.status(200).json(user.userInfo);
}

export default getUser;