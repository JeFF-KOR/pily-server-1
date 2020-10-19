import * as db from '../../models';
import { Request, Response } from "express";
const { User, Magazine } = db;

/* bodyParser를 안써서 body.id를 읽을 수 없었다.
  get 요청이니까 바디가 없다
*/
const getProfile = async (req: Request, res: Response) => {
  try {
    const getProfiles = await User.findOne({ where: { id: req.params.id } });
    const getUserMagazine = await Magazine.findAll({ where: { user_id: req.params.id } });
    let result = JSON.parse(JSON.stringify(getProfiles)); // *
    console.log(result);
    result.results = getUserMagazine;

    if (!getProfiles) {
      res.status(404).json({ message: "Not found." });
    } else {
      res.status(200).json(result); /* send로 보낼때 JSON.stringify를 해주면된다. json 규칙, send로 보내면 text()를 쓴 뒤 parse를 다시해줘야함 */
    }
  } catch (err) {
    console.error(err);
  }
}

export default getProfile;