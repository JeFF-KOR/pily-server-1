import db from "../../models";
import { expressFn, user } from "../helper";

const { Magazine, User, Like, Subscribe, Feed, Magazine_Feed } = db;

export const detail: expressFn = async (req, res) => {
  const user = <user>req.user;
  let magazineId = Number(req.params.id);
  
  const magazine = await Magazine.findOne({
    where: {
      id: magazineId
    },
    include: {
      model: User,
      attributes: [['username', 'author'], ['IMG', 'authorImg']]
    }
  });

  if (!magazine) {
    return res.status(404).send();
  }

  let result = JSON.parse(JSON.stringify(magazine));

  if (!(user && user.exist)) {
    result.isLiked = false;
    result.isSubscribed = false;
  } else {
    const like = await Like.findOne({
      where: {
        user_id: user.userInfo.id,
        magazine_id: magazineId
      }
    });
    const subs = await Subscribe.findOne({
      where: {
        user_id: user.userInfo.id,
        author_user_id: result.user_id
      }
    });

    result.isLiked = !!like;
    result.isSubscribed = !!subs;
  }

  const feed = await Magazine_Feed.findAll({
    attributes: [],
    where: {
      magazine_id: magazineId
    },
    include: {
      model: Feed
    }
  });

  let feedList = JSON.parse(JSON.stringify(feed));

  feedList = feedList.reduce((acc, val) => {
    acc.push(val.Feed);
    return acc;
  }, []);

  result.feedList = feedList;

  res.status(200).json(result)
}