import { getFavBookModel } from "../../model/user/getFavBookModel.js";
import { asyncWrapper } from "../../utils/asyncWrapper.js";

export const getFavoriteBookController =asyncWrapper(async (req, res, next) => {
  const { pageNo=1 } = req.query;
  const response = await getFavBookModel(req.user._id , pageNo);
  return res.status(201).json({success:true,data:response})
});
