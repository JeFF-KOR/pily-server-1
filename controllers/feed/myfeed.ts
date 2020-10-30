import { Model, Sequelize, WhereOptions } from "sequelize/types";
import db from "../../models";
import { expressFn, user } from "../helper";

const { Feed } = db;

interface query {
  offset?: string | number;
  date?: string;
  query?: string;
  page?: string | number;
}

export const myFeed: expressFn = async (req, res) => {
  const user = <user>req.user;
  const query = <query>req.query;
  
  if (!query.offset) {
    return res.status(400).send();
  }
  
  if (!(user && user.exist)) {
    return res.status(404).send();
  }
  
  query.page = query.page ? Number(query.page) : 1;
  query.offset = Number(query.offset);

  if (Number.isNaN(query.page) || Number.isNaN(query.offset)) {
    res.status(400).send();
  }

  let where:WhereOptions = {};
  const sequelize = <typeof Sequelize>db.sequelize;

  if (query.query) {
    where = {
      user_id: user.userInfo.id,
      title: sequelize.fn('lower', sequelize.col('title'), 'like', `%${query.query.toLowerCase()}%`),
      subTitle: sequelize.fn('lower', sequelize.col('subTitle'), 'like', `%${query.query.toLowerCase()}%`)
    }
  } else {
    where = {
      user_id: user.userInfo.id
    }
  }

  const result = await Feed.findAll({
    where
  })

  let results: Model[];

  for (let i = 0; i < result.length; i++) {
    if ((query.page - 1) * query.offset <= i && i < query.page * query.offset) {
      results.push(result[i]);
    }
  }

  res.status(200).json({results, max_count: result.length})
}