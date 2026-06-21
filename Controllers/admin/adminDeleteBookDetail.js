import { adminBooksModel } from "../../model/admin/AdminBooksModel.js";
import { adminDeleteBookModel } from "../../model/admin/adminDeleteBookModel.js";
import { asyncWrapper } from "../../utils/asyncWrapper.js";

export const AdminDeleteBookDetail = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const response = await adminDeleteBookModel(id);
  return res.status(200).json({ success: true, message:"Deleted successfully" });
});
