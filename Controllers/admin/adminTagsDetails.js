import { adminTagsModel } from "../../model/admin/AdminTagsModel.js";

export const adminTagsDetail = async(req, res, next)=>{

    const response = await adminTagsModel()
    if (!response.success)
    return next({ status: response.status, msg: response.msg });

  return res.json(response).status(response.status);
}