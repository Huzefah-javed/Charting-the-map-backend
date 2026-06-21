import { getBookModel } from "../../model/user/getBookModel.js";
import { asyncWrapper } from "../../utils/asyncWrapper.js";

export const getBookReview = asyncWrapper( async (req, res, next) => {
  const { bookId } = req.params
  const response = await getBookModel(bookId);
  return res.status(200).json({success:true, data:response});
});
