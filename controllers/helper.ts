require('dotenv').config();
import S3 from 'aws-sdk/clients/s3';
import { Request, Response } from 'express';


const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;
export const s3 = new S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION
});

export interface user {
  info: {
    id: string;
    provider: string;
  };
  exist: boolean
}

export const social_type = {
  google: 1,
  kakao: 2,
  naver: 3
}

export type MulterKeyFn = (req: Express.Request, file: Express.Multer.File, callback: (error: any, key?: string) => void) => void;

export type expressFn = (req: Request, res: Response) => void;

export interface file { location?: string, Location?: string };
