require('dotenv').config();
import db from "../../../models";
import { Request, Response } from 'express';
import * as multer from 'multer';
import * as multers3 from 'multer-s3';
import * as S3 from 'aws-sdk/clients/s3';
import * as path from 'path';

const { User } = db;
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;
const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION
});

export const upload = multer({
  storage: multers3({
    s3: s3,
    bucket: 'pily-test',
    key: (req, file, cb) => {
      if (req.user) {
        let user = <any>req.user
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

const func = (req: Request, res: Response) => {
  try {
    const file = <{location?:string}>req.file;
    console.log(req.file);
    res.status(200).json({location: file.location});
  } catch {
    res.status(500).json('error');
  }
}


export default func;
