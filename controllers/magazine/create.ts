import db from "../../models";
import { expressFn, user } from "../helper";

const { Magazine, Magazine_Feed, Feed } = db;

interface body {
  isVertical: boolean;
  thumbnail?: string;
  feedList: number[];
  titleAlign: number;
  subTitle?: string;
  title: string;
  grid: number;
}

export const createMagazine: expressFn = async (req, res) => {
  const user = <user>req.user;
  const body = <body>req.body;
  
  if (!(user && user.exist)) {
    return res.status(404).send();
  }

  if (!(typeof body.isVertical === 'boolean' && body.feedList && body.grid && body.title && body.titleAlign)) {
    return res.status(400).send();
  }

  const magazine = await Magazine.create({
    user_id: user.userInfo.id,
    title: body.title,
    subTitle: body.subTitle,
    thumbnail: body.thumbnail,
    isVertical: body.isVertical,
    grid: body.grid,
    titleAlign: body.titleAlign
  });

  let magazineInfo = JSON.parse(JSON.stringify(magazine));

  for (let i of body.feedList) {
    let feed = await Feed.findOne({
      where: {
        id: i,
        user_id: user.userInfo.id
      }
    });

    if (!feed) {
      await Magazine_Feed.destroy({
        where: {
          magazine_id: magazineInfo.id
        }
      });
      await magazine.destroy();

      return res.status(400).send();
    }

    await Magazine_Feed.create({
      magazine_id: magazineInfo.id,
      feed_id: i
    })
  }
  
  res.status(201).json(magazineInfo.id);
}