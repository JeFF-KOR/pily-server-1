import { user, expressFn, file } from '../../helper';

export const updateProfileIMG = <expressFn>(async (req, res) => {
  const file = <file>req.file;
  const user = <user>req.user;
  
  await user.userInfo.update({
    IMG: file.location || file.Location
  });
  res.status(200).send();
  // res.status(200).json({location: file.Location || file.location}); // -> feed에서 이러한 형식이 필요함.
})
