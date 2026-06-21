import { deleteFavBookModel } from "../../model/user/deleteFavBookModel.js";
import { asyncWrapper } from "../../utils/asyncWrapper.js";

export const deleteFavBook =asyncWrapper(async (req, res, next) => {
  const { docId } = req.params
  await deleteFavBookModel(docId);
   return res.status(200).json({ success: true, message:"Book deleted successfully"});
});
