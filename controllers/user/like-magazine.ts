import { Model, Op } from "sequelize";
import db from "../../models";
import { expressFn, user } from "../helper";

const { Like, Magazine, User } = db;
interface query {
  offset?: string | number;
  page?: string | number;
}

export const likeInfo: expressFn = async (req, res) => {
  const user = <user>req.user;
  const query = <query>req.query;
  query.page = query.page ? Number(query.page) : 1;

  if (!query.offset) {
    return res.status(400).send();
  }

  query.offset = Number(query.offset);

  if (!(user && user.exist)) {
    return res.status(404).send();
  }

  if (Number.isNaN(query.page) || Number.isNaN(query.offset)) {
    res.status(400).send();
  }

  let like = JSON.parse(JSON.stringify(await Like.findAll({
    where: {
      user_id: user.userInfo.id
    }
  })));

  like = like.reduce((acc, val) => {
    acc.push(val.magazine_id)
    return acc;
  }, []);

  if (like.length === 0) {
    return res.status(200).json({ results: [], max_count: like.length });
  }

  const result = await Magazine.findAll({
    where: {
      id: {
        [Op.or]: like
      }
    },
    include: {
      model: User,
      attributes: [['username', 'author'], ['IMG', 'authorImg']]
    }
  });

  let results: Model[] = [];

  for (let i = 0; i < result.length; i++) {
    if ((query.page - 1) * query.offset <= i && i < query.page * query.offset) {
      results.push(result[i]);
    }
  }

  res.status(200).json({ results, max_count: result.length })
}