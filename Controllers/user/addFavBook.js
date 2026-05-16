import { addFavBookModel } from "../../model/user/addFavBookModel.js";

export const addFavoriteBookController = async (req, res, next) => {
  const { bookId } = req.body;

  const response = await addFavBookModel(bookId, req.user._id);

  if (!response.success)
    return next({ status: response.status, msg: response.msg });

  return res.json(response).status(response.status);
};
