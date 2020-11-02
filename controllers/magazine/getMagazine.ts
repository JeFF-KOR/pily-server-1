import { Model, Op, WhereOptions } from "sequelize";
import db from "../../models";
import { expressFn, user } from "../helper";

const { Magazine, User } = db;

interface query {
  category?: string | number;
  offset?: string | number;
  date?: string;
  query?: string;
  page?: string | number;
  sort?: 'created_at' | 'like';
}

export const getMagazine:expressFn = async (req, res) => {
  const query = <query>req.query;
  query.page = query.page ? Number(query.page) : 1;
  query.offset = Number(query.offset);
  let where:WhereOptions = {};

  if (!query.offset) {
    return res.status(400).send();
  }

  if (Number.isNaN(query.page) || Number.isNaN(query.offset)) {
    res.status(400).send();
  }

  if (query.query) {
    where = {
      id: {
        [Op.ne]: null
      },
      [Op.or]: [
        { title: { [Op.like]: `%${query.query}%` } },
        { subTitle: { [Op.like]: `%${query.query}%` } }
      ]
    };
  }

  if (query.date) {
    if (!query.date.includes(',')) {
      return res.status(400).send();
    }
    
    let date = query.date.split(',').map(val=>Number(val));
    
    for (let i of date) {
      if (Number.isNaN(i)) {
        return res.status(400).send();
      }
    }

    where.createdAt = {
      [Op.between]: date
    }
  }

  const result = await Magazine.findAll({
    where,
    include: {
      model: User,
      attributes: [['username', 'author'], ['IMG', 'authorImg']]
    }
  })

  let results: Model[] =  [];

  for (let i = 0; i < result.length; i++) {
    if ((query.page - 1) * query.offset <= i && i < query.page * query.offset) {
      results.push(result[i]);
    }
  }

  res.status(200).json({results, max_count: result.length})
}