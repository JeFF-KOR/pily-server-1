import multer from 'multer';
import multers3 from 'multer-s3';
import multerSharpS3 from 'multer-sharp-s3';
import * as path from 'path';
import { user, s3, MulterKeyFn, } from '../helper';


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
  limits: { fileSize: 5 * 1024 * 1024 }
});

export const resizeUpload = multer({
  storage: multerSharpS3({
    s3: s3,
    Bucket: 'pily-test',
    Key: <MulterKeyFn>((req, file, cb) => {
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
    }),
    resize: {
      options: {
        width: 300,
        fit: 'outside',
        withoutEnlargement: true
      }
    }
  }),
  limits: { fileSize: 1 * 1024 * 1024 }
});