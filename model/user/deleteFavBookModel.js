import mongoose from "mongoose";
import { UserFavorite } from "../../schema/UserFavBook.schema.js";

export const deleteFavBookModel = async (docId) => {
  let result;
  try {
    const docObjId = new mongoose.Types.ObjectId(docId);
     await UserFavorite.findByIdAndDelete(docObjId)
    result = { success: true, status: 200, msg:"Removed successfully"};
  } catch (error) {
    result = {
      success: false,
      status: 500,
      msg: "something went wrong while removing from reading list",
    };
  }
  return result;
};
