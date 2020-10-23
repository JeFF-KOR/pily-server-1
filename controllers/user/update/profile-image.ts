import db from "../../../models";
import { Request, Response } from 'express';
import * as multer from 'multer';
import * as multers3 from 'multer-s3';
import * as path from 'path';
import { social_type, user, s3 } from '../../helper';

const { User } = db;

export const upload = multer({
  storage: multers3({
    s3: s3,
    bucket: 'pily-test',
    key: (req, file, cb) => {
      if (req.user) {
        let user = <user>req.user
        if (user.exist) {
          const ext = path.extname(file.originalname);
          cb(null, `img/${Date.now().toString()}${ext}`)
        } else {
          cb('not exist');
        }
      } else {
        cb('not oauth');
      }
    }
  }),
  limits: { fileSize: 500 * 1024 * 1024 }
});

const func = async (req: Request, res: Response) => {
  const file = <{ location?: string }>req.file;
  const user = <user>req.user;
  let findUser = await User.findOne({
    where: {
      social_type: social_type[user.info.provider],
      social_id: user.info.id
    }
  });
  await findUser.update({
    IMG: file.location
  });
  res.status(200).send();
  // res.status(200).json({location: file.location}); -> feed에서 이러한 형식이 필요함.
}


export default func;
