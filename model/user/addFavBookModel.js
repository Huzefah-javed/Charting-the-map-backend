import mongoose from "mongoose";
import { UserFavorite } from "../../schema/UserFavBook.schema.js";

export const addFavBookModel = async (bookId, userId) => {
  let result;
  try {
    const bookObjId = new mongoose.Types.ObjectId(bookId);
    const userObjId = new mongoose.Types.ObjectId(userId);
    await UserFavorite.insertOne({ bookId: bookObjId, userId: userObjId });
    result = { success: true,status:201, msg: "Added to Reading list" };
  } catch (error) {
    result = {
      success: false,
      status:500,
      msg: "something went wrong while added to reading list",
    };
  }
  return result;
};
