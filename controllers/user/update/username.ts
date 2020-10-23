import db from "../../../models";
import { Request, Response } from 'express';
import { social_type, user } from '../../helper'

const { User } = db;

const func = async (req: Request , res: Response) => {
  if (req.user) {
    let user = <user>req.user

    if (user.exist) {
      let result = await User.findOne({
        where: {
          socila_type:social_type[user.info.provider],
          social_id: user.info.id
        }
      });
      await result.update({
        username: req.body.username
      });
      res.status(200).json({username: req.body.username});

    } else {
      res.status(404).send();
    }

  } else {
    res.status(404).send();
  }
}

export default func;