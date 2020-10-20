import db from '../../models';
import { Request, Response } from "express";
const { User, Magazine } = db;
// 남의 프로필 검색
const getProfile = async (req: Request, res: Response) => {
  const getProfiles = await User.findOne({ where: { username: req.params.username } });
  let result = JSON.parse(JSON.stringify(getProfiles)); // *
  console.log(result);
  const getUserMagazine = await Magazine.findAll({ where: { user_id: result.id } });
  result.results = getUserMagazine;

  if (!getProfiles) {
    res.status(404).json({ message: "Not found." });
  } else {
    res.status(200).json(result); /* send로 보낼때 JSON.stringify를 해주면된다. json 규칙, send로 보내면 text()를 쓴 뒤 parse를 다시해줘야함 */
  }
}

export default getProfile;