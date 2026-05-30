import { adminBooksModel } from "../../model/admin/AdminBooksModel.js";
import { adminDeleteBookModel } from "../../model/admin/adminDeleteBookModel.js";

export const AdminDeleteBookDetail = async (req, res, next) => {
  const { id } = req.params;

  const response = await adminDeleteBookModel(id);
  if (!response.success)
    return next({ status: response.status, msg: response.msg });

  return res.json(response).status(response.status);
};
