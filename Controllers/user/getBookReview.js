import { getBookModel } from "../../model/user/getBookModel.js";

export const getBookReview = async (req, res, next) => {
  const { bookId } = req.params
  const response = await getBookModel(bookId);
  if (!response.success) return next({ status: response.status, msg: response.msg });

  return res.json(response).status(response.status);
};
