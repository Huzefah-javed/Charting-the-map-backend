import { adminTagsModel } from "../../model/admin/AdminTagsModel.js";
import { asyncWrapper } from "../../utils/asyncWrapper.js";

export const adminTagsDetail = asyncWrapper( async(req, res, next)=>{
    const response = await adminTagsModel()
   return res.status(200).json({ success: true, data: response });
})