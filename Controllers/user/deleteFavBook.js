import { deleteFavBookModel } from "../../model/user/deleteFavBookModel.js";

export const deleteFavBook = async (req, res, next) => {
  const { docId } = req.params
  const response = await deleteFavBookModel(docId);
  if (!response.success) return next({ status: response.status, msg: response.msg });

  return res.json(response).status(response.status);
};
