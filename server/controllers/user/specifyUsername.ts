import * as db from '../../models';
import { Request, Response } from "express";
const { User } = db;

const specifyUsername = async (req: Request, res: Response) => {
  const findAllUser = await User.findAll();
  console.log(JSON.parse(JSON.stringify(findAllUser)));
  res.status(200).json(findAllUser);
};

export default specifyUsername;
// /* 중복된 게 들어오지 않도록만 유저에서 유저네임을 검증하도록 쿼리문을 짜라. */
// const isUserName = await User.findOne({
//   attributes: ["username"],
//   where: { id: req.params.id },
// });
// let result = JSON.parse(JSON.stringify(isUserName)); // *
// console.log(result);
// if (isUserName) {
//   if (isUserName['username'] === )
// } else {
//   res.status(404).json({ message: "NOT FOUND" });
// }