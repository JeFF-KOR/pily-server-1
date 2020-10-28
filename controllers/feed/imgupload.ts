import { expressFn, file } from '../helper';

export const imgUpload = <expressFn>(async (req, res) => {
  const file = <file>req.file;

  res.status(200).json({location: file.Location || file.location}); // -> feed에서 이러한 형식이 필요함.
})
