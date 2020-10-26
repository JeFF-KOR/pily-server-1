import db from "../../../models";
import { social_type, user, expressFn, file } from '../../helper';

const { User } = db;

export const updateProfileIMG = <expressFn>(async (req, res) => {
  const file = <file>req.file;
  const user = <user>req.user;
  let findUser = await User.findOne({
    where: {
      social_type: social_type[user.info.provider],
      social_id: user.info.id
    }
  });
  await findUser.update({
    IMG: file.location || file.Location
  });
  res.status(200).send();
  // res.status(200).json({location: file.Location || file.location}); // -> feed에서 이러한 형식이 필요함.
})
