import { adminCategoryModel } from "../../model/admin/AdminCategoryModel.js";
import { asyncWrapper } from "../../utils/asyncWrapper.js";

export const adminCategoryDetail = asyncWrapper(async (req, res, next) => {
  const response = await adminCategoryModel();
  return res.status(200).json({ success: true, data: response });
});
