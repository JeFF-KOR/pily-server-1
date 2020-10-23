import db from "../../../models";
import { Request, Response } from 'express';

const { User } = db;

const func = async (req: Request , res: Response) => {
  if (req.user) {
    let info:any = {info:{}, ...req.user}.info;
    let exist:boolean = {exist:false, ...req.user}.exist;

    if (exist) {
      let result = await User.findOne({
        where: {
          username:info.username
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