import db from "../../../models";
import { Request, Response } from 'express';
import { social_type, user } from '../../helper'

const { User } = db;

export const updateUsername = async (req: Request , res: Response) => {
  if (req.user) {
    let user = <user>req.user

    if (user.exist) {
      await user.userInfo.update({
        username: req.body.username
      });
      res.status(200).send();

    } else {
      res.status(404).send();
    }

  } else {
    res.status(404).send();
  }
}
