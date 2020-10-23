import db from '../../models';
import { Request, Response } from "express";
import { Model } from 'sequelize/types';
const { Like, User } = db;
const social_type = {
  google: 1,
  kakao: 2,
  naver: 3
}

/* 구독하기 */
const subscribe = async (req: Request, res: Response) => {

};

/* 구독 취소 */
const unSubscribe = async (req: Request, res: Response) => {

};

const getSubscribeInfo = async (req: Request, res: Response) => {

};


export default { subscribe, unSubscribe }