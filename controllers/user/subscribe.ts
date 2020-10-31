import db from '../../models';
import { Model, Op, Sequelize } from 'sequelize';
import { user, expressFn } from "../helper"
const { Subscribe, User, Magazine } = db;
const sequelize = <typeof Sequelize>db.sequelize

/* 구독하기 */
const subscribe: expressFn = async (req, res) => {
  const user = <user>req.user;
  if (user && user.exist) {
    const getSubscribeUser = await User.findOne({ where: { username: req.body.username } });
    let author = JSON.parse(JSON.stringify(getSubscribeUser));

    if (!getSubscribeUser) {
      return res.status(404).send("Your request is failed!");
    }

    const [subscribe, created] = await Subscribe.findOrCreate({
      where: {
        author_user_id: author.id,
        user_id: user.userInfo.id
      },
    });

    if (created) {
      res.status(201).send("Success to store subscribe.");
    } else {
      res.status(409).send("Failure to store subscribe");
    }
  } else {
    res.status(404).send("로그인이 필요합니다.");
  }
};


/* 구독 취소 */
const unSubscribe: expressFn = async (req, res) => {
  const user = <user>req.user;
  if (user && user.exist) {
    const getUnSubscribeUser = await User.findOne({ where: { username: req.body.username } });
    let author = JSON.parse(JSON.stringify(getUnSubscribeUser));
    const unSubscribe: Model = await Subscribe.findOne({
      where: {
        author_user_id: author.id,
        user_id: user.userInfo.id
      }
    });
    if (unSubscribe) {
      await unSubscribe.destroy();
      res.status(201).send("success");
    } else {
      res.status(404).send("fail");
    }
  } else {
    res.status(404).send("로그인이 필요합니다.");
  }
}

/* 내가 구독한 작가들의 이미지와, 이름을 가져오기 */
const getSubscribeInfo: expressFn = async (req, res) => {
  const user = <user>req.user;
  if (user && user.exist) {
    const getSubscribedAuthorInfo = await Subscribe.findAll({
      where: { user_id: user.userInfo.id },
      include: [{
        model: User,
        attributes: ["username", "IMG"]
        // title: sequelize.where(sequelize.fn('lower', sequelize.col('title')), 'like', `%${query.query.toLowerCase()}%`)
      }]
    });
    const result = JSON.parse(JSON.stringify(getSubscribedAuthorInfo));
    console.log(result);
    
    if (!getSubscribedAuthorInfo) {
      res.status(404).send("Not Found");
    } else {
      res.status(200).json("성공");
    }
  }
}

export default { subscribe, unSubscribe, getSubscribeInfo }