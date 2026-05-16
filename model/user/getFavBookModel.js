import mongoose from "mongoose";
import { UserFavorite } from "../../schema/UserFavBook.schema.js";

export const addFavBookModel = async (userId, pageNo) => {
  let result;

  pageNo = (pageNo - 1) * 20;

  try {
    const userObjId = new mongoose.Types.ObjectId(userId);
    const data = await UserFavorite.find({ userId: userObjId }).limit(20).skip(pageNo);
    result = { success: true,status:200, data };
  } catch (error) {
    result = {
      success: false,
      status:500,
      msg: "something went wrong while getting reading list data",
    };
  }
  return result;
};
