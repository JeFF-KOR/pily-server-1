import db from "../../models";
import { expressFn, user } from "../helper";

const { Feed } = db;

export const createFeed:expressFn = async (req, res) => {
  let { 
    content, subTitle, title, location, stars
  } = req.body;
  let user = <user>req.user;
  
  if (!(req.user && user.exist)) {
    return res.status(404).send();
  }
  else if (!(content && title)) {
    return res.status(400).send();
  }

  let feed = await Feed.create({
    user_id: user.userInfo.id,
    content,
    title,
    subTitle,
    location_x: location.location_x,
    location_y: location.location_y,
    location_name: location.location_name,
    stars
  })

  if (!feed) {
    return res.status(500).send();
  }

  res.status(200).send();
}