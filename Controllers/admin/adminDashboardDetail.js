import { adminDashboardModel } from "../../model/admin/AdminDashboardModel.js"

export const adminDashboardDetail=async(req, res, next)=>{

    const response = await adminDashboardModel()
    if (!response.success)
    return next({ status: response.status, msg: response.msg });

  return res.json(response).status(response.status);
}