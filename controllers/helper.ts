require('dotenv').config();
import S3 from 'aws-sdk/clients/s3';
import { Request, Response } from 'express';
import { Model } from 'sequelize';


const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, NODE_ENV } = process.env;
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
  exist: boolean,
  userInfo: Model & {
    id: number;
    social_type: number;
    social_id: string;
    username: string;
    IMG: string;
  };
}

export const social_type = {
  google: 1,
  kakao: 2,
  naver: 3
}

export type MulterKeyFn = (req: Express.Request, file: Express.Multer.File, callback: (error: any, key?: string) => void) => void;

export type expressFn = (req: Request, res: Response) => void;

export interface file { location?: string, Location?: string };

const client = {
  development: 'http://localhost:3000',
  product: 'https://the-pily.com'
}

const server = {
  development: 'http://localhost:4000',
  product: 'https://api.the-pily.com'
}

export const BASEURL_client:string = client[NODE_ENV];
export const BASEURL_server:string = server[NODE_ENV];