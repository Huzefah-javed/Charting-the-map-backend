import { adminDashboardModel } from "../../model/admin/AdminDashboardModel.js"
import { asyncWrapper } from "../../utils/asyncWrapper.js";

export const adminDashboardDetail=asyncWrapper(async(req, res, next)=>{
    const response = await adminDashboardModel()
   return res.status(200).json({ success: true, data: response });
  })