require('dotenv').config();
import * as S3 from 'aws-sdk/clients/s3';


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