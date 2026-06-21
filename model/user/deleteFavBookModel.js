import mongoose from "mongoose";
import { UserFavorite } from "../../schema/UserFavBook.schema.js";

export const deleteFavBookModel = async (docId) => {
   const docObjId = new mongoose.Types.ObjectId(docId);
    await UserFavorite.findByIdAndDelete(docObjId)
};
