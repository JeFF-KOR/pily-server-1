import db from "../../models";
import { expressFn, user } from "../helper";

const { Feed } = db;

export const myFeed:expressFn = async (req, res) => {
  const user = <user>req.user;
  
  if (!(user && user.exist)) {
    return res.status(404).send();
  }

  const result = await Feed.findAll({
    where: {
      user_id: user.userInfo.id
    }
  })
} 