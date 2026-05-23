import { adminBooksModel } from "../../model/admin/AdminBooksModel.js";

export const AdminBooksDetail = async (req, res, next) => {
  const { pageNo=1 } = req.query;

  const response = await adminBooksModel(pageNo);
  if (!response.success)
    return next({ status: response.status, msg: response.msg });

  return res.json(response).status(response.status);
};
