import { addFavBookModel } from "../../model/user/addFavBookModel.js";
import { asyncWrapper } from "../../utils/asyncWrapper.js";

export const addFavoriteBookController = asyncWrapper(async (req, res, next) => {
  const { bookId } = req.body;
   await addFavBookModel(bookId, req.user._id)
  return res.status(201).json({success:true, message:"Book added successfully"});
});
