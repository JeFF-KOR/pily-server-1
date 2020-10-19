import * as db from '../../models';
import { Request, Response } from "express";
const { User } = db;
/* 로그인 된 사용자라고 판단 */
/* try~catch */
/* passport user 저장 공간 확인 */
const getUser = async (req: Request, res: Response) => {
  //   // if (req.user) {
  //   const searchUser = await User.findOne({
  //     attributes: ["username", "IMG"],
  //     // where: { id: req.user } // passport가 아직 잘 안잡혀서 테스트가 안될 것 같다. 
  //   });
  //   res.status(200).json(searchUser);
  // } else {
  //   res.status(404).json({ message: "NOT FOUND" })
  //   }
}

export default getUser;