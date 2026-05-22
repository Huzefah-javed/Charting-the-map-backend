import { adminCategoryModel } from "../../model/admin/AdminCategoryModel.js";

export const adminCategoryDetail=async(req, res, next)=>{

    const response = await adminCategoryModel()
    if (!response.success)
    return next({ status: response.status, msg: response.msg });

  return res.json(response).status(response.status);
}