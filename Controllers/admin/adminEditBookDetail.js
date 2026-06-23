import { adminAddBookModel } from "../../model/admin/AdminAddBookModel.js";
import { adminEditBookModel } from "../../model/admin/AdminEditBookModel.js";
import { asyncWrapper } from "../../utils/asyncWrapper.js";
import { AppError } from "../../utils/errorClass.js";

export const AdminEditBookDetail = asyncWrapper(async (req, res, next) => {

  let updateDoc= req.body;
  const {id} = req.params


if(updateDoc.genre) updateDoc.genre = updateDoc.genre && updateDoc.genre.charAt(0).toUpperCase() +updateDoc.genre.slice(1);

  const response = await adminEditBookModel(updateDoc, id);
  
   return res.status(200).json({ success: true,message:"Book updated successfully" });
});
