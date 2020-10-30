import db from '../../models';
import { Request, Response } from "express";
import qs from 'querystring';
import { user } from '../helper'

const { User, Magazine, Subscribe } = db;
// 남의 프로필 검색
const getProfile = async (req: Request, res: Response) => {
  
  const user = <user>req.user;
  const getProfiles = await User.findOne({ where: { username: qs.unescape(req.params.username) } });
  let result:any ;
  
  if (!getProfiles) {
    return res.status(404).send();
  }
  
  result = JSON.parse(JSON.stringify(getProfiles));
  let getUserMagazine = await Magazine.findAll({ where: { user_id: result.id } });
  result.results = getUserMagazine;
  result.isSubscribed = false;

  if (!(user && user.exist)) {
    return res.status(200).json(result);
  }

  let temp = await Subscribe.findOne({
    where: {
      user_id: user.userInfo.id,
      author_user_id: result.id
    }
  })

  result.isSubscribed = !!temp
  res.status(200).json(result);
}

export default getProfile;