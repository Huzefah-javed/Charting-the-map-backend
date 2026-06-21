import { adminBooksModel } from "../../model/admin/AdminBooksModel.js";
import { asyncWrapper } from "../../utils/asyncWrapper.js";

export const AdminBooksDetail = asyncWrapper(async (req, res, next) => {
  const { pageNo=1 } = req.query;
  const response = await adminBooksModel(pageNo);
   return res.status(200).json({ success: true, data: response });
});
