import { getFavBookModel } from "../../model/user/getFavBookModel.js";

export const getFavoriteBookController = async (req, res, next) => {
  const { pageNo=1 } = req.query;

  const response = await getFavBookModel(req.user._id , pageNo);
  if (!response.success)
    return next({ status: response.status, msg: response.msg });

  return res.json(response).status(response.status);
};
